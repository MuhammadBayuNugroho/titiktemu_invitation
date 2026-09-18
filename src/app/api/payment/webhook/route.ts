import { NextRequest } from "next/server";
import { handlePaymentWebhook } from "@/lib/payments/webhook-handler";

export async function POST(req: NextRequest) {
  return handlePaymentWebhook(req);
}
