"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Eye, Heart, Sparkles, Box } from "lucide-react";
import { getAllTemplates } from "@/lib/templates/registry";

export default function TemplatesPage() {
  const templates = getAllTemplates();
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const previewImages: Record<string, string> = {
    elegant:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
    minimalist:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
    nusantara:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop",
    celestial:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop",
    editorial:
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=800&auto=format&fit=crop",
    botanical:
      "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=800&auto=format&fit=crop",
  };

  const cardClasses: Record<string, string> = {
    elegant: "glass-card-rose",
    minimalist: "glass-card",
    nusantara: "glass-card-gold",
    celestial: "glass-card",
    editorial: "glass-card",
    botanical: "glass-card-rose",
  };

  const accentColors: Record<string, string> = {
    elegant: "#C9906C",
    minimalist: "#4A5568",
    nusantara: "#C9A84C",
    celestial: "#D4AF37",
    editorial: "#18181B",
    botanical: "#2D4A3E",
  };

  const categories: Record<string, string> = {
    elegant: "modern",
    minimalist: "modern",
    nusantara: "traditional",
    celestial: "luxury",
    editorial: "modern",
    botanical: "garden",
  };

  const filteredTemplates = templates.filter((tpl) => {
    if (selectedFilter === "all") return true;
    return categories[tpl.slug] === selectedFilter;
  });

  return (
    <div
      className="relative min-h-screen flex flex-col overflow-x-hidden"
      style={{
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
        <div className="glass-pill border-b" style={{ borderRadius: 0, borderLeft: "none", borderRight: "none", borderTop: "none" }}>
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
              <button className="btn-primary px-4 py-2 text-xs font-semibold flex items-center gap-1.5 cursor-pointer">
                Buat Undangan
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-6xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 animate-fade-up">
          <div
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold glass mb-4 cursor-default"
            style={{ color: "#C9906C" }}
          >
            <Sparkles className="h-3.5 w-3.5 animate-rotate-slow" style={{ color: "#C9A84C" }} />
            <span>Koleksi Desain Eksklusif</span>
          </div>
          <h1
            className="text-3xl sm:text-4xl font-light tracking-tight mb-3"
            style={{ color: "#1A1A2E" }}
          >
            Pilih Tema{" "}
            <span style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic" }}>
              Undangan Anda
            </span>
          </h1>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: "#6B7280" }}>
            Seluruh tema kini dilengkapi <strong>3D Interactive Motion Unboxing</strong>, segel lilin fisik, serta tata letak artistik yang dirancang khusus untuk kenyamanan tamu di layar smartphone.
          </p>

          {/* Filter Categories Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "all", label: "Semua Koleksi" },
              { id: "luxury", label: "Dark Luxury 3D" },
              { id: "modern", label: "Modern & Editorial" },
              { id: "traditional", label: "Adat Nusantara" },
              { id: "garden", label: "Botanical Garden" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  selectedFilter === f.id
                    ? "bg-[#1A1A2E] text-white shadow-sm"
                    : "glass text-zinc-600 hover:text-zinc-900"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid (2 or 3 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredTemplates.map((tpl, idx) => {
            const cardClass = cardClasses[tpl.slug] ?? "glass-card";
            const accentColor = accentColors[tpl.slug] ?? "#C9906C";

            return (
              <div
                key={tpl.slug}
                className={`${cardClass} hover-lift animate-fade-up overflow-hidden flex flex-col group`}
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                {/* Preview Thumbnail */}
                <div className="relative aspect-[4/3] w-full overflow-hidden" style={{ borderRadius: "inherit" }}>
                  <Image
                    src={previewImages[tpl.slug] || previewImages.elegant}
                    alt={tpl.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Overlay gradient */}
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.02) 60%, rgba(0,0,0,0.3) 100%)" }}
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                    <span className="rounded-full px-2.5 py-1 text-[10px] font-semibold text-white bg-black/60 backdrop-blur-md">
                      {tpl.typography.heading === "serif" ? "Klasik Serif" : "Modern Sans"}
                    </span>

                    <span className="rounded-full px-2.5 py-1 text-[10px] font-semibold text-amber-300 bg-black/70 backdrop-blur-md flex items-center gap-1 border border-amber-400/30">
                      <Box className="w-3 h-3" />
                      <span>3D Motion Cover</span>
                    </span>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Title + color dots */}
                    <div className="flex items-center justify-between mb-2.5">
                      <h3
                        className="text-lg font-semibold tracking-tight transition-colors"
                        style={{ color: "#1A1A2E" }}
                      >
                        {tpl.name}
                      </h3>
                      <div className="flex gap-1.5 p-1 rounded-full bg-black/5">
                        <span className="h-3 w-3 rounded-full border border-white/50" style={{ backgroundColor: tpl.colors.primary }} />
                        <span className="h-3 w-3 rounded-full border border-white/50" style={{ backgroundColor: tpl.colors.secondary }} />
                        <span className="h-3 w-3 rounded-full border border-white/50" style={{ backgroundColor: tpl.colors.accent }} />
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
                    <Link href={`/demo/shava-dedek?template=${tpl.slug}`} className="w-full">
                      <button className="btn-secondary w-full py-2.5 text-xs font-medium flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer" style={{ borderRadius: 12 }}>
                        <Eye className="h-3.5 w-3.5" style={{ color: accentColor }} />
                        <span>Lihat Demo Interaktif</span>
                      </button>
                    </Link>

                    <Link href={`/create?template=${tpl.slug}`} className="w-full">
                      <button
                        className="btn-primary w-full py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
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
          <div className="glass-card inline-block px-8 py-6 text-center max-w-lg mx-auto">
            <h4 className="text-sm font-semibold text-zinc-900 mb-1">
              Ingin Mencoba Semua Gerakan &amp; Efek 3D?
            </h4>
            <p className="text-xs mb-4 text-zinc-500">
              Buka demo langsung dan coba sentuh segel lilin serta goyangkan smartphone Anda untuk melihat efek kedalaman 3D secara nyata.
            </p>
            <Link href="/demo/shava-dedek">
              <button className="btn-primary px-6 py-2.5 text-xs font-semibold flex items-center gap-1.5 mx-auto cursor-pointer">
                Buka Demo Interaktif
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
