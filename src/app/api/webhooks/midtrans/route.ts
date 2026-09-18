/**
 * POST /api/webhooks/midtrans
 *
 * Official Midtrans Webhook URL as specified in Section 31 of Titik Temu Invitation specifications.
 * Reuses the secure handlePaymentWebhook logic (DRY principle).
 */
import { NextRequest } from "next/server";
import { handlePaymentWebhook } from "@/lib/payments/webhook-handler";

export async function POST(req: NextRequest) {
  return handlePaymentWebhook(req);
}
