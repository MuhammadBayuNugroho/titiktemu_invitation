# TITIK TEMU INVITATION — DATABASE SCHEMA & RELATIONS

## 1. Database Overview
- **Database Engine**: PostgreSQL (Supabase)
- **Primary Keys**: UUID v4 (`gen_random_uuid()`)
- **Timezone Default**: `Asia/Jakarta` (`TIMESTAMPTZ`)
- **Row Level Security (RLS)**: Diaktifkan pada seluruh tabel.

---

## 2. Table Definitions

### `profiles` (Super Admin & Staff)
- `id` (UUID, PK, references `auth.users.id` on delete cascade)
- `email` (TEXT, NOT NULL)
- `full_name` (TEXT)
- `role` (TEXT, default: 'admin')
- `created_at` (TIMESTAMPTZ, default: now())

### `templates` (Katalog Desain Undangan)
- `id` (UUID, PK)
- `slug` (VARCHAR(50), UNIQUE, NOT NULL) -- 'elegant', 'minimalist', 'nusantara'
- `name` (VARCHAR(100), NOT NULL)
- `description` (TEXT)
- `preview_image_url` (TEXT)
- `is_active` (BOOLEAN, default: true)
- `config` (JSONB, NOT NULL default '{}') -- warna, font, susunan seksi
- `created_at` (TIMESTAMPTZ, default: now())

### `plans` (Paket Layanan)
- `id` (UUID, PK)
- `code` (VARCHAR(50), UNIQUE, NOT NULL) -- 'basic', 'premium'
- `name` (VARCHAR(100), NOT NULL)
- `price` (NUMERIC(12,2), NOT NULL)
- `features` (JSONB, default '[]')
- `is_active` (BOOLEAN, default: true)
- `created_at` (TIMESTAMPTZ, default: now())

### `invitations` (Data Inti Undangan)
- `id` (UUID, PK)
- `slug` (VARCHAR(100), UNIQUE, NOT NULL)
- `template_id` (UUID, FK -> templates.id)
- `customer_access_token` (VARCHAR(128), NOT NULL) -- Token rahasia otorisasi pemilik draft
- `title` (VARCHAR(200), NOT NULL)
- `event_type` (VARCHAR(50), default: 'wedding')
- `bride_name` (VARCHAR(100))
- `bride_full_name` (VARCHAR(200))
- `bride_parent_names` (TEXT)
- `bride_social` (VARCHAR(100))
- `groom_name` (VARCHAR(100))
- `groom_full_name` (VARCHAR(200))
- `groom_parent_names` (TEXT)
- `groom_social` (VARCHAR(100))
- `event_date` (DATE)
- `timezone` (VARCHAR(50), default: 'Asia/Jakarta')
- `akad_date` (DATE)
- `akad_start_time` (TIME)
- `akad_end_time` (TIME)
- `reception_date` (DATE)
- `reception_start_time` (TIME)
- `reception_end_time` (TIME)
- `venue_name` (VARCHAR(200))
- `venue_address` (TEXT)
- `latitude` (NUMERIC(10,7))
- `longitude` (NUMERIC(10,7))
- `maps_url` (TEXT)
- `opening_text` (TEXT)
- `cover_image_url` (TEXT)
- `music_url` (TEXT)
- `status` (VARCHAR(30), default: 'draft') -- 'draft', 'pending_payment', 'paid', 'published', 'unpublished', 'cancelled', 'expired'
- `created_at` (TIMESTAMPTZ, default: now())
- `updated_at` (TIMESTAMPTZ, default: now())
- `published_at` (TIMESTAMPTZ)

### `invitation_media` (Galeri Foto)
- `id` (UUID, PK)
- `invitation_id` (UUID, FK -> invitations.id on delete cascade)
- `media_url` (TEXT, NOT NULL)
- `media_type` (VARCHAR(20), default: 'image')
- `sort_order` (INTEGER, default: 0)
- `created_at` (TIMESTAMPTZ, default: now())

### `invitation_stories` (Love Story Timeline)
- `id` (UUID, PK)
- `invitation_id` (UUID, FK -> invitations.id on delete cascade)
- `year` (VARCHAR(20))
- `title` (VARCHAR(150), NOT NULL)
- `story` (TEXT, NOT NULL)
- `image_url` (TEXT)
- `sort_order` (INTEGER, default: 0)
- `created_at` (TIMESTAMPTZ, default: now())

### `invitation_gifts` (Wedding Gift & Amplop Digital)
- `id` (UUID, PK)
- `invitation_id` (UUID, FK -> invitations.id on delete cascade)
- `gift_type` (VARCHAR(20)) -- 'bank' atau 'ewallet'
- `provider_name` (VARCHAR(100), NOT NULL) -- contoh: BCA, Mandiri, GoPay
- `account_number` (VARCHAR(100), NOT NULL)
- `account_name` (VARCHAR(150), NOT NULL)
- `created_at` (TIMESTAMPTZ, default: now())

### `guests` (Buku Tamu / Tamu Terundang)
- `id` (UUID, PK)
- `invitation_id` (UUID, FK -> invitations.id on delete cascade)
- `name` (VARCHAR(150), NOT NULL)
- `phone` (VARCHAR(50))
- `category` (VARCHAR(50), default: 'friend') -- 'family', 'friend', 'coworker', 'organization', 'other'
- `token` (VARCHAR(64), UNIQUE, NOT NULL) -- token acak high-entropy (misal: 8-12 karakter alfanumerik)
- `created_at` (TIMESTAMPTZ, default: now())
- `updated_at` (TIMESTAMPTZ, default: now())

### `rsvps` (Konfirmasi Kehadiran Tamu)
- `id` (UUID, PK)
- `invitation_id` (UUID, FK -> invitations.id on delete cascade)
- `guest_id` (UUID, FK -> guests.id on delete set null)
- `name` (VARCHAR(150), NOT NULL)
- `attendance` (VARCHAR(30), NOT NULL) -- 'hadir', 'tidak_hadir', 'masih_ragu'
- `guest_count` (INTEGER, default: 1)
- `message` (TEXT)
- `created_at` (TIMESTAMPTZ, default: now())

### `wishes` (Ucapan & Doa)
- `id` (UUID, PK)
- `invitation_id` (UUID, FK -> invitations.id on delete cascade)
- `name` (VARCHAR(150), NOT NULL)
- `message` (TEXT, NOT NULL) -- selalu plain text
- `created_at` (TIMESTAMPTZ, default: now())

### `orders` (Transaksi Pemesanan)
- `id` (UUID, PK)
- `order_number` (VARCHAR(100), UNIQUE, NOT NULL) -- contoh: TTI-2026-XXXXX
- `invitation_id` (UUID, FK -> invitations.id)
- `plan_id` (UUID, FK -> plans.id)
- `customer_name` (VARCHAR(150), NOT NULL)
- `customer_email` (VARCHAR(150), NOT NULL)
- `customer_phone` (VARCHAR(50), NOT NULL)
- `amount` (NUMERIC(12,2), NOT NULL)
- `currency` (VARCHAR(10), default: 'IDR')
- `status` (VARCHAR(30), default: 'draft') -- 'draft', 'pending_payment', 'paid', 'cancelled', 'expired', 'refunded'
- `payment_provider` (VARCHAR(50), default: 'midtrans')
- `created_at` (TIMESTAMPTZ, default: now())
- `updated_at` (TIMESTAMPTZ, default: now())
- `paid_at` (TIMESTAMPTZ)

### `payments` (Catatan Pembayaran & Webhook)
- `id` (UUID, PK)
- `order_id` (UUID, FK -> orders.id on delete cascade)
- `provider_transaction_id` (VARCHAR(150), UNIQUE)
- `payment_type` (VARCHAR(50)) -- 'qris', 'bank_transfer', 'echannel', dll.
- `gross_amount` (NUMERIC(12,2), NOT NULL)
- `payment_status` (VARCHAR(50), NOT NULL) -- 'pending', 'settlement', 'capture', 'deny', 'cancel', 'expire', 'failure'
- `raw_response` (JSONB)
- `created_at` (TIMESTAMPTZ, default: now())
- `updated_at` (TIMESTAMPTZ, default: now())
