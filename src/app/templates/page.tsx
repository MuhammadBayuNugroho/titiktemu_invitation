import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Eye, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllTemplates } from "@/lib/templates/registry";

export const metadata = {
  title: "Katalog Template Undangan Digital — Titik Temu Invitation",
  description: "Pilih desain undangan pernikahan favorit Anda: 01 Elegant, 02 Minimalist, atau 03 Nusantara.",
};

export default function TemplatesPage() {
  const templates = getAllTemplates();

  const previewImages: Record<string, string> = {
    elegant: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
    minimalist: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
    nusantara: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop",
  };

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] flex flex-col selection:bg-amber-500/20 selection:text-amber-900">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#6E6E73] transition hover:text-[#1D1D1F]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Beranda</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <span className="font-semibold text-xs sm:text-sm tracking-tight text-[#1D1D1F]">
              TITIK TEMU INVITATION
            </span>
          </div>
          <Link href="/create">
            <Button size="sm" className="apple-button-primary rounded-full px-4 text-xs">
              Buat Undangan
            </Button>
          </Link>
        </div>
      </header>

      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-amber-200/20 via-rose-100/15 to-transparent blur-3xl" />
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
        <div className="text-center max-w-2xl mx-auto mb-14 animate-apple-fade-up">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white border border-black/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.04)] text-[#1D1D1F] mb-4 hover-lift-apple cursor-default">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            <span>Koleksi Desain Eksklusif</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F]">
            Pilih Tema Undangan Anda
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#6E6E73] leading-relaxed">
            Setiap tema dirancang presisi dengan tipografi berkelas, micro-animation responsif, dan tata letak mobile-first yang memukau.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {templates.map((tpl, idx) => {
            const delayClass =
              idx === 0
                ? "animation-delay-100"
                : idx === 1
                ? "animation-delay-200"
                : "animation-delay-300";

            return (
              <div
                key={tpl.slug}
                className={`apple-card hover-lift-apple overflow-hidden flex flex-col justify-between rounded-2xl group animate-apple-fade-up ${delayClass}`}
              >
                {/* Preview Thumbnail */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100 border-b border-black/[0.06]">
                  <Image
                    src={previewImages[tpl.slug] || previewImages.elegant}
                    alt={tpl.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full px-3 py-1 text-[11px] font-semibold backdrop-blur-md bg-black/60 text-white shadow-sm">
                      {tpl.typography.heading === "serif" ? "Klasik Serif" : "Modern Sans"}
                    </span>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-[#1D1D1F] tracking-tight group-hover:text-amber-800 transition-colors">
                        {tpl.name}
                      </h3>
                      <div className="flex gap-1.5 p-1 bg-zinc-100/70 rounded-full border border-black/[0.04]">
                        <span
                          className="h-3.5 w-3.5 rounded-full border border-black/10"
                          style={{ backgroundColor: tpl.colors.primary }}
                          title="Warna Utama"
                        />
                        <span
                          className="h-3.5 w-3.5 rounded-full border border-black/10"
                          style={{ backgroundColor: tpl.colors.secondary }}
                          title="Warna Sekunder"
                        />
                        <span
                          className="h-3.5 w-3.5 rounded-full border border-black/10"
                          style={{ backgroundColor: tpl.colors.accent }}
                          title="Warna Aksen"
                        />
                      </div>
                    </div>
                    <p className="mt-3 text-xs sm:text-sm text-[#6E6E73] leading-relaxed line-clamp-3">
                      {tpl.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex flex-col gap-2.5 pt-4 border-t border-black/[0.04]">
                    <Link
                      href={`/demo/shava-dedek?template=${tpl.slug}`}
                      className="w-full"
                    >
                      <button className="apple-button-secondary w-full py-2 px-3 text-xs font-medium rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition-all">
                        <Eye className="h-3.5 w-3.5 text-[#6E6E73]" />
                        <span>Lihat Demo Langsung</span>
                      </button>
                    </Link>

                    <Link
                      href={`/create?template=${tpl.slug}`}
                      className="w-full"
                    >
                      <button className="apple-button-primary w-full py-2 px-3 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition-all">
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
      </main>
    </div>
  );
}
