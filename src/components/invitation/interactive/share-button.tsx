"use client";

import { useState } from "react";
import { Share2, Copy, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateWhatsAppUrl, type ShareParams } from "@/lib/whatsapp";

interface ShareButtonProps {
  shareParams: ShareParams;
}

export function ShareButton({ shareParams }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(shareParams.invitationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Pernikahan ${shareParams.groomNickname} & ${shareParams.brideNickname}`,
          text: `Undangan Pernikahan ${shareParams.groomNickname} & ${shareParams.brideNickname}`,
          url: shareParams.invitationUrl,
        });
      } catch (err) {
        console.error("Native share cancelled or failed:", err);
      }
    } else {
      copyLink();
    }
  };

  const waUrl = generateWhatsAppUrl(shareParams);

  return (
    <div className="flex flex-wrap gap-2 items-center justify-center">
      <a href={waUrl} target="_blank" rel="noopener noreferrer">
        <Button
          size="sm"
          className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs flex items-center gap-1.5"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-current" />
          Kirim WA
        </Button>
      </a>

      <Button
        size="sm"
        variant="outline"
        onClick={copyLink}
        className="border-stone-700 bg-stone-900 text-stone-200 hover:bg-stone-800 rounded-xl text-xs flex items-center gap-1.5"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            Tersalin
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            Salin Link
          </>
        )}
      </Button>

      <Button
        size="sm"
        variant="ghost"
        onClick={handleNativeShare}
        className="text-stone-400 hover:text-stone-200 text-xs rounded-xl flex items-center gap-1.5"
      >
        <Share2 className="w-3.5 h-3.5" />
        Bagikan
      </Button>
    </div>
  );
}
