"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ExternalLink, Copy, Share2, Heart, Loader2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug") || "sample-wedding";
  const orderNumber = searchParams.get("order") || "TTI-20260918-0001";
  const token = searchParams.get("token");
  const [copied, setCopied] = useState(false);

  const invitationUrl = typeof window !== "undefined"
    ? `${window.location.origin}/i/${slug}`
    : `https://titiktemu.id/i/${slug}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(invitationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappShareText = encodeURIComponent(
    `Bismillah, tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:\n\n${invitationUrl}\n\nMerupakan suatu kehormatan & kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir. Terima kasih.`
  );

  return (
    <div className="max-w-xl w-full apple-card rounded-3xl p-8 sm:p-10 text-center space-y-8 shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-black/[0.06] bg-white selection:bg-amber-500/20 selection:text-amber-900">
      <div className="mx-auto w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
        <CheckCircle2 className="w-10 h-10 stroke-[2]" />
      </div>

      <div className="space-y-2">
        <span className="px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs uppercase tracking-wider font-semibold">
          Pembayaran Berhasil · Nomor Pesanan {orderNumber}
        </span>
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] tracking-tight pt-2">
          Undangan Anda Resmi Diterbitkan!
        </h1>
        <p className="text-[#6E6E73] text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
          Undangan pernikahan digital Anda telah aktif di server dan siap disebarkan kepada seluruh keluarga dan sahabat tercinta.
        </p>
      </div>

      {/* Link Box */}
      <div className="bg-[#FBFBFD] border border-black/[0.06] rounded-2xl p-4 sm:p-5 space-y-3 text-left">
        <div className="text-xs text-[#6E6E73] flex justify-between items-center font-medium">
          <span>Link Tautan Undangan Anda:</span>
          {copied && <span className="text-emerald-600 font-semibold">Tersalin ke Clipboard!</span>}
        </div>
        <div className="flex items-center gap-2 bg-white border border-black/[0.08] rounded-xl p-2.5 shadow-sm">
          <input
            type="text"
            readOnly
            value={invitationUrl}
            className="bg-transparent text-[#1D1D1F] text-xs sm:text-sm font-mono w-full focus:outline-none"
          />
          <button
            onClick={copyToClipboard}
            className="p-1.5 rounded-lg text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-zinc-100 transition shrink-0"
            title="Salin Link"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-2">
        {token && (
          <Link href={`/manage/${token}`} className="block w-full">
            <button className="apple-button-primary w-full py-3.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
              <Users className="w-4 h-4" />
              <span>Kelola Tamu & WhatsApp Massal</span>
            </button>
          </Link>
        )}

        <Link href={`/i/${slug}`} target="_blank" className="block w-full">
          <button
            className="apple-button-secondary w-full py-3.5 px-4 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4 text-[#6E6E73]" />
            <span>Buka & Lihat Undangan Saya</span>
          </button>
        </Link>

        <a
          href={`https://wa.me/?text=${whatsappShareText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
        >
          <button
            className="w-full border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 py-3.5 px-4 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <Share2 className="w-4 h-4 text-emerald-600" />
            <span>Bagikan Link Undangan ke WhatsApp</span>
          </button>
        </a>
      </div>

      <div className="pt-4 border-t border-black/[0.06] text-xs text-[#86868B] flex items-center justify-center gap-2">
        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
        <span>Terima kasih telah mempercayai Titik Temu Invitation</span>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] py-16 px-4 sm:px-6 lg:px-8 font-sans antialiased flex items-center justify-center">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-amber-100/30 via-emerald-50/20 to-transparent blur-3xl" />
      </div>

      <Suspense
        fallback={
          <div className="flex items-center gap-2 text-[#6E6E73] text-sm">
            <Loader2 className="w-5 h-5 animate-spin text-amber-600" />
            <span>Memuat halaman konfirmasi...</span>
          </div>
        }
      >
        <CheckoutSuccessContent />
      </Suspense>
    </div>
  );
}
