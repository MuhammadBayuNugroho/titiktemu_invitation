"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Users,
  UserCheck,
  HelpCircle,
  UserX,
  ExternalLink,
  Copy,
  Check,
  Share2,
  Plus,
  Trash2,
  Search,
  Filter,
  MessageCircle,
  FileSpreadsheet,
  Calendar,
  Sparkles,
  Heart,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateWhatsAppMessage, generateWhatsAppUrl } from "@/lib/whatsapp";
import type { GuestWithRSVP } from "@/types/invitation";

interface GuestManagerClientProps {
  token: string;
  initialInvitation: {
    id: string;
    slug: string;
    title: string;
    brideName: string;
    groomName: string;
    eventDate: string;
    status: string;
    customerAccessToken: string;
    templateName: string;
    templateSlug: string;
  };
  initialGuests: GuestWithRSVP[];
}

export function GuestManagerClient({
  token,
  initialInvitation,
  initialGuests,
}: GuestManagerClientProps) {
  const [guests, setGuests] = useState<GuestWithRSVP[]>(initialGuests);
  const [activeTab, setActiveTab] = useState<"single" | "bulk">("single");

  // Single form state
  const [singleName, setSingleName] = useState("");
  const [singlePhone, setSinglePhone] = useState("");
  const [singleCategory, setSingleCategory] = useState<
    "family" | "friend" | "coworker" | "organization" | "other"
  >("friend");
  const [isSubmittingSingle, setIsSubmittingSingle] = useState(false);

  // Bulk form state
  const [bulkText, setBulkText] = useState("");
  const [bulkCategory, setBulkCategory] = useState<
    "family" | "friend" | "coworker" | "organization" | "other"
  >("friend");
  const [isSubmittingBulk, setIsSubmittingBulk] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [rsvpFilter, setRsvpFilter] = useState<string>("all");

  // Copy feedback state
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [copiedGeneral, setCopiedGeneral] = useState(false);

  // Delete state
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://titiktemu.id";
  const generalUrl = `${baseUrl}/i/${initialInvitation.slug}`;

  // Statistics calculation
  const stats = useMemo(() => {
    const totalGuests = guests.length;
    const attending = guests.filter((g) => g.rsvp?.status === "attending").length;
    const uncertain = guests.filter((g) => g.rsvp?.status === "uncertain").length;
    const declined = guests.filter((g) => g.rsvp?.status === "declined").length;
    const unconfirmed = guests.filter((g) => !g.rsvp).length;
    const totalPax = guests.reduce((sum, g) => {
      return g.rsvp?.status === "attending" ? sum + (g.rsvp.paxCount || 1) : sum;
    }, 0);

    return { totalGuests, attending, uncertain, declined, unconfirmed, totalPax };
  }, [guests]);

  // Filtered guests list
  const filteredGuests = useMemo(() => {
    return guests.filter((g) => {
      const matchesSearch =
        !searchQuery ||
        g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (g.phone && g.phone.includes(searchQuery));

      const matchesCategory =
        categoryFilter === "all" || g.category === categoryFilter;

      const matchesRsvp =
        rsvpFilter === "all" ||
        (rsvpFilter === "attending" && g.rsvp?.status === "attending") ||
        (rsvpFilter === "uncertain" && g.rsvp?.status === "uncertain") ||
        (rsvpFilter === "declined" && g.rsvp?.status === "declined") ||
        (rsvpFilter === "unconfirmed" && !g.rsvp);

      return matchesSearch && matchesCategory && matchesRsvp;
    });
  }, [guests, searchQuery, categoryFilter, rsvpFilter]);

  // Copy helper
  const handleCopyLink = (url: string, tokenId: string) => {
    navigator.clipboard.writeText(url);
    setCopiedToken(tokenId);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const handleCopyGeneral = () => {
    navigator.clipboard.writeText(generalUrl);
    setCopiedGeneral(true);
    setTimeout(() => setCopiedGeneral(false), 2000);
  };

  // Add single guest handler
  const handleAddSingle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!singleName.trim()) return;

    setIsSubmittingSingle(true);
    try {
      const res = await fetch("/api/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          name: singleName.trim(),
          phone: singlePhone.trim() || undefined,
          category: singleCategory,
        }),
      });

      const data = await res.json();
      if (res.ok && data.guest) {
        setGuests((prev) => [data.guest, ...prev]);
        setSingleName("");
        setSinglePhone("");
      } else {
        alert(data.error || "Gagal menambahkan tamu");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan sistem saat menambahkan tamu");
    } finally {
      setIsSubmittingSingle(false);
    }
  };

  // Bulk add handler
  const handleAddBulk = async (e: React.FormEvent) => {
    e.preventDefault();
    const names = bulkText
      .split("\n")
      .map((n) => n.trim())
      .filter((n) => n.length > 0);

    if (names.length === 0) return;

    setIsSubmittingBulk(true);
    try {
      const res = await fetch("/api/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          bulkNames: names,
          bulkCategory,
        }),
      });

      const data = await res.json();
      if (res.ok && data.guests) {
        setGuests((prev) => [...data.guests, ...prev]);
        setBulkText("");
        alert(`Berhasil menambahkan ${data.guests.length} tamu!`);
      } else {
        alert(data.error || "Gagal menambahkan tamu secara massal");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan sistem saat proses impor massal");
    } finally {
      setIsSubmittingBulk(false);
    }
  };

  // Delete guest handler
  const handleDeleteGuest = async (guestId: string, name: string) => {
    if (!confirm(`Hapus tamu "${name}" dari daftar?`)) return;

    setDeletingId(guestId);
    try {
      const res = await fetch("/api/guests", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          guestId,
        }),
      });

      if (res.ok) {
        setGuests((prev) => prev.filter((g) => g.id !== guestId));
      } else {
        const data = await res.json();
        alert(data.error || "Gagal menghapus tamu");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan sistem saat menghapus tamu");
    } finally {
      setDeletingId(null);
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "family":
        return { label: "Keluarga", color: "bg-purple-950/50 border-purple-800/30 text-purple-300" };
      case "friend":
        return { label: "Sahabat", color: "bg-blue-950/50 border-blue-800/30 text-blue-300" };
      case "coworker":
        return { label: "Rekan Kerja", color: "bg-amber-950/50 border-amber-800/30 text-amber-300" };
      case "organization":
        return { label: "Organisasi", color: "bg-cyan-950/50 border-cyan-800/30 text-cyan-300" };
      default:
        return { label: "Lainnya", color: "bg-zinc-800 border-zinc-700 text-zinc-300" };
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header with Apple Frosted Glass */}
        <div className="apple-card p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="px-3.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-amber-300 text-xs font-medium tracking-wide uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Portal Tamu Undangan
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 text-xs font-medium">
                {initialInvitation.status.toUpperCase()}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-light text-white tracking-tight">
              {initialInvitation.title || `${initialInvitation.brideName} & ${initialInvitation.groomName}`}
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>{initialInvitation.eventDate} · Template: {initialInvitation.templateName}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/i/${initialInvitation.slug}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="apple-button-secondary px-5 py-2.5 text-xs sm:text-sm font-medium rounded-full flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                <span>Pratinjau Undangan</span>
              </button>
            </Link>
          </div>
        </div>

        {/* General Link & Share Bar */}
        <div className="apple-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs text-zinc-400 font-medium">
              Link Undangan Publik (Umum tanpa personalisasi nama):
            </div>
            <div className="font-mono text-xs sm:text-sm text-amber-300 truncate max-w-lg">
              {generalUrl}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyGeneral}
              className="apple-button-secondary px-4 py-2 text-xs font-medium rounded-full flex items-center gap-1.5"
            >
              {copiedGeneral ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedGeneral ? "Tersalin" : "Salin Link"}</span>
            </button>
            <a
              href={generateWhatsAppUrl({
                groomNickname: initialInvitation.groomName,
                brideNickname: initialInvitation.brideName,
                eventDate: initialInvitation.eventDate,
                invitationUrl: generalUrl,
              })}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-xs font-medium flex items-center gap-1.5 transition-all">
                <Share2 className="w-3.5 h-3.5" />
                <span>Share WA</span>
              </button>
            </a>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="apple-card p-5 space-y-1.5">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-medium">
              <span>Total Tamu</span>
              <Users className="w-4 h-4 text-zinc-400" />
            </div>
            <div className="text-3xl font-light text-white">{stats.totalGuests}</div>
            <div className="text-xs text-zinc-500">{stats.unconfirmed} belum konfirmasi</div>
          </div>

          <div className="apple-card p-5 space-y-1.5 border-emerald-500/20 bg-emerald-950/10">
            <div className="flex items-center justify-between text-emerald-400/80 text-xs font-medium">
              <span>Konfirmasi Hadir</span>
              <UserCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-light text-emerald-300">{stats.attending}</div>
            <div className="text-xs text-emerald-500/80">{stats.totalPax} total perkiraan pax</div>
          </div>

          <div className="apple-card p-5 space-y-1.5 border-amber-500/20 bg-amber-950/10">
            <div className="flex items-center justify-between text-amber-400/80 text-xs font-medium">
              <span>Masih Ragu</span>
              <HelpCircle className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-light text-amber-300">{stats.uncertain}</div>
            <div className="text-xs text-amber-500/80">Menunggu kepastian</div>
          </div>

          <div className="apple-card p-5 space-y-1.5 border-rose-500/20 bg-rose-950/10">
            <div className="flex items-center justify-between text-rose-400/80 text-xs font-medium">
              <span>Berhalangan</span>
              <UserX className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-3xl font-light text-rose-300">{stats.declined}</div>
            <div className="text-xs text-rose-500/80">Tidak dapat hadir</div>
          </div>
        </div>

        {/* Add Guest Section with Apple Segmented Control */}
        <div className="apple-card p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/[0.08] pb-5 gap-4">
            <div className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-medium text-white">Tambah Tamu Undangan</h2>
            </div>
            {/* Apple iOS-Style Segmented Control Pills */}
            <div className="inline-flex items-center bg-white/[0.06] p-1 rounded-full border border-white/[0.08] text-xs">
              <button
                type="button"
                onClick={() => setActiveTab("single")}
                className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
                  activeTab === "single"
                    ? "bg-white text-zinc-950 font-semibold shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Tambah 1 Tamu
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("bulk")}
                className={`px-4 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                  activeTab === "bulk"
                    ? "bg-white text-zinc-950 font-semibold shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Impor Massal</span>
              </button>
            </div>
          </div>

          {activeTab === "single" ? (
            <form onSubmit={handleAddSingle} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
              <div className="sm:col-span-4 space-y-1.5">
                <label className="text-xs text-stone-300 font-medium">Nama Tamu / Keluarga *</label>
                <input
                  type="text"
                  placeholder="Contoh: Dani Ramadhan & Partner"
                  value={singleName}
                  onChange={(e) => setSingleName(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500/60"
                  required
                />
              </div>

              <div className="sm:col-span-3 space-y-1.5">
                <label className="text-xs text-stone-300 font-medium">Nomor WhatsApp (Opsional)</label>
                <input
                  type="text"
                  placeholder="08123456789"
                  value={singlePhone}
                  onChange={(e) => setSinglePhone(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500/60"
                />
              </div>

              <div className="sm:col-span-3 space-y-1.5">
                <label className="text-xs text-stone-300 font-medium">Kategori</label>
                <select
                  value={singleCategory}
                  onChange={(e: any) => setSingleCategory(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-500/60"
                >
                  <option value="friend">Sahabat</option>
                  <option value="family">Keluarga</option>
                  <option value="coworker">Rekan Kerja</option>
                  <option value="organization">Organisasi</option>
                  <option value="other">Lainnya</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <Button
                  type="submit"
                  disabled={isSubmittingSingle || !singleName.trim()}
                  className="w-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-medium py-2.5 rounded-xl text-sm flex items-center justify-center gap-1.5"
                >
                  {isSubmittingSingle ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  Simpan
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleAddBulk} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs text-stone-300 font-medium">
                  Tempel Daftar Nama Tamu (Satu Nama per Baris)
                </label>
                <textarea
                  rows={4}
                  placeholder={`Bapak Ir. Bambang Soediro\nKeluarga Ibu Hj. Nurhayati\nAndi Prasetyo & Partner\nRekan Tim Marketing`}
                  value={bulkText}
                  onChange={(e) => setBulkText(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3.5 text-sm text-stone-100 font-mono placeholder-stone-600 focus:outline-none focus:border-amber-500/60"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <span className="text-xs text-stone-400">Kategori untuk semua:</span>
                  <select
                    value={bulkCategory}
                    onChange={(e: any) => setBulkCategory(e.target.value)}
                    className="bg-stone-950 border border-stone-800 rounded-xl px-3 py-1.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500/60"
                  >
                    <option value="friend">Sahabat</option>
                    <option value="family">Keluarga</option>
                    <option value="coworker">Rekan Kerja</option>
                    <option value="organization">Organisasi</option>
                    <option value="other">Lainnya</option>
                  </select>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmittingBulk || !bulkText.trim()}
                  className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-stone-950 font-medium px-6 py-2.5 rounded-xl text-sm flex items-center justify-center gap-1.5"
                >
                  {isSubmittingBulk ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileSpreadsheet className="w-4 h-4" />}
                  Generate Semua Link Tamu
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Guest List & Table Section */}
        <div className="bg-stone-900/80 border border-stone-800 rounded-3xl overflow-hidden shadow-xl">
          {/* Filter Bar */}
          <div className="p-4 sm:p-6 border-b border-stone-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari nama tamu atau nomor HP..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-4 py-2 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500/60"
              />
            </div>

            <div className="flex items-center gap-2.5">
              <Filter className="w-4 h-4 text-stone-500 shrink-0" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-300 focus:outline-none"
              >
                <option value="all">Semua Kategori</option>
                <option value="family">Keluarga</option>
                <option value="friend">Sahabat</option>
                <option value="coworker">Rekan Kerja</option>
                <option value="organization">Organisasi</option>
                <option value="other">Lainnya</option>
              </select>

              <select
                value={rsvpFilter}
                onChange={(e) => setRsvpFilter(e.target.value)}
                className="bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-300 focus:outline-none"
              >
                <option value="all">Semua RSVP</option>
                <option value="attending">Hadir</option>
                <option value="uncertain">Ragu</option>
                <option value="declined">Berhalangan</option>
                <option value="unconfirmed">Belum Konfirmasi</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-stone-300">
              <thead className="bg-stone-950/60 text-xs text-stone-400 uppercase tracking-wider border-b border-stone-800">
                <tr>
                  <th className="px-6 py-3.5 font-medium">Nama Tamu</th>
                  <th className="px-4 py-3.5 font-medium">Kategori</th>
                  <th className="px-4 py-3.5 font-medium">Status RSVP</th>
                  <th className="px-4 py-3.5 font-medium">Link Terpersonalisasi</th>
                  <th className="px-6 py-3.5 font-medium text-right">Aksi Bagikan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60">
                {filteredGuests.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-stone-500">
                      {searchQuery || categoryFilter !== "all" || rsvpFilter !== "all"
                        ? "Tidak ada tamu yang cocok dengan filter pencarian Anda."
                        : "Belum ada tamu terdaftar. Silakan tambahkan tamu melalui formulir di atas."}
                    </td>
                  </tr>
                ) : (
                  filteredGuests.map((guest) => {
                    const guestUrl = `${baseUrl}/i/${initialInvitation.slug}/${guest.token}`;
                    const categoryMeta = getCategoryLabel(guest.category);
                    const isCopied = copiedToken === guest.token;
                    const isDeleting = deletingId === guest.id;

                    const waUrl = generateWhatsAppUrl({
                      guestName: guest.name,
                      phone: guest.phone,
                      groomNickname: initialInvitation.groomName,
                      brideNickname: initialInvitation.brideName,
                      eventDate: initialInvitation.eventDate,
                      invitationUrl: guestUrl,
                    });

                    return (
                      <tr key={guest.id || guest.token} className="hover:bg-stone-800/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium text-stone-100">{guest.name}</div>
                          {guest.phone && (
                            <div className="text-xs text-stone-500 font-mono">{guest.phone}</div>
                          )}
                        </td>

                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${categoryMeta.color}`}
                          >
                            {categoryMeta.label}
                          </span>
                        </td>

                        <td className="px-4 py-4">
                          {guest.rsvp ? (
                            <div className="space-y-0.5">
                              {guest.rsvp.status === "attending" && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-950/60 border border-emerald-800/40 text-emerald-400">
                                  <UserCheck className="w-3 h-3" /> Hadir ({guest.rsvp.paxCount} Pax)
                                </span>
                              )}
                              {guest.rsvp.status === "uncertain" && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-950/60 border border-amber-800/40 text-amber-400">
                                  <HelpCircle className="w-3 h-3" /> Ragu
                                </span>
                              )}
                              {guest.rsvp.status === "declined" && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-950/60 border border-rose-800/40 text-rose-400">
                                  <UserX className="w-3 h-3" /> Berhalangan
                                </span>
                              )}
                              {guest.rsvp.notes && (
                                <div className="text-xs text-stone-400 italic max-w-xs truncate">
                                  &ldquo;{guest.rsvp.notes}&rdquo;
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs text-stone-500 bg-stone-900 border border-stone-800">
                              Belum Konfirmasi
                            </span>
                          )}
                        </td>

                        <td className="px-4 py-4 font-mono text-xs text-amber-300/90">
                          <div className="flex items-center gap-1.5 max-w-[220px] truncate">
                            <span>/i/{initialInvitation.slug}/{guest.token}</span>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              onClick={() => handleCopyLink(guestUrl, guest.token)}
                              size="sm"
                              variant="ghost"
                              className="text-stone-400 hover:text-amber-300 hover:bg-stone-800 h-8 px-2.5 rounded-lg text-xs"
                              title="Salin Link Personal"
                            >
                              {isCopied ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                              <span className="ml-1 hidden sm:inline">{isCopied ? "Tersalin" : "Salin"}</span>
                            </Button>

                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button
                                size="sm"
                                className="bg-emerald-600/90 hover:bg-emerald-500 text-white h-8 px-2.5 rounded-lg text-xs flex items-center gap-1"
                                title="Kirim via WhatsApp"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">WhatsApp</span>
                              </Button>
                            </a>

                            <Button
                              onClick={() => handleDeleteGuest(guest.id!, guest.name)}
                              disabled={isDeleting}
                              size="sm"
                              variant="ghost"
                              className="text-stone-500 hover:text-rose-400 hover:bg-rose-950/30 h-8 w-8 p-0 rounded-lg"
                              title="Hapus Tamu"
                            >
                              {isDeleting ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <Trash2 className="w-3.5 h-3.5" />
                              )}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* WhatsApp Message Preview Box */}
        <div className="bg-stone-900/60 border border-stone-800 rounded-3xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-stone-300 text-sm font-medium">
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Format Pesan WhatsApp yang Terkirim ke Tamu (Sesuai Standar):</span>
          </div>
          <div className="bg-stone-950 border border-stone-800 rounded-2xl p-4 font-mono text-xs sm:text-sm text-stone-300 whitespace-pre-line leading-relaxed max-w-2xl">
            {generateWhatsAppMessage({
              guestName: "Nama Tamu Undangan",
              invitationUrl: `${baseUrl}/i/${initialInvitation.slug}/[TOKEN_TAMU]`,
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-xs text-stone-500 pb-10 flex items-center justify-center gap-1.5">
          <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          <span>Titik Temu Invitation · Sistem Undangan Terpersonalisasi Aman</span>
        </div>
      </div>
    </div>
  );
}
