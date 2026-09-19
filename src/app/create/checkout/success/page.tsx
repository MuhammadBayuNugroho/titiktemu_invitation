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
    <div className="max-w-xl w-full rounded-3xl p-8 sm:p-10 text-center space-y-8 shadow-xs border border-[rgba(201,144,108,0.18)] bg-white selection:bg-[#C9906C]/20 selection:text-[#1A1A2E]">
      <div className="mx-auto w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
        <CheckCircle2 className="w-10 h-10 stroke-[2]" />
      </div>

      <div className="space-y-3">
        <span className="px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border text-[#C9906C] bg-[rgba(201,144,108,0.08)] border-[rgba(201,144,108,0.25)] inline-block">
          Pembayaran Berhasil · Nomor Pesanan {orderNumber}
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl text-[#1A1A2E] font-normal tracking-tight pt-1">
          Undangan Anda Resmi Diterbitkan!
        </h1>
        <p className="text-[#71717A] text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
          Undangan pernikahan digital Anda telah aktif di server dan siap disebarkan kepada seluruh keluarga dan sahabat tercinta.
        </p>
      </div>

      {/* Link Box */}
      <div className="bg-[#F8F7F4] border border-[rgba(201,144,108,0.18)] rounded-2xl p-4 sm:p-5 space-y-3 text-left">
        <div className="text-xs text-[#71717A] flex justify-between items-center font-medium">
          <span>Link Tautan Undangan Anda:</span>
          {copied && <span className="text-emerald-600 font-semibold">Tersalin ke Clipboard!</span>}
        </div>
        <div className="flex items-center gap-2 bg-white border border-[rgba(201,144,108,0.25)] rounded-xl p-2.5 shadow-xs">
          <input
            type="text"
            readOnly
            value={invitationUrl}
            className="bg-transparent text-[#1A1A2E] text-xs sm:text-sm font-mono w-full focus:outline-none"
          />
          <button
            onClick={copyToClipboard}
            className="p-1.5 rounded-lg text-[#71717A] hover:text-[#C9906C] hover:bg-[#F8F7F4] transition shrink-0"
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
            <button className="btn-primary w-full py-3.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all">
              <Users className="w-4 h-4" />
              <span>Kelola Tamu & WhatsApp Massal</span>
            </button>
          </Link>
        )}

        <Link href={`/i/${slug}`} target="_blank" className="block w-full">
          <button
            className="btn-secondary w-full py-3.5 px-4 rounded-xl text-sm font-medium flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <ExternalLink className="w-4 h-4 text-[#71717A]" />
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
            className="w-full border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 py-3.5 px-4 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Share2 className="w-4 h-4 text-emerald-600" />
            <span>Bagikan Link Undangan ke WhatsApp</span>
          </button>
        </a>
      </div>

      <div className="pt-4 border-t border-[rgba(201,144,108,0.15)] text-xs text-[#A1A1AA] flex items-center justify-center gap-2">
        <Heart className="w-3.5 h-3.5 text-[#C9906C] fill-[#C9906C]" />
        <span>Terima kasih telah mempercayai Titik Temu Invitation</span>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#1A1A2E] py-16 px-4 sm:px-6 lg:px-8 font-sans antialiased flex items-center justify-center">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-[#C9906C]/10 via-[#C9A84C]/5 to-transparent blur-3xl" />
      </div>

      <Suspense
        fallback={
          <div className="flex items-center gap-2 text-[#71717A] text-sm">
            <Loader2 className="w-5 h-5 animate-spin text-[#C9906C]" />
            <span>Memuat halaman konfirmasi...</span>
          </div>
        }
      >
        <CheckoutSuccessContent />
      </Suspense>
    </div>
  );
}
