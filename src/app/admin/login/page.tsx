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
    <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] flex flex-col justify-center items-center px-4 sm:px-6 relative overflow-hidden selection:bg-amber-500/20 selection:text-amber-900">
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/[0.08] text-xs font-semibold text-amber-800 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>Platform Operations & Security</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1D1D1F]">
            Admin Console
          </h1>
          <p className="text-xs sm:text-sm text-[#6E6E73] max-w-xs mx-auto">
            Masukkan Passkey otorisasi untuk mengelola pesanan, publikasi, dan analisis platform.
          </p>
        </div>

        {/* Login Card */}
        <div className="apple-card p-6 sm:p-8 space-y-6 rounded-3xl border border-black/[0.06] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#1D1D1F] flex items-center justify-between">
                <span>Secret Passkey</span>
                <span className="text-[11px] text-[#86868B] font-mono">ADMIN_SECRET_KEY</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#86868B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="••••••••••••••••"
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                  className="w-full bg-white border border-black/[0.12] rounded-xl pl-10 pr-4 py-3 text-sm text-[#1D1D1F] placeholder-zinc-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
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
              className="apple-button-primary w-full h-11 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-[0_4px_16px_rgba(0,0,0,0.1)] disabled:opacity-50"
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

          <div className="pt-4 border-t border-black/[0.06] text-center">
            <p className="text-[11px] text-[#86868B]">
              Titik Temu Invitation · Sistem Manajemen Operasional Mandiri
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
