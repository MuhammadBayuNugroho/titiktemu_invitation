/**
 * Shared Webhook Handler for Payment Notifications
 *
 * Implements Section 31, 32, & 33 of Titik Temu Invitation specifications.
 * Verification & security:
 * 1. Signature SHA-512 is verified using SERVER_KEY
 * 2. Gross amount is verified against database order record
 * 3. Status changes are idempotent
 * 4. Successful payment automatically publishes the invitation
 */
import { NextRequest, NextResponse } from "next/server";
import { getPaymentProvider } from "@/lib/payments/factory";
import {
  getOrderById,
  updateOrderStatus,
  verifyOrderAmount,
} from "@/lib/services/order-service";
import { publishInvitation } from "@/lib/services/invitation-service";
import type { WebhookPayload } from "@/lib/payments/types";

export async function handlePaymentWebhook(req: Request | NextRequest) {
  try {
    const payload: WebhookPayload = await req.json();

    const orderId = payload.order_id;
    if (!orderId) {
      return NextResponse.json(
        { success: false, message: "Missing order_id" },
        { status: 400 }
      );
    }

    // 1. Fetch order from DB first to get expected amount and status
    const existingOrder = await getOrderById(orderId);
    if (!existingOrder) {
      console.warn(`[Payment Webhook] Order not found for identifier: ${orderId}`);
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    // 2. IDEMPOTENCY CHECK: If already paid, return 200 OK immediately
    if (existingOrder.status === "paid") {
      console.log(`[Payment Webhook Idempotency] Order ${orderId} is already paid. Returning 200.`);
      return NextResponse.json({
        success: true,
        message: "Order already confirmed and paid",
        orderId: existingOrder.id,
        orderNumber: existingOrder.order_number,
      });
    }

    // 3. Verify signature using payment provider
    const provider = getPaymentProvider();
    const isValidSignature = provider.verifyWebhook(payload);

    if (!isValidSignature) {
      console.warn(`[Payment Webhook] Invalid signature key received for order: ${orderId}`);
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 400 }
      );
    }

    // 4. Verify transaction gross_amount against database order amount
    if (!verifyOrderAmount(existingOrder.amount, payload.gross_amount)) {
      console.warn(
        `[Payment Webhook] Tampered amount detected for ${orderId}: expected ${existingOrder.amount}, received ${payload.gross_amount}`
      );
      return NextResponse.json(
        { success: false, message: "Tampered gross amount" },
        { status: 400 }
      );
    }

    // 5. Parse normalized status from payment provider
    const normalizedStatus = provider.parseWebhookStatus(payload);

    let mappedStatus: "pending" | "paid" | "failed" | "cancelled" = "pending";
    if (normalizedStatus === "settlement") {
      mappedStatus = "paid";
    } else if (normalizedStatus === "expire" || normalizedStatus === "deny") {
      mappedStatus = "failed";
    } else if (normalizedStatus === "cancel") {
      mappedStatus = "cancelled";
    }

    // 6. Update order status in Supabase
    const updatedOrder = await updateOrderStatus(
      orderId,
      mappedStatus,
      payload.payment_type,
      payload.transaction_id
    );

    // 7. Auto-Publish Invitation if payment is settled
    if (mappedStatus === "paid" && updatedOrder?.invitation_id) {
      console.log(`[Payment Webhook] Auto-publishing invitation: ${updatedOrder.invitation_id}`);
      await publishInvitation(updatedOrder.invitation_id);
    }

    return NextResponse.json({
      success: true,
      status: mappedStatus,
      orderNumber: existingOrder.order_number,
    });
  } catch (error: any) {
    console.error("[Payment Webhook Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Webhook processing failed" },
      { status: 500 }
    );
  }
}
