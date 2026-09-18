import React from "react";
import Image from "next/image";
import type { InvitationData, TemplateConfig } from "@/types/invitation";

interface CoupleProfileProps {
  data: InvitationData;
  config: TemplateConfig;
}

export function CoupleProfile({ data, config }: CoupleProfileProps) {
  const brideImage = data.media.gallery[0]?.url || data.media.coverImageUrl;
  const groomImage = data.media.gallery[1]?.url || data.media.coverImageUrl;

  return (
    <section className="py-12 px-6">
      <div className="mx-auto max-w-2xl space-y-12 text-center">
        {/* Bride Profile */}
        <div className="space-y-4 flex flex-col items-center">
          {brideImage && (
            <div
              className="relative h-44 w-44 overflow-hidden rounded-full p-1.5 shadow-md"
              style={{ border: `2px solid ${config.colors.secondary}` }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-full">
                <Image
                  src={brideImage}
                  alt={data.couple.brideFullName}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <h3
              className={`text-2xl md:text-3xl font-semibold tracking-wide ${
                config.typography.heading === "serif" ? "font-serif italic" : "font-sans"
              }`}
              style={{ color: config.colors.primary }}
            >
              {data.couple.brideFullName}
            </h3>
            <p className="text-xs md:text-sm opacity-75 max-w-sm mx-auto">
              {data.couple.brideParentNames}
            </p>
          </div>

          {data.couple.brideSocial && (
            <a
              href={`https://instagram.com/${data.couple.brideSocial.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium opacity-80 hover:opacity-100 transition"
              style={{ color: config.colors.primary }}
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span>{data.couple.brideSocial}</span>
            </a>
          )}
        </div>

        {/* Ampersand Divider */}
        <div className="flex items-center justify-center">
          <span
            className={`text-3xl md:text-4xl font-light ${
              config.typography.heading === "serif" ? "font-serif italic" : "font-sans"
            }`}
            style={{ color: config.colors.secondary }}
          >
            &
          </span>
        </div>

        {/* Groom Profile */}
        <div className="space-y-4 flex flex-col items-center">
          {groomImage && (
            <div
              className="relative h-44 w-44 overflow-hidden rounded-full p-1.5 shadow-md"
              style={{ border: `2px solid ${config.colors.secondary}` }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-full">
                <Image
                  src={groomImage}
                  alt={data.couple.groomFullName}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <h3
              className={`text-2xl md:text-3xl font-semibold tracking-wide ${
                config.typography.heading === "serif" ? "font-serif italic" : "font-sans"
              }`}
              style={{ color: config.colors.primary }}
            >
              {data.couple.groomFullName}
            </h3>
            <p className="text-xs md:text-sm opacity-75 max-w-sm mx-auto">
              {data.couple.groomParentNames}
            </p>
          </div>

          {data.couple.groomSocial && (
            <a
              href={`https://instagram.com/${data.couple.groomSocial.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium opacity-80 hover:opacity-100 transition"
              style={{ color: config.colors.primary }}
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span>{data.couple.groomSocial}</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
