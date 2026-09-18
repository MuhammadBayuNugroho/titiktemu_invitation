# SECURITY GUIDELINES & AUDIT — TITIK TEMU INVITATION

Dokumen ini mendefinisikan arsitektur keamanan, kepatuhan RLS, penanganan rahasia server, serta mitigasi kerentanan web pada platform Titik Temu Invitation.

---

## 1. Zero Secret Leakage Policy

1. **Aturan Environment Variables**:
   - Rahasia server seperti `SUPABASE_SERVICE_ROLE_KEY` dan `MIDTRANS_SERVER_KEY` **DILARANG KERAS** menggunakan prefix `NEXT_PUBLIC_`.
   - Rahasia server tidak pernah di-bundle ke dalam client-side JavaScript.
   - Panggilan yang membutuhkan hak akses istimewa (database writes, publishing, webhook verification) hanya dijalankan di lapisan *Server-Only Data Access Layer* (`src/lib/services/*` dan Route Handlers).

2. **Admin Authentication**:
   - Panel `/admin` dilindungi oleh `ADMIN_SECRET_KEY` yang diverifikasi di sisi server dan disimpan pada HTTP-Only secure cookie (`admin_session`).
   - Seluruh rute admin disematkan metadata robots `noindex, nofollow` agar tidak dapat diindeks oleh bot mesin pencari.

---

## 2. Server-Authoritative Price Validation

1. **Harga Tidak Pernah Dipercaya dari Klien**:
   - Parameter `amount` yang dikirim dari browser pada saat checkout tidak dijadikan acuan transaksi.
   - Server selalu membaca nominal harga resmi langsung dari tabel database `plans` (`src/lib/services/order-service.ts` -> `createOrder`).
   - Webhook notifikasi memvalidasi `gross_amount` transaksi terhadap `orders.amount` di database sebelum mengubah status pesanan.

---

## 3. Webhook Security & Idempotency

1. **Signature Verification**:
   - Notifikasi Midtrans diverifikasi menggunakan hash SHA-512 dari kombinasi `order_id + status_code + gross_amount + ServerKey`.
2. **Proteksi Idempotensi**:
   - Jika notifikasi pembayaran yang sama diterima lebih dari satu kali, server mendeteksi status pesanan `paid` dan langsung merespons `200 OK` tanpa memicu publikasi ganda atau duplikasi catatan keuangan.
3. **Pemisahan Logika Handler**:
   - Logika webhook diisolasi dalam `src/lib/payments/webhook-handler.ts` untuk memastikan ekspor HTTP Next.js App Router tetap bersih dan patuh pada type-checker compiler.

---

## 4. XSS & HTML Injection Mitigation

1. **Sanitasi Ucapan & Buku Tamu**:
   - Ucapan tamu (`wishes`) dan catatan RSVP dirender secara deklaratif melalui sintaks JSX React tanpa pernah menggunakan `dangerouslySetInnerHTML`.
   - Karakter khusus (`<`, `>`, `"`, `'`) otomatis di-escape oleh React compiler sebelum dirender ke DOM.
2. **Validasi Input Zod**:
   - Seluruh payload request ke `/api/rsvp`, `/api/wishes`, dan `/api/guests` divalidasi ketat menggunakan Zod schemas di sisi server.

---

## 5. Token Cryptographic Entropy

1. **Customer Access Token**:
   - Menggunakan 256-bit random byte buffer yang dikonversi ke 64 karakter heksadesimal berentropi tinggi (`generateSecureToken()`).
2. **Personalized Guest Token**:
   - Menggunakan karakter URL-safe Base58 acak sepanjang minimal 10 karakter (`generateGuestToken()`), menghasilkan lebih dari $4.3 \times 10^{17}$ kombinasi unik, mencegah serangan brute-force enumeration.

---

## 6. Row Level Security (RLS) Matrix

| Tabel | Public Read | Public Insert | Update / Delete |
| :--- | :---: | :---: | :---: |
| `templates` | ✅ Ya (Katalog) | ❌ Dilarang | Admin Service Only |
| `plans` | ✅ Ya (Daftar Harga) | ❌ Dilarang | Admin Service Only |
| `invitations` | ✅ Published Only | ❌ Via Service | Admin / Service Only |
| `guests` | ✅ By Token | ❌ Via Portal Pengantin | Admin / Customer Token |
| `rsvp` | ✅ By Invitation | ✅ Tamu Tervalidasi | Admin / Owner |
| `wishes` | ✅ By Invitation | ✅ Tamu Tervalidasi | Admin Moderasi |
| `orders` | ❌ Dilarang | ❌ Via Server Checkout | Webhook & Admin Only |
