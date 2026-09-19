"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import type { InvitationData, TemplateConfig } from "@/types/invitation";
import { Envelope3D } from "../cover/envelope-3d";

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
  const [isRendered, setIsRendered] = useState(!isOpen);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsExiting(true);
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      setIsRendered(true);
      setIsExiting(false);
    }
  }, [isOpen]);

  if (!isRendered) return null;

  const handleOpenFlow = () => {
    setIsExiting(true);
    setTimeout(() => {
      onOpen();
    }, 600);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden p-4 sm:p-6 transition-all duration-700 ease-out select-none ${
        isExiting
          ? "opacity-0 scale-105 pointer-events-none filter blur-sm"
          : "opacity-100 scale-100"
      }`}
      style={{
        backgroundColor:
          config.slug === "celestial" ? "#07070B" : "#120E0C",
      }}
    >
      {/* Background Ambience: Couple Photo Blurred Vignette */}
      {data.media.coverImageUrl && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <Image
            src={data.media.coverImageUrl}
            alt={data.title}
            fill
            priority
            className="object-cover opacity-20 filter blur-xl scale-110"
          />
          {/* Radial Dark Vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                config.slug === "celestial"
                  ? "radial-gradient(ellipse at center, rgba(16, 16, 26, 0.7) 0%, #06060A 85%)"
                  : "radial-gradient(ellipse at center, rgba(30, 20, 16, 0.7) 0%, #0E0A08 85%)",
            }}
          />
        </div>
      )}

      {/* Subtle Floating Ambient Embers */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-10 left-1/4 w-72 h-72 rounded-full bg-amber-500/10 filter blur-3xl animate-pulse" />
        <div className="absolute -bottom-10 right-1/4 w-80 h-80 rounded-full bg-rose-500/10 filter blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Main 3D Interactive Envelope Modal Container */}
      <div className="relative z-10 w-full my-auto flex flex-col items-center justify-center">
        <Envelope3D
          data={data}
          config={config}
          guestName={guestName}
          onOpenInvitation={handleOpenFlow}
        />
      </div>
    </div>
  );
}
