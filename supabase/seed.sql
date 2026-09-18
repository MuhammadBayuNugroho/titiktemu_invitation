-- ============================================================================
-- TITIK TEMU INVITATION — DATA SEEDER UNTUK PREVIEW & PENGUJIAN LENGKAP
-- File: supabase/seed.sql
-- ============================================================================

-- 1. SEED TEMPLATES
INSERT INTO public.templates (id, slug, name, description, preview_image_url, is_active, config)
VALUES
(
  '00000000-0000-0000-0000-000000000001',
  'elegant',
  '01 Elegant',
  'Desain abadi dengan tipografi serif klasik, sentuhan aksen emas hangat, dan layout simetris yang mewah.',
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800',
  TRUE,
  '{
    "id": "elegant",
    "slug": "elegant",
    "name": "01 Elegant",
    "colors": {
      "primary": "#D4AF37",
      "secondary": "#A38025",
      "background": "#0C0A09",
      "foreground": "#F5F5F4",
      "accent": "#1C1917"
    },
    "typography": {
      "heading": "serif",
      "body": "sans"
    },
    "sections": ["cover", "opening", "couple", "countdown", "event", "story", "gallery", "gift", "rsvp", "guestbook", "closing"]
  }'::jsonb
),
(
  '00000000-0000-0000-0000-000000000002',
  'minimalist',
  '02 Minimalist',
  'Estetika bersih terinspirasi gaya editorial modern. Garis tipis, tipografi sans-serif kontras tinggi, dan ruang bernapas yang lega.',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800',
  TRUE,
  '{
    "id": "minimalist",
    "slug": "minimalist",
    "name": "02 Minimalist",
    "colors": {
      "primary": "#E2E8F0",
      "secondary": "#94A3B8",
      "background": "#0F172A",
      "foreground": "#F8FAFC",
      "accent": "#1E293B"
    },
    "typography": {
      "heading": "sans",
      "body": "sans"
    },
    "sections": ["cover", "opening", "couple", "countdown", "event", "story", "gallery", "gift", "rsvp", "guestbook", "closing"]
  }'::jsonb
),
(
  '00000000-0000-0000-0000-000000000003',
  'nusantara',
  '03 Nusantara',
  'Perpaduan anggun motif tradisional Indonesia dengan estetika modern dark mode bernuansa tembaga dan kayu jati.',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800',
  TRUE,
  '{
    "id": "nusantara",
    "slug": "nusantara",
    "name": "03 Nusantara",
    "colors": {
      "primary": "#C28E5C",
      "secondary": "#8C5E32",
      "background": "#140F0B",
      "foreground": "#FAF5EF",
      "accent": "#261D16"
    },
    "typography": {
      "heading": "serif",
      "body": "sans"
    },
    "sections": ["cover", "opening", "couple", "countdown", "event", "story", "gallery", "gift", "rsvp", "guestbook", "closing"]
  }'::jsonb
)
ON CONFLICT (slug) DO UPDATE
SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  preview_image_url = EXCLUDED.preview_image_url,
  config = EXCLUDED.config;

-- 2. SEED PLANS (Server-Authoritative Pricing)
INSERT INTO public.plans (id, code, name, price, features, is_active)
VALUES
(
  '00000000-0000-0000-0001-000000000001',
  'basic',
  'Paket Basic',
  49000.00,
  '["Masa Aktif 6 Bulan", "Galeri hingga 5 Foto", "RSVP & Digital Guestbook", "Peta Lokasi Google Maps", "Musik Latar Pilihan"]'::jsonb,
  TRUE
),
(
  '00000000-0000-0000-0001-000000000002',
  'premium',
  'Paket Premium',
  99000.00,
  '["Masa Aktif Selamanya", "Galeri Foto Tanpa Batas", "Cerita Cinta & Timeline", "Amplop Digital & QR Code", "Tamu Terpersonalisasi (WhatsApp Massal)", "Custom Slug Undangan", "Prioritas Support 24/7"]'::jsonb,
  TRUE
),
(
  '00000000-0000-0000-0001-000000000003',
  'gold',
  'Paket Gold VIP',
  149000.00,
  '["Semua Fitur Paket Premium", "Desain Kustom Eksklusif", "Buku Tamu Ekspor Excel/PDF", "Custom Domain Sendiri (.com / .id)", "Integrasi WhatsApp Gateway Otomatis"]'::jsonb,
  TRUE
)
ON CONFLICT (code) DO UPDATE
SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  features = EXCLUDED.features;

-- 3. SEED INVITATIONS (Sample Wedding Live Data)
INSERT INTO public.invitations (
  id,
  slug,
  template_id,
  customer_access_token,
  title,
  event_type,
  bride_name,
  bride_full_name,
  bride_parent_names,
  bride_social,
  groom_name,
  groom_full_name,
  groom_parent_names,
  groom_social,
  event_date,
  timezone,
  akad_date,
  akad_start_time,
  akad_end_time,
  reception_date,
  reception_start_time,
  reception_end_time,
  venue_name,
  venue_address,
  latitude,
  longitude,
  maps_url,
  opening_text,
  cover_image_url,
  music_url,
  status,
  published_at
)
VALUES
(
  '11111111-1111-1111-1111-111111111111',
  'shava-dedek',
  '00000000-0000-0000-0000-000000000001',
  'cat_shava_dedek_secret_token_2026',
  'Pernikahan Shava & Dedek',
  'wedding',
  'Shava',
  'Shava Amaliya Putri, S.Farm',
  'Putri tercinta dari Bapak Ahmad Sari & Ibu Dewi Sartika',
  'shavaamaliya',
  'Dedek',
  'Muhammad Dedek Firmansyah, S.T',
  'Putra tercinta dari Bapak Hasan Basri & Ibu Fatimah Zahra',
  'dedekfirmansyah',
  '2026-10-24',
  'Asia/Jakarta',
  '2026-10-24',
  '08:00:00',
  '10:00:00',
  '2026-10-24',
  '11:00:00',
  '15:00:00',
  'Grand Ballroom Hotel Indonesia Kempinski',
  'Jl. M.H. Thamrin No. 1, Menteng, Jakarta Pusat',
  -6.1954130,
  106.8228390,
  'https://maps.google.com/?q=Hotel+Indonesia+Kempinski+Jakarta',
  'Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara pernikahan kami.',
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200',
  'https://assets.mixkit.co/music/preview/mixkit-romantic-wedding-melody-789.mp3',
  'published',
  NOW()
),
(
  '22222222-2222-2222-2222-222222222222',
  'sample-wedding',
  '00000000-0000-0000-0000-000000000001',
  'cat_sample_wedding_secret_token_2026',
  'Pernikahan Rizky & Nabila',
  'wedding',
  'Nabila',
  'Nabila Putri Ananda, S.Kom',
  'Putri pertama dari Bapak Agus Ananda & Ibu Dewi Sartika',
  'nabilaputri',
  'Rizky',
  'Ahmad Rizky Pratama, M.Kom',
  'Putra sulung dari Bapak Hendra Pratama & Ibu Sri Wahyuni',
  'rizkypratama',
  '2026-11-15',
  'Asia/Jakarta',
  '2026-11-15',
  '08:30:00',
  '10:30:00',
  '2026-11-15',
  '11:30:00',
  '16:00:00',
  'The Glass House Convention Center',
  'Jl. Boulevard Barat Raya No. 88, Kelapa Gading, Jakarta Utara',
  -6.1553200,
  106.9024000,
  'https://maps.google.com/?q=Jakarta',
  'Assalamu’alaikum Warahmatullahi Wabarakatuh. Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200',
  'https://assets.mixkit.co/music/preview/mixkit-romantic-wedding-melody-789.mp3',
  'published',
  NOW()
)
ON CONFLICT (slug) DO UPDATE
SET
  title = EXCLUDED.title,
  bride_name = EXCLUDED.bride_name,
  bride_full_name = EXCLUDED.bride_full_name,
  groom_name = EXCLUDED.groom_name,
  groom_full_name = EXCLUDED.groom_full_name,
  event_date = EXCLUDED.event_date,
  venue_name = EXCLUDED.venue_name,
  venue_address = EXCLUDED.venue_address,
  maps_url = EXCLUDED.maps_url,
  status = EXCLUDED.status;

-- 4. SEED INVITATION MEDIA (Gallery)
DELETE FROM public.invitation_media WHERE invitation_id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222');

INSERT INTO public.invitation_media (invitation_id, media_url, media_type, sort_order)
VALUES
(
  '11111111-1111-1111-1111-111111111111',
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800',
  'gallery',
  0
),
(
  '11111111-1111-1111-1111-111111111111',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800',
  'gallery',
  1
),
(
  '11111111-1111-1111-1111-111111111111',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800',
  'gallery',
  2
),
(
  '11111111-1111-1111-1111-111111111111',
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800',
  'gallery',
  3
);

-- 5. SEED INVITATION STORIES (Timeline)
DELETE FROM public.invitation_stories WHERE invitation_id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222');

INSERT INTO public.invitation_stories (invitation_id, year, title, story, image_url, sort_order)
VALUES
(
  '11111111-1111-1111-1111-111111111111',
  '2020',
  'Pertemuan Pertama',
  'Takdir mempertemukan kami di sebuah perpustakaan kampus di Bandung. Sebuah obrolan sederhana tentang buku mengawali cerita panjang perjalanan kami.',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800',
  0
),
(
  '11111111-1111-1111-1111-111111111111',
  '2023',
  'Masa Pendekatan & Komitmen',
  'Setelah saling mengenal kepribadian dan nilai keluarga masing-masing, kami sepakat untuk melangkah dengan niat yang tulus dan penuh komitmen.',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800',
  1
),
(
  '11111111-1111-1111-1111-111111111111',
  '2025',
  'Hari Lamaran',
  'Di hadapan kedua keluarga besar, kami mengikat janji pertunangan untuk menyatukan dua keluarga dalam ikatan suci pernikahan.',
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800',
  2
);

-- 6. SEED INVITATION GIFTS (Amplop Digital)
DELETE FROM public.invitation_gifts WHERE invitation_id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222');

INSERT INTO public.invitation_gifts (invitation_id, gift_type, provider_name, account_number, account_name)
VALUES
(
  '11111111-1111-1111-1111-111111111111',
  'bank',
  'BCA',
  '8831092834',
  'Shava Amaliya Putri'
),
(
  '11111111-1111-1111-1111-111111111111',
  'bank',
  'Mandiri',
  '1370019283741',
  'Muhammad Dedek Firmansyah'
);

-- 7. SEED GUESTS (Personalized Tokens)
DELETE FROM public.guests WHERE invitation_id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222');

INSERT INTO public.guests (id, invitation_id, name, phone, category, token)
VALUES
(
  '33333333-3333-3333-3333-333333333331',
  '11111111-1111-1111-1111-111111111111',
  'Bpk. Dr. Budi Santoso & Keluarga',
  '081234567890',
  'family',
  'tok_keluarga_budi_01'
),
(
  '33333333-3333-3333-3333-333333333332',
  '11111111-1111-1111-1111-111111111111',
  'Dani Ramadhan, S.Kom',
  '081987654321',
  'friend',
  'tok_sahabat_dani_02'
),
(
  '33333333-3333-3333-3333-333333333333',
  '11111111-1111-1111-1111-111111111111',
  'Ibu Siti Rahmawati & Rekan Kantor',
  '081345678901',
  'coworker',
  'tok_rekan_siti_03'
);

-- 8. SEED RSVPS (Guest Responses)
DELETE FROM public.rsvps WHERE invitation_id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222');

INSERT INTO public.rsvps (invitation_id, name, attendance, guest_count, message)
VALUES
(
  '11111111-1111-1111-1111-111111111111',
  'Bpk. Dr. Budi Santoso',
  'hadir',
  2,
  'Insya Allah kami sekeluarga akan hadir tepat waktu.'
),
(
  '11111111-1111-1111-1111-111111111111',
  'Dani Ramadhan',
  'hadir',
  1,
  'Pasti hadir bro! Selamat ya buat kalian berdua.'
),
(
  '11111111-1111-1111-1111-111111111111',
  'Aditya Pratama',
  'tidak_hadir',
  1,
  'Mohon maaf belum bisa hadir karena dinas di luar kota. Doa terbaik untuk Shava dan Dedek.'
);

-- 9. SEED WISHES (Guestbook)
DELETE FROM public.wishes WHERE invitation_id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222');

INSERT INTO public.wishes (invitation_id, name, message)
VALUES
(
  '11111111-1111-1111-1111-111111111111',
  'Rizky & Amanda',
  'Barakallahu lakum wa baraka alaikum wa jama''a bainakuma fii khair. Selamat menempuh lembaran baru pernikahan yang penuh berkah dan kebahagiaan!'
),
(
  '11111111-1111-1111-1111-111111111111',
  'Dimas Prasetyo',
  'Selamat ya bro Dedek dan Mbak Shava! Semoga selalu kompak, harmonis, dan samawa sampai kakek nenek.'
),
(
  '11111111-1111-1111-1111-111111111111',
  'Keluarga Besar Bpk. Hendra',
  'Selamat berbahagia untuk kedua mempelai dan kedua keluarga besar. Semoga Allah SWT senantiasa meridhoi ikatan suci ini.'
),
(
  '11111111-1111-1111-1111-111111111111',
  'Nadia Clarissa',
  'Happy wedding Shava! So happy for you two, semoga bahagia selalu dan dilancarkan sampai hari H.'
);
