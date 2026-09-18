/**
 * POST /api/orders
 *
 * Creates a new order for an invitation package.
 * Price is ALWAYS read from the database server-side — never trusted from client.
 */
import { NextResponse } from "next/server";
import { createOrder } from "@/lib/services/order-service";
import { getPaymentProvider } from "@/lib/payments/factory";
import { z } from "zod";

const createOrderSchema = z.object({
  invitationId: z.string().min(1, "Invitation ID is required"),
  planCode: z.enum(["basic", "premium", "gold"]),
  customerName: z.string().min(2, "Name is required"),
  customerEmail: z.string().email("Invalid email address"),
  customerPhone: z.string().min(8, "Valid phone number is required"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = createOrderSchema.parse(body);

    const order = await createOrder({
      invitationId: validatedData.invitationId,
      planCode: validatedData.planCode,
      customerName: validatedData.customerName,
      customerEmail: validatedData.customerEmail,
      customerPhone: validatedData.customerPhone,
    });

    const paymentProvider = getPaymentProvider();
    const paymentResult = await paymentProvider.createTransaction({
      orderId: order.id,
      orderNumber: order.orderNumber,
      amount: order.amount,
      customerName: validatedData.customerName,
      customerEmail: validatedData.customerEmail,
      customerPhone: validatedData.customerPhone,
      itemName: `Paket Undangan ${validatedData.planCode.toUpperCase()}`,
      callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/create/checkout/success`,
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      grossAmount: order.amount,
      token: paymentResult.token,
      redirectUrl: paymentResult.redirectUrl,
    });
  } catch (error: any) {
    console.error("[Orders API Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create order" },
      { status: error.name === "ZodError" ? 400 : 500 }
    );
  }
}
