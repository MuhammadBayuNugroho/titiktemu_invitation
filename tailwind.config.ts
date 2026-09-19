import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Glass utilities used in JSX
    "glass", "glass-strong", "glass-subtle",
    "glass-card", "glass-card-rose", "glass-card-gold",
    "glass-pill",
    "btn-primary", "btn-secondary",
    "icon-glass",
    "text-gradient-rose", "text-gradient-slate",
    "glow-rose", "glow-gold",
    "mesh-pattern", "mesh-aurora",
    "divider-gradient",
    "hover-lift",
    // Animation classes
    "animate-fade-up", "animate-fade-down", "animate-fade-in",
    "animate-scale-in", "animate-float", "animate-pulse-glow",
    "animate-aurora-drift", "animate-rotate-slow",
    // Delays
    "delay-75", "delay-100", "delay-150", "delay-200",
    "delay-300", "delay-400", "delay-500", "delay-600",
    "delay-700", "delay-800",
    // Legacy
    "animate-apple-fade-up", "animate-apple-fade-down",
    "hover-lift-apple", "animation-delay-100", "animation-delay-200",
    "animation-delay-300",
    // Invitation animations
    "animate-petal", "animate-gunungan", "animate-sparkle", "animate-leaf",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        surface: {
          50: "#fcfcfc",
          100: "#f8f9fa",
          200: "#f1f3f5",
          800: "#1a1b1e",
          900: "#141517",
          950: "#0c0d0e",
        },
        brand: {
          50: "#f4f6f8",
          100: "#e5e9ed",
          500: "#18181b",
          900: "#09090b",
        },
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["'DM Serif Display'", "var(--font-serif)", "Georgia", "serif"],
      },
      backdropBlur: {
        xs: "4px",
        "4xl": "72px",
      },
      animation: {
        "fade-up": "fade-up 0.65s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-down": "fade-down 0.55s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fade-in 0.5s ease both",
        "scale-in": "scale-in 0.55s cubic-bezier(0.16, 1, 0.3, 1) both",
        "float": "float 7s ease-in-out infinite",
        "pulse-glow": "pulse-glow 8s ease-in-out infinite",
        "aurora-drift": "aurora-drift 18s ease-in-out infinite",
        "rotate-slow": "rotate-slow 24s linear infinite",
        "petal": "petal-fall 12s cubic-bezier(0.25,0.46,0.45,0.94) infinite",
        "gunungan": "gunungan-sway 9s ease-in-out infinite",
        "sparkle": "sparkle-pulse 4s ease-in-out infinite",
        "leaf": "leaf-sway 7s ease-in-out infinite",
        // Legacy aliases
        "apple-fade-up": "fade-up 0.65s cubic-bezier(0.16, 1, 0.3, 1) both",
        "apple-fade-down": "fade-down 0.55s cubic-bezier(0.16, 1, 0.3, 1) both",
        "apple-scale-in": "scale-in 0.55s cubic-bezier(0.16, 1, 0.3, 1) both",
        "float-subtle": "float 6s ease-in-out infinite",
        "pulse-glow-legacy": "pulse-glow 8s ease-in-out infinite",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translate3d(0, 24px, 0)" },
          to:   { opacity: "1", transform: "translate3d(0, 0px, 0)" },
        },
        "fade-down": {
          from: { opacity: "0", transform: "translate3d(0, -16px, 0)" },
          to:   { opacity: "1", transform: "translate3d(0, 0px, 0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale3d(0.94, 0.94, 1)" },
          to:   { opacity: "1", transform: "scale3d(1, 1, 1)" },
        },
        "float": {
          "0%, 100%": { transform: "translate3d(0, 0px, 0)" },
          "50%":      { transform: "translate3d(0, -8px, 0)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.25", transform: "scale(1)" },
          "50%":      { opacity: "0.45", transform: "scale(1.06)" },
        },
        "aurora-drift": {
          "0%":   { transform: "translate3d(0%, 0%, 0) scale(1)" },
          "33%":  { transform: "translate3d(3%, -4%, 0) scale(1.04)" },
          "66%":  { transform: "translate3d(-2%, 3%, 0) scale(0.98)" },
          "100%": { transform: "translate3d(0%, 0%, 0) scale(1)" },
        },
        "rotate-slow": {
          from: { transform: "rotate(0deg)" },
          to:   { transform: "rotate(360deg)" },
        },
        // Invitation keyframes
        "petal-fall": {
          "0%":   { transform: "translate3d(0, -10vh, 0) rotate(0deg) scale(0.8)", opacity: "0" },
          "15%":  { opacity: "0.85" },
          "85%":  { opacity: "0.85" },
          "100%": { transform: "translate3d(40px, 110vh, 0) rotate(360deg) scale(1.1)", opacity: "0" },
        },
        "gunungan-sway": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg) scale(1)", opacity: "0.18" },
          "50%":      { transform: "translateY(-8px) rotate(0.8deg) scale(1.02)", opacity: "0.28" },
        },
        "sparkle-pulse": {
          "0%, 100%": { opacity: "0.15", transform: "scale(0.8)" },
          "50%":      { opacity: "0.75", transform: "scale(1.2)" },
        },
        "leaf-sway": {
          "0%, 100%": { transform: "rotate(0deg) translateY(0px)" },
          "50%":      { transform: "rotate(3deg) translateY(-5px)" },
        },
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animationDelay: {
        "75":  "75ms",
        "100": "100ms",
        "150": "150ms",
        "200": "200ms",
        "300": "300ms",
        "400": "400ms",
        "500": "500ms",
        "600": "600ms",
        "700": "700ms",
        "800": "800ms",
      },
    },
  },
  plugins: [
    // Glassmorphism utilities plugin
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".glass": {
          backgroundColor: "rgba(255, 255, 255, 0.72)",
          backdropFilter: "blur(24px) saturate(160%)",
          WebkitBackdropFilter: "blur(24px) saturate(160%)",
          border: "1px solid rgba(255, 255, 255, 0.90)",
          boxShadow: "0 4px 16px -4px rgba(26,26,46,0.08), 0 1px 4px rgba(26,26,46,0.04), inset 0 1px 0 rgba(255,255,255,0.9)",
        },
        ".glass-strong": {
          backgroundColor: "rgba(255, 255, 255, 0.90)",
          backdropFilter: "blur(32px) saturate(180%)",
          WebkitBackdropFilter: "blur(32px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.95)",
          boxShadow: "0 12px 32px -8px rgba(26,26,46,0.12), 0 4px 8px -2px rgba(26,26,46,0.06), inset 0 1px 0 rgba(255,255,255,1)",
        },
        ".glass-subtle": {
          backgroundColor: "rgba(255, 255, 255, 0.50)",
          backdropFilter: "blur(12px) saturate(130%)",
          WebkitBackdropFilter: "blur(12px) saturate(130%)",
          border: "1px solid rgba(255, 255, 255, 0.70)",
          boxShadow: "0 1px 3px rgba(26,26,46,0.04), 0 1px 2px rgba(26,26,46,0.02)",
        },
        ".glass-card": {
          backgroundColor: "rgba(255, 255, 255, 0.88)",
          backdropFilter: "blur(24px) saturate(160%)",
          WebkitBackdropFilter: "blur(24px) saturate(160%)",
          border: "1px solid rgba(255, 255, 255, 0.95)",
          boxShadow: "0 2px 8px rgba(26,26,46,0.06), 0 8px 24px -8px rgba(26,26,46,0.10), inset 0 1px 0 rgba(255,255,255,1)",
          borderRadius: "24px",
          transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.25s ease",
        },
        ".glass-card:hover": {
          transform: "translate3d(0, -5px, 0)",
          boxShadow: "0 4px 16px rgba(26,26,46,0.08), 0 20px 48px -12px rgba(26,26,46,0.16), inset 0 1px 0 rgba(255,255,255,1)",
          borderColor: "rgba(255, 255, 255, 1)",
        },
        ".glass-card-rose": {
          background: "linear-gradient(135deg, rgba(255,255,255,0.88) 0%, rgba(240,213,196,0.45) 100%)",
          backdropFilter: "blur(24px) saturate(160%)",
          WebkitBackdropFilter: "blur(24px) saturate(160%)",
          border: "1px solid rgba(201, 144, 108, 0.25)",
          boxShadow: "0 8px 32px -8px rgba(201,144,108,0.28), 0 4px 16px -4px rgba(26,26,46,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
          borderRadius: "24px",
          transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s cubic-bezier(0.16,1,0.3,1)",
        },
        ".glass-card-rose:hover": {
          transform: "translate3d(0, -4px, 0)",
          boxShadow: "0 16px 48px -12px rgba(201,144,108,0.38), 0 12px 32px -8px rgba(26,26,46,0.12), inset 0 1px 0 rgba(255,255,255,0.9)",
        },
        ".glass-card-gold": {
          background: "linear-gradient(135deg, rgba(255,255,255,0.90) 0%, rgba(240,228,192,0.40) 100%)",
          backdropFilter: "blur(24px) saturate(160%)",
          WebkitBackdropFilter: "blur(24px) saturate(160%)",
          border: "1px solid rgba(201, 168, 76, 0.30)",
          boxShadow: "0 8px 32px -8px rgba(201,168,76,0.28), 0 4px 16px -4px rgba(26,26,46,0.08), inset 0 1px 0 rgba(255,255,255,0.95)",
          borderRadius: "24px",
          transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s cubic-bezier(0.16,1,0.3,1)",
        },
        ".glass-card-gold:hover": {
          transform: "translate3d(0, -5px, 0)",
          boxShadow: "0 20px 56px -12px rgba(201,168,76,0.42), 0 12px 32px -8px rgba(26,26,46,0.12), inset 0 1px 0 rgba(255,255,255,0.95)",
        },
        ".glass-pill": {
          backgroundColor: "rgba(255, 255, 255, 0.80)",
          backdropFilter: "blur(28px) saturate(180%)",
          WebkitBackdropFilter: "blur(28px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.92)",
          boxShadow: "0 4px 24px -4px rgba(26,26,46,0.08), 0 1px 4px rgba(26,26,46,0.04), inset 0 1px 0 rgba(255,255,255,0.95)",
        },
        ".btn-primary": {
          background: "linear-gradient(135deg, #C9906C 0%, #B87850 100%)",
          color: "#FFFFFF",
          boxShadow: "0 4px 16px -4px rgba(201,144,108,0.45), inset 0 1px 0 rgba(255,255,255,0.2)",
          transition: "transform 0.2s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s cubic-bezier(0.16,1,0.3,1), filter 0.2s ease",
          borderRadius: "9999px",
          border: "none",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: "600",
        },
        ".btn-primary:hover": {
          transform: "scale(1.03) translateY(-1px)",
          boxShadow: "0 8px 24px -6px rgba(201,144,108,0.55), inset 0 1px 0 rgba(255,255,255,0.2)",
          filter: "brightness(1.05)",
        },
        ".btn-primary:active": {
          transform: "scale(0.98)",
          boxShadow: "0 2px 8px -2px rgba(201,144,108,0.35)",
        },
        ".btn-secondary": {
          backgroundColor: "rgba(255, 255, 255, 0.75)",
          color: "#1A1A2E",
          border: "1px solid rgba(26, 26, 46, 0.12)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          boxShadow: "0 1px 3px rgba(26,26,46,0.04), 0 1px 2px rgba(26,26,46,0.02), inset 0 1px 0 rgba(255,255,255,0.9)",
          transition: "transform 0.2s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s cubic-bezier(0.16,1,0.3,1), background 0.2s ease",
          borderRadius: "9999px",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        },
        ".btn-secondary:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          transform: "scale(1.02) translateY(-1px)",
          boxShadow: "0 4px 16px -4px rgba(26,26,46,0.08), 0 1px 4px rgba(26,26,46,0.04), inset 0 1px 0 rgba(255,255,255,1)",
        },
        ".btn-secondary:active": {
          transform: "scale(0.98)",
        },
        ".icon-glass": {
          backgroundColor: "rgba(255, 255, 255, 0.80)",
          border: "1px solid rgba(255, 255, 255, 0.90)",
          boxShadow: "0 1px 3px rgba(26,26,46,0.04), 0 1px 2px rgba(26,26,46,0.02)",
          transition: "transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease",
        },
        ".icon-glass:hover": {
          transform: "scale(1.08)",
          boxShadow: "0 4px 16px -4px rgba(26,26,46,0.08), 0 1px 4px rgba(26,26,46,0.04)",
        },
        ".text-gradient-rose": {
          background: "linear-gradient(135deg, #C9906C 0%, #D4A847 60%, #C9906C 100%)",
          backgroundSize: "200% auto",
          color: "transparent",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          animation: "aurora-drift 6s linear infinite",
        },
        ".glow-rose": {
          boxShadow: "0 0 32px rgba(201,144,108,0.20), 0 0 64px rgba(201,144,108,0.10)",
        },
        ".glow-gold": {
          boxShadow: "0 0 32px rgba(201,168,76,0.20), 0 0 64px rgba(201,168,76,0.10)",
        },
        ".divider-gradient": {
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(201,144,108,0.3), transparent)",
          border: "none",
        },
        ".hover-lift": {
          transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s cubic-bezier(0.16,1,0.3,1)",
        },
        ".hover-lift:hover": {
          transform: "translate3d(0, -4px, 0)",
        },
        ".hover-lift:active": {
          transform: "translate3d(0, 0px, 0) scale(0.99)",
        },
        // Legacy compatibility
        ".hover-lift-apple": {
          transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s cubic-bezier(0.16,1,0.3,1)",
        },
        ".hover-lift-apple:hover": {
          transform: "translate3d(0, -3px, 0)",
          boxShadow: "0 16px 36px -12px rgba(0,0,0,0.10)",
        },
        ".hover-lift-apple:active": {
          transform: "translate3d(0, 0px, 0) scale(0.99)",
        },
        // Animation delay utilities
        ".delay-75":  { animationDelay: "75ms" },
        ".delay-100": { animationDelay: "100ms" },
        ".delay-150": { animationDelay: "150ms" },
        ".delay-200": { animationDelay: "200ms" },
        ".delay-300": { animationDelay: "300ms" },
        ".delay-400": { animationDelay: "400ms" },
        ".delay-500": { animationDelay: "500ms" },
        ".delay-600": { animationDelay: "600ms" },
        ".delay-700": { animationDelay: "700ms" },
        ".delay-800": { animationDelay: "800ms" },
        ".animation-delay-100": { animationDelay: "100ms" },
        ".animation-delay-200": { animationDelay: "200ms" },
        ".animation-delay-300": { animationDelay: "300ms" },
        ".animation-delay-400": { animationDelay: "400ms" },
        ".animation-delay-500": { animationDelay: "500ms" },
      });
    }),
  ],
};

export default config;
