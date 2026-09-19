"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [passkey, setPasskey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passkey.trim()) return;

    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passkey: passkey.trim() }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setErrorMsg(data.message || "Passkey admin tidak sesuai.");
      }
    } catch (err: any) {
      setErrorMsg("Terjadi kegagalan jaringan atau server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,144,108,0.12) 0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at 80% 100%, rgba(201,168,76,0.08) 0%, transparent 50%),
          #F8F7F4
        `,
        color: "#1A1A2E",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs"
            style={{
              background: "rgba(255,255,255,0.85)",
              border: "1px solid rgba(201,144,108,0.25)",
              color: "#C9906C",
            }}
          >
            <ShieldCheck className="w-3.5 h-3.5" style={{ color: "#C9906C" }} />
            <span>Platform Operations &amp; Security</span>
          </div>
          <h1
            className="text-3xl font-light tracking-tight"
            style={{ fontFamily: "'DM Serif Display', serif", color: "#1A1A2E" }}
          >
            Admin Console
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280] max-w-xs mx-auto leading-relaxed">
            Masukkan Passkey otorisasi untuk mengelola pesanan, publikasi, dan analisis platform.
          </p>
        </div>

        {/* Login Card */}
        <div
          className="p-7 sm:p-8 space-y-6 rounded-3xl bg-white shadow-sm"
          style={{ border: "1px solid rgba(201,144,108,0.18)" }}
        >
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#1A1A2E] flex items-center justify-between">
                <span>Secret Passkey</span>
                <span className="text-[11px] text-[#9CA3AF] font-mono">ADMIN_SECRET_KEY</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="••••••••••••••••"
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                  className="w-full bg-[#FAFAFA] border rounded-xl pl-10 pr-4 py-3 text-sm text-[#1A1A2E] placeholder-zinc-400 focus:outline-none focus:bg-white transition-all"
                  style={{ borderColor: "rgba(26,26,46,0.12)" }}
                  autoFocus
                  required
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !passkey.trim()}
              className="btn-primary w-full py-3.5 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50"
              style={{ borderRadius: 14 }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <>
                  <span>Masuk Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t text-center" style={{ borderColor: "rgba(26,26,46,0.06)" }}>
            <p className="text-[11px] text-[#9CA3AF]">
              Titik Temu Invitation · Sistem Manajemen Operasional Mandiri
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
