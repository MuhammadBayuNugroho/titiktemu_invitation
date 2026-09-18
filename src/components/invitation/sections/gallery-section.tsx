"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { MediaData, TemplateConfig } from "@/types/invitation";

interface GallerySectionProps {
  media: MediaData;
  config: TemplateConfig;
}

export function GallerySection({ media, config }: GallerySectionProps) {
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  if (!media.gallery || media.gallery.length === 0) return null;

  return (
    <section className="py-12 px-6">
      <div className="mx-auto max-w-xl space-y-8 text-center">
        <div>
          <span
            className="text-xs uppercase tracking-[0.25em] font-medium"
            style={{ color: config.colors.secondary }}
          >
            Momen Bahagia
          </span>
          <h2
            className={`mt-2 text-2xl sm:text-3xl font-bold ${
              config.typography.heading === "serif" ? "font-serif italic" : "font-sans"
            }`}
            style={{ color: config.colors.primary }}
          >
            Galeri Foto
          </h2>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {media.gallery.map((photo, index) => (
            <div
              key={index}
              onClick={() => setActivePhoto(photo.url)}
              className="group relative aspect-square overflow-hidden rounded-xl border shadow-sm cursor-pointer transition-transform hover:scale-[1.02]"
              style={{ borderColor: `${config.colors.secondary}30` }}
            >
              <Image
                src={photo.url}
                alt={`Momen ${index + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setActivePhoto(null)}
        >
          <button
            onClick={() => setActivePhoto(null)}
            className="absolute top-4 right-4 text-white hover:text-zinc-300 p-2 rounded-full bg-black/40 cursor-pointer"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative max-h-[85vh] max-w-[90vw] aspect-[3/4] w-full max-w-md overflow-hidden rounded-2xl">
            <Image
              src={activePhoto}
              alt="Pratinjau Foto"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
