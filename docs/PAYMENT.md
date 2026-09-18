# PAYMENT SYSTEM & MIDTRANS INTEGRATION — TITIK TEMU INVITATION

Dokumen ini menjelaskan arsitektur sistem pembayaran, abstraksi provider, integrasi Midtrans Snap, serta mode pengujian.

---

## 1. Arsitektur Provider Abstraction

Sistem menggunakan pola *Strategy Pattern* dengan antarmuka `IPaymentProvider` (`src/lib/payments/types.ts`):

```text
               IPaymentProvider
               ┌──────┴──────┐
               ▼             ▼
      MidtransProvider   MockPaymentProvider
```

Factory (`src/lib/payments/factory.ts`) memilih implementasi aktif berdasarkan konfigurasi:

```env
# Mode Pengujian Lokal / CI (Simulasi instan tanpa popup Snap):
PAYMENT_PROVIDER=mock

# Mode Sandbox / Live Midtrans:
PAYMENT_PROVIDER=midtrans
```

---

## 2. Server-Authoritative Price Calculation

1. Pengguna memilih paket di frontend (`basic`, `premium`, atau `gold`).
2. Server mencari record paket pada tabel `plans` di Supabase untuk mendapatkan harga sah (`amount`).
3. Pesanan dibuat di tabel `orders` dengan status awal `pending`.
4. Jika `PAYMENT_PROVIDER=midtrans`, provider membuat Snap Token melalui API Midtrans:
   `https://app.sandbox.midtrans.com/snap/v1/transactions`
5. Jika `PAYMENT_PROVIDER=mock`, token simulasi instan dikembalikan ke klien.

---

## 3. Webhook Handling & Auto-Publishing

1. Endpoint resmi notifikasi pembayaran:
   - `/api/payment/webhook`
   - `/api/webhooks/midtrans` (alias resmi Midtrans)
2. Verifikasi Keamanan:
   - Signature SHA-512 diverifikasi menggunakan `MIDTRANS_SERVER_KEY`.
   - `gross_amount` diverifikasi terhadap `orders.amount`.
   - Idempotensi dicek; pesanan yang sudah lunas tidak diproses ulang.
3. Transisi Status:
   - Saat status `settlement` atau `capture` diterima, status pesanan diubah menjadi `paid`.
   - Fungsi `publishInvitation(order.invitation_id)` otomatis mengubah status undangan menjadi `published` dengan timestamp `published_at = NOW()`.
