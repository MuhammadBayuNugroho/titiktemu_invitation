/**
 * POST /api/rsvp
 *
 * Handles guest RSVP submissions with Zod validation.
 */
import { NextResponse } from "next/server";
import { submitRSVP } from "@/lib/services/rsvp-service";
import { z } from "zod";

const rsvpSchema = z.object({
  invitationId: z.string().min(1, "Invitation ID is required"),
  guestName: z.string().min(2, "Name must be at least 2 characters"),
  attendanceStatus: z.enum(["attending", "declined", "uncertain"]),
  paxCount: z.number().int().min(1).max(10).default(1),
  notes: z.string().max(500).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = rsvpSchema.parse(body);

    const rsvp = await submitRSVP({
      invitationId: validated.invitationId,
      guestName: validated.guestName,
      attendanceStatus: validated.attendanceStatus,
      paxCount: validated.paxCount,
      notes: validated.notes,
    });

    return NextResponse.json({
      success: true,
      message: "RSVP submitted successfully",
      rsvp,
    });
  } catch (error: any) {
    console.error("[RSVP API Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit RSVP" },
      { status: error.name === "ZodError" ? 400 : 500 }
    );
  }
}
