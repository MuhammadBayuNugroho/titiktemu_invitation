# TITIK TEMU INVITATION — MVP V1 EXECUTION PLAN

## 1. Executive Summary
Titik Temu Invitation adalah platform undangan digital modular yang menjadi bagian dari ekosistem **Titik Temu Project**.
Tujuan MVP V1: Memberikan pengalaman menyeluruh bagi calon pengantin untuk memilih template, mengisi data, mengunggah foto, melakukan pembayaran via Midtrans Snap (atau Mock Provider), lalu menerbitkan undangan digital yang otomatis aktif dan siap dibagikan melalui tautan WhatsApp terpersonalisasi.

---

## 2. Customer Journey Breakdown
```text
1. Landing Page (/) -> Eksplorasi fitur, template showcase, harga, FAQ.
2. Template Catalog (/templates) -> Pratinjau live 3 template (Elegant, Minimalist, Nusantara).
3. Creation Wizard (/create) -> 9 langkah tanpa kehilangan data:
   Step 1: Pilih Template
   Step 2: Data Mempelai (Pria, Wanita, Orang Tua, Media Sosial)
   Step 3: Data Acara (Akad/Pemberkatan, Resepsi, Waktu, Lokasi Maps)
   Step 4: Media & Galeri (Cover, Foto Pasangan, Galeri s.d 10 foto)
   Step 5: Love Story (Timeline kisah cinta)
   Step 6: Wedding Gift & Rekening (Bank & E-wallet)
   Step 7: Live Preview (Mobile/Desktop Frame)
   Step 8: Pemilihan Paket (Basic Rp49k / Premium Rp99k) & Checkout
   Step 9: Publikasi & Distribusi WhatsApp
4. Payment Processing -> Midtrans Snap / Sandbox / Mock payment.
5. Auto-Publishing -> Webhook verifikasi status transaksi -> set status `published`.
6. Public Invitation (/[slug]) -> Akses publik interaktif.
7. Personalized Guest View (/[slug]/[guestToken]) -> Salam personal untuk tamu khusus.
```

---

## 3. Core Milestones (Phases)

| Fase | Fokus | Output Utama |
|---|---|---|
| **Phase 0** | Inspection & Docs | `docs/*`, `AGENTS.md`, analisa dependensi |
| **Phase 1** | Foundation & DB | Next.js, Supabase Client, RLS SQL, Zod, Design Tokens |
| **Phase 2** | Template Engine | `InvitationRenderer`, 3 Template (Elegant, Minimalist, Nusantara) |
| **Phase 3** | Wizard Builder | Form 9-langkah, autosave draft, media upload handler |
| **Phase 4** | Public Invitation | Dynamic route `/[slug]`, interaktivitas (RSVP, Guestbook, Countdown) |
| **Phase 5** | Guest Personalization | Token generator kriptografis, route `/[slug]/[guestToken]` |
| **Phase 6** | Payment Integration | Abstraksi `PaymentProvider`, Midtrans Snap, Webhook verification |
| **Phase 7** | Auto Publishing | Transisi state otomatis, slug generator unik |
| **Phase 8** | WhatsApp Generator | URL generator & formatted message encoder |
| **Phase 9** | Admin Dashboard | Auth admin, monitoring orders, management invitations/RSVP |
| **Phase 10**| QA & Security | Test cases, zero lint/type errors, security checklist review |

---

## 4. Acceptance Criteria
- [ ] Landing page & katalog template aktif dan responsif.
- [ ] 3 template terpisah dapat dirender dengan 1 set data yang sama.
- [ ] Multi-step form wizard tidak kehilangan state data saat berpindah langkah.
- [ ] Upload gambar tervalidasi di sisi server (MIME, ekstensi, max 10MB).
- [ ] Order dihitung dari database `plans` (bukan dari parameter client).
- [ ] Webhook signature Midtrans terverifikasi dengan SHA512 dan bersifat idempoten.
- [ ] Undangan otomatis berstatus `published` saat pembayaran sukses.
- [ ] Guest token acak (high entropy, non-sequential).
- [ ] RSVP & Guestbook terlindungi dari serangan XSS dan HTML injection.
- [ ] Admin dashboard dapat mengelola pesanan dan status publikasi undangan.
- [ ] Typecheck, ESLint, dan Build Next.js 100% lulus tanpa error.
