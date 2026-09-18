"use client";

import React, { useState, useEffect } from "react";
import type { TemplateConfig } from "@/types/invitation";

interface CountdownSectionProps {
  targetDate: string;
  config: TemplateConfig;
}

export function CountdownSection({ targetDate, config }: CountdownSectionProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    function calculateTime() {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const items = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  return (
    <section className="py-12 px-6 text-center">
      <div className="mx-auto max-w-lg space-y-6">
        <h3
          className={`text-xl font-semibold tracking-wide ${
            config.typography.heading === "serif" ? "font-serif" : "font-sans"
          }`}
          style={{ color: config.colors.primary }}
        >
          Menuju Hari Bahagia
        </h3>

        <div className="grid grid-cols-4 gap-3 sm:gap-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="rounded-xl p-3 sm:p-4 shadow-sm border flex flex-col items-center justify-center transition-transform hover:scale-105"
              style={{
                backgroundColor: config.colors.accent,
                borderColor: `${config.colors.secondary}30`,
              }}
            >
              <span
                className="text-2xl sm:text-3xl font-bold tracking-tight"
                style={{ color: config.colors.primary }}
              >
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="mt-1 text-[10px] sm:text-xs uppercase tracking-wider opacity-70">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
