import React from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import type { InvitationData, TemplateConfig } from "@/types/invitation";
import { formatDateIndonesian } from "@/lib/utils";

interface EventSectionProps {
  data: InvitationData;
  config: TemplateConfig;
}

export function EventSection({ data, config }: EventSectionProps) {
  const { akad, reception, venueName, venueAddress, mapsUrl } = data.event;

  return (
    <section className="py-12 px-6">
      <div className="mx-auto max-w-xl space-y-8 text-center">
        <div>
          <span
            className="text-xs uppercase tracking-[0.25em] font-medium"
            style={{ color: config.colors.secondary }}
          >
            Waktu & Tempat
          </span>
          <h2
            className={`mt-2 text-2xl sm:text-3xl font-bold ${
              config.typography.heading === "serif" ? "font-serif italic" : "font-sans"
            }`}
            style={{ color: config.colors.primary }}
          >
            Rangkaian Acara
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/* Akad Card */}
          <div
            className="rounded-2xl p-6 border shadow-sm space-y-4"
            style={{
              backgroundColor: config.colors.background,
              borderColor: `${config.colors.secondary}40`,
            }}
          >
            <div className="space-y-1">
              <span
                className="text-xs uppercase tracking-widest font-bold"
                style={{ color: config.colors.secondary }}
              >
                Akad Nikah
              </span>
              <h3
                className={`text-lg font-semibold ${
                  config.typography.heading === "serif" ? "font-serif" : "font-sans"
                }`}
                style={{ color: config.colors.primary }}
              >
                Pemberkatan / Ijab Qabul
              </h3>
            </div>

            <div className="space-y-2 text-xs md:text-sm opacity-85">
              <div className="flex items-center gap-2.5">
                <Calendar className="h-4 w-4 shrink-0" style={{ color: config.colors.primary }} />
                <span>{formatDateIndonesian(akad.date)}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0" style={{ color: config.colors.primary }} />
                <span>
                  {akad.startTime} - {akad.endTime} {data.event.timezone === "Asia/Jakarta" ? "WIB" : ""}
                </span>
              </div>
            </div>
          </div>

          {/* Resepsi Card */}
          <div
            className="rounded-2xl p-6 border shadow-sm space-y-4"
            style={{
              backgroundColor: config.colors.background,
              borderColor: `${config.colors.secondary}40`,
            }}
          >
            <div className="space-y-1">
              <span
                className="text-xs uppercase tracking-widest font-bold"
                style={{ color: config.colors.secondary }}
              >
                Resepsi Pernikahan
              </span>
              <h3
                className={`text-lg font-semibold ${
                  config.typography.heading === "serif" ? "font-serif" : "font-sans"
                }`}
                style={{ color: config.colors.primary }}
              >
                Walimatul &lsquo;Ursy
              </h3>
            </div>

            <div className="space-y-2 text-xs md:text-sm opacity-85">
              <div className="flex items-center gap-2.5">
                <Calendar className="h-4 w-4 shrink-0" style={{ color: config.colors.primary }} />
                <span>{formatDateIndonesian(reception.date)}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0" style={{ color: config.colors.primary }} />
                <span>
                  {reception.startTime} - {reception.endTime} {data.event.timezone === "Asia/Jakarta" ? "WIB" : ""}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Venue Location Banner */}
        <div
          className="rounded-2xl p-6 border shadow-sm text-center space-y-3"
          style={{
            backgroundColor: config.colors.accent,
            borderColor: `${config.colors.secondary}40`,
          }}
        >
          <MapPin className="h-6 w-6 mx-auto" style={{ color: config.colors.primary }} />
          <h4 className="text-base font-semibold" style={{ color: config.colors.primary }}>
            {venueName}
          </h4>
          <p className="text-xs md:text-sm opacity-80 max-w-md mx-auto leading-relaxed">
            {venueAddress}
          </p>

          {mapsUrl && (
            <div className="pt-2">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold shadow transition active:scale-95"
                style={{
                  backgroundColor: config.colors.primary,
                  color: "#ffffff",
                }}
              >
                <MapPin className="h-3.5 w-3.5" />
                <span>Buka di Google Maps</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
