"use client";

import React, { useState } from "react";
import { CreditCard, Check, Copy, Gift } from "lucide-react";
import type { GiftItem, TemplateConfig } from "@/types/invitation";

interface WeddingGiftSectionProps {
  gifts: GiftItem[];
  config: TemplateConfig;
}

export function WeddingGiftSection({ gifts, config }: WeddingGiftSectionProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!gifts || gifts.length === 0) return null;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <section className="py-12 px-6">
      <div className="mx-auto max-w-xl space-y-8 text-center">
        <div>
          <span
            className="text-xs uppercase tracking-[0.25em] font-medium"
            style={{ color: config.colors.secondary }}
          >
            Tanda Kasih
          </span>
          <h2
            className={`mt-2 text-2xl sm:text-3xl font-bold ${
              config.typography.heading === "serif" ? "font-serif italic" : "font-sans"
            }`}
            style={{ color: config.colors.primary }}
          >
            Wedding Gift
          </h2>
          <p className="mt-2 text-xs md:text-sm opacity-80 max-w-md mx-auto leading-relaxed">
            Doa restu Anda merupakan karunia terindah bagi kami. Namun jika ingin memberikan tanda kasih secara digital, Anda dapat mengirimkan melalui:
          </p>
        </div>

        <div className="space-y-4">
          {gifts.map((gift, index) => (
            <div
              key={index}
              className="rounded-2xl p-6 border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-left"
              style={{
                backgroundColor: config.colors.accent,
                borderColor: `${config.colors.secondary}40`,
              }}
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: config.colors.primary,
                    color: "#ffffff",
                  }}
                >
                  {gift.giftType === "bank" ? (
                    <CreditCard className="h-6 w-6" />
                  ) : (
                    <Gift className="h-6 w-6" />
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-semibold" style={{ color: config.colors.primary }}>
                    {gift.providerName}
                  </h4>
                  <p className="text-base font-bold tracking-wider" style={{ color: config.colors.foreground }}>
                    {gift.accountNumber}
                  </p>
                  <p className="text-xs opacity-75">a.n. {gift.accountName}</p>
                </div>
              </div>

              <button
                onClick={() => copyToClipboard(gift.accountNumber, index)}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-1.5 rounded-xl border px-4 py-2 text-xs font-semibold shadow-sm transition active:scale-95 cursor-pointer"
                style={{
                  backgroundColor: copiedIndex === index ? config.colors.primary : config.colors.background,
                  color: copiedIndex === index ? "#ffffff" : config.colors.primary,
                  borderColor: config.colors.primary,
                }}
              >
                {copiedIndex === index ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Salin Rekening</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
