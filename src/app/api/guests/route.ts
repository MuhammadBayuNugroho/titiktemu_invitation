import { NextRequest, NextResponse } from "next/server";
import {
  getInvitationByCustomerToken,
  listGuestsWithRSVP,
  createGuest,
  createBulkGuests,
  deleteGuest,
} from "@/lib/services/guest-service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { error: "Token akses pelanggan wajib disertakan" },
        { status: 400 }
      );
    }

    const invitation = await getInvitationByCustomerToken(token);
    if (!invitation) {
      return NextResponse.json(
        { error: "Token akses tidak valid atau undangan tidak ditemukan" },
        { status: 401 }
      );
    }

    const guests = await listGuestsWithRSVP(invitation.id);

    // Calculate RSVP stats
    const stats = {
      totalGuests: guests.length,
      attending: guests.filter((g) => g.rsvp?.status === "attending").length,
      uncertain: guests.filter((g) => g.rsvp?.status === "uncertain").length,
      declined: guests.filter((g) => g.rsvp?.status === "declined").length,
      unconfirmed: guests.filter((g) => !g.rsvp).length,
      totalPax: guests.reduce((sum, g) => {
        return g.rsvp?.status === "attending" ? sum + (g.rsvp.paxCount || 1) : sum;
      }, 0),
    };

    return NextResponse.json({
      invitation,
      stats,
      guests,
    });
  } catch (error: any) {
    console.error("GET /api/guests error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, name, phone, category, bulkNames, bulkCategory } = body;

    if (!token) {
      return NextResponse.json(
        { error: "Token akses pelanggan wajib disertakan" },
        { status: 401 }
      );
    }

    const invitation = await getInvitationByCustomerToken(token);
    if (!invitation) {
      return NextResponse.json(
        { error: "Akses ditolak: Token pelanggan tidak valid" },
        { status: 401 }
      );
    }

    // Bulk creation mode
    if (bulkNames && Array.isArray(bulkNames) && bulkNames.length > 0) {
      const items = bulkNames
        .map((n: string) => n.trim())
        .filter((n: string) => n.length > 0)
        .map((cleanName: string) => ({
          name: cleanName,
          category: bulkCategory || "friend",
        }));

      const created = await createBulkGuests(invitation.id, items);
      return NextResponse.json({
        success: true,
        count: created.length,
        guests: created,
      });
    }

    // Single guest mode
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Nama tamu wajib diisi" },
        { status: 400 }
      );
    }

    const created = await createGuest({
      invitationId: invitation.id,
      name: name.trim(),
      phone: phone ? String(phone).trim() : undefined,
      category: category || "friend",
    });

    if (!created) {
      return NextResponse.json(
        { error: "Gagal menyimpan data tamu ke database" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      guest: created,
    });
  } catch (error: any) {
    console.error("POST /api/guests error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, guestId } = body;

    if (!token || !guestId) {
      return NextResponse.json(
        { error: "Token pelanggan dan guestId wajib disertakan" },
        { status: 400 }
      );
    }

    const invitation = await getInvitationByCustomerToken(token);
    if (!invitation) {
      return NextResponse.json(
        { error: "Akses ditolak: Token pelanggan tidak valid" },
        { status: 401 }
      );
    }

    const ok = await deleteGuest(guestId, invitation.id);
    if (!ok) {
      return NextResponse.json(
        { error: "Gagal menghapus data tamu" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE /api/guests error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
