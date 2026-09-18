/**
 * POST /api/invitations
 *
 * Saves the wizard state as a draft invitation to Supabase.
 * Returns the invitation ID, slug, and customer access token.
 *
 * Request body: { state: WizardState } or WizardState directly
 * Response: { success: true, invitationId, slug, customerAccessToken }
 */
import { NextRequest, NextResponse } from "next/server";
import { saveDraftInvitation } from "@/lib/services/invitation-service";
import type { WizardState } from "@/app/create/_context/wizard-context";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const state: WizardState = body.state || body;
    const existingId: string | undefined = body.existingId;

    if (!state || (!state.couple && !state.title)) {
      return NextResponse.json(
        { success: false, error: "Data undangan diperlukan." },
        { status: 400 }
      );
    }

    const result = await saveDraftInvitation(state, existingId);

    return NextResponse.json(
      {
        success: true,
        ...result,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/invitations]", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan server.",
      },
      { status: 500 }
    );
  }
}
