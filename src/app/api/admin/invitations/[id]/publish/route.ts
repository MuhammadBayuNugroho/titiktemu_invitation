import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  verifyAdminKey,
  toggleInvitationPublish,
} from "@/lib/services/admin-service";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session")?.value;

    if (!verifyAdminKey(session)) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak. Sesi admin tidak sah." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await req.json();
    const { publish } = body;

    if (typeof publish !== "boolean") {
      return NextResponse.json(
        { success: false, message: "Field 'publish' boolean diperlukan" },
        { status: 400 }
      );
    }

    const result = await toggleInvitationPublish(id, publish);

    return NextResponse.json({
      success: true,
      message: `Undangan berhasil ${publish ? "dipublikasikan" : "ditarik dari publikasi"}`,
      status: result.status,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Gagal memperbarui status publikasi" },
      { status: 500 }
    );
  }
}
