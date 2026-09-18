/**
 * Midtrans Payment Provider
 *
 * Integrates with Midtrans Snap API for real payment processing.
 * Active when PAYMENT_PROVIDER=midtrans.
 *
 * SECURITY:
 * - MIDTRANS_SERVER_KEY must NEVER be exposed to the browser.
 * - Webhook signature is verified via SHA-512 before any state change.
 */
import { createHash } from "crypto";
import type {
  IPaymentProvider,
  CreateTransactionInput,
  CreateTransactionResult,
  WebhookPayload,
  PaymentStatus,
} from "./types";

const MIDTRANS_SNAP_URL_PRODUCTION =
  "https://app.midtrans.com/snap/v1/transactions";
const MIDTRANS_SNAP_URL_SANDBOX =
  "https://app.sandbox.midtrans.com/snap/v1/transactions";

export class MidtransPaymentProvider implements IPaymentProvider {
  private serverKey: string;
  private isProduction: boolean;

  constructor() {
    this.serverKey = process.env.MIDTRANS_SERVER_KEY ?? "";
    this.isProduction = process.env.MIDTRANS_IS_PRODUCTION === "true";
  }

  async createTransaction(
    input: CreateTransactionInput
  ): Promise<CreateTransactionResult> {
    const snapUrl = this.isProduction
      ? MIDTRANS_SNAP_URL_PRODUCTION
      : MIDTRANS_SNAP_URL_SANDBOX;

    const authHeader = Buffer.from(`${this.serverKey}:`).toString("base64");

    const body = {
      transaction_details: {
        order_id: input.orderNumber,
        gross_amount: input.amount,
      },
      customer_details: {
        first_name: input.customerName,
        email: input.customerEmail,
        phone: input.customerPhone,
      },
      item_details: [
        {
          id: input.orderId,
          price: input.amount,
          quantity: 1,
          name: input.itemName,
        },
      ],
      callbacks: {
        finish: input.callbackUrl,
        error: input.callbackUrl,
        pending: input.callbackUrl,
      },
    };

    const response = await fetch(snapUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authHeader}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Midtrans error: ${response.status} — ${err}`);
    }

    const data = (await response.json()) as { token: string; redirect_url: string };
    return { token: data.token, redirectUrl: data.redirect_url };
  }

  /**
   * Verify Midtrans webhook signature.
   * SHA-512(orderId + statusCode + grossAmount + serverKey)
   */
  verifyWebhook(payload: WebhookPayload): boolean {
    if (!payload.signature_key) return false;

    const raw = `${payload.order_id}${payload.status_code}${payload.gross_amount}${this.serverKey}`;
    const expected = createHash("sha512").update(raw).digest("hex");

    return payload.signature_key === expected;
  }

  parseWebhookStatus(payload: WebhookPayload): PaymentStatus {
    const status = payload.transaction_status as string;
    if (status === "capture") {
      if (payload.fraud_status === "challenge") return "pending";
      return "settlement";
    }
    if (status === "settlement") return "settlement";
    if (status === "pending") return "pending";
    if (status === "cancel") return "cancel";
    if (status === "expire") return "expire";
    if (status === "refund") return "refund";
    return "deny";
  }
}
