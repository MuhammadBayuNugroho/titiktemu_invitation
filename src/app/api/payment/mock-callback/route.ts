/**
 * POST /api/payment/mock-callback
 *
 * Mock payment settlement endpoint for development and testing.
 * Automatically marks order as paid and publishes the corresponding invitation.
 */
import { NextResponse } from "next/server";
import { updateOrderStatus } from "@/lib/services/order-service";
import { publishInvitation } from "@/lib/services/invitation-service";

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json({ success: false, error: "Order ID is required" }, { status: 400 });
    }

    const updatedOrder = await updateOrderStatus(orderId, "paid", "mock_qris");
    let invitation = null;

    if (updatedOrder?.invitation_id) {
      invitation = await publishInvitation(updatedOrder.invitation_id);
    }

    return NextResponse.json({
      success: true,
      message: "Mock payment completed successfully",
      order: updatedOrder,
      slug: invitation?.slug || "sample-wedding",
    });
  } catch (error: any) {
    console.error("[Mock Callback Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Mock payment callback failed" },
      { status: 500 }
    );
  }
}
