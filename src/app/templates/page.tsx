import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Eye, Heart, Sparkles } from "lucide-react";
import { getAllTemplates } from "@/lib/templates/registry";

export const metadata = {
  title: "Katalog Template Undangan Digital — Titik Temu Invitation",
  description:
    "Pilih desain undangan pernikahan favorit Anda: 01 Elegant, 02 Minimalist, atau 03 Nusantara.",
};

export default function TemplatesPage() {
  const templates = getAllTemplates();

  const previewImages: Record<string, string> = {
    elegant:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
    minimalist:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
    nusantara:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop",
  };

  const cardClasses: Record<string, string> = {
    elegant: "glass-card-rose",
    minimalist: "glass-card",
    nusantara: "glass-card-gold",
  };

  const accentColors: Record<string, string> = {
    elegant: "#C9906C",
    minimalist: "#4A5568",
    nusantara: "#C9A84C",
  };

  return (
    <div
      className="relative min-h-screen flex flex-col overflow-x-hidden"
      style={{
        /**
         * PERFORMANCE: Static radial gradient — zero GPU cost.
         * Same visual warmth as the landing page without any animation.
         */
        background: `
          radial-gradient(ellipse 70% 45% at 10% 0%,   rgba(201,144,108,0.10) 0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at 90% 100%, rgba(201,168,76,0.07)  0%, transparent 60%),
          #F8F7F4
        `,
        color: "#1A1A2E",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >

      {/* Sticky Header */}
      <header className="sticky top-0 z-40">
        <div className="glass-pill border-b" style={{ borderRadius: 0, borderLeft: 'none', borderRight: 'none', borderTop: 'none' }}>
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium transition hover:text-[#C9906C]"
              style={{ color: "#6B7280" }}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Kembali ke Beranda</span>
            </Link>
            <div className="flex items-center gap-2.5">
              <div
                className="w-6 h-6 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #C9906C, #C9A84C)" }}
              >
                <Heart className="w-3 h-3 text-white" />
              </div>
              <span className="font-semibold text-xs sm:text-sm tracking-tight" style={{ color: "#1A1A2E" }}>
                Titik Temu <span style={{ color: "#C9906C" }}>Invitation</span>
              </span>
            </div>
            <Link href="/create">
              <button className="btn-primary px-4 py-2 text-xs font-semibold flex items-center gap-1.5">
                Buat Undangan
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-6xl flex-1 px-4 py-14 sm:px-6 sm:py-20">

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-up">
          <div
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold glass mb-5 cursor-default"
            style={{ color: "#C9906C" }}
          >
            <Sparkles className="h-3.5 w-3.5 animate-rotate-slow" style={{ color: "#C9A84C" }} />
            <span>Koleksi Desain Eksklusif</span>
          </div>
          <h1
            className="text-3xl sm:text-4xl font-light tracking-tight mb-4"
            style={{ color: "#1A1A2E" }}
          >
            Pilih Tema{" "}
            <span style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic" }}>
              Undangan Anda
            </span>
          </h1>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: "#6B7280" }}>
            Setiap tema dirancang presisi dengan tipografi berkelas, micro-animation responsif,
            dan tata letak mobile-first yang memukau.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {templates.map((tpl, idx) => {
            const delayClasses = ["delay-100", "delay-200", "delay-300"];
            const cardClass = cardClasses[tpl.slug] ?? "glass-card";
            const accentColor = accentColors[tpl.slug] ?? "#C9906C";

            return (
              <div
                key={tpl.slug}
                className={`${cardClass} hover-lift animate-fade-up ${delayClasses[idx] ?? ""} overflow-hidden flex flex-col group`}
              >
                {/* Preview Thumbnail */}
                <div className="relative aspect-[4/3] w-full overflow-hidden" style={{ borderRadius: "inherit" }}>
                  <Image
                    src={previewImages[tpl.slug] || previewImages.elegant}
                    alt={tpl.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Overlay gradient */}
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.02) 60%, rgba(255,255,255,0.1) 100%)" }}
                  />
                  {/* Typography badge */}
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full px-3 py-1 text-[11px] font-semibold text-white" style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)" }}>
                      {tpl.typography.heading === "serif" ? "Klasik Serif" : "Modern Sans"}
                    </span>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Title + color dots */}
                    <div className="flex items-center justify-between mb-3">
                      <h3
                        className="text-lg font-semibold tracking-tight transition-colors"
                        style={{ color: "#1A1A2E" }}
                      >
                        {tpl.name}
                      </h3>
                      <div className="flex gap-1.5 p-1 rounded-full" style={{ background: "rgba(0,0,0,0.04)" }}>
                        <span className="h-3.5 w-3.5 rounded-full border border-white/50" style={{ backgroundColor: tpl.colors.primary }} />
                        <span className="h-3.5 w-3.5 rounded-full border border-white/50" style={{ backgroundColor: tpl.colors.secondary }} />
                        <span className="h-3.5 w-3.5 rounded-full border border-white/50" style={{ backgroundColor: tpl.colors.accent }} />
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed line-clamp-3" style={{ color: "#6B7280" }}>
                      {tpl.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div
                    className="mt-6 flex flex-col gap-2.5 pt-5"
                    style={{ borderTop: `1px solid ${accentColor}22` }}
                  >
                    <Link href={`/demo/shava-dedek?template=${tpl.slug}`} className="w-full" target="_blank">
                      <button className="btn-secondary w-full py-2.5 text-xs font-medium flex items-center justify-center gap-1.5 active:scale-95 transition-all" style={{ borderRadius: 12 }}>
                        <Eye className="h-3.5 w-3.5" style={{ color: accentColor }} />
                        <span>Lihat Demo Langsung</span>
                      </button>
                    </Link>

                    <Link href={`/create?template=${tpl.slug}`} className="w-full">
                      <button
                        className="btn-primary w-full py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                        style={{ borderRadius: 12 }}
                      >
                        <span>Gunakan Template Ini</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="glass-card inline-block px-8 py-6 text-center">
            <p className="text-sm mb-4" style={{ color: "#6B7280" }}>
              Tidak yakin dengan template mana? Coba semua demo gratis terlebih dahulu.
            </p>
            <Link href="/create">
              <button className="btn-primary px-7 py-3 text-sm font-semibold flex items-center gap-2 mx-auto">
                Mulai Buat Sekarang
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
