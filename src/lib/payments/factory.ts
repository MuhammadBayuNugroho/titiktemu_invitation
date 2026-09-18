/**
 * Payment Provider Factory
 *
 * Returns the correct IPaymentProvider instance based on PAYMENT_PROVIDER env.
 * Import this in API routes — never in client components.
 */
import type { IPaymentProvider } from "./types";
import { MockPaymentProvider } from "./mock-provider";
import { MidtransPaymentProvider } from "./midtrans-provider";

let cachedProvider: IPaymentProvider | null = null;

export function getPaymentProvider(): IPaymentProvider {
  if (cachedProvider) return cachedProvider;

  const providerName = process.env.PAYMENT_PROVIDER ?? "mock";

  switch (providerName) {
    case "midtrans":
      cachedProvider = new MidtransPaymentProvider();
      break;
    case "mock":
    default:
      cachedProvider = new MockPaymentProvider();
      break;
  }

  return cachedProvider;
}
