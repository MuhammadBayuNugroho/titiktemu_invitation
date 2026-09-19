"use client";

import React, { useMemo } from "react";

interface ThemedDecorationsProps {
  templateSlug?: string;
}

export function ThemedDecorations({ templateSlug = "elegant" }: ThemedDecorationsProps) {
  // Stable randomized petal positions for hydration safety
  const petals = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: `${(i * 7.5 + 4) % 94}%`,
      delay: `${(i * 1.3) % 8}s`,
      duration: `${10 + (i % 6) * 2}s`,
      driftX: `${(i % 2 === 0 ? 1 : -1) * (20 + (i % 4) * 15)}px`,
      rotDeg: `${180 + (i % 5) * 72}deg`,
      size: 14 + (i % 4) * 5,
    }));
  }, []);

  const sparkles = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      top: `${(i * 9.5 + 5) % 92}%`,
      left: `${(i * 11 + 7) % 94}%`,
      delay: `${(i * 0.7) % 5}s`,
      duration: `${2.5 + (i % 3)}s`,
      size: 3 + (i % 4) * 2,
    }));
  }, []);

  // 04 Celestial Midnight: 3D Stardust & Constellation Shimmer
  if (templateSlug === "celestial") {
    return (
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
        {/* Soft Golden Nebula Backdrop Glow */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-amber-500/5 filter blur-[100px]" />
        <div className="absolute bottom-1/3 -right-20 w-96 h-96 rounded-full bg-indigo-500/5 filter blur-[100px]" />

        {/* Twinkling 3D Stardust Particles */}
        {sparkles.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full animate-sparkle"
            style={{
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              background:
                s.id % 3 === 0
                  ? "radial-gradient(circle, #FFE28A 0%, rgba(212,175,55,0.4) 60%, transparent 100%)"
                  : "radial-gradient(circle, #FFFFFF 0%, rgba(255,255,255,0.3) 70%, transparent 100%)",
              boxShadow: "0 0 8px rgba(245, 215, 127, 0.7)",
              animationDelay: s.delay,
              animationDuration: s.duration,
            }}
          />
        ))}

        {/* Delicate Constellation Hairlines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="10%" y1="20%" x2="25%" y2="28%" stroke="#D4AF37" strokeWidth="0.7" strokeDasharray="3 3" />
          <line x1="25%" y1="28%" x2="35%" y2="15%" stroke="#D4AF37" strokeWidth="0.7" strokeDasharray="3 3" />
          <line x1="75%" y1="65%" x2="88%" y2="72%" stroke="#D4AF37" strokeWidth="0.7" strokeDasharray="3 3" />
          <line x1="88%" y1="72%" x2="92%" y2="85%" stroke="#D4AF37" strokeWidth="0.7" strokeDasharray="3 3" />
        </svg>
      </div>
    );
  }

  // 05 Modern Editorial: Clean Architectural Grid & Typography Accents
  if (templateSlug === "editorial") {
    return (
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
        {/* Subtle Architectural Hairline Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Minimal Corner Crosshair Registration Marks */}
        <div className="absolute top-6 left-6 text-zinc-400/40 text-[10px] font-mono tracking-widest">
          + 01 / ED.
        </div>
        <div className="absolute top-6 right-6 text-zinc-400/40 text-[10px] font-mono tracking-widest">
          EST. 2026 +
        </div>
      </div>
    );
  }

  // 06 Romantic Botanical: Soft Falling Leaves & Frosted Organic Vignette
  if (templateSlug === "botanical") {
    return (
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
        {/* Soft Garden Sunlight Bloom */}
        <div className="absolute top-0 right-10 w-80 h-80 rounded-full bg-emerald-500/5 filter blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-amber-500/5 filter blur-3xl" />

        {/* Floating Sage & Olive Leaves */}
        {petals.map((p) => (
          <div
            key={p.id}
            className="absolute animate-petal"
            style={
              {
                left: p.left,
                top: 0,
                animationDelay: p.delay,
                "--fall-duration": `${parseInt(p.duration) + 3}s`,
                "--drift-x": p.driftX,
                "--rot-deg": p.rotDeg,
              } as React.CSSProperties
            }
          >
            <svg
              width={p.size * 1.1}
              height={p.size * 1.5}
              viewBox="0 0 30 45"
              fill="none"
              className="opacity-70 drop-shadow-sm"
            >
              <path
                d="M15 0 C28 16, 26 34, 15 45 C4 34, 2 16, 15 0 Z"
                fill="url(#botanical-leaf-grad)"
              />
              <path d="M15 5 L15 40" stroke="#2D4A3E" strokeWidth="0.8" strokeOpacity="0.4" />
              <defs>
                <linearGradient id="botanical-leaf-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#A8C2B3" stopOpacity="0.85" />
                  <stop offset="60%" stopColor="#6C8F7E" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#3E6151" stopOpacity="0.5" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        ))}
      </div>
    );
  }

  // 03 Nusantara: Wayang Gunungan & Batik Kawung Watermark
  if (templateSlug === "nusantara") {
    return (
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
        {/* Gunungan Wayang Kulit Silhouettes - Left & Right */}
        <div className="absolute -left-12 sm:-left-6 top-1/4 w-32 sm:w-48 h-80 sm:h-96 opacity-20 text-amber-600/40 animate-gunungan">
          <svg viewBox="0 0 200 400" fill="currentColor" className="w-full h-full">
            <path d="M100 10 C80 60, 30 140, 20 220 C10 290, 40 350, 100 390 C160 350, 190 290, 180 220 C170 140, 120 60, 100 10 Z" />
            <path d="M100 40 C85 80, 50 140, 45 200 C40 250, 60 300, 100 340 C140 300, 160 250, 155 200 C150 140, 115 80, 100 40 Z" fill="#000000" fillOpacity="0.4" />
            <circle cx="100" cy="180" r="16" fill="currentColor" opacity="0.6" />
            <circle cx="100" cy="230" r="22" fill="currentColor" opacity="0.5" />
            <path d="M70 280 Q100 250 130 280 Q100 310 70 280 Z" fill="currentColor" opacity="0.6" />
          </svg>
        </div>

        <div className="absolute -right-12 sm:-right-6 top-1/3 w-32 sm:w-48 h-80 sm:h-96 opacity-20 text-amber-600/40 animate-gunungan" style={{ animationDelay: "-4.5s" }}>
          <svg viewBox="0 0 200 400" fill="currentColor" className="w-full h-full scale-x-[-1]">
            <path d="M100 10 C80 60, 30 140, 20 220 C10 290, 40 350, 100 390 C160 350, 190 290, 180 220 C170 140, 120 60, 100 10 Z" />
            <path d="M100 40 C85 80, 50 140, 45 200 C40 250, 60 300, 100 340 C140 300, 160 250, 155 200 C150 140, 115 80, 100 40 Z" fill="#000000" fillOpacity="0.4" />
            <circle cx="100" cy="180" r="16" fill="currentColor" opacity="0.6" />
            <circle cx="100" cy="230" r="22" fill="currentColor" opacity="0.5" />
            <path d="M70 280 Q100 250 130 280 Q100 310 70 280 Z" fill="currentColor" opacity="0.6" />
          </svg>
        </div>

        {/* Traditional Batik Kawung Corner Watermarks */}
        <div className="absolute top-4 left-4 w-24 h-24 opacity-15 text-amber-700/60">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="50" cy="50" r="30" />
            <ellipse cx="50" cy="20" rx="14" ry="20" />
            <ellipse cx="50" cy="80" rx="14" ry="20" />
            <ellipse cx="20" cy="50" rx="20" ry="14" />
            <ellipse cx="80" cy="50" rx="20" ry="14" />
          </svg>
        </div>

        {/* Falling Melati Petals */}
        {petals.map((p) => (
          <div
            key={p.id}
            className="absolute animate-petal"
            style={
              {
                left: p.left,
                top: 0,
                animationDelay: p.delay,
                "--fall-duration": p.duration,
                "--drift-x": p.driftX,
                "--rot-deg": p.rotDeg,
              } as React.CSSProperties
            }
          >
            <svg
              width={p.size}
              height={p.size * 1.3}
              viewBox="0 0 30 40"
              fill="none"
              className="drop-shadow-sm opacity-80"
            >
              <path
                d="M15 0 C25 15, 28 28, 15 40 C2 28, 5 15, 15 0 Z"
                fill="url(#jasmine-grad)"
              />
              <defs>
                <linearGradient id="jasmine-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                  <stop offset="60%" stopColor="#FFF9E6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#F5E6C8" stopOpacity="0.6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        ))}
      </div>
    );
  }

  if (templateSlug === "minimalist") {
    return (
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
        {/* Subtle Modern Botanical Eucalyptus Leaves - Corner Fixed */}
        <div className="absolute top-10 -right-8 w-40 h-56 text-slate-500/20 animate-leaf">
          <svg viewBox="0 0 120 200" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M60 200 Q55 120 70 30" />
            <ellipse cx="85" cy="50" rx="18" ry="10" transform="rotate(-25 85 50)" fill="currentColor" fillOpacity="0.08" />
            <ellipse cx="45" cy="90" rx="20" ry="11" transform="rotate(30 45 90)" fill="currentColor" fillOpacity="0.08" />
            <ellipse cx="85" cy="130" rx="22" ry="12" transform="rotate(-20 85 130)" fill="currentColor" fillOpacity="0.08" />
            <ellipse cx="40" cy="170" rx="24" ry="13" transform="rotate(35 40 170)" fill="currentColor" fillOpacity="0.08" />
          </svg>
        </div>

        {/* Gentle Monochrome Editorial Petals */}
        {petals.slice(0, 8).map((p) => (
          <div
            key={p.id}
            className="absolute animate-petal"
            style={
              {
                left: p.left,
                top: 0,
                animationDelay: p.delay,
                "--fall-duration": `${parseInt(p.duration) + 4}s`,
                "--drift-x": p.driftX,
                "--rot-deg": p.rotDeg,
              } as React.CSSProperties
            }
          >
            <svg
              width={p.size * 0.9}
              height={p.size * 1.2}
              viewBox="0 0 30 40"
              fill="none"
              className="opacity-40"
            >
              <path
                d="M15 0 C24 14, 26 26, 15 38 C4 26, 6 14, 15 0 Z"
                fill="currentColor"
                className="text-slate-300"
              />
            </svg>
          </div>
        ))}
      </div>
    );
  }

  // Default: Elegant (01 Elegant - Classic Gold & Rose Warmth)
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
      {/* Floating Golden Dust / Ambient Sparkles */}
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full animate-sparkle bg-amber-300/40 blur-[0.5px]"
          style={
            {
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              animationDelay: s.delay,
              "--pulse-speed": s.duration,
            } as React.CSSProperties
          }
        />
      ))}

      {/* Floating Gold & Champagne Flower Petals */}
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute animate-petal"
          style={
            {
              left: p.left,
              top: 0,
              animationDelay: p.delay,
              "--fall-duration": p.duration,
              "--drift-x": p.driftX,
              "--rot-deg": p.rotDeg,
            } as React.CSSProperties
          }
        >
          <svg
            width={p.size}
            height={p.size * 1.3}
            viewBox="0 0 30 40"
            fill="none"
            className="drop-shadow-[0_2px_8px_rgba(212,175,55,0.3)] opacity-85"
          >
            <path
              d="M15 0 C27 15, 29 27, 15 40 C1 27, 3 15, 15 0 Z"
              fill="url(#gold-petal-grad)"
            />
            <defs>
              <linearGradient id="gold-petal-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FCE794" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8C5E32" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}
    </div>
  );
}
