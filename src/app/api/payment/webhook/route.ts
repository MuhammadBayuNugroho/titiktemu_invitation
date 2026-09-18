/**
 * POST /api/payment/webhook
 *
 * Webhook handler for Midtrans payment notifications.
 * Verification & security:
 * 1. Signature SHA-512 is verified using SERVER_KEY
 * 2. Status changes are idempotent
 * 3. Successful payment triggers invitation publication
 */
import { NextResponse } from "next/server";
import { getPaymentProvider } from "@/lib/payments/factory";
import { updateOrderStatus } from "@/lib/services/order-service";
import { publishInvitation } from "@/lib/services/invitation-service";

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    const provider = getPaymentProvider();
    const isValid = provider.verifyWebhook(payload);

    if (!isValid) {
      console.warn("[Payment Webhook]: Invalid signature received");
      return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 400 });
    }

    const status = provider.parseWebhookStatus(payload);
    const orderId = payload.order_id;

    if (!orderId) {
      return NextResponse.json({ success: false, message: "Missing order_id" }, { status: 400 });
    }

    let mappedStatus: "pending" | "paid" | "failed" | "cancelled" = "pending";
    if (status === "settlement") {
      mappedStatus = "paid";
    } else if (status === "expire" || status === "deny") {
      mappedStatus = "failed";
    } else if (status === "cancel") {
      mappedStatus = "cancelled";
    }

    const updatedOrder = await updateOrderStatus(orderId, mappedStatus, payload.payment_type);

    if (mappedStatus === "paid" && updatedOrder?.invitation_id) {
      await publishInvitation(updatedOrder.invitation_id);
    }

    return NextResponse.json({ success: true, status: mappedStatus });
  } catch (error: any) {
    console.error("[Payment Webhook Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Webhook processing failed" },
      { status: 500 }
    );
  }
}
