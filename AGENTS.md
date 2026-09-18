# AGENTS.md — TITIK TEMU INVITATION RULES & CONVENTIONS

File ini mendefinisikan aturan ketat yang wajib dipatuhi oleh seluruh developer dan AI coding agents saat bekerja pada repositori ini.

---

## 1. Project Principles
- **No Static Mockups**: Seluruh flow utama (wizard pembuatan, validasi, preview, payment mock/midtrans, dan rendering publik) harus berfungsi secara nyata.
- **Aesthetic Excellence**: Desain platform (dashboard, landing page, builder) mengikuti standar Linear/Vercel/Stripe/Notion — clean, solid surface, border halus, kontras tinggi, minimalis, dan elegan.
- **Mobile-First Public Invitations**: Undangan publik wajib diuji dan tampil sempurna pada viewport 360px, 390px, 414px, 768px, 1024px, dan 1440px tanpa horizontal scrollbar.

---

## 2. Coding Conventions & Stack
- **Framework**: Next.js 15+ (App Router), TypeScript (Strict mode), Tailwind CSS.
- **Component Reusability**: Jangan menaruh seluruh logika bisnis dan markup dalam satu komponen raksasa. Pisahkan menjadi modul-modul terpisah (`InvitationCover`, `CoupleProfile`, `Countdown`, `LocationSection`, dsb.).
- **Validation**: Gunakan Zod untuk validasi input di client maupun server.
- **Icons**: Gunakan `lucide-react`.

---

## 3. Security Rules (Mandatory)
1. **Never Expose Server Secrets**: Dilarang menggunakan prefix `NEXT_PUBLIC_` untuk `SUPABASE_SERVICE_ROLE_KEY` atau `MIDTRANS_SERVER_KEY`.
2. **Never Trust Client Prices**: Harga transaksi selalu dihitung di server dari tabel `plans`.
3. **Never Trust Client Validation**: Validasi sisi server adalah sumber kebenaran utama.
4. **Never Publish from Browser Callbacks**: Undangan hanya boleh diubah statusnya menjadi `published` melalui verifikasi webhook server yang sah.
5. **No Dangerous HTML Rendering**: Ucapan tamu (`wishes`) dan data input user dilarang dirender menggunakan `dangerouslySetInnerHTML`.
6. **No Sequential Guest Tokens**: Selalu gunakan generator token acak kriptografis dengan entropi tinggi.

---

## 4. Architecture Rules
- Pisahkan kode ke dalam lapisan arsitektur yang jelas:
  ```text
  UI (components/pages) 
    -> Application Layer (Server Actions / API Handlers)
    -> Business Logic (Services)
    -> Data Access Layer (Supabase DAL)
  ```
- Rendering publik dan preview wajib menggunakan modul yang sama: `InvitationRenderer`.
- Integrasi pembayaran wajib menggunakan interface `IPaymentProvider` agar dapat beralih antara `MidtransPaymentProvider` dan `MockPaymentProvider`.

---

## 5. Things Agents Must NOT Do
- Dilarang membuat kode perbaikan sementara (*temporary hacks*) atau hardcoded values.
- Dilarang mengubah status order atau payment secara manual tanpa melalui alur verifikasi transaksi.
- Dilarang menghapus atau mengubah konfigurasi RLS tanpa analisis dampak keamanan.
- Dilarang menginstal library yang berat dan tidak perlu.
- Dilarang melakukan git force push atau reset tanpa konfirmasi user.
