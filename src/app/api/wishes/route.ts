/**
 * GET /api/wishes?invitationId=xyz
 * POST /api/wishes
 *
 * Handles fetching and submitting guest wishes (guestbook).
 * XSS prevention: messages are sanitized and returned as plain text.
 */
import { NextResponse } from "next/server";
import { submitWish, getWishes } from "@/lib/services/rsvp-service";
import { z } from "zod";

const wishSchema = z.object({
  invitationId: z.string().min(1, "Invitation ID is required"),
  senderName: z.string().min(2, "Name must be at least 2 characters"),
  message: z.string().min(3, "Message must be at least 3 characters").max(1000, "Message too long"),
  relationship: z.string().max(50).optional(),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const invitationId = searchParams.get("invitationId");

    if (!invitationId) {
      return NextResponse.json({ success: false, error: "invitationId query param required" }, { status: 400 });
    }

    const wishes = await getWishes(invitationId);
    return NextResponse.json({ success: true, wishes });
  } catch (error: any) {
    console.error("[Wishes GET Error]:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = wishSchema.parse(body);

    const wish = await submitWish({
      invitationId: validated.invitationId,
      senderName: validated.senderName,
      message: validated.message,
      relationship: validated.relationship,
    });

    return NextResponse.json({
      success: true,
      message: "Wish sent successfully",
      wish,
    });
  } catch (error: any) {
    console.error("[Wishes POST Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to send wish" },
      { status: error.name === "ZodError" ? 400 : 500 }
    );
  }
}
