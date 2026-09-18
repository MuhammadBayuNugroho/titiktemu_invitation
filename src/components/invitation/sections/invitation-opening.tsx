import React from "react";
import type { InvitationData, TemplateConfig } from "@/types/invitation";

interface InvitationOpeningProps {
  data: InvitationData;
  config: TemplateConfig;
}

export function InvitationOpening({ data, config }: InvitationOpeningProps) {
  return (
    <section className="py-16 px-6 text-center">
      <div className="mx-auto max-w-xl space-y-6">
        <div className="inline-flex items-center justify-center">
          <span
            className="text-xs uppercase tracking-[0.25em] font-medium"
            style={{ color: config.colors.secondary }}
          >
            Assalamu’alaikum Warahmatullahi Wabarakatuh
          </span>
        </div>

        {data.openingText && (
          <blockquote
            className={`text-sm md:text-base leading-relaxed italic opacity-90 px-4 py-2 border-y ${
              config.typography.heading === "serif" ? "font-serif" : "font-sans"
            }`}
            style={{
              borderColor: `${config.colors.secondary}40`,
              color: config.colors.foreground,
            }}
          >
            &ldquo;{data.openingText}&rdquo;
          </blockquote>
        )}

        <p className="text-xs md:text-sm leading-relaxed opacity-80 max-w-md mx-auto">
          Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan syukuran pernikahan putra-putri kami:
        </p>
      </div>
    </section>
  );
}
