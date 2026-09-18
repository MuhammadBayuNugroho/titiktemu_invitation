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
    <div className="min-h-screen bg-stone-950 text-stone-100 py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      {/* Midtrans Snap Script (Sandbox / Production) */}
      {midtransClientKey && !midtransClientKey.includes("placeholder") && (
        <Script
          src={snapScriptUrl}
          data-client-key={midtransClientKey}
          strategy="lazyOnload"
        />
      )}

      <div className="max-w-5xl mx-auto">
        {/* Navigation back */}
        <div className="mb-8">
          <Link
            href="/create/review"
            className="inline-flex items-center gap-2 text-xs text-stone-400 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Peninjauan Desain</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="px-3 py-1 rounded-full bg-amber-950/60 border border-amber-800/40 text-amber-300 text-xs uppercase tracking-wider font-medium inline-block">
            Langkah Terakhir · Terbit Otomatis
          </span>
          <h1 className="text-3xl font-serif font-light text-amber-100">
            Pilih Paket & Aktivasi Undangan
          </h1>
          <p className="text-stone-400 text-xs sm:text-sm">
            Undangan Anda akan otomatis diterbitkan seketika setelah pembayaran terverifikasi.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl border border-rose-800/60 bg-rose-950/40 text-rose-300 text-sm text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Checkout Col */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-lg font-medium text-stone-200">
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
                        ? "border-amber-400/80 bg-amber-950/20 shadow-lg shadow-amber-950/30"
                        : "border-stone-800 bg-stone-900/60 hover:border-stone-700"
                    }`}
                  >
                    {plan.recommended && (
                      <span className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-amber-400 text-stone-950 font-semibold text-[11px] uppercase tracking-wider">
                        Paling Populer
                      </span>
                    )}

                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-serif text-lg font-medium text-amber-100">{plan.name}</h3>
                        <div className="mt-1 flex items-baseline gap-2">
                          <span className="text-2xl font-semibold text-stone-100">
                            Rp {plan.price.toLocaleString("id-ID")}
                          </span>
                          <span className="text-xs text-stone-500 line-through">
                            Rp {plan.originalPrice.toLocaleString("id-ID")}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected ? "border-amber-400 bg-amber-400 text-stone-950" : "border-stone-600"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>

                    <ul className="mt-4 space-y-2 text-xs text-stone-300">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* Customer Info Form */}
            <div className="bg-stone-900/60 border border-stone-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-md font-medium text-stone-200">Informasi Pemesan</h3>
              <form onSubmit={handleCheckout} id="checkout-form" className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-xs text-stone-400">
                    Nama Lengkap
                  </Label>
                  <Input
                    id="name"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="mt-1 bg-stone-950 border-stone-800 text-stone-100 text-sm focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-xs text-stone-400">
                      Email (Untuk Akses & Kuitansi)
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="budi@example.com"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      className="mt-1 bg-stone-950 border-stone-800 text-stone-100 text-sm focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-xs text-stone-400">
                      Nomor WhatsApp
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      placeholder="081234567890"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      className="mt-1 bg-stone-950 border-stone-800 text-stone-100 text-sm focus:border-amber-400"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary Sidebar (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-stone-900/80 border border-stone-800 rounded-2xl p-6 space-y-6">
            <h2 className="text-lg font-medium text-amber-100 border-b border-stone-800 pb-4">
              Ringkasan Pesanan
            </h2>

            {wizardSummary && (
              <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800/80 text-xs space-y-2 text-stone-300">
                <div className="text-amber-400 font-medium text-sm">
                  {wizardSummary.groom} & {wizardSummary.bride}
                </div>
                <div className="text-stone-400">Tanggal: {wizardSummary.date}</div>
              </div>
            )}

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-stone-300">
                <span>{activePlanObj.name}</span>
                <span>Rp {activePlanObj.price.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-stone-400 text-xs">
                <span>Diskon Promo</span>
                <span className="text-emerald-400">
                  -Rp {(activePlanObj.originalPrice - activePlanObj.price).toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between text-stone-400 text-xs">
                <span>Biaya Layanan Platform</span>
                <span className="text-stone-300">Rp 0</span>
              </div>

              <div className="border-t border-stone-800 pt-3 flex justify-between font-medium text-base text-amber-100">
                <span>Total Pembayaran</span>
                <span>Rp {activePlanObj.price.toLocaleString("id-ID")}</span>
              </div>
            </div>

            <Button
              type="submit"
              form="checkout-form"
              disabled={loading}
              className="w-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold py-6 rounded-xl text-base shadow-lg shadow-amber-400/10 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Memproses Pembayaran...
                </>
              ) : (
                <>
                  Bayar & Terbitkan Undangan
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>

            <div className="flex items-center justify-center gap-2 text-xs text-stone-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Pembayaran Aman & Terverifikasi Otomatis</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
