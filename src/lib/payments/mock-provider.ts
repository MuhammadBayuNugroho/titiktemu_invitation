/**
 * Mock Payment Provider
 *
 * Simulates a successful payment flow without hitting any external API.
 * Active when PAYMENT_PROVIDER=mock (default in .env.local).
 *
 * Mock flow:
 * 1. createTransaction() → returns a mock token + redirect to /create/checkout/mock
 * 2. User clicks "Bayar (Mock)" on the mock page
 * 3. POST /api/payment/mock-callback → marks order paid → publishes invitation
 */
import type {
  IPaymentProvider,
  CreateTransactionInput,
  CreateTransactionResult,
  WebhookPayload,
  PaymentStatus,
} from "./types";

export class MockPaymentProvider implements IPaymentProvider {
  async createTransaction(
    input: CreateTransactionInput
  ): Promise<CreateTransactionResult> {
    // Generate a mock token that encodes the order info
    const mockToken = Buffer.from(
      JSON.stringify({
        orderId: input.orderId,
        orderNumber: input.orderNumber,
        amount: input.amount,
      })
    ).toString("base64url");

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const redirectUrl = `${baseUrl}/create/checkout/mock?token=${mockToken}`;

    return { token: mockToken, redirectUrl };
  }

  verifyWebhook(): boolean {
    // Mock provider always trusts its own callbacks
    // In production, the mock-callback route is protected server-side
    return true;
  }

  parseWebhookStatus(payload: WebhookPayload): PaymentStatus {
    const status = payload.transaction_status as string;
    if (["settlement", "capture"].includes(status)) return "settlement";
    if (status === "pending") return "pending";
    if (status === "cancel") return "cancel";
    if (status === "expire") return "expire";
    return "deny";
  }
}
