# TESTING & QUALITY ASSURANCE — TITIK TEMU INVITATION

Dokumen ini menjelaskan strategi pengujian, skrip otomatis, dan skenario verifikasi manual untuk platform Titik Temu Invitation.

---

## 1. Automated Test Suite

Aplikasi dilengkapi skrip pengujian otomatis komprehensif pada `scripts/qa-test-suite.ts`:

```bash
npx tsx --env-file=.env.local scripts/qa-test-suite.ts
```

Skrip ini menguji:
1. **Token Security**: Entropi 200 sampel token tamu (zero collisions), format URL-safe, dan token heksadesimal 64 karakter.
2. **Slug Lifecycle**: Validasi sanitasi karakter, prefix slug, dan fallback aman saat nama kosong.
3. **Price Validation**: Verifikasi kalkulasi nominal dari tabel `plans` dan penolakan tampered amount.
4. **WhatsApp & CSV Integrity**: Interpolasi placeholder `{nama}` dan `{link}`, serta header Byte Order Mark UTF-8 (`\uFEFF`) untuk Microsoft Excel.
5. **Database Integrity**: Integritas data template, tier paket, dan relasi tabel Supabase.

---

## 2. Static Code Analysis & Build Verification

Seluruh kode wajib mematuhi standar strict TypeScript dan Next.js production build:

```bash
# Type-checking strict mode
npm run type-check

# Production build test
npm run build
```

---

## 3. End-to-End Browser Flow Scenarios

| Skenario | Endpoint / Rute | Yang Diverifikasi |
| :--- | :--- | :--- |
| **Katalog Template** | `/templates` | 3 template aktif dapat di-preview dan dipilih. |
| **Wizard Pembuatan** | `/create` | 9-langkah wizard mempertahankan state data tanpa kehilangan input saat kembali ke langkah sebelumnya. |
| **Live Preview** | `/create` (Step 7) | Frame pratinjau mobile (390px) dan desktop menampilkan data live. |
| **Checkout & Pembayaran** | `/create/checkout` | Pemilihan paket menghitung harga resmi dari database. Integrasi Snap modal terpicu saat mode Midtrans aktif. |
| **Penerbitan Otomatis** | `/create/checkout/success` | Transisi status otomatis menjadi `published`, pembuatan nomor pesanan `TTI-YYYYMMDD-XXXXX`. |
| **Undangan Publik** | `/i/[slug]` | Rendering cover, pembukaan animasi, musik, countdown, cerita cinta, galeri, amplop digital, dan maps. |
| **Tamu Terpersonalisasi**| `/i/[slug]/[token]` | Salam personal tamu khusus pada cover dan kartu OpenGraph WhatsApp. |
| **Portal Pengantin** | `/manage/[token]` | Manajemen tamu, salin link massal, kustomisasi format WhatsApp, ekspor daftar tamu format `.CSV`. |
| **Admin Console** | `/admin` & `/admin/login` | Login berproteksi passkey, monitoring omset, daftar transaksi, toggle publikasikan/tarik undangan, dan moderasi buku tamu. |
