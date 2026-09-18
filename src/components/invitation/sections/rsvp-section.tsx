"use client";

import React, { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import type { TemplateConfig, RSVPInput } from "@/types/invitation";

interface RSVPSectionProps {
  invitationId?: string;
  config: TemplateConfig;
  defaultGuestName?: string;
  onRSVPSubmit?: (data: RSVPInput) => Promise<boolean>;
}

export function RSVPSection({
  invitationId = "mock-id",
  config,
  defaultGuestName = "",
  onRSVPSubmit,
}: RSVPSectionProps) {
  const [formData, setFormData] = useState<RSVPInput>({
    invitationId,
    name: defaultGuestName,
    attendance: "hadir",
    guestCount: 1,
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMessage("Mohon lengkapi nama Anda.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      if (onRSVPSubmit) {
        await onRSVPSubmit(formData);
      } else if (invitationId && invitationId !== "mock-id") {
        await fetch("/api/rsvp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            invitationId,
            guestName: formData.name,
            attendanceStatus:
              formData.attendance === "hadir"
                ? "attending"
                : formData.attendance === "tidak_hadir"
                ? "declined"
                : "uncertain",
            paxCount: formData.guestCount,
            notes: formData.message,
          }),
        });
      } else {
        // Fallback for demo mode
        await new Promise((resolve) => setTimeout(resolve, 600));
      }
      setIsSubmitted(true);
    } catch {
      setErrorMessage("Gagal mengirim konfirmasi. Silakan coba lagi.");
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
            Konfirmasi Kehadiran
          </span>
          <h2
            className={`mt-2 text-2xl sm:text-3xl font-bold ${
              config.typography.heading === "serif" ? "font-serif italic" : "font-sans"
            }`}
            style={{ color: config.colors.primary }}
          >
            RSVP
          </h2>
          <p className="mt-2 text-xs md:text-sm opacity-80 max-w-md mx-auto leading-relaxed">
            Mohon kesediaan Bapak/Ibu/Saudara/i untuk mengonfirmasi kehadiran demi kenyamanan acara.
          </p>
        </div>

        <div
          className="rounded-2xl p-6 sm:p-8 border shadow-sm text-left"
          style={{
            backgroundColor: config.colors.background,
            borderColor: `${config.colors.secondary}40`,
          }}
        >
          {isSubmitted ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 className="h-12 w-12 mx-auto text-emerald-600" />
              <h3 className="text-lg font-bold" style={{ color: config.colors.primary }}>
                Terima Kasih atas Konfirmasi Anda!
              </h3>
              <p className="text-xs md:text-sm opacity-75 max-w-xs mx-auto">
                Konfirmasi kehadiran Anda telah tersimpan dengan baik.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="rounded-lg bg-red-50 p-3 text-xs text-red-600 border border-red-200">
                  {errorMessage}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-80">
                  Nama Tamu
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Masukkan nama lengkap"
                  className="w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition focus:ring-2"
                  style={{
                    backgroundColor: config.colors.accent,
                    borderColor: `${config.colors.secondary}40`,
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-80">
                  Kepastian Kehadiran
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: "hadir", label: "Hadir" },
                    { value: "tidak_hadir", label: "Tidak Hadir" },
                    { value: "masih_ragu", label: "Masih Ragu" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          attendance: option.value as "hadir" | "tidak_hadir" | "masih_ragu",
                        })
                      }
                      className="rounded-xl border py-2.5 px-2 text-xs font-semibold text-center transition active:scale-95 cursor-pointer"
                      style={{
                        backgroundColor:
                          formData.attendance === option.value
                            ? config.colors.primary
                            : config.colors.accent,
                        color:
                          formData.attendance === option.value
                            ? "#ffffff"
                            : config.colors.foreground,
                        borderColor:
                          formData.attendance === option.value
                            ? config.colors.primary
                            : `${config.colors.secondary}40`,
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {formData.attendance === "hadir" && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-80">
                    Jumlah Tamu Hadir
                  </label>
                  <select
                    value={formData.guestCount}
                    onChange={(e) =>
                      setFormData({ ...formData, guestCount: parseInt(e.target.value, 10) })
                    }
                    className="w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition"
                    style={{
                      backgroundColor: config.colors.accent,
                      borderColor: `${config.colors.secondary}40`,
                    }}
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} Orang
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-80">
                  Pesan Singkat (Opsional)
                </label>
                <textarea
                  rows={2}
                  value={formData.message || ""}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tuliskan catatan tambahan..."
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
                <span>{isSubmitting ? "Mengirim..." : "Kirim Konfirmasi"}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
