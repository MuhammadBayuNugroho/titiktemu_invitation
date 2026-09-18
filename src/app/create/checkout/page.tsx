"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, ShieldCheck, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PlanOption {
  code: "basic" | "premium" | "gold";
  name: string;
  price: number;
  originalPrice: number;
  features: string[];
  recommended?: boolean;
}

const PLANS: PlanOption[] = [
  {
    code: "basic",
    name: "Paket Basic",
    price: 49000,
    originalPrice: 99000,
    features: [
      "Masa Aktif 6 Bulan",
      "Foto Galeri (Hingga 5 Foto)",
      "RSVP & Digital Guestbook",
      "Peta Lokasi Google Maps",
      "Musik Latar Pilihan",
    ],
  },
  {
    code: "premium",
    name: "Paket Premium",
    price: 99000,
    originalPrice: 199000,
    recommended: true,
    features: [
      "Masa Aktif 12 Bulan",
      "Galeri Tanpa Batas Foto",
      "Cerita Cinta & Timeline",
      "Amplop Digital & QR Code",
      "Tamu Terpersonalisasi (Kirim WA Massal)",
      "Custom Slug Undangan",
      "Prioritas Support 24/7",
    ],
  },
  {
    code: "gold",
    name: "Paket Gold (VIP)",
    price: 149000,
    originalPrice: 299000,
    features: [
      "Masa Aktif Selamanya",
      "Seluruh Fitur Premium",
      "Prioritas Pendampingan Desain",
      "Custom Subdomain Khusus",
      "Bebas Watermark Platform",
    ],
  },
];


export default function CheckoutPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<"basic" | "premium" | "gold">("premium");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Load wizard state preview info if present
  const [wizardSummary, setWizardSummary] = useState<{
    groom: string;
    bride: string;
    date: string;
  } | null>(null);

  useEffect(() => {
    try {
      const raw =
        localStorage.getItem("titiktemu_wizard_state") ||
        localStorage.getItem("tti_wizard_state");
      if (raw) {
        const parsed = JSON.parse(raw);
        const couple = parsed.couple || {};
        const event = parsed.event || {};
        setWizardSummary({
          groom: couple.groomName || couple.groomFullName || "Mempelai Pria",
          bride: couple.brideName || couple.brideFullName || "Mempelai Wanita",
          date:
            event.eventDate ||
            event.akad?.date ||
            event.reception?.date ||
            "Tanggal Belum Diatur",
        });
      }
    } catch (e) {
      console.error("Failed to read wizard state:", e);
    }
  }, []);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Get state from localStorage
      const raw =
        localStorage.getItem("titiktemu_wizard_state") ||
        localStorage.getItem("tti_wizard_state");
      let wizardData = {};
      if (raw) {
        wizardData = JSON.parse(raw);
      }

      // 2. Save draft invitation
      const invRes = await fetch("/api/invitations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state: wizardData }),
      });

      const invData = await invRes.json();
      if (!invRes.ok || !invData.success) {
        throw new Error(invData.error || "Gagal menyimpan draf undangan.");
      }

      const { invitationId, slug, customerAccessToken } = invData;

      // 3. Create Order
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invitationId,
          planCode: selectedPlan,
          customerName: customerInfo.name,
          customerEmail: customerInfo.email,
          customerPhone: customerInfo.phone,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.success) {
        throw new Error(orderData.error || "Gagal membuat pesanan.");
      }

      const tokenParam = customerAccessToken ? `&token=${customerAccessToken}` : "";

      // 4. Handle Mock or Midtrans payment
      if (orderData.redirectUrl && orderData.redirectUrl.includes("mock-checkout")) {
        // Execute Mock Callback automatically for instant deployment simulation
        const mockRes = await fetch("/api/payment/mock-callback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: orderData.orderId }),
        });

        const mockData = await mockRes.json();
        if (mockData.success) {
          router.push(`/create/checkout/success?slug=${slug}&order=${orderData.orderNumber}${tokenParam}`);
        } else {
          throw new Error("Gagal menyelesaikan pembayaran simulasi.");
        }
      } else if (orderData.token && typeof window !== "undefined" && (window as any).snap) {
        // Real Midtrans Snap
        (window as any).snap.pay(orderData.token, {
          onSuccess: function () {
            router.push(`/create/checkout/success?slug=${slug}&order=${orderData.orderNumber}${tokenParam}`);
          },
          onPending: function () {
            router.push(`/create/checkout/success?slug=${slug}&order=${orderData.orderNumber}${tokenParam}&status=pending`);
          },
          onError: function () {
            setError("Pembayaran gagal. Silakan coba lagi.");
            setLoading(false);
          },
          onClose: function () {
            setError("Jendela pembayaran ditutup sebelum transaksi selesai.");
            setLoading(false);
          },
        });
        return; // Modal is open, wait for callback
      } else {
        // Fallback mock complete
        await fetch("/api/payment/mock-callback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: orderData.orderId }),
        });
        router.push(`/create/checkout/success?slug=${slug}&order=${orderData.orderNumber}${tokenParam}`);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Terjadi kesalahan saat memproses pembayaran.");
    } finally {
      setLoading(false);
    }
  };

  const activePlanObj = PLANS.find((p) => p.code === selectedPlan)!;
  const midtransClientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;
  const isMidtransProd = process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === "true";
  const snapScriptUrl = isMidtransProd
    ? "https://app.midtrans.com/snap/snap.js"
    : "https://app.sandbox.midtrans.com/snap/snap.js";

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased selection:bg-amber-500/20 selection:text-amber-900">
      {/* Midtrans Snap Script (Sandbox / Production) */}
      {midtransClientKey && !midtransClientKey.includes("placeholder") && (
        <Script
          src={snapScriptUrl}
          data-client-key={midtransClientKey}
          strategy="lazyOnload"
        />
      )}

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-b from-amber-100/30 via-rose-50/20 to-transparent blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Navigation back */}
        <div className="mb-8">
          <Link
            href="/create/review"
            className="inline-flex items-center gap-2 text-xs font-medium text-[#6E6E73] hover:text-[#1D1D1F] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Peninjauan Desain</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs uppercase tracking-wider font-semibold inline-block">
            Langkah Terakhir · Terbit Otomatis
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F]">
            Pilih Paket & Aktivasi Undangan
          </h1>
          <p className="text-[#6E6E73] text-xs sm:text-sm">
            Undangan Anda akan otomatis diterbitkan seketika setelah pembayaran terverifikasi.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 text-sm text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Checkout Col */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-base font-semibold text-[#1D1D1F]">
              Pilih Paket Layanan
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {PLANS.map((plan) => {
                const isSelected = selectedPlan === plan.code;
                return (
                  <div
                    key={plan.code}
                    onClick={() => setSelectedPlan(plan.code)}
                    className={`relative cursor-pointer rounded-2xl p-5 border transition-all duration-200 ${
                      isSelected
                        ? "border-[#1D1D1F] bg-white shadow-md ring-2 ring-[#1D1D1F]"
                        : "border-black/[0.08] bg-white hover:border-black/[0.16] hover:bg-zinc-50/50"
                    }`}
                  >
                    {plan.recommended && (
                      <span className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-[#1D1D1F] text-white font-semibold text-[10px] uppercase tracking-wider shadow-sm">
                        Paling Populer
                      </span>
                    )}

                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-sm font-semibold text-[#1D1D1F]">{plan.name}</h3>
                        <div className="mt-1 flex flex-col">
                          <span className="text-xl font-bold text-[#1D1D1F] tracking-tight">
                            Rp {plan.price.toLocaleString("id-ID")}
                          </span>
                          <span className="text-[11px] text-[#86868B] line-through">
                            Rp {plan.originalPrice.toLocaleString("id-ID")}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                          isSelected ? "border-[#1D1D1F] bg-[#1D1D1F] text-white" : "border-black/20"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>

                    <ul className="mt-4 space-y-2 text-xs text-[#6E6E73]">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span className="text-zinc-700">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* Customer Info Form */}
            <div className="apple-card rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-[#1D1D1F]">Informasi Pemesan</h3>
              <form onSubmit={handleCheckout} id="checkout-form" className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-xs font-medium text-[#6E6E73]">
                    Nama Lengkap
                  </Label>
                  <Input
                    id="name"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="mt-1.5 bg-white border-black/[0.1] text-[#1D1D1F] text-sm focus:border-black focus:ring-1 focus:ring-black rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-xs font-medium text-[#6E6E73]">
                      Email (Untuk Akses & Kuitansi)
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="budi@example.com"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      className="mt-1.5 bg-white border-black/[0.1] text-[#1D1D1F] text-sm focus:border-black focus:ring-1 focus:ring-black rounded-xl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-xs font-medium text-[#6E6E73]">
                      Nomor WhatsApp
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      placeholder="081234567890"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      className="mt-1.5 bg-white border-black/[0.1] text-[#1D1D1F] text-sm focus:border-black focus:ring-1 focus:ring-black rounded-xl"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary Sidebar (Right 5 Cols) */}
          <div className="lg:col-span-5 apple-card rounded-2xl p-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <h2 className="text-sm font-semibold text-[#1D1D1F] border-b border-black/[0.06] pb-4">
                Ringkasan Pesanan
              </h2>

              {wizardSummary && (
                <div className="p-4 rounded-xl bg-zinc-50 border border-black/[0.06] text-xs space-y-1.5 text-zinc-700">
                  <div className="text-amber-800 font-semibold text-sm">
                    {wizardSummary.groom} & {wizardSummary.bride}
                  </div>
                  <div className="text-[#6E6E73]">Tanggal: {wizardSummary.date}</div>
                </div>
              )}

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-zinc-700">
                  <span>{activePlanObj.name}</span>
                  <span className="font-medium text-[#1D1D1F]">Rp {activePlanObj.price.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-[#6E6E73] text-xs">
                  <span>Diskon Promo</span>
                  <span className="text-emerald-600 font-medium">
                    -Rp {(activePlanObj.originalPrice - activePlanObj.price).toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between text-[#6E6E73] text-xs">
                  <span>Biaya Layanan Platform</span>
                  <span className="text-zinc-600">Gratis (Rp 0)</span>
                </div>

                <div className="border-t border-black/[0.06] pt-3 flex justify-between font-semibold text-base text-[#1D1D1F]">
                  <span>Total Pembayaran</span>
                  <span className="text-lg">Rp {activePlanObj.price.toLocaleString("id-ID")}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <button
                type="submit"
                form="checkout-form"
                disabled={loading}
                className="apple-button-primary w-full py-3.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(0,0,0,0.12)] disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Memproses Pembayaran...</span>
                  </>
                ) : (
                  <>
                    <span>Bayar & Terbitkan Undangan</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-xs text-[#6E6E73]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Pembayaran Aman & Terverifikasi Otomatis</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
