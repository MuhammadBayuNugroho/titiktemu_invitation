# DEPLOYMENT GUIDE — TITIK TEMU INVITATION

Panduan komprehensif untuk men-deploy aplikasi Titik Temu Invitation ke Vercel dan menghubungkannya dengan Supabase & Midtrans.

---

## 1. Persiapan Environment Variables

Tambahkan variabel-variabel berikut pada dashboard Vercel (**Project Settings > Environment Variables**):

```env
# 1. Aplikasi
NEXT_PUBLIC_APP_URL=https://titiktemuinvitation.vercel.app

# 2. Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT-ID].supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=[ANON-OR-PUBLISHABLE-KEY]
SUPABASE_SERVICE_ROLE_KEY=[SERVICE-ROLE-KEY-SERVER-ONLY]

# 3. Midtrans (Payment Gateway)
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=SB-Mid-client-XXXXX
MIDTRANS_SERVER_KEY=SB-Mid-server-XXXXX
MIDTRANS_IS_PRODUCTION=false
PAYMENT_PROVIDER=mock

# 4. Admin Passkey
ADMIN_SECRET_KEY=titiktemu_admin_secret_2026
```

---

## 2. Langkah Deployment di Vercel

1. **Hubungkan Repositori GitHub**:
   - Impor repositori `titiktemu_invitation` ke Vercel.
2. **Framework Preset**:
   - Pilih `Next.js`.
3. **Build & Output Settings**:
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
4. **Deploy**:
   - Klik **Deploy**.
   - Tunggu kompilasi rute selesai (sekitar 1-2 menit).

---

## 3. Konfigurasi Webhook Midtrans (Bila Go-Live)

1. Masuk ke **Midtrans Merchant Dashboard** > **Settings** > **Configuration**.
2. Masukkan URL Notification:
   `https://titiktemuinvitation.vercel.app/api/webhooks/midtrans`
3. Simpan konfigurasi.
