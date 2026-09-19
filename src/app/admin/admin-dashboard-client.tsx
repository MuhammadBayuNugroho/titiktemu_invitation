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
    <div
      className="min-h-screen"
      style={{
        background: `
          radial-gradient(ellipse 90% 50% at 10% 0%, rgba(201,144,108,0.08) 0%, transparent 50%),
          radial-gradient(ellipse 70% 40% at 90% 100%, rgba(201,168,76,0.06) 0%, transparent 50%),
          #F8F7F4
        `,
        color: "#1A1A2E",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Top Navigation Bar */}
      <header
        className="sticky top-0 z-40 bg-white/90 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between border-b"
        style={{ borderColor: "rgba(201,144,108,0.15)" }}
      >
        <div className="flex items-center gap-3">
          <Link href="/admin" className="flex items-center gap-2.5">
            <span className="font-semibold text-base sm:text-lg tracking-tight" style={{ color: "#1A1A2E" }}>
              TITIK TEMU
            </span>
            <span
              className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full font-semibold tracking-wider"
              style={{
                background: "rgba(201,144,108,0.10)",
                color: "#C9906C",
                border: "1px solid rgba(201,144,108,0.22)",
              }}
            >
              Admin
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="hidden sm:flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-white shadow-xs"
            style={{ border: "1px solid rgba(201,144,108,0.18)", color: "#6B7280" }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium">Platform Active</span>
          </div>

          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="h-8 px-3.5 rounded-full text-xs font-semibold text-[#6B7280] hover:text-[#1A1A2E] hover:bg-white flex items-center gap-1.5 transition-all border border-black/[0.06]"
          >
            {isLoggingOut ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <LogOut className="w-3.5 h-3.5" />
            )}
            <span>Keluar</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* KPI Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Revenue */}
          <div
            className="p-5 space-y-2 rounded-2xl bg-white shadow-xs transition-all hover:-translate-y-0.5"
            style={{ border: "1px solid rgba(201,144,108,0.18)" }}
          >
            <div className="flex items-center justify-between text-[#6B7280] text-xs font-medium">
              <span>Total Omset Lunas</span>
              <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                <CreditCard className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight" style={{ color: "#1A1A2E" }}>
              {formatIDR(metrics.totalRevenue)}
            </div>
            <p className="text-[11px] text-[#9CA3AF]">
              Dari {metrics.paidOrders} pesanan terverifikasi
            </p>
          </div>

          {/* Orders */}
          <div
            className="p-5 space-y-2 rounded-2xl bg-white shadow-xs transition-all hover:-translate-y-0.5"
            style={{ border: "1px solid rgba(201,144,108,0.18)" }}
          >
            <div className="flex items-center justify-between text-[#6B7280] text-xs font-medium">
              <span>Total Transaksi</span>
              <div className="p-1.5 rounded-lg text-[#C9906C]" style={{ background: "rgba(201,144,108,0.12)" }}>
                <BarChart3 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight" style={{ color: "#1A1A2E" }}>
              {metrics.totalOrders}
            </div>
            <p className="text-[11px] text-[#9CA3AF]">
              {metrics.pendingOrders} menunggu pembayaran
            </p>
          </div>

          {/* Invitations */}
          <div
            className="p-5 space-y-2 rounded-2xl bg-white shadow-xs transition-all hover:-translate-y-0.5"
            style={{ border: "1px solid rgba(201,144,108,0.18)" }}
          >
            <div className="flex items-center justify-between text-[#6B7280] text-xs font-medium">
              <span>Undangan Terpublikasi</span>
              <div className="p-1.5 rounded-lg text-blue-600 bg-blue-50">
                <Globe className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight" style={{ color: "#1A1A2E" }}>
              {metrics.publishedInvitations}
              <span className="text-sm font-normal text-[#9CA3AF] ml-1.5">
                / {metrics.totalInvitations} total
              </span>
            </div>
            <p className="text-[11px] text-[#9CA3AF]">
              Undangan live dapat diakses publik
            </p>
          </div>

          {/* Guests & RSVP */}
          <div
            className="p-5 space-y-2 rounded-2xl bg-white shadow-xs transition-all hover:-translate-y-0.5"
            style={{ border: "1px solid rgba(201,144,108,0.18)" }}
          >
            <div className="flex items-center justify-between text-[#6B7280] text-xs font-medium">
              <span>Kehadiran RSVP</span>
              <div className="p-1.5 rounded-lg text-[#C9A84C]" style={{ background: "rgba(201,168,76,0.12)" }}>
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight" style={{ color: "#1A1A2E" }}>
              {metrics.attendingPax} Pax
            </div>
            <p className="text-[11px] text-[#9CA3AF]">
              Dari {metrics.totalGuests} tamu terdaftar di platform
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div
          className="inline-flex items-center p-1 rounded-full bg-white border overflow-x-auto max-w-full shadow-xs"
          style={{ borderColor: "rgba(201,144,108,0.20)" }}
        >
          <button
            onClick={() => setActiveTab("invitations")}
            className={`px-4 py-1.5 rounded-full text-xs transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "invitations"
                ? "bg-[#1A1A2E] text-white font-semibold shadow-xs"
                : "text-[#6B7280] hover:text-[#1A1A2E]"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Manajemen Undangan ({invitations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-1.5 rounded-full text-xs transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "orders"
                ? "bg-[#1A1A2E] text-white font-semibold shadow-xs"
                : "text-[#6B7280] hover:text-[#1A1A2E]"
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Pesanan &amp; Transaksi ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("templates")}
            className={`px-4 py-1.5 rounded-full text-xs transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "templates"
                ? "bg-[#1A1A2E] text-white font-semibold shadow-xs"
                : "text-[#6B7280] hover:text-[#1A1A2E]"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Template &amp; Paket</span>
          </button>

          <button
            onClick={() => setActiveTab("wishes")}
            className={`px-4 py-1.5 rounded-full text-xs transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "wishes"
                ? "bg-[#1A1A2E] text-white font-semibold shadow-xs"
                : "text-[#6B7280] hover:text-[#1A1A2E]"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Buku Tamu ({wishes.length})</span>
          </button>
        </div>

        {/* Tab 1: INVITATIONS */}
        {activeTab === "invitations" && (
          <div
            className="rounded-2xl bg-white shadow-xs overflow-hidden"
            style={{ border: "1px solid rgba(201,144,108,0.18)" }}
          >
            {/* Table Filter Toolbar */}
            <div className="p-4 sm:p-5 border-b flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3" style={{ borderColor: "rgba(201,144,108,0.12)" }}>
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari slug, judul, atau nama mempelai..."
                  value={invSearch}
                  onChange={(e) => setInvSearch(e.target.value)}
                  className="w-full bg-[#FAFAFA] border rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-[#1A1A2E] placeholder-[#9CA3AF] focus:outline-none focus:bg-white transition-colors"
                  style={{ borderColor: "rgba(26,26,46,0.12)" }}
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#9CA3AF] shrink-0" />
                <select
                  value={invStatusFilter}
                  onChange={(e) => setInvStatusFilter(e.target.value)}
                  className="bg-[#FAFAFA] border rounded-xl px-3 py-2 text-xs text-[#1A1A2E] focus:outline-none focus:bg-white"
                  style={{ borderColor: "rgba(26,26,46,0.12)" }}
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
              <table className="w-full text-left text-xs sm:text-sm text-[#1A1A2E]">
                <thead className="bg-[#FAF9F6] text-[11px] text-[#6B7280] uppercase tracking-wider border-b" style={{ borderColor: "rgba(201,144,108,0.12)" }}>
                  <tr>
                    <th className="px-6 py-3.5 font-semibold">Judul &amp; Slug</th>
                    <th className="px-4 py-3.5 font-semibold">Mempelai</th>
                    <th className="px-4 py-3.5 font-semibold">Template</th>
                    <th className="px-4 py-3.5 font-semibold">Status Publikasi</th>
                    <th className="px-4 py-3.5 font-semibold">Akses Portal Pengantin</th>
                    <th className="px-6 py-3.5 font-semibold text-right">Aksi Publikasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: "rgba(26,26,46,0.04)" }}>
                  {filteredInvitations.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-[#9CA3AF] text-xs">
                        Tidak ada undangan yang cocok dengan pencarian.
                      </td>
                    </tr>
                  ) : (
                    filteredInvitations.map((inv) => {
                      const isPublished = inv.status === "published" || inv.status === "paid";
                      const isToggling = togglingId === inv.id;

                      return (
                        <tr key={inv.id} className="hover:bg-[#FAF9F6] transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-semibold text-[#1A1A2E]">{inv.title}</div>
                            <div className="font-mono text-xs text-[#C9906C] flex items-center gap-1.5 mt-0.5">
                              <span>/i/{inv.slug}</span>
                              {isPublished && (
                                <a
                                  href={`/i/${inv.slug}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#9CA3AF] hover:text-[#1A1A2E]"
                                  title="Buka Undangan Live"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </td>

                          <td className="px-4 py-4 text-xs text-[#6B7280]">
                            <div className="text-[#1A1A2E] font-medium">{inv.brideName} &amp; {inv.groomName}</div>
                            {inv.orderNumber && (
                              <span className="text-[10px] text-[#9CA3AF] font-mono">
                                Order: {inv.orderNumber}
                              </span>
                            )}
                          </td>

                          <td className="px-4 py-4">
                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#FAFAFA] border border-black/[0.06] text-[#4A5568]">
                              {inv.templateName}
                            </span>
                          </td>

                          <td className="px-4 py-4">
                            {isPublished ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 border border-emerald-200 text-emerald-700">
                                <CheckCircle2 className="w-3 h-3" /> Published
                              </span>
                            ) : inv.status === "pending_payment" ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 border border-amber-200 text-amber-700">
                                <Clock className="w-3 h-3" /> Pending Payment
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-100 border border-zinc-200 text-zinc-600">
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
                                className="inline-flex items-center gap-1 text-xs font-medium text-[#C9906C] hover:underline underline-offset-2 transition-colors"
                              >
                                <span>Portal Pengantin</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : (
                              <span className="text-xs text-[#9CA3AF]">-</span>
                            )}
                          </td>

                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => handleTogglePublish(inv.id, inv.status)}
                              disabled={isToggling}
                              className={`h-8 px-3.5 rounded-full text-xs font-semibold transition-all ${
                                isPublished
                                  ? "border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100"
                                  : "btn-primary shadow-xs"
                              }`}
                            >
                              {isToggling ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : isPublished ? (
                                <span>Tarik Publikasi</span>
                              ) : (
                                <span>Publikasikan</span>
                              )}
                            </button>
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
          <div
            className="rounded-2xl bg-white shadow-xs overflow-hidden"
            style={{ border: "1px solid rgba(201,144,108,0.18)" }}
          >
            {/* Orders Filter Toolbar */}
            <div className="p-4 sm:p-5 border-b flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3" style={{ borderColor: "rgba(201,144,108,0.12)" }}>
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari nomor pesanan atau judul undangan..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full bg-[#FAFAFA] border rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-[#1A1A2E] placeholder-[#9CA3AF] focus:outline-none focus:bg-white transition-colors"
                  style={{ borderColor: "rgba(26,26,46,0.12)" }}
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#9CA3AF] shrink-0" />
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="bg-[#FAFAFA] border rounded-xl px-3 py-2 text-xs text-[#1A1A2E] focus:outline-none focus:bg-white"
                  style={{ borderColor: "rgba(26,26,46,0.12)" }}
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
              <table className="w-full text-left text-xs sm:text-sm text-[#1A1A2E]">
                <thead className="bg-[#FAF9F6] text-[11px] text-[#6B7280] uppercase tracking-wider border-b" style={{ borderColor: "rgba(201,144,108,0.12)" }}>
                  <tr>
                    <th className="px-6 py-3.5 font-semibold">Nomor Pesanan</th>
                    <th className="px-4 py-3.5 font-semibold">Undangan Terkait</th>
                    <th className="px-4 py-3.5 font-semibold">Paket Layanan</th>
                    <th className="px-4 py-3.5 font-semibold">Nominal</th>
                    <th className="px-4 py-3.5 font-semibold">Metode</th>
                    <th className="px-6 py-3.5 font-semibold text-right">Status Transaksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: "rgba(26,26,46,0.04)" }}>
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-[#9CA3AF] text-xs">
                        Tidak ada transaksi yang cocok dengan filter.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => {
                      return (
                        <tr key={order.id} className="hover:bg-[#FAF9F6] transition-colors">
                          <td className="px-6 py-4 font-mono font-semibold text-[#1A1A2E]">
                            {order.orderNumber}
                            <div className="text-[11px] text-[#9CA3AF] font-sans mt-0.5">
                              {new Date(order.createdAt).toLocaleString("id-ID", {
                                dateStyle: "medium",
                                timeStyle: "short",
                              })}
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <div className="font-medium text-[#1A1A2E]">
                              {order.invitationTitle || "Undangan Pernikahan"}
                            </div>
                            {order.invitationSlug && (
                              <div className="text-xs text-[#C9906C] font-mono">
                                /i/{order.invitationSlug}
                              </div>
                            )}
                          </td>

                          <td className="px-4 py-4">
                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#FAFAFA] border border-black/[0.06] text-[#4A5568]">
                              {order.planName}
                            </span>
                          </td>

                          <td className="px-4 py-4 font-semibold text-[#1A1A2E]">
                            {formatIDR(order.amount)}
                          </td>

                          <td className="px-4 py-4 uppercase text-[11px] font-mono text-[#6B7280]">
                            {order.paymentType || "Snap / QRIS"}
                          </td>

                          <td className="px-6 py-4 text-right">
                            {order.status === "paid" ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 border border-emerald-200 text-emerald-700">
                                <CheckCircle2 className="w-3 h-3" /> Lunas
                              </span>
                            ) : order.status === "pending" ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 border border-amber-200 text-amber-700">
                                <Clock className="w-3 h-3" /> Menunggu
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 border border-rose-200 text-rose-700">
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
              <h3 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                Katalog Template Desain ({initialTemplates.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {initialTemplates.map((tpl) => (
                  <div
                    key={tpl.id}
                    className="rounded-2xl bg-white shadow-xs overflow-hidden flex flex-col transition-all hover:-translate-y-0.5"
                    style={{ border: "1px solid rgba(201,144,108,0.18)" }}
                  >
                    {tpl.previewImageUrl && (
                      <div className="h-44 overflow-hidden relative">
                        <img
                          src={tpl.previewImageUrl}
                          alt={tpl.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/95 border border-black/[0.08] text-emerald-700 shadow-xs">
                          Aktif
                        </span>
                      </div>
                    )}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h4 className="font-semibold text-[#1A1A2E]">{tpl.name}</h4>
                        <p className="text-xs text-[#6B7280] mt-1 line-clamp-2">
                          {tpl.description}
                        </p>
                      </div>
                      <div className="pt-2 border-t flex items-center justify-between text-xs text-[#9CA3AF] font-mono" style={{ borderColor: "rgba(201,144,108,0.12)" }}>
                        <span>slug: {tpl.slug}</span>
                        <Link
                          href={`/demo/shava-dedek?template=${tpl.slug}`}
                          target="_blank"
                          className="text-[#C9906C] font-sans font-semibold hover:underline flex items-center gap-1"
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
              <h3 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                Daftar Paket Layanan ({initialPlans.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {initialPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="rounded-2xl bg-white shadow-xs p-6 space-y-4 flex flex-col justify-between transition-all hover:-translate-y-0.5"
                    style={{ border: "1px solid rgba(201,144,108,0.18)" }}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase font-mono font-semibold tracking-wider text-[#C9906C]">
                          {plan.code}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 border border-emerald-200 text-emerald-700">
                          Aktif
                        </span>
                      </div>
                      <h4 className="text-lg font-semibold text-[#1A1A2E]">{plan.name}</h4>
                      <div className="text-2xl font-bold text-[#1A1A2E] tracking-tight">
                        {formatIDR(plan.price)}
                      </div>
                    </div>

                    <div className="space-y-2 pt-4 border-t" style={{ borderColor: "rgba(201,144,108,0.12)" }}>
                      <span className="text-[11px] text-[#9CA3AF] uppercase tracking-wider font-semibold">
                        Fitur Termasuk:
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#4A5568]">
                        {plan.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
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
          <div
            className="rounded-2xl bg-white shadow-xs overflow-hidden"
            style={{ border: "1px solid rgba(201,144,108,0.18)" }}
          >
            <div className="p-4 sm:p-6 border-b" style={{ borderColor: "rgba(201,144,108,0.12)" }}>
              <h3 className="text-sm font-semibold text-[#1A1A2E] flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#C9906C]" />
                Moderasi Buku Tamu &amp; Ucapan Doa Terbaru
              </h3>
              <p className="text-xs text-[#6B7280] mt-0.5">
                Pantau ucapan yang dikirimkan oleh tamu undangan di seluruh platform.
              </p>
            </div>

            <div className="divide-y" style={{ borderColor: "rgba(26,26,46,0.04)" }}>
              {wishes.length === 0 ? (
                <div className="p-12 text-center text-[#9CA3AF] text-xs">
                  Belum ada ucapan tamu yang tercatat.
                </div>
              ) : (
                wishes.map((wish) => {
                  const isDeleting = deletingWishId === wish.id;
                  return (
                    <div key={wish.id} className="p-5 flex items-start justify-between gap-4 hover:bg-[#FAF9F6] transition-colors">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-[#1A1A2E]">{wish.name}</span>
                          {wish.invitationTitle && (
                            <span className="text-xs text-[#6B7280]">
                              pada <span className="text-[#C9906C] font-mono">/i/{wish.invitationSlug}</span>
                            </span>
                          )}
                          <span className="text-[11px] text-[#9CA3AF]">
                            · {new Date(wish.createdAt).toLocaleDateString("id-ID", { dateStyle: "medium" })}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#4A5568] italic leading-relaxed">
                          &ldquo;{wish.message}&rdquo;
                        </p>
                      </div>

                      <button
                        onClick={() => handleDeleteWish(wish.id)}
                        disabled={isDeleting}
                        className="text-[#9CA3AF] hover:text-rose-600 hover:bg-rose-50 h-8 w-8 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                        title="Hapus Ucapan"
                      >
                        {isDeleting ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                      </button>
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
