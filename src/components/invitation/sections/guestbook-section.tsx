"use client";

import React, { useState } from "react";
import { Send, User } from "lucide-react";
import type { TemplateConfig, WishInput } from "@/types/invitation";

interface WishItem {
  id?: string;
  name: string;
  message: string;
  createdAt?: string;
}

interface GuestbookSectionProps {
  invitationId?: string;
  config: TemplateConfig;
  defaultGuestName?: string;
  initialWishes?: WishItem[];
  onWishSubmit?: (data: WishInput) => Promise<boolean>;
}

export function GuestbookSection({
  invitationId = "mock-id",
  config,
  defaultGuestName = "",
  initialWishes = [
    {
      name: "Rizky & Amanda",
      message: "Barakallahu lakum wa baraka alaikum wa jama'a bainakuma fii khair. Selamat menempuh hidup baru Shava dan Dedek!",
    },
    {
      name: "Dimas Prasetyo",
      message: "Selamat ya bro Dedek dan Shava, semoga samawa till jannah!",
    },
    {
      name: "Keluarga Besar Bpk. Hendra",
      message: "Selamat berbahagia untuk kedua mempelai dan keluarga besar. Semoga selalu dilimpahkan keberkahan.",
    },
  ],
  onWishSubmit,
}: GuestbookSectionProps) {
  const [wishes, setWishes] = useState<WishItem[]>(initialWishes);
  const [name, setName] = useState(defaultGuestName);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  React.useEffect(() => {
    if (invitationId && invitationId !== "mock-id") {
      fetch(`/api/wishes?invitationId=${invitationId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && Array.isArray(data.wishes) && data.wishes.length > 0) {
            setWishes(
              data.wishes.map((w: any) => ({
                id: w.id,
                name: w.name || w.sender_name || "Tamu",
                message: w.message,
                createdAt: w.created_at || w.createdAt,
              }))
            );
          }
        })
        .catch(() => {});
    }
  }, [invitationId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setErrorMessage("Mohon lengkapi nama dan ucapan Anda.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      if (onWishSubmit) {
        await onWishSubmit({ invitationId, name, message });
      } else if (invitationId && invitationId !== "mock-id") {
        await fetch("/api/wishes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ invitationId, senderName: name, message }),
        });
      } else {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      setWishes([{ name, message, createdAt: "Baru saja" }, ...wishes]);
      setMessage("");
    } catch {
      setErrorMessage("Gagal mengirim doa dan ucapan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 px-6">
      <div className="mx-auto max-w-xl space-y-8 text-center">
        <div>
          <span
            className="text-xs uppercase tracking-[0.25em] font-medium"
            style={{ color: config.colors.secondary }}
          >
            Doa & Harapan
          </span>
          <h2
            className={`mt-2 text-2xl sm:text-3xl font-bold ${
              config.typography.heading === "serif" ? "font-serif italic" : "font-sans"
            }`}
            style={{ color: config.colors.primary }}
          >
            Buku Ucapan
          </h2>
          <p className="mt-2 text-xs md:text-sm opacity-80 max-w-md mx-auto leading-relaxed">
            Berikan ucapan selamat dan doa restu terbaik Anda untuk kedua mempelai.
          </p>
        </div>

        {/* Wish Form */}
        <div
          className="rounded-2xl p-6 border shadow-sm text-left"
          style={{
            backgroundColor: config.colors.background,
            borderColor: `${config.colors.secondary}40`,
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="rounded-lg bg-red-50 p-2.5 text-xs text-red-600 border border-red-200">
                {errorMessage}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-80">
                Nama Anda
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama"
                className="w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition"
                style={{
                  backgroundColor: config.colors.accent,
                  borderColor: `${config.colors.secondary}40`,
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-80">
                Ucapan & Doa
              </label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tuliskan ucapan dan doa terbaik..."
                className="w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition"
                style={{
                  backgroundColor: config.colors.accent,
                  borderColor: `${config.colors.secondary}40`,
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl py-3 px-4 text-xs font-bold uppercase tracking-wider shadow-md transition-transform active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              style={{
                backgroundColor: config.colors.primary,
                color: "#ffffff",
              }}
            >
              <Send className="h-3.5 w-3.5" />
              <span>{isSubmitting ? "Mengirim..." : "Kirim Ucapan"}</span>
            </button>
          </form>
        </div>

        {/* Wishes List */}
        <div className="space-y-3 text-left max-h-96 overflow-y-auto pr-1">
          {wishes.map((wish, index) => (
            <div
              key={index}
              className="rounded-xl p-4 border shadow-sm space-y-1.5"
              style={{
                backgroundColor: config.colors.accent,
                borderColor: `${config.colors.secondary}25`,
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: config.colors.primary,
                      color: "#ffffff",
                    }}
                  >
                    <User className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs font-bold" style={{ color: config.colors.primary }}>
                    {wish.name}
                  </span>
                </div>
                {wish.createdAt && (
                  <span className="text-[10px] opacity-60">{wish.createdAt}</span>
                )}
              </div>
              <p className="text-xs md:text-sm leading-relaxed opacity-90 pl-8 whitespace-pre-line">
                {wish.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
