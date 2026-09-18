import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminKey } from "@/lib/services/admin-service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { passkey } = body;

    if (!passkey || !verifyAdminKey(passkey)) {
      return NextResponse.json(
        { success: false, message: "Passkey admin tidak valid" },
        { status: 401 }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set("admin_session", passkey, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return NextResponse.json({
      success: true,
      message: "Autentikasi admin berhasil",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Gagal memproses login" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");

  return NextResponse.json({
    success: true,
    message: "Logout admin berhasil",
  });
}

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  const isAuthenticated = verifyAdminKey(session);

  return NextResponse.json({
    authenticated: isAuthenticated,
  });
}
