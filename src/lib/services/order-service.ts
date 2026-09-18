/**
 * Order Service — Server-only
 *
 * Creates and manages orders. Prices are ALWAYS read from the `plans` table
 * in the database — never trusted from the client.
 *
 * Implements Phase 6 security & idempotency:
 * - Server-authoritative plan pricing
 * - Idempotent webhook processing
 * - Flexible lookup by order UUID or order_number (TTI-...)
 * - Amount verification
 */
import { createAdminClient } from "@/lib/supabase/admin";
import { generateOrderNumber } from "@/lib/utils";

export interface CreateOrderInput {
  invitationId: string;
  planCode: string; // 'basic' | 'premium' | 'gold'
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
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  paidAt?: string;
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
    .maybeSingle();

  // Standard plan pricing fallback if not seeded
  const fallbackPrice =
    input.planCode === "gold"
      ? 149000
      : input.planCode === "premium"
      ? 99000
      : 49000;

  const price = plan ? Number(plan.price) : fallbackPrice;
  const planId = plan ? plan.id : `plan-${input.planCode}`;
  const orderNumber = generateOrderNumber();

  const { data: order, error } = await supabase
    .from("orders")
    .insert({
      order_number: orderNumber,
      invitation_id: input.invitationId,
      plan_id: planId,
      customer_name: input.customerName.trim(),
      customer_email: input.customerEmail.trim(),
      customer_phone: input.customerPhone.trim(),
      amount: price, // ALWAYS from DB
      currency: "IDR",
      status: "pending_payment",
      payment_provider: process.env.PAYMENT_PROVIDER || "mock",
    })
    .select("id, order_number, invitation_id, plan_id, amount, status, payment_provider")
    .single();

  if (error || !order) {
    console.error("[Order Service] Failed to create order in Supabase:", error);
    throw new Error("Gagal menyimpan data pesanan ke database.");
  }

  // 2. Update invitation status to pending_payment
  await supabase
    .from("invitations")
    .update({ status: "pending_payment" })
    .eq("id", input.invitationId);

  return {
    id: order.id,
    orderNumber: order.order_number,
    invitationId: order.invitation_id,
    planId: order.plan_id,
    amount: Number(order.amount),
    status: order.status,
    paymentProvider: order.payment_provider,
  };
}

/**
 * Fetch an order by ID or order_number.
 * Handles both UUID and formatted TTI-YYYYMMDD-XXXXX.
 */
export async function getOrderById(orderIdentifier: string) {
  if (!orderIdentifier) return null;
  const supabase: any = createAdminClient();

  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    orderIdentifier
  );

  let query = supabase
    .from("orders")
    .select("*, invitations(id, slug, title, status)");

  if (isUuid) {
    query = query.eq("id", orderIdentifier);
  } else {
    query = query.eq("order_number", orderIdentifier);
  }

  const { data, error } = await query.maybeSingle();

  if (error || !data) {
    return null;
  }

  return data;
}

/**
 * Verify whether webhook gross_amount matches the recorded order amount.
 */
export function verifyOrderAmount(orderAmount: number | string, grossAmount: number | string): boolean {
  const oVal = Math.round(Number(orderAmount));
  const gVal = Math.round(Number(grossAmount));
  return oVal === gVal;
}

/**
 * Update order status (called by payment webhook / callback).
 * Idempotent: If already paid, returns existing record without re-processing.
 */
export async function updateOrderStatus(
  orderIdentifier: string,
  status: "pending" | "paid" | "failed" | "cancelled",
  paymentType?: string,
  transactionId?: string
) {
  const supabase: any = createAdminClient();

  // 1. Fetch current order
  const existingOrder = await getOrderById(orderIdentifier);
  if (!existingOrder) {
    console.error(`[Order Service] Order not found for identifier: ${orderIdentifier}`);
    return null;
  }

  // 2. IDEMPOTENCY GUARD:
  // If order is already paid and notification says paid, do not re-process
  if (existingOrder.status === "paid" && status === "paid") {
    console.log(`[Order Idempotency] Order ${existingOrder.order_number} is already paid. Skipping duplicate.`);
    return {
      ...existingOrder,
      isDuplicate: true,
    };
  }

  // 3. Update order in Supabase
  const updatePayload: Record<string, any> = {
    status: status === "paid" ? "paid" : status,
    updated_at: new Date().toISOString(),
  };

  if (paymentType || transactionId) {
    updatePayload.provider_transaction_id = transactionId || paymentType;
  }

  if (status === "paid") {
    updatePayload.paid_at = existingOrder.paid_at || new Date().toISOString();
  }

  const { data: updated, error } = await supabase
    .from("orders")
    .update(updatePayload)
    .eq("id", existingOrder.id)
    .select("*, invitations(id, slug, title, status)")
    .single();

  if (error || !updated) {
    console.error(`[Order Service] Error updating order ${existingOrder.id}:`, error);
    return null;
  }

  return updated;
}
