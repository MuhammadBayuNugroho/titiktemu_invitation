/**
 * Payment Provider Interface
 *
 * All payment providers must implement this interface.
 * This enables clean switching between Midtrans and MockProvider
 * via the PAYMENT_PROVIDER env variable without touching business logic.
 */

export type PaymentStatus =
  | "settlement"
  | "capture"
  | "pending"
  | "cancel"
  | "expire"
  | "deny"
  | "refund";

export interface CreateTransactionInput {
  orderId: string;
  orderNumber: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  itemName: string;
  callbackUrl: string;
}

export interface CreateTransactionResult {
  token: string;         // Snap token (Midtrans) or mock token
  redirectUrl: string;   // Snap redirect URL or mock checkout URL
}

export interface WebhookPayload {
  order_id: string;
  transaction_id: string;
  transaction_status: string;
  gross_amount: string;
  signature_key?: string;
  payment_type?: string;
  [key: string]: unknown;
}

export interface IPaymentProvider {
  /**
   * Create a payment transaction and return a token/redirect URL.
   */
  createTransaction(
    input: CreateTransactionInput
  ): Promise<CreateTransactionResult>;

  /**
   * Verify that a webhook payload came from the payment provider.
   * Must return false for invalid signatures — never skip this!
   */
  verifyWebhook(payload: WebhookPayload): boolean;

  /**
   * Parse the webhook payload and return a normalized status.
   */
  parseWebhookStatus(payload: WebhookPayload): PaymentStatus;
}
