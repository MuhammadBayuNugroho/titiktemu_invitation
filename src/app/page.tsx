import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Smartphone,
  Heart,
  Send,
  ShieldCheck,
  Zap,
  Music,
  MapPin,
  Clock,
  Eye,
  Gift,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white antialiased selection:bg-amber-500/30 selection:text-amber-200">
      {/* Floating Apple-Style Glass Pill Navigation Header */}
      <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl">
        <div className="apple-glass rounded-full px-5 sm:px-7 py-3 flex items-center justify-between shadow-2xl">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-sm sm:text-base font-semibold tracking-tight text-white group-hover:text-amber-300 transition-colors">
              TITIK TEMU <span className="font-light text-zinc-400">INVITATION</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-zinc-400">
            <Link href="/templates" className="hover:text-white transition-colors">
              Template
            </Link>
            <Link href="#fitur" className="hover:text-white transition-colors">
              Fitur
            </Link>
            <Link href="#cara-kerja" className="hover:text-white transition-colors">
              Cara Kerja
            </Link>
            <Link href="#harga" className="hover:text-white transition-colors">
              Harga
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/create">
              <button className="apple-button-primary px-5 py-2 text-xs sm:text-sm font-medium rounded-full flex items-center gap-1.5 shadow-md">
                <span>Mulai Buat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
        {/* Ambient Subtle Radial Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-amber-500/10 via-amber-700/5 to-transparent blur-[140px] pointer-events-none rounded-full" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center space-y-8 z-10">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full apple-glass text-xs text-zinc-300 tracking-wide font-medium shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Desain Anggun & Simpel · Standar Apple</span>
          </div>

          {/* Master Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white leading-[1.1]">
            Undangan digital pernikahan,{" "}
            <span className="font-serif italic bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100 bg-clip-text text-transparent">
              dirancang sempurna.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-zinc-400 font-normal leading-relaxed">
            Pengalaman tanpa hambatan untuk momen paling sakral. Pilih template eksklusif, lengkapi data dalam sekejap, dan bagikan ke WhatsApp tamu dengan personalisasi nama terenkripsi.
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link href="/create" className="w-full sm:w-auto">
              <button className="apple-button-primary w-full sm:w-auto px-8 py-3.5 text-sm font-semibold rounded-full flex items-center justify-center gap-2 shadow-lg">
                <span>Buat Undangan Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>

            <Link href="/templates" className="w-full sm:w-auto">
              <button className="apple-button-secondary w-full sm:w-auto px-8 py-3.5 text-sm font-medium rounded-full flex items-center justify-center gap-2">
                <Eye className="w-4 h-4 text-zinc-300" />
                <span>Eksplorasi Template</span>
              </button>
            </Link>
          </div>

          {/* Trust Micro-Badges */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-zinc-400 font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Tanpa Akun Rumit</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Terbit Otomatis Seketika</span>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-cyan-400" />
              <span>Responsif 100% Smartphone</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Templates Showcase */}
      <section id="template" className="py-24 border-t border-white/[0.06] bg-zinc-950/40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
              Pilihan Tema Berkelas
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white">
              Tiga Koleksi Mahakarya
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Setiap template dilengkapi dengan animasi ornamen khas yang hidup, elegan, dan menawan bagi tamu Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 01 Elegant */}
            <div className="apple-card p-6 sm:p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-amber-400">01</span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-950/70 border border-amber-800/40 text-amber-300 font-medium">
                    Animasi Kelopak Emas
                  </span>
                </div>
                <h3 className="text-2xl font-serif italic text-white font-normal">
                  01 Elegant
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Tipografi serif klasik dipadu aksen emas mawar, tata letak simetris megah, dan butiran kilau cahaya lembut.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/[0.08]">
                <Link href="/demo/elegant" target="_blank" className="block w-full">
                  <button className="w-full py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs font-medium transition-all flex items-center justify-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    <span>Lihat Pratinjau Demo</span>
                  </button>
                </Link>
                <Link href="/create?template=elegant" className="block w-full">
                  <button className="w-full py-2.5 rounded-xl bg-white text-zinc-950 hover:bg-zinc-100 text-xs font-semibold transition-all">
                    Pilih Desain Ini
                  </button>
                </Link>
              </div>
            </div>

            {/* 02 Minimalist */}
            <div className="apple-card p-6 sm:p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400">02</span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium">
                    Animasi Dedaunan
                  </span>
                </div>
                <h3 className="text-2xl font-sans font-light tracking-tight text-white">
                  02 Minimalist
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Estetika bersih terinspirasi majalah editorial modern. Garis kontras tipis, ruang bernapas lapang, dan ayunan dedaunan botanical.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/[0.08]">
                <Link href="/demo/minimalist" target="_blank" className="block w-full">
                  <button className="w-full py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs font-medium transition-all flex items-center justify-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-zinc-300" />
                    <span>Lihat Pratinjau Demo</span>
                  </button>
                </Link>
                <Link href="/create?template=minimalist" className="block w-full">
                  <button className="w-full py-2.5 rounded-xl bg-white text-zinc-950 hover:bg-zinc-100 text-xs font-semibold transition-all">
                    Pilih Desain Ini
                  </button>
                </Link>
              </div>
            </div>

            {/* 03 Nusantara */}
            <div className="apple-card p-6 sm:p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-amber-500">03</span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-950/70 border border-amber-800/40 text-amber-300 font-medium">
                    Gunungan & Melati Gugur
                  </span>
                </div>
                <h3 className="text-2xl font-serif text-white font-normal">
                  03 Nusantara
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Pesona tradisi Indonesia dengan siluet Gunungan Wayang bernapas halus, taburan kelopak bunga melati putih, dan aksen batik kawung tembaga.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/[0.08]">
                <Link href="/demo/nusantara" target="_blank" className="block w-full">
                  <button className="w-full py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs font-medium transition-all flex items-center justify-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    <span>Lihat Pratinjau Demo</span>
                  </button>
                </Link>
                <Link href="/create?template=nusantara" className="block w-full">
                  <button className="w-full py-2.5 rounded-xl bg-white text-zinc-950 hover:bg-zinc-100 text-xs font-semibold transition-all">
                    Pilih Desain Ini
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apple Bento Grid Features Section */}
      <section id="fitur" className="py-24 border-t border-white/[0.06]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
              Teknologi & Keanggunan
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white">
              Semua yang Anda Butuhkan
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Dirancang dengan ketelitian tingkat tinggi agar setiap detail undangan Anda tampil sempurna di genggaman para tamu.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="apple-card p-6 sm:p-8 space-y-3">
              <Smartphone className="w-6 h-6 text-amber-400" />
              <h3 className="text-lg font-semibold text-white">Mobile-First Fluid</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Dikalibrasi presisi untuk berbagai ukuran layar iPhone dan Android tanpa horizontal scrolling.
              </p>
            </div>

            <div className="apple-card p-6 sm:p-8 space-y-3">
              <Heart className="w-6 h-6 text-rose-400" />
              <h3 className="text-lg font-semibold text-white">Personalisasi Tamu WhatsApp</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Generate ribuan link personal instan dengan salam sapa eksklusif untuk setiap keluarga dan sahabat.
              </p>
            </div>

            <div className="apple-card p-6 sm:p-8 space-y-3">
              <Send className="w-6 h-6 text-cyan-400" />
              <h3 className="text-lg font-semibold text-white">RSVP & Ucapan Realtime</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Pantau konfirmasi kehadiran dan baca doa restu digital dari kerabat tercinta langsung di portal Anda.
              </p>
            </div>

            <div className="apple-card p-6 sm:p-8 space-y-3">
              <Music className="w-6 h-6 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Pemutar Musik Latar</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Alunan melodi romantis yang mulai berputar lembut saat tamu membuka amplop digital pertama kali.
              </p>
            </div>

            <div className="apple-card p-6 sm:p-8 space-y-3">
              <MapPin className="w-6 h-6 text-emerald-400" />
              <h3 className="text-lg font-semibold text-white">Petunjuk Arah Google Maps</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Tamu dapat membuka navigasi GPS langsung menuju venue akad dan resepsi dengan satu sentuhan.
              </p>
            </div>

            <div className="apple-card p-6 sm:p-8 space-y-3">
              <Gift className="w-6 h-6 text-amber-400" />
              <h3 className="text-lg font-semibold text-white">Amplop Digital & Rekening</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Fitur salin nomor rekening bank atau dompet digital yang rapi, santun, dan aman.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple 4-Step Process */}
      <section id="cara-kerja" className="py-24 border-t border-white/[0.06] bg-zinc-950/40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
              Sederhana & Cepat
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white">
              Hanya 4 Langkah Mudah
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Tanpa perlu keahlian desain atau teknis. Selesai dalam hitungan menit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="apple-card p-6 space-y-4">
              <div className="w-8 h-8 rounded-full bg-white text-zinc-950 font-bold text-xs flex items-center justify-center">
                1
              </div>
              <h3 className="text-base font-semibold text-white">Pilih Template</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Tentukan nuansa yang mewakili kepribadian Anda dan pasangan.
              </p>
            </div>

            <div className="apple-card p-6 space-y-4">
              <div className="w-8 h-8 rounded-full bg-white text-zinc-950 font-bold text-xs flex items-center justify-center">
                2
              </div>
              <h3 className="text-base font-semibold text-white">Isi Informasi</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Lengkapi nama mempelai, jadwal acara akad & resepsi, dan kisah cinta.
              </p>
            </div>

            <div className="apple-card p-6 space-y-4">
              <div className="w-8 h-8 rounded-full bg-white text-zinc-950 font-bold text-xs flex items-center justify-center">
                3
              </div>
              <h3 className="text-base font-semibold text-white">Pratinjau Nyata</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Periksa langsung di layar simulasi smartphone sebelum melakukan pembayaran.
              </p>
            </div>

            <div className="apple-card p-6 space-y-4">
              <div className="w-8 h-8 rounded-full bg-white text-zinc-950 font-bold text-xs flex items-center justify-center">
                4
              </div>
              <h3 className="text-base font-semibold text-white">Bagikan ke WhatsApp</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Undangan langsung aktif dan siap disebarkan ke daftar tamu Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="harga" className="py-24 border-t border-white/[0.06]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
              Transparan Tanpa Biaya Tersembunyi
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white">
              Pilihan Paket Layanan
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Investasi terbaik untuk hari istimewa Anda dengan masa aktif panjang dan kuota tamu tak terbatas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Basic */}
            <div className="apple-card p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Basic
                </span>
                <div className="text-3xl font-light text-white">Rp 49.000</div>
                <p className="text-xs text-zinc-400">Pilihan hemat esensial</p>
              </div>

              <ul className="space-y-2.5 text-xs text-zinc-300 border-t border-white/[0.08] pt-4">
                <li>✓ Masa Aktif 6 Bulan</li>
                <li>✓ Galeri hingga 5 Foto</li>
                <li>✓ RSVP & Digital Guestbook</li>
                <li>✓ Navigasi Google Maps</li>
                <li>✓ Musik Latar Pilihan</li>
              </ul>

              <Link href="/create?plan=basic" className="block w-full pt-2">
                <button className="apple-button-secondary w-full py-3 text-xs font-medium rounded-xl">
                  Pilih Paket Basic
                </button>
              </Link>
            </div>

            {/* Premium - Featured */}
            <div className="apple-card p-6 sm:p-8 space-y-6 border-amber-500/40 relative shadow-[0_0_50px_-15px_rgba(212,175,55,0.2)]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-400 text-zinc-950 text-[11px] font-bold uppercase tracking-wider">
                Paling Populer
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Premium
                </span>
                <div className="text-3xl font-light text-white">Rp 99.000</div>
                <p className="text-xs text-zinc-400">Fitur lengkap & terpersonalisasi</p>
              </div>

              <ul className="space-y-2.5 text-xs text-zinc-200 border-t border-white/[0.08] pt-4">
                <li>✓ Masa Aktif 12 Bulan</li>
                <li>✓ Galeri Foto Tak Terbatas</li>
                <li>✓ Unlimited Tamu Personal WhatsApp</li>
                <li>✓ Timeline Kisah Cinta</li>
                <li>✓ Amplop Digital & QRIS</li>
                <li>✓ Custom Musik Latar Sendiri</li>
              </ul>

              <Link href="/create?plan=premium" className="block w-full pt-2">
                <button className="apple-button-primary w-full py-3.5 text-xs font-semibold rounded-xl">
                  Pilih Paket Premium
                </button>
              </Link>
            </div>

            {/* Gold */}
            <div className="apple-card p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Gold
                </span>
                <div className="text-3xl font-light text-white">Rp 149.000</div>
                <p className="text-xs text-zinc-400">Pengalaman eksklusif VIP</p>
              </div>

              <ul className="space-y-2.5 text-xs text-zinc-300 border-t border-white/[0.08] pt-4">
                <li>✓ Masa Aktif Selamanya</li>
                <li>✓ Seluruh Fitur Premium</li>
                <li>✓ Prioritas Bantuan Tim Desain</li>
                <li>✓ Custom Subdomain Khusus</li>
                <li>✓ Bebas Watermark Platform</li>
              </ul>

              <Link href="/create?plan=gold" className="block w-full pt-2">
                <button className="apple-button-secondary w-full py-3 text-xs font-medium rounded-xl">
                  Pilih Paket Gold
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/[0.06] bg-black text-xs text-zinc-500 text-center">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-4">
          <div className="flex items-center justify-center gap-2 text-zinc-400 font-semibold">
            <span>TITIK TEMU INVITATION</span>
          </div>
          <p className="text-zinc-600 max-w-md mx-auto">
            Bagian dari ekosistem Titik Temu Project. Standar keanggunan, teknologi modern, dan kesederhanaan untuk momen sakral Anda.
          </p>
          <div className="pt-2 text-zinc-700">
            © {new Date().getFullYear()} Titik Temu Invitation. Hak Cipta Dilindungi.
          </div>
        </div>
      </footer>
    </div>
  );
}
