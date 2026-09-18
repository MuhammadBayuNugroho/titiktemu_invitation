"use client";

import React from "react";
import type { InvitationData, TemplateConfig } from "@/types/invitation";
import { ShareButton } from "../interactive/share-button";

interface ClosingSectionProps {
  data: InvitationData;
  config: TemplateConfig;
}

export function ClosingSection({ data, config }: ClosingSectionProps) {
  const currentUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://titiktemu.id/i/${data.slug}`;

  return (
    <footer className="py-16 px-6 text-center border-t" style={{ borderColor: `${config.colors.secondary}30` }}>
      <div className="mx-auto max-w-lg space-y-6">
        <p className="text-xs md:text-sm leading-relaxed opacity-85">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami.
        </p>

        <p className="text-xs uppercase tracking-widest font-semibold opacity-75">
          Kami yang berbahagia
        </p>

        <div
          className={`text-3xl md:text-4xl font-semibold tracking-wide ${
            config.typography.heading === "serif" ? "font-serif italic" : "font-sans"
          }`}
          style={{ color: config.colors.primary }}
        >
          {data.couple.brideName} & {data.couple.groomName}
        </div>

        <div className="pt-2">
          <ShareButton
            shareParams={{
              groomNickname: data.couple.groomName,
              brideNickname: data.couple.brideName,
              eventDate: data.event.eventDate || data.event.akad?.date || "Segera",
              invitationUrl: currentUrl,
            }}
          />
        </div>

        <p className="text-[10px] md:text-xs opacity-60 pt-6">
          Titik Temu Invitation — Undangan Digital Pernikahan
        </p>
      </div>
    </footer>
  );
}
