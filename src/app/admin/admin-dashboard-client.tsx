"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  Users,
  CreditCard,
  FileText,
  Sparkles,
  ExternalLink,
  Search,
  Filter,
  LogOut,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Globe,
  Lock,
  Layers,
  Heart,
  MessageSquare,
  Trash2,
  Loader2,
  RefreshCw,
  Eye,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type {
  AdminMetrics,
  AdminInvitationItem,
  AdminOrderItem,
  AdminTemplateItem,
  AdminPlanItem,
  AdminWishItem,
} from "@/lib/services/admin-service";

interface AdminDashboardClientProps {
  initialMetrics: AdminMetrics;
  initialInvitations: AdminInvitationItem[];
  initialOrders: AdminOrderItem[];
  initialTemplates: AdminTemplateItem[];
  initialPlans: AdminPlanItem[];
  initialWishes: AdminWishItem[];
}

export function AdminDashboardClient({
  initialMetrics,
  initialInvitations,
  initialOrders,
  initialTemplates,
  initialPlans,
  initialWishes,
}: AdminDashboardClientProps) {
  const router = useRouter();

  // State
  const [metrics, setMetrics] = useState<AdminMetrics>(initialMetrics);
  const [invitations, setInvitations] = useState<AdminInvitationItem[]>(initialInvitations);
  const [orders, setOrders] = useState<AdminOrderItem[]>(initialOrders);
  const [wishes, setWishes] = useState<AdminWishItem[]>(initialWishes);

  const [activeTab, setActiveTab] = useState<"invitations" | "orders" | "templates" | "wishes">("invitations");

  // Filter state for invitations
  const [invSearch, setInvSearch] = useState("");
  const [invStatusFilter, setInvStatusFilter] = useState("all");

  // Filter state for orders
  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");

  // Action loading states
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [deletingWishId, setDeletingWishId] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Logout handler
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Toggle publish handler
  const handleTogglePublish = async (invitationId: string, currentStatus: string) => {
    const shouldPublish = currentStatus !== "published" && currentStatus !== "paid";
    setTogglingId(invitationId);

    try {
      const res = await fetch(`/api/admin/invitations/${invitationId}/publish`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publish: shouldPublish }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setInvitations((prev) =>
          prev.map((inv) =>
            inv.id === invitationId
              ? {
                  ...inv,
                  status: data.status,
                  publishedAt: shouldPublish ? new Date().toISOString() : null,
                }
              : inv
          )
        );
        // Refresh metrics counter
        setMetrics((prev) => ({
          ...prev,
          publishedInvitations: shouldPublish
            ? prev.publishedInvitations + 1
            : Math.max(0, prev.publishedInvitations - 1),
        }));
      } else {
        alert(data.message || "Gagal mengubah status publikasi");
      }
    } catch (err) {
      alert("Terjadi kesalahan jaringan");
    } finally {
      setTogglingId(null);
    }
  };

  // Delete wish handler
  const handleDeleteWish = async (wishId: string) => {
    if (!confirm("Hapus ucapan ini dari buku tamu?")) return;
    setDeletingWishId(wishId);

    try {
      const res = await fetch(`/api/admin/wishes/${wishId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setWishes((prev) => prev.filter((w) => w.id !== wishId));
      } else {
        alert("Gagal menghapus ucapan");
      }
    } catch (err) {
      alert("Terjadi kesalahan jaringan");
    } finally {
      setDeletingWishId(null);
    }
  };

  // Filtered invitations
  const filteredInvitations = useMemo(() => {
    return invitations.filter((inv) => {
      const matchesSearch =
        !invSearch ||
        inv.title.toLowerCase().includes(invSearch.toLowerCase()) ||
        inv.slug.toLowerCase().includes(invSearch.toLowerCase()) ||
        inv.brideName.toLowerCase().includes(invSearch.toLowerCase()) ||
        inv.groomName.toLowerCase().includes(invSearch.toLowerCase());

      const matchesStatus =
        invStatusFilter === "all" ||
        (invStatusFilter === "published" && (inv.status === "published" || inv.status === "paid")) ||
        (invStatusFilter === "pending" && inv.status === "pending_payment") ||
        (invStatusFilter === "draft" && inv.status === "draft");

      return matchesSearch && matchesStatus;
    });
  }, [invitations, invSearch, invStatusFilter]);

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        !orderSearch ||
        o.orderNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
        (o.invitationTitle && o.invitationTitle.toLowerCase().includes(orderSearch.toLowerCase())) ||
        (o.invitationSlug && o.invitationSlug.toLowerCase().includes(orderSearch.toLowerCase()));

      const matchesStatus =
        orderStatusFilter === "all" || o.status === orderStatusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, orderSearch, orderStatusFilter]);

  const formatIDR = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-amber-400 selection:text-black">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-white/[0.08] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="flex items-center gap-2.5">
            <span className="font-serif text-lg tracking-wider text-amber-200">
              TITIK TEMU
            </span>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/[0.08] text-zinc-300 font-semibold tracking-widest border border-white/[0.08]">
              Admin
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-400 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Platform Active</span>
          </div>

          <Button
            onClick={handleLogout}
            disabled={isLoggingOut}
            variant="ghost"
            size="sm"
            className="h-8 rounded-full text-xs text-zinc-400 hover:text-white hover:bg-white/[0.06] flex items-center gap-1.5"
          >
            {isLoggingOut ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <LogOut className="w-3.5 h-3.5" />
            )}
            <span>Keluar</span>
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* KPI Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Revenue */}
          <div className="apple-card p-5 space-y-2">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-medium">
              <span>Total Omset Lunas</span>
              <CreditCard className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              {formatIDR(metrics.totalRevenue)}
            </div>
            <p className="text-[11px] text-zinc-500">
              Dari {metrics.paidOrders} pesanan terverifikasi
            </p>
          </div>

          {/* Orders */}
          <div className="apple-card p-5 space-y-2">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-medium">
              <span>Total Transaksi</span>
              <BarChart3 className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              {metrics.totalOrders}
            </div>
            <p className="text-[11px] text-zinc-500">
              {metrics.pendingOrders} menunggu pembayaran
            </p>
          </div>

          {/* Invitations */}
          <div className="apple-card p-5 space-y-2">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-medium">
              <span>Undangan Terpublikasi</span>
              <Globe className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              {metrics.publishedInvitations}
              <span className="text-sm font-normal text-zinc-500 ml-1.5">
                / {metrics.totalInvitations} total
              </span>
            </div>
            <p className="text-[11px] text-zinc-500">
              Undangan live dapat diakses publik
            </p>
          </div>

          {/* Guests & RSVP */}
          <div className="apple-card p-5 space-y-2">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-medium">
              <span>Kehadiran RSVP</span>
              <Users className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              {metrics.attendingPax} Pax
            </div>
            <p className="text-[11px] text-zinc-500">
              Dari {metrics.totalGuests} tamu terdaftar di platform
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab("invitations")}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "invitations"
                ? "bg-white text-zinc-950 font-semibold shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Manajemen Undangan ({invitations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "orders"
                ? "bg-white text-zinc-950 font-semibold shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Pesanan & Transaksi ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("templates")}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "templates"
                ? "bg-white text-zinc-950 font-semibold shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Template & Paket</span>
          </button>

          <button
            onClick={() => setActiveTab("wishes")}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "wishes"
                ? "bg-white text-zinc-950 font-semibold shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Buku Tamu ({wishes.length})</span>
          </button>
        </div>

        {/* Tab 1: INVITATIONS */}
        {activeTab === "invitations" && (
          <div className="apple-card overflow-hidden">
            {/* Table Filter Toolbar */}
            <div className="p-4 sm:p-6 border-b border-white/[0.08] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari slug, judul, atau nama mempelai..."
                  value={invSearch}
                  onChange={(e) => setInvSearch(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/[0.1] rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center gap-2.5">
                <Filter className="w-4 h-4 text-zinc-500 shrink-0" />
                <select
                  value={invStatusFilter}
                  onChange={(e) => setInvStatusFilter(e.target.value)}
                  className="bg-zinc-950 border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none"
                >
                  <option value="all">Semua Status</option>
                  <option value="published">Terpublikasi (Published)</option>
                  <option value="pending">Menunggu Pembayaran</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm text-zinc-300">
                <thead className="bg-zinc-950/60 text-[11px] text-zinc-400 uppercase tracking-wider border-b border-white/[0.08]">
                  <tr>
                    <th className="px-6 py-3.5 font-medium">Judul & Slug</th>
                    <th className="px-4 py-3.5 font-medium">Mempelai</th>
                    <th className="px-4 py-3.5 font-medium">Template</th>
                    <th className="px-4 py-3.5 font-medium">Status Publikasi</th>
                    <th className="px-4 py-3.5 font-medium">Akses Portal Pengantin</th>
                    <th className="px-6 py-3.5 font-medium text-right">Aksi Publikasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {filteredInvitations.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-zinc-500 text-xs">
                        Tidak ada undangan yang cocok dengan pencarian.
                      </td>
                    </tr>
                  ) : (
                    filteredInvitations.map((inv) => {
                      const isPublished = inv.status === "published" || inv.status === "paid";
                      const isToggling = togglingId === inv.id;

                      return (
                        <tr key={inv.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-medium text-white">{inv.title}</div>
                            <div className="font-mono text-xs text-amber-300/80 flex items-center gap-1.5 mt-0.5">
                              <span>/i/{inv.slug}</span>
                              {isPublished && (
                                <a
                                  href={`/i/${inv.slug}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-zinc-500 hover:text-white"
                                  title="Buka Undangan Live"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </td>

                          <td className="px-4 py-4 text-xs text-zinc-300">
                            <div>{inv.brideName} &amp; {inv.groomName}</div>
                            {inv.orderNumber && (
                              <span className="text-[10px] text-zinc-500 font-mono">
                                Order: {inv.orderNumber}
                              </span>
                            )}
                          </td>

                          <td className="px-4 py-4">
                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/[0.04] border border-white/[0.08] text-zinc-300">
                              {inv.templateName}
                            </span>
                          </td>

                          <td className="px-4 py-4">
                            {isPublished ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-950/60 border border-emerald-800/40 text-emerald-400">
                                <CheckCircle2 className="w-3 h-3" /> Published
                              </span>
                            ) : inv.status === "pending_payment" ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-950/60 border border-amber-800/40 text-amber-300">
                                <Clock className="w-3 h-3" /> Pending Payment
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-800 border border-zinc-700 text-zinc-400">
                                Draft
                              </span>
                            )}
                          </td>

                          <td className="px-4 py-4">
                            {inv.customerAccessToken ? (
                              <a
                                href={`/manage/${inv.customerAccessToken}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-amber-300 underline underline-offset-2 transition-colors"
                              >
                                <span>Portal Pengantin</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : (
                              <span className="text-xs text-zinc-600">-</span>
                            )}
                          </td>

                          <td className="px-6 py-4 text-right">
                            <Button
                              onClick={() => handleTogglePublish(inv.id, inv.status)}
                              disabled={isToggling}
                              size="sm"
                              variant={isPublished ? "outline" : "primary"}
                              className={`h-8 rounded-full text-xs font-medium transition-all ${
                                isPublished
                                  ? "border-rose-800/40 text-rose-300 hover:bg-rose-950/40"
                                  : "bg-amber-400 hover:bg-amber-300 text-zinc-950"
                              }`}
                            >
                              {isToggling ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : isPublished ? (
                                <span>Tarik Publikasi</span>
                              ) : (
                                <span>Publikasikan</span>
                              )}
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: ORDERS */}
        {activeTab === "orders" && (
          <div className="apple-card overflow-hidden">
            {/* Orders Filter Toolbar */}
            <div className="p-4 sm:p-6 border-b border-white/[0.08] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari nomor pesanan atau judul undangan..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/[0.1] rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center gap-2.5">
                <Filter className="w-4 h-4 text-zinc-500 shrink-0" />
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="bg-zinc-950 border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none"
                >
                  <option value="all">Semua Status</option>
                  <option value="paid">Lunas (Paid)</option>
                  <option value="pending">Menunggu (Pending)</option>
                  <option value="failed">Gagal (Failed)</option>
                  <option value="cancelled">Batal (Cancelled)</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm text-zinc-300">
                <thead className="bg-zinc-950/60 text-[11px] text-zinc-400 uppercase tracking-wider border-b border-white/[0.08]">
                  <tr>
                    <th className="px-6 py-3.5 font-medium">Nomor Pesanan</th>
                    <th className="px-4 py-3.5 font-medium">Undangan Terkait</th>
                    <th className="px-4 py-3.5 font-medium">Paket Layanan</th>
                    <th className="px-4 py-3.5 font-medium">Nominal</th>
                    <th className="px-4 py-3.5 font-medium">Metode</th>
                    <th className="px-6 py-3.5 font-medium text-right">Status Transaksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-zinc-500 text-xs">
                        Tidak ada transaksi yang cocok dengan filter.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => {
                      return (
                        <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4 font-mono font-medium text-white">
                            {order.orderNumber}
                            <div className="text-[11px] text-zinc-500 font-sans mt-0.5">
                              {new Date(order.createdAt).toLocaleString("id-ID", {
                                dateStyle: "medium",
                                timeStyle: "short",
                              })}
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <div className="font-medium text-zinc-200">
                              {order.invitationTitle || "Undangan Pernikahan"}
                            </div>
                            {order.invitationSlug && (
                              <div className="text-xs text-amber-300/80 font-mono">
                                /i/{order.invitationSlug}
                              </div>
                            )}
                          </td>

                          <td className="px-4 py-4">
                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/[0.04] border border-white/[0.08] text-zinc-300">
                              {order.planName}
                            </span>
                          </td>

                          <td className="px-4 py-4 font-semibold text-white">
                            {formatIDR(order.amount)}
                          </td>

                          <td className="px-4 py-4 uppercase text-[11px] font-mono text-zinc-400">
                            {order.paymentType || "Snap / QRIS"}
                          </td>

                          <td className="px-6 py-4 text-right">
                            {order.status === "paid" ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-950/60 border border-emerald-800/40 text-emerald-400">
                                <CheckCircle2 className="w-3 h-3" /> Lunas
                              </span>
                            ) : order.status === "pending" ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-950/60 border border-amber-800/40 text-amber-300">
                                <Clock className="w-3 h-3" /> Menunggu
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-950/60 border border-rose-800/40 text-rose-400">
                                <XCircle className="w-3 h-3" /> {order.status}
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: TEMPLATES & PLANS */}
        {activeTab === "templates" && (
          <div className="space-y-8">
            {/* Templates Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                Katalog Template Desain ({initialTemplates.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {initialTemplates.map((tpl) => (
                  <div key={tpl.id} className="apple-card overflow-hidden flex flex-col">
                    {tpl.previewImageUrl && (
                      <div className="h-44 overflow-hidden relative">
                        <img
                          src={tpl.previewImageUrl}
                          alt={tpl.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-black/60 backdrop-blur-md border border-white/[0.1] text-emerald-400">
                          Aktif
                        </span>
                      </div>
                    )}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h4 className="font-semibold text-white">{tpl.name}</h4>
                        <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                          {tpl.description}
                        </p>
                      </div>
                      <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-500 font-mono">
                        <span>slug: {tpl.slug}</span>
                        <Link
                          href={`/demo/shava-dedek?template=${tpl.slug}`}
                          target="_blank"
                          className="text-amber-300 hover:underline flex items-center gap-1"
                        >
                          Pratinjau <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Plans Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                Daftar Paket Layanan ({initialPlans.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {initialPlans.map((plan) => (
                  <div key={plan.id} className="apple-card p-6 space-y-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase font-mono font-semibold tracking-wider text-amber-300">
                          {plan.code}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[11px] bg-emerald-950/60 border border-emerald-800/40 text-emerald-400">
                          Aktif
                        </span>
                      </div>
                      <h4 className="text-lg font-semibold text-white">{plan.name}</h4>
                      <div className="text-2xl font-bold text-white tracking-tight">
                        {formatIDR(plan.price)}
                      </div>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-white/[0.06]">
                      <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-semibold">
                        Fitur Termasuk:
                      </span>
                      <ul className="space-y-1.5 text-xs text-zinc-300">
                        {plan.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: WISHES */}
        {activeTab === "wishes" && (
          <div className="apple-card overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-white/[0.08]">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-amber-400" />
                Moderasi Buku Tamu & Ucapan Doa Terbaru
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Pantau ucapan yang dikirimkan oleh tamu undangan di seluruh platform.
              </p>
            </div>

            <div className="divide-y divide-white/[0.06]">
              {wishes.length === 0 ? (
                <div className="p-12 text-center text-zinc-500 text-xs">
                  Belum ada ucapan tamu yang tercatat.
                </div>
              ) : (
                wishes.map((wish) => {
                  const isDeleting = deletingWishId === wish.id;
                  return (
                    <div key={wish.id} className="p-5 flex items-start justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-white">{wish.name}</span>
                          {wish.invitationTitle && (
                            <span className="text-xs text-zinc-400">
                              pada <span className="text-amber-300 font-mono">/i/{wish.invitationSlug}</span>
                            </span>
                          )}
                          <span className="text-[11px] text-zinc-500">
                            · {new Date(wish.createdAt).toLocaleDateString("id-ID", { dateStyle: "medium" })}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-300 italic leading-relaxed">
                          &ldquo;{wish.message}&rdquo;
                        </p>
                      </div>

                      <Button
                        onClick={() => handleDeleteWish(wish.id)}
                        disabled={isDeleting}
                        size="sm"
                        variant="ghost"
                        className="text-zinc-500 hover:text-rose-400 hover:bg-rose-950/30 h-8 w-8 p-0 rounded-lg shrink-0"
                        title="Hapus Ucapan"
                      >
                        {isDeleting ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                      </Button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
