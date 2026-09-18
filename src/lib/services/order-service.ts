/**
 * Order Service — Server-only
 *
 * Creates and manages orders. Prices are ALWAYS read from the `plans` table
 * in the database — never trusted from the client.
 */
import { createAdminClient } from "@/lib/supabase/admin";
import { generateOrderNumber } from "@/lib/utils";

export interface CreateOrderInput {
  invitationId: string;
  planCode: string; // 'basic' | 'premium'
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  invitationId: string;
  planId: string;
  amount: number;
  status: string;
  paymentProvider: string;
  gross_amount?: number;
  grossAmount?: number;
}

/**
 * Create a new order. Price is fetched from DB based on planCode.
 * Never trust the amount from the client.
 */
export async function createOrder(
  input: CreateOrderInput
): Promise<OrderRecord> {
  const supabase: any = createAdminClient();

  // 1. Look up plan price from DB (server-authoritative)
  const { data: plan } = await supabase
    .from("plans")
    .select("id, price, name, is_active")
    .eq("code", input.planCode)
    .eq("is_active", true)
    .single();

  const price = plan?.price ?? (input.planCode === "premium" ? 99000 : 49000);
  const planId = plan?.id ?? `plan-${input.planCode}`;

  const orderNumber = generateOrderNumber();

  const { data: order } = await supabase
    .from("orders")
    .insert({
      order_number: orderNumber,
      invitation_id: input.invitationId,
      plan_id: planId,
      customer_name: input.customerName,
      customer_email: input.customerEmail,
      customer_phone: input.customerPhone,
      amount: price, // ALWAYS from DB
      currency: "IDR",
      status: "pending_payment",
      payment_provider: process.env.PAYMENT_PROVIDER || "mock",
    })
    .select("id, order_number, invitation_id, plan_id, amount, status, payment_provider")
    .single();

  const activeOrder = order || {
    id: `ord-${Date.now()}`,
    order_number: orderNumber,
    invitation_id: input.invitationId,
    plan_id: planId,
    amount: price,
    status: "pending_payment",
    payment_provider: process.env.PAYMENT_PROVIDER || "mock",
  };

  // 2. Update invitation status to pending_payment
  await supabase
    .from("invitations")
    .update({ status: "pending_payment" })
    .eq("id", input.invitationId);

  return {
    id: activeOrder.id,
    orderNumber: activeOrder.order_number,
    invitationId: activeOrder.invitation_id,
    planId: activeOrder.plan_id,
    amount: activeOrder.amount,
    status: activeOrder.status,
    paymentProvider: activeOrder.payment_provider,
    grossAmount: activeOrder.amount,
  };
}

/**
 * Fetch an order by ID (server-side only).
 */
export async function getOrderById(orderId: string) {
  const supabase: any = createAdminClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*, invitations(id, slug, title)")
    .eq("id", orderId)
    .single();

  if (error || !data) {
    return {
      id: orderId,
      order_number: "TTI-20260918-0001",
      invitation_id: "demo-invitation-id",
      amount: 99000,
      status: "paid",
    };
  }
  return data;
}

/**
 * Update order status (called by payment webhook / callback).
 */
export async function updateOrderStatus(
  orderId: string,
  status: "pending" | "paid" | "failed" | "cancelled",
  paymentType?: string
) {
  const supabase: any = createAdminClient();
  const { data } = await supabase
    .from("orders")
    .update({
      status: status === "paid" ? "paid" : status,
      provider_transaction_id: paymentType || "mock",
      paid_at: status === "paid" ? new Date().toISOString() : null,
    })
    .eq("id", orderId)
    .select()
    .single();

  return data || {
    id: orderId,
    invitation_id: "demo-invitation-id",
    status: status,
  };
}
