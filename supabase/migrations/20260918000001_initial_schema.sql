-- ============================================================================
-- TITIK TEMU INVITATION — INITIAL DATABASE SCHEMA & ROW LEVEL SECURITY (RLS)
-- Migration: 20260918000001_initial_schema.sql
-- ============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. HELPER FUNCTION FOR UPDATED_AT
CREATE OR REPLACE FUNCTION set_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 3. CORE TABLES
-- ============================================================================

-- PROFILES (Admin / Staff linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role VARCHAR(50) DEFAULT 'admin' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ADMINS (Explicit admin permission registry)
CREATE TABLE IF NOT EXISTS public.admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- TEMPLATES
CREATE TABLE IF NOT EXISTS public.templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  preview_image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  config JSONB DEFAULT '{}'::jsonb NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- PLANS
CREATE TABLE IF NOT EXISTS public.plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  price NUMERIC(12,2) NOT NULL,
  features JSONB DEFAULT '[]'::jsonb NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- INVITATIONS
CREATE TABLE IF NOT EXISTS public.invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  template_id UUID REFERENCES public.templates(id) ON DELETE SET NULL,
  customer_access_token VARCHAR(128) NOT NULL,
  title VARCHAR(200) NOT NULL,
  event_type VARCHAR(50) DEFAULT 'wedding' NOT NULL,
  
  -- Mempelai Wanita (Bride)
  bride_name VARCHAR(100),
  bride_full_name VARCHAR(200),
  bride_parent_names TEXT,
  bride_social VARCHAR(100),
  
  -- Mempelai Pria (Groom)
  groom_name VARCHAR(100),
  groom_full_name VARCHAR(200),
  groom_parent_names TEXT,
  groom_social VARCHAR(100),
  
  -- Tanggal & Waktu
  event_date DATE,
  timezone VARCHAR(50) DEFAULT 'Asia/Jakarta' NOT NULL,
  
  -- Acara Akad / Pemberkatan
  akad_date DATE,
  akad_start_time TIME,
  akad_end_time TIME,
  
  -- Acara Resepsi
  reception_date DATE,
  reception_start_time TIME,
  reception_end_time TIME,
  
  -- Lokasi
  venue_name VARCHAR(200),
  venue_address TEXT,
  latitude NUMERIC(10,7),
  longitude NUMERIC(10,7),
  maps_url TEXT,
  
  -- Konten & Media
  opening_text TEXT,
  cover_image_url TEXT,
  music_url TEXT,
  
  -- Lifecycle Status
  status VARCHAR(30) DEFAULT 'draft' NOT NULL,
  -- status: 'draft', 'pending_payment', 'paid', 'published', 'unpublished', 'cancelled', 'expired'
  
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  published_at TIMESTAMPTZ
);

-- INVITATION MEDIA (Gallery up to 10 images)
CREATE TABLE IF NOT EXISTS public.invitation_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invitation_id UUID NOT NULL REFERENCES public.invitations(id) ON DELETE CASCADE,
  media_url TEXT NOT NULL,
  media_type VARCHAR(20) DEFAULT 'image' NOT NULL,
  sort_order INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- INVITATION STORIES (Love Story Timeline)
CREATE TABLE IF NOT EXISTS public.invitation_stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invitation_id UUID NOT NULL REFERENCES public.invitations(id) ON DELETE CASCADE,
  year VARCHAR(20),
  title VARCHAR(150) NOT NULL,
  story TEXT NOT NULL,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- INVITATION GIFTS (Bank accounts & E-wallets)
CREATE TABLE IF NOT EXISTS public.invitation_gifts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invitation_id UUID NOT NULL REFERENCES public.invitations(id) ON DELETE CASCADE,
  gift_type VARCHAR(20) NOT NULL, -- 'bank' or 'ewallet'
  provider_name VARCHAR(100) NOT NULL, -- e.g. BCA, Mandiri, GoPay
  account_number VARCHAR(100) NOT NULL,
  account_name VARCHAR(150) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- GUESTS (Personalized links)
CREATE TABLE IF NOT EXISTS public.guests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invitation_id UUID NOT NULL REFERENCES public.invitations(id) ON DELETE CASCADE,
  name VARCHAR(150) NOT NULL,
  phone VARCHAR(50),
  category VARCHAR(50) DEFAULT 'friend' NOT NULL,
  token VARCHAR(64) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT uq_invitation_guest_token UNIQUE (invitation_id, token)
);

-- RSVPS (Kehadiran Tamu)
CREATE TABLE IF NOT EXISTS public.rsvps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invitation_id UUID NOT NULL REFERENCES public.invitations(id) ON DELETE CASCADE,
  guest_id UUID REFERENCES public.guests(id) ON DELETE SET NULL,
  name VARCHAR(150) NOT NULL,
  attendance VARCHAR(30) NOT NULL, -- 'hadir', 'tidak_hadir', 'masih_ragu'
  guest_count INTEGER DEFAULT 1 NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- WISHES (Buku Tamu / Ucapan)
CREATE TABLE IF NOT EXISTS public.wishes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invitation_id UUID NOT NULL REFERENCES public.invitations(id) ON DELETE CASCADE,
  name VARCHAR(150) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ORDERS (Transaksi Pembelian Paket)
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(100) UNIQUE NOT NULL,
  invitation_id UUID NOT NULL REFERENCES public.invitations(id) ON DELETE RESTRICT,
  plan_id UUID NOT NULL REFERENCES public.plans(id) ON DELETE RESTRICT,
  customer_name VARCHAR(150) NOT NULL,
  customer_email VARCHAR(150) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'IDR' NOT NULL,
  status VARCHAR(30) DEFAULT 'draft' NOT NULL,
  payment_provider VARCHAR(50) DEFAULT 'midtrans' NOT NULL,
  provider_transaction_id VARCHAR(150),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  paid_at TIMESTAMPTZ
);

-- PAYMENTS (Catatan Webhook Gateway)
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  provider_transaction_id VARCHAR(150) UNIQUE NOT NULL,
  payment_type VARCHAR(50),
  gross_amount NUMERIC(12,2) NOT NULL,
  payment_status VARCHAR(50) NOT NULL,
  raw_response JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- 4. INDICES
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_invitations_slug ON public.invitations(slug);
CREATE INDEX IF NOT EXISTS idx_invitations_token ON public.invitations(customer_access_token);
CREATE INDEX IF NOT EXISTS idx_invitations_status ON public.invitations(status);
CREATE INDEX IF NOT EXISTS idx_guests_invitation ON public.guests(invitation_id);
CREATE INDEX IF NOT EXISTS idx_guests_token ON public.guests(token);
CREATE INDEX IF NOT EXISTS idx_rsvps_invitation ON public.rsvps(invitation_id);
CREATE INDEX IF NOT EXISTS idx_wishes_invitation ON public.wishes(invitation_id);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_invitation ON public.orders(invitation_id);
CREATE INDEX IF NOT EXISTS idx_payments_order ON public.payments(order_id);

-- ============================================================================
-- 5. AUTO-UPDATE TRIGGERS
-- ============================================================================
CREATE TRIGGER trigger_invitations_updated_at BEFORE UPDATE ON public.invitations FOR EACH ROW EXECUTE FUNCTION set_updated_at_column();
CREATE TRIGGER trigger_guests_updated_at BEFORE UPDATE ON public.guests FOR EACH ROW EXECUTE FUNCTION set_updated_at_column();
CREATE TRIGGER trigger_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION set_updated_at_column();
CREATE TRIGGER trigger_payments_updated_at BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION set_updated_at_column();

-- ============================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invitation_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invitation_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invitation_gifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- TEMPLATES & PLANS: Read-only to public
CREATE POLICY "Templates are publicly viewable" ON public.templates FOR SELECT USING (is_active = true);
CREATE POLICY "Plans are publicly viewable" ON public.plans FOR SELECT USING (is_active = true);

-- INVITATIONS: Public can only view if published
CREATE POLICY "Published invitations are viewable by everyone" ON public.invitations FOR SELECT USING (status = 'published');
CREATE POLICY "Anyone can create draft invitations" ON public.invitations FOR INSERT WITH CHECK (true);
CREATE POLICY "Customer can update own draft invitation" ON public.invitations FOR UPDATE USING (true) WITH CHECK (true);

-- SUB-ENTITIES: Viewable if invitation is published
CREATE POLICY "Media of published invitations viewable" ON public.invitation_media FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.invitations WHERE invitations.id = invitation_media.invitation_id AND invitations.status = 'published')
);
CREATE POLICY "Stories of published invitations viewable" ON public.invitation_stories FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.invitations WHERE invitations.id = invitation_stories.invitation_id AND invitations.status = 'published')
);
CREATE POLICY "Gifts of published invitations viewable" ON public.invitation_gifts FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.invitations WHERE invitations.id = invitation_gifts.invitation_id AND invitations.status = 'published')
);

-- GUESTS: Accessible via token in app logic
CREATE POLICY "Guests viewable if invitation published" ON public.guests FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.invitations WHERE invitations.id = guests.invitation_id AND invitations.status = 'published')
);

-- RSVPS & WISHES: Public read and insert for published invitations
CREATE POLICY "RSVPs viewable for published invitations" ON public.rsvps FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.invitations WHERE invitations.id = rsvps.invitation_id AND invitations.status = 'published')
);
CREATE POLICY "Anyone can insert RSVP for published invitations" ON public.rsvps FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.invitations WHERE invitations.id = rsvps.invitation_id AND invitations.status = 'published')
);
CREATE POLICY "Wishes viewable for published invitations" ON public.wishes FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.invitations WHERE invitations.id = wishes.invitation_id AND invitations.status = 'published')
);
CREATE POLICY "Anyone can insert wish for published invitations" ON public.wishes FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.invitations WHERE invitations.id = wishes.invitation_id AND invitations.status = 'published')
);

-- ============================================================================
-- 7. SEED INITIAL DATA
-- ============================================================================

-- SEED TEMPLATES
INSERT INTO public.templates (slug, name, description, config) VALUES
(
  'elegant',
  '01 Elegant',
  'Desain anggun dengan tipografi serif klasik, palet warna krem & emas hangat, cocok untuk resepsi pernikahan sakral dan megah.',
  '{"colors": {"primary": "#8a6d3b", "secondary": "#c5a059", "background": "#fdfbf7", "foreground": "#2b2623", "accent": "#dfd3c3"}, "typography": {"heading": "serif", "body": "sans"}, "sections": ["cover", "opening", "couple", "event", "countdown", "location", "story", "gallery", "gift", "rsvp", "guestbook", "closing"]}'::jsonb
),
(
  'minimalist',
  '02 Minimalist',
  'Desain kontemporer bersih dengan tipografi sans-serif modern, tata letak luas, nuansa monokromatik abu-abu halus dan hitam pekat.',
  '{"colors": {"primary": "#18181b", "secondary": "#71717a", "background": "#fafafa", "foreground": "#09090b", "accent": "#f4f4f5"}, "typography": {"heading": "sans", "body": "sans"}, "sections": ["cover", "opening", "couple", "event", "countdown", "location", "story", "gallery", "gift", "rsvp", "guestbook", "closing"]}'::jsonb
),
(
  'nusantara',
  '03 Nusantara',
  'Desain berbalut kekayaan budaya Nusantara dengan ornamen motif tradisional bernuansa terakota, cokelat kayu, dan aksen etnik modern.',
  '{"colors": {"primary": "#7c2d12", "secondary": "#b45309", "background": "#fcfaf7", "foreground": "#291b12", "accent": "#fde68a"}, "typography": {"heading": "serif", "body": "sans"}, "sections": ["cover", "opening", "couple", "event", "countdown", "location", "story", "gallery", "gift", "rsvp", "guestbook", "closing"]}'::jsonb
)
ON CONFLICT (slug) DO NOTHING;

-- SEED PLANS
INSERT INTO public.plans (code, name, price, features) VALUES
(
  'basic',
  'Paket Basic',
  49000.00,
  '["Akses 1 Template", "Masa Aktif 3 Bulan", "Galeri hingga 5 Foto", "Countdown Timer & Google Maps", "RSVP & Ucapan Tamu", "Wedding Gift / Amplop Digital"]'::jsonb
),
(
  'premium',
  'Paket Premium',
  99000.00,
  '["Akses Bebas Semua Template", "Masa Aktif 1 Tahun", "Galeri hingga 10 Foto HD", "Background Music Pilihan", "Love Story Timeline", "Guest Personalization Link Tak Terbatas", "Integrasi WhatsApp Share Otomatis", "Prioritas Dukungan Teknis"]'::jsonb
)
ON CONFLICT (code) DO NOTHING;
