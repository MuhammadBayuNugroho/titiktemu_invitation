/**
 * Database Seeder CLI Script
 *
 * Runs via: npm run seed
 * Populates Supabase database with real preview data:
 * - Templates
 * - Plans
 * - Invitations (shava-dedek & sample-wedding)
 * - Stories
 * - Media Gallery
 * - Gifts (Amplop Digital)
 * - Guests (with personalized secure tokens)
 * - RSVPs
 * - Wishes (Guestbook)
 */

import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";

// Load environment variables from .env.local without external dependency
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8");
  content.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const idx = trimmed.indexOf("=");
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim();
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey || supabaseUrl.includes("placeholder") || serviceKey.includes("placeholder")) {
  console.log("ℹ️  CATATAN: Supabase credentials di .env.local masih bernilai placeholder.");
  console.log("👉 Untuk menjalankan seeder ini ke database cloud, masukkan URL dan Service Role Key asli di .env.local");
  console.log("   Alternatif: Anda juga dapat mengeksekusi langsung file 'supabase/seed.sql' di Supabase SQL Editor.\n");
  process.exit(0);
}

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function runSeed() {
  console.log("🌱 Menjalankan Seeder Supabase untuk Titik Temu Invitation...\n");

  try {
    // 1. Templates
    console.log("📦 1. Seeding Templates...");
    const { error: tplErr } = await supabase.from("templates").upsert(
      [
        {
          id: "00000000-0000-0000-0000-000000000001",
          slug: "elegant",
          name: "01 Elegant",
          description: "Desain abadi dengan tipografi serif klasik, aksen emas hangat, dan layout mewah.",
          preview_image_url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800",
          is_active: true,
          config: {
            id: "elegant",
            slug: "elegant",
            name: "01 Elegant",
            colors: {
              primary: "#D4AF37",
              secondary: "#A38025",
              background: "#0C0A09",
              foreground: "#F5F5F4",
              accent: "#1C1917",
            },
            typography: { heading: "serif", body: "sans" },
            sections: ["cover", "opening", "couple", "countdown", "event", "story", "gallery", "gift", "rsvp", "guestbook", "closing"],
          },
        },
        {
          id: "00000000-0000-0000-0000-000000000002",
          slug: "minimalist",
          name: "02 Minimalist",
          description: "Estetika bersih editorial modern. Tipografi sans-serif kontras tinggi dan ruang lega.",
          preview_image_url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800",
          is_active: true,
          config: {
            id: "minimalist",
            slug: "minimalist",
            name: "02 Minimalist",
            colors: {
              primary: "#E2E8F0",
              secondary: "#94A3B8",
              background: "#0F172A",
              foreground: "#F8FAFC",
              accent: "#1E293B",
            },
            typography: { heading: "sans", body: "sans" },
            sections: ["cover", "opening", "couple", "countdown", "event", "story", "gallery", "gift", "rsvp", "guestbook", "closing"],
          },
        },
        {
          id: "00000000-0000-0000-0000-000000000003",
          slug: "nusantara",
          name: "03 Nusantara",
          description: "Perpaduan anggun motif tradisional dengan estetika dark mode tembaga dan kayu jati.",
          preview_image_url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800",
          is_active: true,
          config: {
            id: "nusantara",
            slug: "nusantara",
            name: "03 Nusantara",
            colors: {
              primary: "#C28E5C",
              secondary: "#8C5E32",
              background: "#140F0B",
              foreground: "#FAF5EF",
              accent: "#261D16",
            },
            typography: { heading: "serif", body: "sans" },
            sections: ["cover", "opening", "couple", "countdown", "event", "story", "gallery", "gift", "rsvp", "guestbook", "closing"],
          },
        },
      ],
      { onConflict: "slug" }
    );
    if (tplErr) throw tplErr;
    console.log("   ✅ Templates seeded.");

    // 2. Plans
    console.log("💳 2. Seeding Plans...");
    const { error: planErr } = await supabase.from("plans").upsert(
      [
        {
          id: "00000000-0000-0000-0001-000000000001",
          code: "basic",
          name: "Paket Basic",
          price: 49000,
          features: ["Masa Aktif 6 Bulan", "Galeri hingga 5 Foto", "RSVP & Digital Guestbook", "Peta Lokasi Google Maps", "Musik Latar Pilihan"],
          is_active: true,
        },
        {
          id: "00000000-0000-0000-0001-000000000002",
          code: "premium",
          name: "Paket Premium",
          price: 99000,
          features: ["Masa Aktif Selamanya", "Galeri Foto Tanpa Batas", "Cerita Cinta & Timeline", "Amplop Digital & QR Code", "Tamu Terpersonalisasi (WhatsApp Massal)", "Custom Slug Undangan", "Prioritas Support 24/7"],
          is_active: true,
        },
        {
          id: "00000000-0000-0000-0001-000000000003",
          code: "gold",
          name: "Paket Gold VIP",
          price: 149000,
          features: ["Semua Fitur Paket Premium", "Desain Kustom Eksklusif", "Buku Tamu Ekspor Excel/PDF", "Custom Domain Sendiri (.com / .id)", "Integrasi WhatsApp Gateway Otomatis"],
          is_active: true,
        },
      ],
      { onConflict: "code" }
    );
    if (planErr) throw planErr;
    console.log("   ✅ Plans seeded.");

    // 3. Invitations
    console.log("💌 3. Seeding Sample Invitations...");
    const invId1 = "11111111-1111-1111-1111-111111111111";
    const invId2 = "22222222-2222-2222-2222-222222222222";

    const { error: invErr } = await supabase.from("invitations").upsert(
      [
        {
          id: invId1,
          slug: "shava-dedek",
          template_id: "00000000-0000-0000-0000-000000000001",
          customer_access_token: "cat_shava_dedek_secret_token_2026",
          title: "Pernikahan Shava & Dedek",
          event_type: "wedding",
          bride_name: "Shava",
          bride_full_name: "Shava Amaliya Putri, S.Farm",
          bride_parent_names: "Putri tercinta dari Bapak Ahmad Sari & Ibu Dewi Sartika",
          bride_social: "shavaamaliya",
          groom_name: "Dedek",
          groom_full_name: "Muhammad Dedek Firmansyah, S.T",
          groom_parent_names: "Putra tercinta dari Bapak Hasan Basri & Ibu Fatimah Zahra",
          groom_social: "dedekfirmansyah",
          event_date: "2026-10-24",
          timezone: "Asia/Jakarta",
          akad_date: "2026-10-24",
          akad_start_time: "08:00:00",
          akad_end_time: "10:00:00",
          reception_date: "2026-10-24",
          reception_start_time: "11:00:00",
          reception_end_time: "15:00:00",
          venue_name: "Grand Ballroom Hotel Indonesia Kempinski",
          venue_address: "Jl. M.H. Thamrin No. 1, Menteng, Jakarta Pusat",
          latitude: -6.195413,
          longitude: 106.822839,
          maps_url: "https://maps.google.com/?q=Hotel+Indonesia+Kempinski+Jakarta",
          opening_text: "Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara pernikahan kami.",
          cover_image_url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200",
          music_url: "https://assets.mixkit.co/music/preview/mixkit-romantic-wedding-melody-789.mp3",
          status: "published",
          published_at: new Date().toISOString(),
        },
        {
          id: invId2,
          slug: "sample-wedding",
          template_id: "00000000-0000-0000-0000-000000000001",
          customer_access_token: "cat_sample_wedding_secret_token_2026",
          title: "Pernikahan Rizky & Nabila",
          event_type: "wedding",
          bride_name: "Nabila",
          bride_full_name: "Nabila Putri Ananda, S.Kom",
          bride_parent_names: "Putri pertama dari Bapak Agus Ananda & Ibu Dewi Sartika",
          bride_social: "nabilaputri",
          groom_name: "Rizky",
          groom_full_name: "Ahmad Rizky Pratama, M.Kom",
          groom_parent_names: "Putra sulung dari Bapak Hendra Pratama & Ibu Sri Wahyuni",
          groom_social: "rizkypratama",
          event_date: "2026-11-15",
          timezone: "Asia/Jakarta",
          akad_date: "2026-11-15",
          akad_start_time: "08:30:00",
          akad_end_time: "10:30:00",
          reception_date: "2026-11-15",
          reception_start_time: "11:30:00",
          reception_end_time: "16:00:00",
          venue_name: "The Glass House Convention Center",
          venue_address: "Jl. Boulevard Barat Raya No. 88, Kelapa Gading, Jakarta Utara",
          latitude: -6.15532,
          longitude: 106.9024,
          maps_url: "https://maps.google.com/?q=Jakarta",
          opening_text: "Assalamu’alaikum Warahmatullahi Wabarakatuh. Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.",
          cover_image_url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200",
          music_url: "https://assets.mixkit.co/music/preview/mixkit-romantic-wedding-melody-789.mp3",
          status: "published",
          published_at: new Date().toISOString(),
        },
      ],
      { onConflict: "slug" }
    );
    if (invErr) throw invErr;
    console.log("   ✅ Invitations seeded.");

    // 4. Media
    console.log("🖼️  4. Seeding Gallery Media...");
    await supabase.from("invitation_media").delete().in("invitation_id", [invId1, invId2]);
    const { error: medErr } = await supabase.from("invitation_media").insert([
      { invitation_id: invId1, media_url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800", media_type: "gallery", sort_order: 0 },
      { invitation_id: invId1, media_url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800", media_type: "gallery", sort_order: 1 },
      { invitation_id: invId1, media_url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800", media_type: "gallery", sort_order: 2 },
      { invitation_id: invId1, media_url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800", media_type: "gallery", sort_order: 3 },
    ]);
    if (medErr) throw medErr;
    console.log("   ✅ Media gallery seeded.");

    // 5. Stories
    console.log("📖 5. Seeding Love Stories...");
    await supabase.from("invitation_stories").delete().in("invitation_id", [invId1, invId2]);
    const { error: storyErr } = await supabase.from("invitation_stories").insert([
      {
        invitation_id: invId1,
        year: "2020",
        title: "Pertemuan Pertama",
        story: "Takdir mempertemukan kami di sebuah perpustakaan kampus di Bandung. Sebuah obrolan sederhana tentang buku mengawali cerita panjang perjalanan kami.",
        image_url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800",
        sort_order: 0,
      },
      {
        invitation_id: invId1,
        year: "2023",
        title: "Masa Pendekatan & Komitmen",
        story: "Setelah saling mengenal kepribadian dan nilai keluarga masing-masing, kami sepakat untuk melangkah dengan niat yang tulus dan penuh komitmen.",
        image_url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800",
        sort_order: 1,
      },
      {
        invitation_id: invId1,
        year: "2025",
        title: "Hari Lamaran",
        story: "Di hadapan kedua keluarga besar, kami mengikat janji pertunangan untuk menyatukan dua keluarga dalam ikatan suci pernikahan.",
        image_url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800",
        sort_order: 2,
      },
    ]);
    if (storyErr) throw storyErr;
    console.log("   ✅ Stories timeline seeded.");

    // 6. Gifts
    console.log("🎁 6. Seeding Amplop Digital...");
    await supabase.from("invitation_gifts").delete().in("invitation_id", [invId1, invId2]);
    const { error: giftErr } = await supabase.from("invitation_gifts").insert([
      { invitation_id: invId1, gift_type: "bank", provider_name: "BCA", account_number: "8831092834", account_name: "Shava Amaliya Putri" },
      { invitation_id: invId1, gift_type: "bank", provider_name: "Mandiri", account_number: "1370019283741", account_name: "Muhammad Dedek Firmansyah" },
    ]);
    if (giftErr) throw giftErr;
    console.log("   ✅ Gifts seeded.");

    // 7. Guests
    console.log("👥 7. Seeding Personalized Guests...");
    await supabase.from("guests").delete().in("invitation_id", [invId1, invId2]);
    const { error: guestErr } = await supabase.from("guests").insert([
      { id: "33333333-3333-3333-3333-333333333331", invitation_id: invId1, name: "Bpk. Dr. Budi Santoso & Keluarga", phone: "081234567890", category: "family", token: "tok_keluarga_budi_01" },
      { id: "33333333-3333-3333-3333-333333333332", invitation_id: invId1, name: "Dani Ramadhan, S.Kom", phone: "081987654321", category: "friend", token: "tok_sahabat_dani_02" },
      { id: "33333333-3333-3333-3333-333333333333", invitation_id: invId1, name: "Ibu Siti Rahmawati & Rekan Kantor", phone: "081345678901", category: "coworker", token: "tok_rekan_siti_03" },
    ]);
    if (guestErr) throw guestErr;
    console.log("   ✅ Guests seeded.");

    // 8. RSVPs
    console.log("📋 8. Seeding RSVPs...");
    await supabase.from("rsvps").delete().in("invitation_id", [invId1, invId2]);
    const { error: rsvpErr } = await supabase.from("rsvps").insert([
      { invitation_id: invId1, name: "Bpk. Dr. Budi Santoso", attendance: "hadir", guest_count: 2, message: "Insya Allah kami sekeluarga akan hadir tepat waktu." },
      { invitation_id: invId1, name: "Dani Ramadhan", attendance: "hadir", guest_count: 1, message: "Pasti hadir bro! Selamat ya buat kalian berdua." },
      { invitation_id: invId1, name: "Aditya Pratama", attendance: "tidak_hadir", guest_count: 1, message: "Mohon maaf belum bisa hadir karena dinas di luar kota. Doa terbaik untuk Shava dan Dedek." },
    ]);
    if (rsvpErr) throw rsvpErr;
    console.log("   ✅ RSVPs seeded.");

    // 9. Wishes
    console.log("💬 9. Seeding Guestbook Wishes...");
    await supabase.from("wishes").delete().in("invitation_id", [invId1, invId2]);
    const { error: wishErr } = await supabase.from("wishes").insert([
      { invitation_id: invId1, name: "Rizky & Amanda", message: "Barakallahu lakum wa baraka alaikum wa jama'a bainakuma fii khair. Selamat menempuh lembaran baru pernikahan yang penuh berkah dan kebahagiaan!" },
      { invitation_id: invId1, name: "Dimas Prasetyo", message: "Selamat ya bro Dedek dan Mbak Shava! Semoga selalu kompak, harmonis, dan samawa sampai kakek nenek." },
      { invitation_id: invId1, name: "Keluarga Besar Bpk. Hendra", message: "Selamat berbahagia untuk kedua mempelai dan kedua keluarga besar. Semoga Allah SWT senantiasa meridhoi ikatan suci ini." },
      { invitation_id: invId1, name: "Nadia Clarissa", message: "Happy wedding Shava! So happy for you two, semoga bahagia selalu dan dilancarkan sampai hari H." },
    ]);
    if (wishErr) throw wishErr;
    console.log("   ✅ Wishes seeded.");

    console.log("\n🎉 Seluruh data seeder berhasil dimasukkan ke Supabase!");
    console.log("🔗 Anda dapat langsung mengakses undangan preview di:");
    console.log("   - http://localhost:3000/i/shava-dedek");
    console.log("   - http://localhost:3000/i/shava-dedek/tok_sahabat_dani_02 (Tamu Terpersonalisasi)");
    console.log("   - http://localhost:3000/i/sample-wedding");
  } catch (err: any) {
    console.error("\n❌ Gagal menjalankan seeder:", err.message || err);
    process.exit(1);
  }
}

runSeed();
