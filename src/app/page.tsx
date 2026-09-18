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
  Eye,
  Gift,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FBFBFD] text-[#1D1D1F] antialiased selection:bg-amber-100 selection:text-amber-900">
      {/* Floating Apple-Style Glass Pill Navigation Header */}
      <header className="fixed top-5 inset-x-0 mx-auto z-50 w-[92%] max-w-5xl pointer-events-none">
        <div className="apple-glass animate-apple-fade-down pointer-events-auto rounded-full px-5 sm:px-7 py-3 flex items-center justify-between shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-black/[0.06]">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-sm sm:text-base font-semibold tracking-tight text-[#1D1D1F] group-hover:text-amber-700 transition-colors">
              TITIK TEMU <span className="font-light text-zinc-400">INVITATION</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-zinc-500">
            <Link href="/templates" className="hover:text-black transition-colors">
              Template
            </Link>
            <Link href="#fitur" className="hover:text-black transition-colors">
              Fitur
            </Link>
            <Link href="#cara-kerja" className="hover:text-black transition-colors">
              Cara Kerja
            </Link>
            <Link href="#harga" className="hover:text-black transition-colors">
              Harga
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/create">
              <button className="apple-button-primary px-5 py-2 text-xs sm:text-sm font-medium rounded-full flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform">
                <span>Mulai Buat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
        {/* Ambient Subtle Warm Radial Glow with Slow GPU Pulse */}
        <div className="absolute top-1/3 inset-x-0 mx-auto w-[600px] h-[400px] bg-gradient-to-tr from-amber-200/25 via-amber-100/20 to-transparent blur-[120px] pointer-events-none rounded-full animate-pulse-glow" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center space-y-8 z-10">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-black/[0.06] text-xs text-zinc-700 tracking-wide font-medium shadow-sm animate-apple-fade-down animation-delay-100 hover-lift-apple cursor-default">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" style={{ animationDuration: "12s" }} />
            <span>Desain Anggun &amp; Simpel · Standar Apple</span>
          </div>

          {/* Master Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#1D1D1F] leading-[1.1] animate-apple-fade-up">
            Undangan digital pernikahan,{" "}
            <span className="font-serif italic apple-gold-shimmer-text">
              dirancang sempurna.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-zinc-600 font-normal leading-relaxed animate-apple-fade-up animation-delay-100">
            Pengalaman tanpa hambatan untuk momen paling sakral. Pilih template eksklusif, lengkapi data dalam sekejap, dan bagikan ke WhatsApp tamu dengan personalisasi nama terenkripsi.
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5 animate-apple-fade-up animation-delay-200">
            <Link href="/create" className="w-full sm:w-auto">
              <button className="apple-button-primary w-full sm:w-auto px-8 py-3.5 text-sm font-semibold rounded-full flex items-center justify-center gap-2 shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-transform">
                <span>Buat Undangan Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>

            <Link href="/templates" className="w-full sm:w-auto">
              <button className="apple-button-secondary w-full sm:w-auto px-8 py-3.5 text-sm font-medium rounded-full flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform">
                <Eye className="w-4 h-4 text-zinc-600" />
                <span>Eksplorasi Template</span>
              </button>
            </Link>
          </div>

          {/* Trust Micro-Badges */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-zinc-500 font-medium animate-apple-fade-up animation-delay-300">
            <div className="flex items-center gap-2 p-1.5 px-3 rounded-full bg-white/70 border border-black/[0.04] shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Tanpa Akun Rumit</span>
            </div>
            <div className="flex items-center gap-2 p-1.5 px-3 rounded-full bg-white/70 border border-black/[0.04] shadow-xs">
              <Zap className="w-4 h-4 text-amber-600" />
              <span>Terbit Otomatis Seketika</span>
            </div>
            <div className="flex items-center gap-2 p-1.5 px-3 rounded-full bg-white/70 border border-black/[0.04] shadow-xs">
              <Smartphone className="w-4 h-4 text-sky-600" />
              <span>Responsif 100% Smartphone</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Templates Showcase */}
      <section id="template" className="py-24 border-t border-black/[0.06] bg-[#F5F5F7]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-widest">
              Pilihan Tema Berkelas
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-[#1D1D1F]">
              Tiga Koleksi Mahakarya
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Setiap template dilengkapi dengan animasi ornamen khas yang hidup, elegan, dan menawan bagi tamu Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 01 Elegant */}
            <div className="apple-card hover-lift-apple p-6 sm:p-8 space-y-6 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-amber-700">01</span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 font-medium">
                    Animasi Kelopak Emas
                  </span>
                </div>
                <h3 className="text-2xl font-serif italic text-[#1D1D1F] font-normal group-hover:text-amber-800 transition-colors">
                  01 Elegant
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Tipografi serif klasik dipadu aksen emas mawar, tata letak simetris megah, dan butiran kilau cahaya lembut.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-black/[0.06]">
                <Link href="/demo/shava-dedek?template=elegant" target="_blank" className="block w-full">
                  <button className="apple-button-secondary w-full py-2.5 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 active:scale-95 transition-all">
                    <Eye className="w-3.5 h-3.5 text-amber-700" />
                    <span>Lihat Pratinjau Demo</span>
                  </button>
                </Link>
                <Link href="/create?template=elegant" className="block w-full">
                  <button className="apple-button-primary w-full py-2.5 rounded-xl text-xs font-semibold active:scale-95 transition-all">
                    Pilih Desain Ini
                  </button>
                </Link>
              </div>
            </div>

            {/* 02 Minimalist */}
            <div className="apple-card hover-lift-apple p-6 sm:p-8 space-y-6 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-zinc-500">02</span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 font-medium">
                    Animasi Dedaunan
                  </span>
                </div>
                <h3 className="text-2xl font-sans font-light tracking-tight text-[#1D1D1F] group-hover:text-black transition-colors">
                  02 Minimalist
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Estetika bersih terinspirasi majalah editorial modern. Garis kontras tipis, ruang bernapas lapang, dan ayunan dedaunan botanical.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-black/[0.06]">
                <Link href="/demo/shava-dedek?template=minimalist" target="_blank" className="block w-full">
                  <button className="apple-button-secondary w-full py-2.5 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 active:scale-95 transition-all">
                    <Eye className="w-3.5 h-3.5 text-zinc-700" />
                    <span>Lihat Pratinjau Demo</span>
                  </button>
                </Link>
                <Link href="/create?template=minimalist" className="block w-full">
                  <button className="apple-button-primary w-full py-2.5 rounded-xl text-xs font-semibold active:scale-95 transition-all">
                    Pilih Desain Ini
                  </button>
                </Link>
              </div>
            </div>

            {/* 03 Nusantara */}
            <div className="apple-card hover-lift-apple p-6 sm:p-8 space-y-6 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-amber-800">03</span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 font-medium">
                    Gunungan &amp; Melati Gugur
                  </span>
                </div>
                <h3 className="text-2xl font-serif text-[#1D1D1F] font-normal group-hover:text-amber-900 transition-colors">
                  03 Nusantara
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Pesona tradisi Indonesia dengan siluet Gunungan Wayang bernapas halus, taburan kelopak bunga melati putih, dan aksen batik kawung tembaga.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-black/[0.06]">
                <Link href="/demo/shava-dedek?template=nusantara" target="_blank" className="block w-full">
                  <button className="apple-button-secondary w-full py-2.5 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 active:scale-95 transition-all">
                    <Eye className="w-3.5 h-3.5 text-amber-700" />
                    <span>Lihat Pratinjau Demo</span>
                  </button>
                </Link>
                <Link href="/create?template=nusantara" className="block w-full">
                  <button className="apple-button-primary w-full py-2.5 rounded-xl text-xs font-semibold active:scale-95 transition-all">
                    Pilih Desain Ini
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apple Bento Grid Features Section */}
      <section id="fitur" className="py-24 border-t border-black/[0.06] bg-[#FBFBFD]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-widest">
              Teknologi &amp; Keanggunan
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-[#1D1D1F]">
              Semua yang Anda Butuhkan
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Dirancang dengan ketelitian tingkat tinggi agar setiap detail undangan Anda tampil sempurna di genggaman para tamu.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="apple-card hover-lift-apple p-6 sm:p-8 space-y-3 group">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Smartphone className="w-5 h-5 text-amber-700" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-[#1D1D1F]">Mobile-First Fluid</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Dikalibrasi presisi untuk berbagai ukuran layar iPhone dan Android tanpa horizontal scrolling.
              </p>
            </div>

            <div className="apple-card hover-lift-apple p-6 sm:p-8 space-y-3 group">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart className="w-5 h-5 text-rose-600" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-[#1D1D1F]">Personalisasi Tamu WhatsApp</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Generate ribuan link personal instan dengan salam sapa eksklusif untuk setiap keluarga dan sahabat.
              </p>
            </div>

            <div className="apple-card hover-lift-apple p-6 sm:p-8 space-y-3 group">
              <div className="w-10 h-10 rounded-2xl bg-sky-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Send className="w-5 h-5 text-sky-600" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-[#1D1D1F]">RSVP &amp; Ucapan Realtime</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Pantau konfirmasi kehadiran dan baca doa restu digital dari kerabat tercinta langsung di portal Anda.
              </p>
            </div>

            <div className="apple-card hover-lift-apple p-6 sm:p-8 space-y-3 group">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Music className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-[#1D1D1F]">Pemutar Musik Latar</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Alunan melodi romantis yang mulai berputar lembut saat tamu membuka amplop digital pertama kali.
              </p>
            </div>

            <div className="apple-card hover-lift-apple p-6 sm:p-8 space-y-3 group">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MapPin className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-[#1D1D1F]">Petunjuk Arah Google Maps</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Tamu dapat membuka navigasi GPS langsung menuju venue akad dan resepsi dengan satu sentuhan.
              </p>
            </div>

            <div className="apple-card hover-lift-apple p-6 sm:p-8 space-y-3 group">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Gift className="w-5 h-5 text-amber-700" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-[#1D1D1F]">Amplop Digital &amp; Rekening</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Fitur salin nomor rekening bank atau dompet digital yang rapi, santun, dan aman.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple 4-Step Process */}
      <section id="cara-kerja" className="py-24 border-t border-black/[0.06] bg-[#F5F5F7]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-widest">
              Sederhana &amp; Cepat
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-[#1D1D1F]">
              Hanya 4 Langkah Mudah
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Tanpa perlu keahlian desain atau teknis. Selesai dalam hitungan menit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="apple-card hover-lift-apple p-6 space-y-4 group">
              <div className="w-8 h-8 rounded-full bg-[#1D1D1F] text-white font-bold text-xs flex items-center justify-center shadow-xs group-hover:bg-amber-600 transition-colors">
                1
              </div>
              <h3 className="text-base font-semibold text-[#1D1D1F]">Pilih Template</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Tentukan nuansa yang mewakili kepribadian Anda dan pasangan.
              </p>
            </div>

            <div className="apple-card hover-lift-apple p-6 space-y-4 group">
              <div className="w-8 h-8 rounded-full bg-[#1D1D1F] text-white font-bold text-xs flex items-center justify-center shadow-xs group-hover:bg-amber-600 transition-colors">
                2
              </div>
              <h3 className="text-base font-semibold text-[#1D1D1F]">Isi Informasi</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Lengkapi nama mempelai, jadwal acara akad &amp; resepsi, dan kisah cinta.
              </p>
            </div>

            <div className="apple-card hover-lift-apple p-6 space-y-4 group">
              <div className="w-8 h-8 rounded-full bg-[#1D1D1F] text-white font-bold text-xs flex items-center justify-center shadow-xs group-hover:bg-amber-600 transition-colors">
                3
              </div>
              <h3 className="text-base font-semibold text-[#1D1D1F]">Pratinjau Nyata</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Periksa langsung di layar simulasi smartphone sebelum melakukan pembayaran.
              </p>
            </div>

            <div className="apple-card hover-lift-apple p-6 space-y-4 group">
              <div className="w-8 h-8 rounded-full bg-[#1D1D1F] text-white font-bold text-xs flex items-center justify-center shadow-xs group-hover:bg-amber-600 transition-colors">
                4
              </div>
              <h3 className="text-base font-semibold text-[#1D1D1F]">Bagikan ke WhatsApp</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Undangan langsung aktif dan siap disebarkan ke daftar tamu Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="harga" className="py-24 border-t border-black/[0.06] bg-[#FBFBFD]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-widest">
              Transparan Tanpa Biaya Tersembunyi
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-[#1D1D1F]">
              Pilihan Paket Layanan
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Investasi terbaik untuk hari istimewa Anda dengan masa aktif panjang dan kuota tamu tak terbatas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Basic */}
            <div className="apple-card hover-lift-apple p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  Basic
                </span>
                <div className="text-3xl font-light text-[#1D1D1F]">Rp 49.000</div>
                <p className="text-xs text-zinc-500">Pilihan hemat esensial</p>
              </div>

              <ul className="space-y-2.5 text-xs text-zinc-600 border-t border-black/[0.06] pt-4">
                <li>✓ Masa Aktif 6 Bulan</li>
                <li>✓ Galeri hingga 5 Foto</li>
                <li>✓ RSVP &amp; Digital Guestbook</li>
                <li>✓ Navigasi Google Maps</li>
                <li>✓ Musik Latar Pilihan</li>
              </ul>

              <Link href="/create?plan=basic" className="block w-full pt-2">
                <button className="apple-button-secondary w-full py-3 text-xs font-medium rounded-xl active:scale-95 transition-transform">
                  Pilih Paket Basic
                </button>
              </Link>
            </div>

            {/* Premium - Featured */}
            <div className="apple-card hover-lift-apple p-6 sm:p-8 space-y-6 border-amber-300 relative shadow-[0_10px_35px_-10px_rgba(212,175,55,0.2)] bg-white ring-1 ring-amber-400/30">
              <div className="absolute -top-3 inset-x-0 mx-auto w-fit px-3 py-0.5 rounded-full bg-amber-500 text-white text-[11px] font-bold uppercase tracking-wider shadow-xs">
                Paling Populer
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                  Premium
                </span>
                <div className="text-3xl font-light text-[#1D1D1F]">Rp 99.000</div>
                <p className="text-xs text-zinc-500">Fitur lengkap &amp; terpersonalisasi</p>
              </div>

              <ul className="space-y-2.5 text-xs text-zinc-700 border-t border-black/[0.06] pt-4">
                <li>✓ Masa Aktif 12 Bulan</li>
                <li>✓ Galeri Foto Tak Terbatas</li>
                <li>✓ Unlimited Tamu Personal WhatsApp</li>
                <li>✓ Timeline Kisah Cinta</li>
                <li>✓ Amplop Digital &amp; QRIS</li>
                <li>✓ Custom Musik Latar Sendiri</li>
              </ul>

              <Link href="/create?plan=premium" className="block w-full pt-2">
                <button className="apple-button-primary w-full py-3.5 text-xs font-semibold rounded-xl shadow-sm active:scale-95 transition-transform">
                  Pilih Paket Premium
                </button>
              </Link>
            </div>

            {/* Gold */}
            <div className="apple-card hover-lift-apple p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  Gold
                </span>
                <div className="text-3xl font-light text-[#1D1D1F]">Rp 149.000</div>
                <p className="text-xs text-zinc-500">Pengalaman eksklusif VIP</p>
              </div>

              <ul className="space-y-2.5 text-xs text-zinc-600 border-t border-black/[0.06] pt-4">
                <li>✓ Masa Aktif Selamanya</li>
                <li>✓ Seluruh Fitur Premium</li>
                <li>✓ Prioritas Bantuan Tim Desain</li>
                <li>✓ Custom Subdomain Khusus</li>
                <li>✓ Bebas Watermark Platform</li>
              </ul>

              <Link href="/create?plan=gold" className="block w-full pt-2">
                <button className="apple-button-secondary w-full py-3 text-xs font-medium rounded-xl active:scale-95 transition-transform">
                  Pilih Paket Gold
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-black/[0.06] bg-[#F5F5F7] text-xs text-zinc-500 text-center">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-4">
          <div className="flex items-center justify-center gap-2 text-[#1D1D1F] font-semibold tracking-tight">
            <span>TITIK TEMU INVITATION</span>
          </div>
          <p className="text-zinc-500 max-w-md mx-auto leading-relaxed">
            Bagian dari ekosistem Titik Temu Project. Standar keanggunan, teknologi modern, dan kesederhanaan untuk momen sakral Anda.
          </p>
          <div className="pt-2 text-zinc-400">
            © {new Date().getFullYear()} Titik Temu Invitation. Hak Cipta Dilindungi.
          </div>
        </div>
      </footer>
    </div>
  );
}
