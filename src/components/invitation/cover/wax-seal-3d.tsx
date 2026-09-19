"use client";

import React, { useState } from "react";
import { Sparkles } from "lucide-react";

interface WaxSeal3DProps {
  initials: string;
  theme?: "gold" | "rose" | "terracotta" | "obsidian";
  isUnsealed?: boolean;
  onClick?: () => void;
  className?: string;
}

export function WaxSeal3D({
  initials,
  theme = "gold",
  isUnsealed = false,
  onClick,
  className = "",
}: WaxSeal3DProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Palet tekstur segel lilin sesuai tema
  const themeStyles = {
    gold: {
      base: "radial-gradient(circle at 35% 30%, #F5D77F 0%, #D4AF37 40%, #AA7C11 75%, #5D4304 100%)",
      border: "#E5C158",
      rimGlow: "rgba(245, 215, 127, 0.45)",
      textGradient: "linear-gradient(135deg, #FFFDF0 0%, #E8C15A 60%, #8C6207 100%)",
      shadow: "0 10px 25px -4px rgba(170, 124, 17, 0.5), 0 4px 10px rgba(0,0,0,0.35)",
    },
    rose: {
      base: "radial-gradient(circle at 35% 30%, #F3B39E 0%, #D37B66 40%, #9F4632 75%, #5A2013 100%)",
      border: "#E2937E",
      rimGlow: "rgba(243, 179, 158, 0.45)",
      textGradient: "linear-gradient(135deg, #FFF5F2 0%, #F2A28C 60%, #7E2F1E 100%)",
      shadow: "0 10px 25px -4px rgba(159, 70, 50, 0.5), 0 4px 10px rgba(0,0,0,0.35)",
    },
    terracotta: {
      base: "radial-gradient(circle at 35% 30%, #E07A5F 0%, #B84A39 40%, #7D2B1C 75%, #46140B 100%)",
      border: "#C85F45",
      rimGlow: "rgba(224, 122, 95, 0.4)",
      textGradient: "linear-gradient(135deg, #FFF0EB 0%, #E5866D 60%, #6E2012 100%)",
      shadow: "0 10px 25px -4px rgba(125, 43, 28, 0.55), 0 4px 10px rgba(0,0,0,0.4)",
    },
    obsidian: {
      base: "radial-gradient(circle at 35% 30%, #4A4A52 0%, #2A2A30 40%, #151518 75%, #0A0A0C 100%)",
      border: "#5C5C66",
      rimGlow: "rgba(212, 175, 55, 0.4)",
      textGradient: "linear-gradient(135deg, #FFF 0%, #D4AF37 60%, #997A1E 100%)",
      shadow: "0 10px 25px -4px rgba(0, 0, 0, 0.7), 0 4px 10px rgba(212, 175, 55, 0.2)",
    },
  }[theme];

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Buka segel lilin pernikahan ${initials}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-flex items-center justify-center cursor-pointer select-none transition-all duration-700 ease-out focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/50 ${
        isUnsealed
          ? "scale-125 opacity-0 pointer-events-none rotate-12 filter blur-[2px]"
          : isHovered
          ? "scale-105"
          : "scale-100"
      } ${className}`}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* Outer Golden Aura Glow */}
      <div
        className={`absolute inset-0 rounded-full transition-opacity duration-500 filter blur-md ${
          isHovered ? "opacity-100 scale-110" : "opacity-40 scale-95"
        }`}
        style={{
          background: themeStyles.rimGlow,
        }}
      />

      {/* Irregular Organic Wax Rim (Simulasi lelehan lilin asli alami) */}
      <div
        className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full p-1.5 transition-transform duration-300"
        style={{
          background: themeStyles.base,
          boxShadow: themeStyles.shadow,
          borderRadius: "48% 52% 49% 51% / 51% 48% 52% 49%",
        }}
      >
        {/* Embossed Inner Grooved Ring */}
        <div
          className="w-full h-full rounded-full flex flex-col items-center justify-center relative border border-white/25 overflow-hidden"
          style={{
            borderRadius: "49% 51% 50% 50% / 50% 49% 51% 50%",
            boxShadow:
              "inset 0 3px 6px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.6)",
          }}
        >
          {/* Specular Light Reflection Sheen */}
          <div
            className="absolute -inset-full w-[250%] h-[250%] pointer-events-none transition-transform duration-1000 ease-out"
            style={{
              background:
                "linear-gradient(115deg, transparent 40%, rgba(255, 255, 255, 0.4) 48%, rgba(255, 255, 255, 0.1) 52%, transparent 60%)",
              transform: isHovered
                ? "translate(20%, 20%) rotate(25deg)"
                : "translate(-30%, -30%) rotate(25deg)",
            }}
          />

          {/* Micro Laurel / Grain Dots Ring Decoration */}
          <div className="absolute inset-1.5 border border-dashed border-white/30 rounded-full pointer-events-none opacity-60" />

          {/* Monogram Initials with Embossed 3D Chisel Effect */}
          <div className="relative z-10 flex flex-col items-center justify-center leading-none">
            <span
              className="font-serif italic font-bold text-lg sm:text-xl tracking-wider select-none drop-shadow-sm"
              style={{
                background: themeStyles.textGradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 1px 1px rgba(0,0,0,0.5)",
              }}
            >
              {initials}
            </span>
            <div className="flex items-center gap-1 mt-0.5 opacity-85">
              <span className="w-2 h-[1px] bg-white/50" />
              <Sparkles className="w-2.5 h-2.5 text-white/90" />
              <span className="w-2 h-[1px] bg-white/50" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Sparkle Micro-badges */}
      <div
        className={`absolute -top-1.5 -right-1.5 p-1 rounded-full bg-white/90 shadow-md transition-all duration-300 pointer-events-none ${
          isHovered ? "scale-100 opacity-100 rotate-12" : "scale-75 opacity-0"
        }`}
      >
        <Sparkles className="w-3 h-3 text-amber-600" />
      </div>
    </div>
  );
}
