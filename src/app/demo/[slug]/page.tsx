"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Palette } from "lucide-react";
import { DEMO_INVITATION } from "@/lib/demo-data";
import { InvitationRenderer } from "@/components/invitation/invitation-renderer";
import { Button } from "@/components/ui/button";

export default function DemoPage() {
  const searchParams = useSearchParams();
  const initialTemplate = searchParams.get("template") || "elegant";

  const [currentTemplate, setCurrentTemplate] = useState<string>(initialTemplate);

  const templateOptions = [
    { slug: "elegant", label: "01 Elegant" },
    { slug: "minimalist", label: "02 Minimalist" },
    { slug: "nusantara", label: "03 Nusantara" },
  ];

  return (
    <div className="relative min-h-screen bg-zinc-950">
      {/* Top Demo Bar */}
      <div className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-900/90 px-4 py-2.5 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 text-xs text-white">
          <Link
            href="/templates"
            className="inline-flex items-center gap-1.5 font-medium text-zinc-400 hover:text-white transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Katalog Template</span>
          </Link>

          {/* Template Switcher Live Controls */}
          <div className="flex items-center gap-1 bg-zinc-800/90 p-1 rounded-lg border border-zinc-700">
            <Palette className="h-3.5 w-3.5 text-zinc-400 ml-1 mr-0.5" />
            {templateOptions.map((opt) => (
              <button
                key={opt.slug}
                onClick={() => setCurrentTemplate(opt.slug)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  currentTemplate === opt.slug
                    ? "bg-white text-zinc-950 shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <Link href={`/create?template=${currentTemplate}`}>
            <Button size="sm" className="h-8 bg-white text-zinc-950 hover:bg-zinc-100 font-semibold">
              <span>Gunakan Desain Ini</span>
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Invitation Demo Frame */}
      <div className="w-full">
        <InvitationRenderer
          data={DEMO_INVITATION}
          templateSlug={currentTemplate}
          guestName="Bapak Budi Santoso & Keluarga"
          isPreview={true}
        />
      </div>
    </div>
  );
}
