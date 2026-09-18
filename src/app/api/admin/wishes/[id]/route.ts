import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminKey, deleteWish } from "@/lib/services/admin-service";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session")?.value;

    if (!verifyAdminKey(session)) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const success = await deleteWish(id);

    return NextResponse.json({
      success,
      message: success ? "Ucapan berhasil dihapus" : "Gagal menghapus ucapan",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Gagal memproses permintaan" },
      { status: 500 }
    );
  }
}
