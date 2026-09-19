"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Sparkles, Calendar, MapPin, ArrowRight, Heart } from "lucide-react";
import type { InvitationData, TemplateConfig } from "@/types/invitation";
import { formatDateIndonesian } from "@/lib/utils";
import { WaxSeal3D } from "./wax-seal-3d";

interface Envelope3DProps {
  data: InvitationData;
  config: TemplateConfig;
  guestName?: string;
  onOpenInvitation: () => void;
}

export function Envelope3D({
  data,
  config,
  guestName,
  onOpenInvitation,
}: Envelope3DProps) {
  // Unboxing sequence states: 'closed' -> 'unsealing' -> 'opened' -> 'transitioning'
  const [stage, setStage] = useState<"closed" | "unsealing" | "opened" | "transitioning">("closed");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const envelopeRef = useRef<HTMLDivElement>(null);

  // Inisial untuk segel lilin
  const brideInitial = data.couple.brideName.trim().charAt(0).toUpperCase() || "S";
  const groomInitial = data.couple.groomName.trim().charAt(0).toUpperCase() || "R";
  const initials = `${brideInitial} & ${groomInitial}`;

  // Theme matching for seal
  const sealTheme: "gold" | "rose" | "terracotta" | "obsidian" =
    config.slug === "celestial"
      ? "obsidian"
      : config.slug === "nusantara"
      ? "terracotta"
      : config.slug === "elegant"
      ? "rose"
      : "gold";

  // Mouse / Touch Tilt Handler for smooth 3D parallax
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (stage !== "closed") return;
      if (!envelopeRef.current) return;

      const rect = envelopeRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      // Max tilt ±10 degrees for elegant subtle luxury
      setTilt({
        x: Number((y * -16).toFixed(2)),
        y: Number((x * 16).toFixed(2)),
      });
    },
    [stage]
  );

  const handleMouseLeave = useCallback(() => {
    if (stage === "closed") {
      setTilt({ x: 0, y: 0 });
    }
  }, [stage]);

  // Mobile Device Orientation (Gyroscope) support
  useEffect(() => {
    if (stage !== "closed") return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta === null || e.gamma === null) return;
      // Beta: front-to-back tilt [-180, 180], normal phone hold is ~45 deg
      // Gamma: left-to-right tilt [-90, 90]
      const clampedY = Math.max(-10, Math.min(10, (e.gamma || 0) * 0.4));
      const clampedX = Math.max(-10, Math.min(10, ((e.beta || 45) - 45) * -0.3));

      setTilt({
        x: Number(clampedX.toFixed(2)),
        y: Number(clampedY.toFixed(2)),
      });
    };

    if (typeof window !== "undefined" && window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation);
    }
    return () => {
      if (typeof window !== "undefined" && window.DeviceOrientationEvent) {
        window.removeEventListener("deviceorientation", handleOrientation);
      }
    };
  }, [stage]);

  // Handle unboxing flow
  const handleUnbox = () => {
    if (stage !== "closed") return;

    // Reset tilt for clean unboxing alignment
    setTilt({ x: 0, y: 0 });
    setStage("unsealing");

    // Stage 1: wax breaks, then flap unfolds
    setTimeout(() => {
      setStage("opened");
    }, 600);
  };

  const handleEnterInvitation = () => {
    setStage("transitioning");
    setTimeout(() => {
      onOpenInvitation();
    }, 550);
  };

  const isFlapOpen = stage === "opened" || stage === "transitioning";

  return (
    <div
      className={`relative w-full max-w-sm sm:max-w-md mx-auto transition-all duration-700 select-none ${
        stage === "transitioning" ? "scale-110 opacity-0 filter blur-sm" : "scale-100 opacity-100"
      }`}
      style={{
        perspective: "1400px",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Transform Pivot Stage */}
      <div
        ref={envelopeRef}
        className="relative w-full transition-transform duration-300 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        {/* =========================================================================
            ENVELOPE CONTAINER & POUCH
            ========================================================================= */}
        <div
          className="relative w-full rounded-2xl p-4 sm:p-5 shadow-2xl transition-all duration-500 overflow-visible"
          style={{
            minHeight: "480px",
            background:
              config.slug === "celestial"
                ? "linear-gradient(160deg, #181820 0%, #0E0E14 100%)"
                : config.slug === "nusantara"
                ? "linear-gradient(160deg, #381A12 0%, #200E0A 100%)"
                : "linear-gradient(160deg, #FFFFFF 0%, #F5F2EC 100%)",
            border:
              config.slug === "celestial"
                ? "1px solid rgba(212, 175, 55, 0.25)"
                : config.slug === "nusantara"
                ? "1px solid rgba(201, 168, 76, 0.35)"
                : "1px solid rgba(201, 144, 108, 0.3)",
            boxShadow:
              config.slug === "celestial"
                ? "0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 30px rgba(212, 175, 55, 0.15)"
                : "0 25px 50px -12px rgba(43, 38, 35, 0.25), 0 4px 16px rgba(0,0,0,0.06)",
          }}
        >
          {/* Subtle Specular Sheen across Envelope Surface */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${50 + tilt.y * 3}% ${
                50 - tilt.x * 3
              }%, rgba(255,255,255,0.18) 0%, transparent 60%)`,
            }}
          />

          {/* Inner Back Lining Pattern (Visible inside envelope) */}
          <div
            className="absolute inset-x-4 top-4 bottom-14 rounded-xl opacity-30 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, rgba(201,168,76,0.2) 1px, transparent 1px)",
              backgroundSize: "14px 14px",
            }}
          />

          {/* =========================================================================
              PHOTO INVITATION CARD (Sliding Upwards in 3D Space)
              ========================================================================= */}
          <div
            className="relative w-full rounded-xl overflow-hidden shadow-xl transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
            style={{
              transform: isFlapOpen
                ? "translate3d(0, -90px, 45px) scale(1.02)"
                : "translate3d(0, 8px, 0) scale(0.97)",
              zIndex: isFlapOpen ? 30 : 5,
              background:
                config.slug === "celestial"
                  ? "#0A0A0F"
                  : "#FFFFFF",
              border:
                config.slug === "celestial"
                  ? "1px solid rgba(255, 215, 0, 0.3)"
                  : "1px solid rgba(201, 144, 108, 0.25)",
              boxShadow: isFlapOpen
                ? "0 30px 60px -12px rgba(0,0,0,0.45), 0 0 25px rgba(201,168,76,0.25)"
                : "0 10px 20px rgba(0,0,0,0.1)",
            }}
          >
            {/* Fine Art Passe-Partout Gold Foil Trim */}
            <div className="p-3 sm:p-4">
              {/* Couple Main Photo Container */}
              <div className="relative w-full h-56 sm:h-64 rounded-lg overflow-hidden bg-zinc-900 border border-amber-400/20">
                {data.media.coverImageUrl ? (
                  <Image
                    src={data.media.coverImageUrl}
                    alt={data.title}
                    fill
                    priority
                    sizes="(max-width: 640px) 340px, 400px"
                    className="object-cover object-center transition-transform duration-1000 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-400 text-xs">
                    Foto Pengantin
                  </div>
                )}

                {/* Subtle Luxury Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Top Badge: "The Wedding Of" */}
                <div className="absolute top-3 inset-x-0 flex justify-center">
                  <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.25em] bg-black/50 text-white/90 backdrop-blur-md border border-white/20">
                    The Wedding Of
                  </span>
                </div>

                {/* Bottom Overlay Info on Photo */}
                <div className="absolute bottom-3 inset-x-3 text-center text-white">
                  <h3
                    className={`text-2xl sm:text-3xl tracking-wide text-white drop-shadow-md ${
                      config.typography.heading === "serif"
                        ? "font-serif italic"
                        : "font-sans font-bold"
                    }`}
                  >
                    {data.couple.brideName} &amp; {data.couple.groomName}
                  </h3>
                  <div className="flex items-center justify-center gap-1.5 mt-1 text-[11px] text-amber-200/90 font-medium">
                    <Calendar className="w-3 h-3 text-amber-400" />
                    <span>{formatDateIndonesian(data.event.eventDate)}</span>
                  </div>
                </div>
              </div>

              {/* Card Bottom Meta (Guest Dedication & Venue) */}
              <div className="pt-3 pb-1 px-1 text-center">
                <div
                  className="inline-flex items-center gap-1 text-[11px] font-medium tracking-wide mb-1"
                  style={{
                    color:
                      config.slug === "celestial" ? "#E0D0B0" : "#8A6D3B",
                  }}
                >
                  <MapPin className="w-3 h-3" />
                  <span className="truncate max-w-[260px]">{data.event.venueName}</span>
                </div>

                {/* Dedicated Guest Box inside Card */}
                <div
                  className="mt-2 py-2 px-3 rounded-lg border text-center transition-colors"
                  style={{
                    backgroundColor:
                      config.slug === "celestial"
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(201,144,108,0.08)",
                    borderColor:
                      config.slug === "celestial"
                        ? "rgba(212,175,55,0.2)"
                        : "rgba(201,144,108,0.2)",
                  }}
                >
                  <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">
                    Kepada Yth. Bapak/Ibu/Saudara/i:
                  </p>
                  <p
                    className="text-sm font-semibold mt-0.5 tracking-tight"
                    style={{
                      color:
                        config.slug === "celestial" ? "#FFFFFF" : "#1A1A2E",
                    }}
                  >
                    {guestName || "Tamu Undangan"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              ENVELOPE FRONT POCKET & FLAP (Creates physical enclosure depth)
              ========================================================================= */}

          {/* Front Envelope Pocket (Covers the bottom half of the card) */}
          <div
            className="absolute inset-x-0 bottom-0 h-36 sm:h-40 rounded-b-2xl pointer-events-none transition-all duration-500"
            style={{
              zIndex: 20,
              background:
                config.slug === "celestial"
                  ? "linear-gradient(180deg, rgba(24,24,32,0.92) 0%, #101017 100%)"
                  : config.slug === "nusantara"
                  ? "linear-gradient(180deg, rgba(56,26,18,0.92) 0%, #200E0A 100%)"
                  : "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, #EFECE6 100%)",
              borderTop:
                config.slug === "celestial"
                  ? "1px solid rgba(212, 175, 55, 0.35)"
                  : "1px solid rgba(201, 144, 108, 0.35)",
              boxShadow: "0 -8px 20px -5px rgba(0,0,0,0.15)",
              clipPath: "polygon(0 30%, 50% 0, 100% 30%, 100% 100%, 0 100%)",
            }}
          >
            {/* Pocket Gold Rim Accent */}
            <div className="absolute top-2 inset-x-0 flex justify-center opacity-70">
              <span
                className="w-12 h-[1px]"
                style={{
                  background:
                    config.slug === "celestial" ? "#D4AF37" : "#C9906C",
                }}
              />
            </div>
          </div>

          {/* 3D Folding Top Flap (Lipatan Atas Amplop yang Membuka) */}
          <div
            className="absolute inset-x-0 top-0 h-40 sm:h-44 transition-all duration-700 ease-in-out pointer-events-none"
            style={{
              transformOrigin: "top center",
              transformStyle: "preserve-3d",
              transform: isFlapOpen ? "rotateX(-175deg)" : "rotateX(0deg)",
              zIndex: isFlapOpen ? 4 : 25,
              background:
                config.slug === "celestial"
                  ? "linear-gradient(180deg, #1C1C26 0%, #101016 100%)"
                  : config.slug === "nusantara"
                  ? "linear-gradient(180deg, #442017 0%, #27120C 100%)"
                  : "linear-gradient(180deg, #FAF8F4 0%, #E8E3DA 100%)",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              boxShadow: isFlapOpen
                ? "none"
                : "0 12px 24px -6px rgba(0,0,0,0.3)",
              borderBottom: "1px solid rgba(201,168,76,0.3)",
            }}
          />

          {/* =========================================================================
              3D WAX SEAL (Positioned in Center of the Flap Tip)
              ========================================================================= */}
          <div
            className="absolute top-32 sm:top-36 inset-x-0 flex flex-col items-center justify-center transition-all duration-500"
            style={{
              zIndex: isFlapOpen ? 0 : 28,
              transform: isFlapOpen
                ? "translate3d(0, -60px, -20px) scale(0.6) opacity(0)"
                : "translate3d(0, 0, 20px) scale(1)",
              pointerEvents: isFlapOpen ? "none" : "auto",
            }}
          >
            <WaxSeal3D
              initials={initials}
              theme={sealTheme}
              isUnsealed={stage !== "closed"}
              onClick={handleUnbox}
            />

            {/* Pulsing Hint Caption below seal */}
            {!isFlapOpen && (
              <p
                onClick={handleUnbox}
                className="mt-3 text-[11px] font-medium tracking-wider uppercase cursor-pointer transition-opacity hover:opacity-100 flex items-center gap-1.5 animate-pulse"
                style={{
                  color:
                    config.slug === "celestial" ? "#F5D77F" : "#8A6D3B",
                }}
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Ketuk Segel Lilin untuk Membuka</span>
              </p>
            )}
          </div>
        </div>

        {/* Action Button after card is unveiled */}
        <div
          className={`mt-6 flex flex-col items-center transition-all duration-700 ${
            isFlapOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <button
            onClick={handleEnterInvitation}
            className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full font-semibold text-sm text-white shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer overflow-hidden"
            style={{
              background:
                config.slug === "celestial"
                  ? "linear-gradient(135deg, #C9A84C 0%, #997A1E 100%)"
                  : "linear-gradient(135deg, #C9906C 0%, #9F5F3B 100%)",
              boxShadow:
                config.slug === "celestial"
                  ? "0 12px 30px -5px rgba(201, 168, 76, 0.5)"
                  : "0 12px 30px -5px rgba(201, 144, 108, 0.45)",
            }}
          >
            {/* Shimmer light bar across button */}
            <span className="absolute -inset-full w-[200%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000" />
            
            <Heart className="w-4 h-4 fill-white text-white transition-transform group-hover:scale-110" />
            <span>Buka Lembaran Undangan</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <p className="mt-2.5 text-[11px] text-zinc-400">
            Musik pernikahan akan otomatis diputar
          </p>
        </div>
      </div>
    </div>
  );
}
