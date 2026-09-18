"use client";

import React from "react";
import Image from "next/image";
import { MailOpen, Calendar } from "lucide-react";
import type { InvitationData, TemplateConfig } from "@/types/invitation";
import { formatDateIndonesian } from "@/lib/utils";

interface InvitationCoverProps {
  data: InvitationData;
  config: TemplateConfig;
  guestName?: string;
  isOpen: boolean;
  onOpen: () => void;
}

export function InvitationCover({
  data,
  config,
  guestName,
  isOpen,
  onOpen,
}: InvitationCoverProps) {
  if (isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-zinc-950 text-white">
      {/* Background Image with Overlay */}
      {data.media.coverImageUrl && (
        <div className="absolute inset-0 z-0">
          <Image
            src={data.media.coverImageUrl}
            alt={data.title}
            fill
            priority
            className="object-cover opacity-35 filter blur-[1px] scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/80" />
        </div>
      )}

      {/* Content Container */}
      <div className="relative z-10 mx-auto flex h-full max-w-lg flex-col items-center justify-between px-6 py-12 text-center">
        {/* Top Header */}
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-zinc-300 font-medium">
            The Wedding Of
          </span>
        </div>

        {/* Middle: Couple Names & Ornament */}
        <div className="my-auto space-y-4">
          <div
            className={`text-4xl sm:text-5xl md:text-6xl font-normal tracking-wide text-white drop-shadow-md ${
              config.typography.heading === "serif" ? "font-serif italic" : "font-sans font-bold"
            }`}
          >
            {data.couple.brideName} & {data.couple.groomName}
          </div>

          <div className="flex items-center justify-center gap-4 text-xs tracking-wider text-zinc-300">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-amber-400" />
              {formatDateIndonesian(data.event.eventDate)}
            </span>
          </div>
        </div>

        {/* Bottom: Guest Greeting & Open Button */}
        <div className="w-full max-w-xs space-y-6">
          <div className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
            <p className="text-xs text-zinc-300">Kepada Yth. Bapak/Ibu/Saudara/i:</p>
            <p className="mt-1 text-base font-semibold text-white">
              {guestName || "Tamu Undangan"}
            </p>
          </div>

          <button
            onClick={onOpen}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-zinc-950 shadow-lg transition-all duration-200 hover:bg-zinc-100 hover:shadow-xl active:scale-95 cursor-pointer"
          >
            <MailOpen className="h-4 w-4 transition-transform group-hover:scale-110" />
            <span>Buka Undangan</span>
          </button>
        </div>
      </div>
    </div>
  );
}
