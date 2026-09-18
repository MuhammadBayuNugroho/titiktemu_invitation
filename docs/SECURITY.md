# TITIK TEMU INVITATION — SECURITY ARCHITECTURE & POLICIES

## 1. Threat Modeling & Core Defense Rules

| Vektor Serangan | Risiko | Mekanisme Pencegahan |
|---|---|---|
| **Payment Spoofing** | Memalsukan status pembayaran menjadi `paid` melalui manipulasi request browser | **Source of Truth tunggal:** Server Webhook. Status hanya berubah jika webhook diverifikasi menggunakan hashing SHA-512 `hash(order_id + status_code + gross_amount + ServerKey)`. Callback frontend murni kosmetik. |
| **Price Tampering** | Mengubah nilai harga paket di frontend | Amount order selalu dihitung dan diambil langsung dari tabel `plans` di database server. |
| **IDOR (Insecure Direct Object Reference)** | Mengakses/mengubah draft milik pengguna lain dengan menebak ID database | Otorisasi modifikasi draft wajib menyertakan `customer_access_token` rahasia berekstensi kriptografis. Endpoint publik murni read-only pada data yang berstatus `published`. |
| **Cross-Site Scripting (XSS)** | Injeksi JavaScript melalui form ucapan tamu / guestbook | Seluruh pesan tamu disanitasi dan dirender sebagai teks biasa (*plain text string*). Dilarang keras menggunakan `dangerouslySetInnerHTML`. |
| **File Upload Exploitation** | Upload malware atau file executable ke server storage | Validasi server-side wajib meliputi MIME type (image/jpeg, image/png, image/webp), batasan ukuran maksimal 10MB, pembersihan nama file, dan isolasi path storage per ID undangan. |
| **Webhook Replay / Duplication** | Eksekusi webhook berulang kali yang memicu status corrupt | Implementasi pemrosesan *idempotent* dengan pengecekan apakah transaksi telah diproses sebelumnya. |
| **Secret Leakage** | Pembocoran Midtrans Server Key atau Supabase Service Role Key | Kunci rahasia diletakkan hanya pada environment variable server-side (tanpa prefix `NEXT_PUBLIC_`). |

---

## 2. Row Level Security (RLS) Matrix

- **`invitations`**:
  - `SELECT`: Siapapun dapat membaca baris jika `status = 'published'`. Pembeli dengan `customer_access_token` valid dapat membaca draft mereka sendiri. Admin authenticated memiliki akses penuh.
  - `INSERT`: Diizinkan untuk inisialisasi draft baru.
  - `UPDATE`: Hanya diizinkan jika menyertakan `customer_access_token` yang sesuai atau oleh role `admin`.
- **`wishes` & `rsvps`**:
  - `SELECT`: Diizinkan jika undangan terkait berstatus `published`.
  - `INSERT`: Diizinkan untuk umum pada undangan yang berstatus `published` (dilengkapi rate limiting).
- **`orders` & `payments`**:
  - Akses publik `DENY` secara default.
  - Hanya dapat di-insert dan di-update melalui Supabase Service Role di Route Handler server.

---

## 3. Cryptographic Token Generation

Token tamu (*guest tokens*) wajib memenuhi parameter:
- Karakter: Alfanumerik (huruf kapital & angka menghindari ambiguitas karakter seperti O/0 atau I/1).
- Panjang: Minimal 6-8 karakter acak berbobot kriptografis (`crypto.getRandomValues`).
- Non-sequential: Tidak pernah menggunakan auto-increment ID database.
