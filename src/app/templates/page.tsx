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
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Beranda</span>
          </Link>
          <span className="font-bold text-sm tracking-tight text-zinc-900 dark:text-white">
            TITIK TEMU INVITATION
          </span>
          <Link href="/create">
            <Button size="sm">Buat Undangan</Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="secondary" className="mb-3 gap-1 py-1 px-3">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>Koleksi Desain Eksklusif</span>
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Pilih Tema Undangan Anda
          </h1>
          <p className="mt-3 text-sm text-zinc-500 sm:text-base">
            Setiap template dirancang secara teliti dengan komposisi warna, tipografi berkelas, dan tata letak mobile-first yang memukau.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {templates.map((tpl) => (
            <Card key={tpl.slug} className="overflow-hidden flex flex-col justify-between border-zinc-200 dark:border-zinc-800 transition hover:shadow-lg">
              {/* Preview Thumbnail */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                <Image
                  src={previewImages[tpl.slug] || previewImages.elegant}
                  alt={tpl.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span
                    className="rounded-full px-3 py-1 text-xs font-semibold shadow-sm text-white"
                    style={{ backgroundColor: tpl.colors.primary }}
                  >
                    Style: {tpl.typography.heading === "serif" ? "Klasik Serif" : "Modern Sans"}
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{tpl.name}</CardTitle>
                  <div className="flex gap-1.5">
                    <span
                      className="h-4 w-4 rounded-full border border-black/10 shadow-sm"
                      style={{ backgroundColor: tpl.colors.primary }}
                      title="Warna Utama"
                    />
                    <span
                      className="h-4 w-4 rounded-full border border-black/10 shadow-sm"
                      style={{ backgroundColor: tpl.colors.secondary }}
                      title="Warna Sekunder"
                    />
                    <span
                      className="h-4 w-4 rounded-full border border-black/10 shadow-sm"
                      style={{ backgroundColor: tpl.colors.accent }}
                      title="Warna Aksen"
                    />
                  </div>
                </div>
                <CardDescription className="line-clamp-3 mt-2 text-xs sm:text-sm">
                  {tpl.description}
                </CardDescription>
              </CardHeader>

              {/* Actions */}
              <CardFooter className="flex flex-col gap-2.5 pt-0">
                <Link
                  href={`/demo/shava-dedek?template=${tpl.slug}`}
                  className="w-full"
                >
                  <Button variant="outline" className="w-full justify-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>Lihat Demo Langsung</span>
                  </Button>
                </Link>

                <Link
                  href={`/create?template=${tpl.slug}`}
                  className="w-full"
                >
                  <Button className="w-full justify-center gap-1.5">
                    <span>Gunakan Template Ini</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
