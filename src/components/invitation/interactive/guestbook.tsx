"use client";

import { useState, useEffect, useCallback } from "react";
import { Send, Heart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface WishItem {
  id: string;
  sender_name: string;
  message: string;
  relationship?: string;
  created_at: string;
}

interface GuestbookProps {
  invitationId: string;
  initialWishes?: WishItem[];
}

export function Guestbook({ invitationId, initialWishes = [] }: GuestbookProps) {
  const [wishes, setWishes] = useState<WishItem[]>(initialWishes);
  const [senderName, setSenderName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch wishes from API
  const fetchWishes = useCallback(async () => {
    setFetching(true);
    try {
      const res = await fetch(`/api/wishes?invitationId=${invitationId}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.wishes)) {
        setWishes(data.wishes);
      }
    } catch (err) {
      console.error("Failed to fetch wishes:", err);
    } finally {
      setFetching(false);
    }
  }, [invitationId]);

  useEffect(() => {
    if (invitationId) {
      fetchWishes();
    }
  }, [invitationId, fetchWishes]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !senderName.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invitationId,
          senderName,
          message,
          relationship: relationship || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal mengirim ucapan.");
      }

      // Add to local list dynamically
      const newWishObj: WishItem = {
        id: data.wish?.id || String(Date.now()),
        sender_name: senderName,
        message: message,
        relationship: relationship,
        created_at: new Date().toISOString(),
      };

      setWishes([newWishObj, ...wishes]);
      setMessage("");
      setSenderName("");
      setRelationship("");
    } catch (err: any) {
      setError(err.message || "Gagal mengirim ucapan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-stone-900/80 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-800/40 text-amber-300 text-xs">
          <Heart className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>Buku Tamu Digital</span>
        </div>
        <h3 className="font-serif text-2xl text-amber-100 font-light">Ucapan & Doa Restu</h3>
        <p className="text-xs text-stone-400">Kirimkan doa dan ucapan terbaik untuk kedua mempelai</p>
      </div>

      {/* Write Wish Form */}
      <form onSubmit={handleSubmit} className="bg-stone-950/80 border border-stone-800/80 rounded-2xl p-5 space-y-4">
        {error && (
          <div className="p-2.5 rounded-lg bg-red-950/50 border border-red-800 text-red-200 text-xs text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-stone-400 font-medium">Nama Anda</label>
            <Input
              required
              placeholder="Nama Anda"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="mt-1 bg-stone-900 border-stone-800 text-stone-100 text-sm focus:border-amber-400"
            />
          </div>
          <div>
            <label className="text-xs text-stone-400 font-medium">Hubungan / Kerabat (Opsional)</label>
            <Input
              placeholder="Contoh: Teman SMA, Sahabat"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              className="mt-1 bg-stone-900 border-stone-800 text-stone-100 text-sm focus:border-amber-400"
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-stone-400 font-medium">Ucapan & Doa</label>
          <Textarea
            required
            rows={3}
            placeholder="Tulis ucapan dan doa hangat Anda di sini..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 bg-stone-900 border-stone-800 text-stone-100 text-sm focus:border-amber-400 resize-none"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold py-5 rounded-xl text-sm flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Mengirim Ucapan...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Kirim Ucapan
            </>
          )}
        </Button>
      </form>

      {/* Wishes List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-stone-400 border-b border-stone-800 pb-2">
          <span>Total Ucapan ({wishes.length})</span>
          {fetching && <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />}
        </div>

        {wishes.length === 0 ? (
          <div className="text-center py-8 text-stone-500 text-xs">
            Belum ada ucapan. Jadilah yang pertama memberikan doa restu!
          </div>
        ) : (
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
            {wishes.map((item) => (
              <div
                key={item.id}
                className="bg-stone-950/60 border border-stone-800/80 rounded-2xl p-4 space-y-2 text-left transition-all hover:border-stone-700/80"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-serif text-sm font-medium text-amber-100">{item.sender_name}</span>
                    {item.relationship && (
                      <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-stone-800 text-amber-300/80 font-mono">
                        {item.relationship}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-stone-500">
                    {new Date(item.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                </div>
                {/* Safe plain text render — NO dangerouslySetInnerHTML */}
                <p className="text-xs text-stone-300 leading-relaxed font-light whitespace-pre-line">
                  {item.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
