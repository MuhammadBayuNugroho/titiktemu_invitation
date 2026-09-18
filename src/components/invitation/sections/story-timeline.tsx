import React from "react";
import type { StoryItem, TemplateConfig } from "@/types/invitation";

interface StoryTimelineProps {
  stories: StoryItem[];
  config: TemplateConfig;
}

export function StoryTimeline({ stories, config }: StoryTimelineProps) {
  if (!stories || stories.length === 0) return null;

  return (
    <section className="py-12 px-6">
      <div className="mx-auto max-w-xl space-y-8 text-center">
        <div>
          <span
            className="text-xs uppercase tracking-[0.25em] font-medium"
            style={{ color: config.colors.secondary }}
          >
            Kisah Kami
          </span>
          <h2
            className={`mt-2 text-2xl sm:text-3xl font-bold ${
              config.typography.heading === "serif" ? "font-serif italic" : "font-sans"
            }`}
            style={{ color: config.colors.primary }}
          >
            Love Story
          </h2>
        </div>

        <div className="relative border-l-2 ml-4 md:mx-auto md:max-w-md text-left pl-6 space-y-8" style={{ borderColor: `${config.colors.secondary}40` }}>
          {stories.map((item, index) => (
            <div key={index} className="relative space-y-1.5">
              {/* Timeline Bullet */}
              <div
                className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border-2 bg-white"
                style={{
                  borderColor: config.colors.primary,
                  backgroundColor: config.colors.primary,
                }}
              />

              {item.year && (
                <span
                  className="text-xs font-bold tracking-wider uppercase"
                  style={{ color: config.colors.secondary }}
                >
                  {item.year}
                </span>
              )}

              <h4
                className={`text-base font-semibold ${
                  config.typography.heading === "serif" ? "font-serif" : "font-sans"
                }`}
                style={{ color: config.colors.primary }}
              >
                {item.title}
              </h4>

              <p className="text-xs md:text-sm leading-relaxed opacity-80">
                {item.story}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
