"use client";

import { useState } from "react";
import { CheckCircle2, UserCheck, UserX, HelpCircle, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface RSVPFormProps {
  invitationId: string;
  guestName?: string;
  themeColor?: string;
}

export function RSVPForm({ invitationId, guestName: initialGuestName = "" }: RSVPFormProps) {
  const [guestName, setGuestName] = useState(initialGuestName);
  const [attendanceStatus, setAttendanceStatus] = useState<"attending" | "declined" | "uncertain">("attending");
  const [paxCount, setPaxCount] = useState(1);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invitationId,
          guestName,
          attendanceStatus,
          paxCount,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal mengirim konfirmasi kehadiran.");
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-stone-900/90 border border-amber-500/30 rounded-3xl p-8 text-center space-y-4">
        <div className="mx-auto w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
          <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
        </div>
        <h3 className="font-serif text-xl text-amber-100 font-light">Konfirmasi Kehadiran Terkirim</h3>
        <p className="text-stone-400 text-sm max-w-sm mx-auto">
          Terima kasih <span className="text-amber-200 font-medium">{guestName}</span>. Tanggapan Anda telah tercatat dengan baik.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-stone-900/80 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6">
      <div className="text-center space-y-1">
        <h3 className="font-serif text-2xl text-amber-100 font-light">Konfirmasi Kehadiran (RSVP)</h3>
        <p className="text-xs text-stone-400">Mohon konfirmasikan kehadiran Anda untuk membantu persiapan kami</p>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-200 text-xs text-center">
          {error}
        </div>
      )}

      {/* Guest Name */}
      <div className="space-y-1.5">
        <label className="text-xs text-stone-300 font-medium">Nama Anda</label>
        <Input
          required
          placeholder="Masukkan nama lengkap Anda"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          className="bg-stone-950 border-stone-800 text-stone-100 text-sm focus:border-amber-400"
        />
      </div>

      {/* Status Buttons */}
      <div className="space-y-1.5">
        <label className="text-xs text-stone-300 font-medium">Konfirmasi Kehadiran</label>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setAttendanceStatus("attending")}
            className={`p-3 rounded-xl border text-xs font-medium flex flex-col items-center gap-1.5 transition-all ${
              attendanceStatus === "attending"
                ? "bg-emerald-950/40 border-emerald-500/80 text-emerald-300 shadow-md shadow-emerald-950/40"
                : "bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700"
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Hadir</span>
          </button>

          <button
            type="button"
            onClick={() => setAttendanceStatus("uncertain")}
            className={`p-3 rounded-xl border text-xs font-medium flex flex-col items-center gap-1.5 transition-all ${
              attendanceStatus === "uncertain"
                ? "bg-amber-950/40 border-amber-500/80 text-amber-300 shadow-md shadow-amber-950/40"
                : "bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Ragu-ragu</span>
          </button>

          <button
            type="button"
            onClick={() => setAttendanceStatus("declined")}
            className={`p-3 rounded-xl border text-xs font-medium flex flex-col items-center gap-1.5 transition-all ${
              attendanceStatus === "declined"
                ? "bg-rose-950/40 border-rose-500/80 text-rose-300 shadow-md shadow-rose-950/40"
                : "bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700"
            }`}
          >
            <UserX className="w-4 h-4" />
            <span>Tidak Hadir</span>
          </button>
        </div>
      </div>

      {/* Pax Count if attending */}
      {attendanceStatus !== "declined" && (
        <div className="space-y-1.5">
          <label className="text-xs text-stone-300 font-medium">Jumlah Tamu Hadir</label>
          <select
            value={paxCount}
            onChange={(e) => setPaxCount(Number(e.target.value))}
            className="w-full bg-stone-950 border border-stone-800 rounded-xl p-2.5 text-stone-100 text-sm focus:border-amber-400 outline-none"
          >
            <option value={1}>1 Orang</option>
            <option value={2}>2 Orang</option>
            <option value={3}>3 Orang</option>
            <option value={4}>4 Orang</option>
          </select>
        </div>
      )}

      {/* Notes */}
      <div className="space-y-1.5">
        <label className="text-xs text-stone-300 font-medium">Catatan / Ucapan Singkat (Opsional)</label>
        <Textarea
          rows={3}
          placeholder="Tuliskan pesan atau doa..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="bg-stone-950 border-stone-800 text-stone-100 text-sm focus:border-amber-400 resize-none"
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold py-6 rounded-xl text-sm flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Mengirim...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Kirim Konfirmasi
          </>
        )}
      </Button>
    </form>
  );
}
