"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ExternalLink, Copy, Share2, Heart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug") || "sample-wedding";
  const orderNumber = searchParams.get("order") || "TTI-20260918-0001";
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
    <div className="max-w-xl w-full bg-stone-900/80 border border-stone-800 rounded-3xl p-8 text-center space-y-8 shadow-2xl">
      <div className="mx-auto w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
        <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
      </div>

      <div className="space-y-2">
        <span className="px-3 py-1 rounded-full bg-amber-950/60 border border-amber-800/40 text-amber-300 text-xs uppercase tracking-wider font-medium">
          Pembayaran Berhasil · Nomor Pesanan {orderNumber}
        </span>
        <h1 className="text-3xl font-serif text-amber-100 font-light pt-2">
          Undangan Anda Resmi Diterbitkan!
        </h1>
        <p className="text-stone-400 text-sm">
          Undangan pernikahan digital Anda telah aktif dan dapat langsung diakses oleh tamu undangan.
        </p>
      </div>

      {/* Link Box */}
      <div className="bg-stone-950 border border-stone-800 rounded-2xl p-4 space-y-3">
        <div className="text-xs text-stone-400 text-left flex justify-between items-center">
          <span>Link Tautan Undangan Anda:</span>
          {copied && <span className="text-emerald-400 font-medium">Tersalin ke Clipboard!</span>}
        </div>
        <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 rounded-xl p-2.5">
          <input
            type="text"
            readOnly
            value={invitationUrl}
            className="bg-transparent text-amber-200 text-xs sm:text-sm font-mono w-full focus:outline-none"
          />
          <Button
            onClick={copyToClipboard}
            size="sm"
            variant="ghost"
            className="text-stone-300 hover:text-amber-300 hover:bg-stone-800 shrink-0"
          >
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-2">
        <Link href={`/i/${slug}`} target="_blank" className="block w-full">
          <Button className="w-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold py-6 rounded-xl text-sm flex items-center justify-center gap-2">
            <ExternalLink className="w-4 h-4" />
            Buka & Lihat Undangan Saya
          </Button>
        </Link>

        <a
          href={`https://wa.me/?text=${whatsappShareText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
        >
          <Button
            variant="outline"
            className="w-full border-emerald-700/60 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-900/40 hover:text-emerald-200 py-6 rounded-xl text-sm flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4 text-emerald-400" />
            Bagikan via WhatsApp
          </Button>
        </a>
      </div>

      <div className="pt-4 border-t border-stone-800 text-xs text-stone-400 flex items-center justify-center gap-2">
        <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
        <span>Terima kasih telah mempercayai Titik Temu Invitation</span>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 py-16 px-4 sm:px-6 lg:px-8 font-sans antialiased flex items-center justify-center">
      <Suspense
        fallback={
          <div className="flex items-center gap-2 text-stone-400 text-sm">
            <Loader2 className="w-5 h-5 animate-spin text-amber-400" />
            <span>Memuat halaman konfirmasi...</span>
          </div>
        }
      >
        <CheckoutSuccessContent />
      </Suspense>
    </div>
  );
}
