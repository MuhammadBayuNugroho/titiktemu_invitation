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
  Star,
  CheckCircle2,
} from "lucide-react";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden" style={{ background: '#F8F7F4', color: '#1A1A2E', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* =====================================================================
          GLOBAL AURORA BACKGROUND BLOBS (GPU — no JS)
          ===================================================================== */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Primary rose-gold aurora blob */}
        <div
          className="animate-aurora-drift absolute"
          style={{
            top: '-15%', left: '-10%', width: '70vw', height: '70vw',
            maxWidth: 900, maxHeight: 900,
            background: 'radial-gradient(ellipse, rgba(201,144,108,0.12) 0%, transparent 70%)',
            willChange: 'transform',
          }}
        />
        {/* Secondary gold aurora blob */}
        <div
          className="animate-aurora-drift delay-600"
          style={{
            position: 'absolute',
            bottom: '-10%', right: '-10%', width: '65vw', height: '65vw',
            maxWidth: 850, maxHeight: 850,
            background: 'radial-gradient(ellipse, rgba(201,168,76,0.10) 0%, transparent 70%)',
            animationDirection: 'reverse',
            willChange: 'transform',
          }}
        />
        {/* Tertiary sky-blue accent */}
        <div
          className="animate-aurora-drift delay-300"
          style={{
            position: 'absolute',
            top: '40%', left: '30%', width: '50vw', height: '50vw',
            maxWidth: 680, maxHeight: 680,
            background: 'radial-gradient(ellipse, rgba(147,197,253,0.06) 0%, transparent 65%)',
            willChange: 'transform',
          }}
        />
      </div>

      {/* =====================================================================
          FLOATING GLASS PILL NAVIGATION
          ===================================================================== */}
      <header className="fixed top-5 inset-x-0 z-50 flex justify-center pointer-events-none px-4">
        <div className="glass-pill animate-fade-down pointer-events-auto rounded-full px-5 sm:px-7 py-3 flex items-center justify-between w-full max-w-5xl">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #C9906C, #C9A84C)' }}
            >
              <Heart className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-semibold tracking-tight" style={{ color: '#1A1A2E' }}>
              Titik Temu <span style={{ color: '#C9906C' }}>Invitation</span>
            </span>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium" style={{ color: '#6B7280' }}>
            <Link href="/templates" className="hover:text-[#1A1A2E] transition-colors">Template</Link>
            <Link href="#fitur" className="hover:text-[#1A1A2E] transition-colors">Fitur</Link>
            <Link href="#cara-kerja" className="hover:text-[#1A1A2E] transition-colors">Cara Kerja</Link>
            <Link href="#harga" className="hover:text-[#1A1A2E] transition-colors">Harga</Link>
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-2">
            <Link href="/create">
              <button className="btn-primary px-5 py-2 text-xs sm:text-sm font-semibold flex items-center gap-1.5">
                <span>Mulai Buat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* =====================================================================
          HERO SECTION
          ===================================================================== */}
      <section className="relative min-h-screen flex items-center justify-center pt-28 pb-20 z-10">
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 text-center">

          {/* Badge */}
          <div className="animate-fade-down mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide cursor-default glass" style={{ color: '#C9906C' }}>
            <Sparkles className="w-3.5 h-3.5 animate-rotate-slow" style={{ color: '#C9A84C' }} />
            <span>Platform Undangan Digital #1 Indonesia</span>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse-glow" style={{ background: '#C9906C' }} />
          </div>

          {/* Main headline */}
          <h1 className="animate-fade-up delay-100 text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.08] mb-6" style={{ color: '#1A1A2E' }}>
            Undangan digital pernikahan,
            <br />
            <span
              className="text-gradient-rose"
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontStyle: 'italic',
                fontSize: '1.05em',
              }}
            >
              dirancang sempurna.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-up delay-200 mx-auto max-w-2xl text-base sm:text-lg font-normal leading-relaxed mb-10" style={{ color: '#6B7280' }}>
            Pengalaman tanpa hambatan untuk momen paling sakral. Pilih template eksklusif,
            lengkapi data dalam sekejap, dan bagikan ke WhatsApp tamu dengan personalisasi
            nama terenkripsi.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Link href="/create" className="w-full sm:w-auto">
              <button className="btn-primary w-full sm:w-auto px-8 py-4 text-sm font-semibold flex items-center justify-center gap-2">
                <span>Buat Undangan Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/templates" className="w-full sm:w-auto">
              <button className="btn-secondary w-full sm:w-auto px-8 py-4 text-sm font-medium flex items-center justify-center gap-2">
                <Eye className="w-4 h-4" style={{ color: '#C9906C' }} />
                <span>Eksplorasi Template</span>
              </button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="animate-fade-up delay-400 flex flex-wrap items-center justify-center gap-4">
            {[
              { icon: ShieldCheck, text: 'Tanpa Akun Rumit', color: '#10B981' },
              { icon: Zap,         text: 'Terbit Otomatis',  color: '#C9A84C' },
              { icon: Smartphone,  text: 'Mobile-First',     color: '#3B82F6' },
              { icon: Star,        text: '500+ Pasangan',    color: '#C9906C' },
            ].map(({ icon: Icon, text, color }) => (
              <div key={text} className="glass-subtle flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium" style={{ color: '#4A5568' }}>
                <Icon className="w-3.5 h-3.5" style={{ color }} />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          FEATURED TEMPLATES — GLASS BENTO
          ===================================================================== */}
      <section id="template" className="relative z-10 py-24">
        {/* Section divider */}
        <div className="divider-gradient mx-auto max-w-6xl mb-24" />

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-14">
            <span className="inline-block mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: '#C9906C' }}>
              Pilihan Tema Berkelas
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight mb-3" style={{ color: '#1A1A2E' }}>
              Tiga Koleksi{' '}
              <span style={{ fontFamily: "'DM Serif Display', serif", fontStyle: 'italic' }}>
                Mahakarya
              </span>
            </h2>
            <p className="text-sm max-w-xl mx-auto leading-relaxed" style={{ color: '#6B7280' }}>
              Setiap template dilengkapi animasi ornamen khas yang hidup, elegan, dan menawan bagi tamu Anda.
            </p>
          </div>

          {/* Template Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* 01 Elegant */}
            <div className="glass-card-rose hover-lift p-7 flex flex-col justify-between group">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold" style={{ color: '#C9906C' }}>01</span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(201,144,108,0.12)', color: '#C9906C' }}>
                    Kelopak Emas
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl mb-2" style={{ fontFamily: "'DM Serif Display', serif", fontStyle: 'italic', color: '#1A1A2E' }}>
                    01 Elegant
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: '#6B7280' }}>
                    Tipografi serif klasik dipadu aksen emas mawar, tata letak simetris megah,
                    dan butiran kilau cahaya lembut.
                  </p>
                </div>
                <div className="h-24 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(201,144,108,0.08), rgba(201,168,76,0.06))' }}>
                  <span className="text-4xl animate-float">🌹</span>
                </div>
              </div>
              <div className="mt-6 space-y-2.5 border-t pt-5" style={{ borderColor: 'rgba(201,144,108,0.15)' }}>
                <Link href="/demo/shava-dedek?template=elegant" target="_blank" className="block w-full">
                  <button className="btn-secondary w-full py-2.5 text-xs font-medium flex items-center justify-center gap-1.5" style={{ borderRadius: 12 }}>
                    <Eye className="w-3.5 h-3.5" style={{ color: '#C9906C' }} />
                    Lihat Pratinjau Demo
                  </button>
                </Link>
                <Link href="/create?template=elegant" className="block w-full">
                  <button className="btn-primary w-full py-2.5 text-xs font-semibold" style={{ borderRadius: 12 }}>
                    Pilih Desain Ini
                  </button>
                </Link>
              </div>
            </div>

            {/* 02 Minimalist */}
            <div className="glass-card hover-lift p-7 flex flex-col justify-between group">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold" style={{ color: '#4A5568' }}>02</span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(74,85,104,0.10)', color: '#4A5568' }}>
                    Dedaunan
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-light tracking-tight mb-2" style={{ color: '#1A1A2E' }}>
                    02 Minimalist
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: '#6B7280' }}>
                    Estetika bersih terinspirasi majalah editorial modern. Garis kontras tipis,
                    ruang bernapas lapang, dan ayunan dedaunan botanical.
                  </p>
                </div>
                <div className="h-24 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(74,85,104,0.05), rgba(147,197,253,0.08))' }}>
                  <span className="text-4xl animate-leaf" style={{ display: 'inline-block' }}>🌿</span>
                </div>
              </div>
              <div className="mt-6 space-y-2.5 border-t pt-5" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                <Link href="/demo/shava-dedek?template=minimalist" target="_blank" className="block w-full">
                  <button className="btn-secondary w-full py-2.5 text-xs font-medium flex items-center justify-center gap-1.5" style={{ borderRadius: 12 }}>
                    <Eye className="w-3.5 h-3.5" style={{ color: '#4A5568' }} />
                    Lihat Pratinjau Demo
                  </button>
                </Link>
                <Link href="/create?template=minimalist" className="block w-full">
                  <button className="w-full py-2.5 text-xs font-semibold rounded-xl transition-all active:scale-95" style={{ background: '#1A1A2E', color: '#fff', borderRadius: 12 }}>
                    Pilih Desain Ini
                  </button>
                </Link>
              </div>
            </div>

            {/* 03 Nusantara */}
            <div className="glass-card-gold hover-lift p-7 flex flex-col justify-between group">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold" style={{ color: '#C9A84C' }}>03</span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(201,168,76,0.12)', color: '#C9A84C' }}>
                    Gunungan &amp; Melati
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl mb-2" style={{ fontFamily: "'DM Serif Display', serif", color: '#1A1A2E' }}>
                    03 Nusantara
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: '#6B7280' }}>
                    Pesona tradisi Indonesia dengan siluet Gunungan Wayang bernapas halus,
                    taburan kelopak bunga melati, dan aksen batik kawung tembaga.
                  </p>
                </div>
                <div className="h-24 rounded-xl flex items-center justify-center gap-3" style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.08), rgba(201,144,108,0.07))' }}>
                  <span className="text-3xl animate-gunungan" style={{ display: 'inline-block' }}>🏯</span>
                  <span className="text-3xl animate-petal" style={{ display: 'inline-block', '--fall-duration': '8s' } as React.CSSProperties}>🌸</span>
                </div>
              </div>
              <div className="mt-6 space-y-2.5 border-t pt-5" style={{ borderColor: 'rgba(201,168,76,0.18)' }}>
                <Link href="/demo/shava-dedek?template=nusantara" target="_blank" className="block w-full">
                  <button className="btn-secondary w-full py-2.5 text-xs font-medium flex items-center justify-center gap-1.5" style={{ borderRadius: 12 }}>
                    <Eye className="w-3.5 h-3.5" style={{ color: '#C9A84C' }} />
                    Lihat Pratinjau Demo
                  </button>
                </Link>
                <Link href="/create?template=nusantara" className="block w-full">
                  <button className="btn-primary w-full py-2.5 text-xs font-semibold" style={{ borderRadius: 12 }}>
                    Pilih Desain Ini
                  </button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================================
          FEATURES — GLASS BENTO GRID
          ===================================================================== */}
      <section id="fitur" className="relative z-10 py-24">
        <div className="divider-gradient mx-auto max-w-6xl mb-24" />

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-14">
            <span className="inline-block mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: '#C9906C' }}>
              Teknologi &amp; Keanggunan
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight mb-3" style={{ color: '#1A1A2E' }}>
              Semua yang Anda{' '}
              <span style={{ fontFamily: "'DM Serif Display', serif", fontStyle: 'italic' }}>
                Butuhkan
              </span>
            </h2>
            <p className="text-sm max-w-xl mx-auto leading-relaxed" style={{ color: '#6B7280' }}>
              Dirancang dengan ketelitian tingkat tinggi agar setiap detail undangan Anda
              tampil sempurna di genggaman para tamu.
            </p>
          </div>

          {/* Asymmetric Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {/* Large card — Mobile First */}
            <div className="glass-card hover-lift p-8 sm:col-span-2 lg:col-span-1 group" style={{ minHeight: 200 }}>
              <div className="icon-glass w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Smartphone className="w-6 h-6" style={{ color: '#3B82F6' }} />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#1A1A2E' }}>Mobile-First Fluid</h3>
              <p className="text-xs leading-relaxed" style={{ color: '#6B7280' }}>
                Dikalibrasi presisi untuk berbagai ukuran layar iPhone dan Android tanpa horizontal scrolling di semua viewport.
              </p>
            </div>

            {/* WhatsApp Personalization */}
            <div className="glass-card-rose hover-lift p-8 group">
              <div className="icon-glass w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6" style={{ color: '#EC4899' }} />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#1A1A2E' }}>Personalisasi Tamu WhatsApp</h3>
              <p className="text-xs leading-relaxed" style={{ color: '#6B7280' }}>
                Generate ribuan link personal instan dengan salam eksklusif untuk setiap tamu.
              </p>
            </div>

            {/* RSVP */}
            <div className="glass-card hover-lift p-8 group">
              <div className="icon-glass w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Send className="w-6 h-6" style={{ color: '#06B6D4' }} />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#1A1A2E' }}>RSVP &amp; Ucapan Realtime</h3>
              <p className="text-xs leading-relaxed" style={{ color: '#6B7280' }}>
                Pantau konfirmasi kehadiran dan baca doa restu digital langsung di portal Anda.
              </p>
            </div>

            {/* Music */}
            <div className="glass-card hover-lift p-8 group">
              <div className="icon-glass w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Music className="w-6 h-6" style={{ color: '#8B5CF6' }} />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#1A1A2E' }}>Pemutar Musik Latar</h3>
              <p className="text-xs leading-relaxed" style={{ color: '#6B7280' }}>
                Alunan melodi romantis yang mulai berputar lembut saat tamu membuka amplop digital.
              </p>
            </div>

            {/* Maps */}
            <div className="glass-card hover-lift p-8 group">
              <div className="icon-glass w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6" style={{ color: '#10B981' }} />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#1A1A2E' }}>Petunjuk Arah Google Maps</h3>
              <p className="text-xs leading-relaxed" style={{ color: '#6B7280' }}>
                Tamu dapat membuka navigasi GPS langsung menuju venue akad dan resepsi dengan satu sentuhan.
              </p>
            </div>

            {/* Digital Envelope — highlighted */}
            <div className="glass-card-gold hover-lift p-8 group">
              <div className="icon-glass w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Gift className="w-6 h-6" style={{ color: '#C9A84C' }} />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#1A1A2E' }}>Amplop Digital &amp; Rekening</h3>
              <p className="text-xs leading-relaxed" style={{ color: '#6B7280' }}>
                Fitur salin nomor rekening bank atau dompet digital yang rapi, santun, dan aman.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================================
          HOW IT WORKS — 4 GLASS STEPS
          ===================================================================== */}
      <section id="cara-kerja" className="relative z-10 py-24">
        <div className="divider-gradient mx-auto max-w-6xl mb-24" />

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-14">
            <span className="inline-block mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: '#C9906C' }}>
              Sederhana &amp; Cepat
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight mb-3" style={{ color: '#1A1A2E' }}>
              Hanya{' '}
              <span style={{ fontFamily: "'DM Serif Display', serif", fontStyle: 'italic' }}>
                4 Langkah
              </span>{' '}
              Mudah
            </h2>
            <p className="text-sm max-w-xl mx-auto leading-relaxed" style={{ color: '#6B7280' }}>
              Tanpa perlu keahlian desain atau teknis. Selesai dalam hitungan menit.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                step: '01', label: 'Pilih Template', color: '#C9906C',
                bg: 'rgba(201,144,108,0.08)',
                desc: 'Tentukan nuansa yang mewakili kepribadian Anda dan pasangan dari koleksi eksklusif kami.',
              },
              {
                step: '02', label: 'Isi Informasi', color: '#4A5568',
                bg: 'rgba(74,85,104,0.07)',
                desc: 'Lengkapi nama mempelai, jadwal acara akad & resepsi, kisah cinta, dan detail venue.',
              },
              {
                step: '03', label: 'Pratinjau Nyata', color: '#3B82F6',
                bg: 'rgba(59,130,246,0.07)',
                desc: 'Periksa langsung di layar simulasi smartphone sebelum melakukan pembayaran.',
              },
              {
                step: '04', label: 'Bagikan ke WhatsApp', color: '#10B981',
                bg: 'rgba(16,185,129,0.07)',
                desc: 'Undangan langsung aktif dan siap disebarkan ke seluruh daftar tamu Anda.',
              },
            ].map(({ step, label, color, bg, desc }) => (
              <div key={step} className="glass-card hover-lift p-7 flex flex-col gap-4 group">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-transform group-hover:scale-110"
                  style={{ background: bg, color, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {step}
                </div>
                <div>
                  <h3 className="text-base font-semibold mb-2" style={{ color: '#1A1A2E' }}>{label}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: '#6B7280' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          PRICING — GLASS CARDS
          ===================================================================== */}
      <section id="harga" className="relative z-10 py-24">
        <div className="divider-gradient mx-auto max-w-6xl mb-24" />

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-14">
            <span className="inline-block mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: '#C9906C' }}>
              Transparan &amp; Jelas
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight mb-3" style={{ color: '#1A1A2E' }}>
              Pilihan Paket{' '}
              <span style={{ fontFamily: "'DM Serif Display', serif", fontStyle: 'italic' }}>
                Layanan
              </span>
            </h2>
            <p className="text-sm max-w-xl mx-auto leading-relaxed" style={{ color: '#6B7280' }}>
              Investasi terbaik untuk hari istimewa Anda dengan masa aktif panjang dan kuota tamu tak terbatas.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">

            {/* Basic */}
            <div className="glass-card hover-lift p-8 flex flex-col">
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-widest block mb-3" style={{ color: '#6B7280' }}>Basic</span>
                <div className="text-4xl font-light mb-1" style={{ color: '#1A1A2E' }}>Rp 49.000</div>
                <p className="text-xs" style={{ color: '#9CA3AF' }}>Pilihan hemat esensial</p>
              </div>
              <div className="divider-gradient mb-6" />
              <ul className="space-y-3 text-xs flex-1" style={{ color: '#4A5568' }}>
                {['Masa Aktif 6 Bulan', 'Galeri hingga 5 Foto', 'RSVP & Digital Guestbook', 'Navigasi Google Maps', 'Musik Latar Pilihan'].map(f => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#10B981' }} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/create?plan=basic" className="block w-full mt-6">
                <button className="btn-secondary w-full py-3.5 text-xs font-semibold" style={{ borderRadius: 14 }}>
                  Pilih Paket Basic
                </button>
              </Link>
            </div>

            {/* Premium — Featured */}
            <div className="glass-card-rose hover-lift p-8 flex flex-col relative" style={{ borderColor: 'rgba(201,144,108,0.35)' }}>
              {/* Popular badge */}
              <div
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide text-white shadow-md"
                style={{ background: 'linear-gradient(135deg, #C9906C, #C9A84C)' }}
              >
                Paling Populer
              </div>
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-widest block mb-3" style={{ color: '#C9906C' }}>Premium</span>
                <div className="text-4xl font-light mb-1" style={{ color: '#1A1A2E' }}>Rp 99.000</div>
                <p className="text-xs" style={{ color: '#9CA3AF' }}>Fitur lengkap &amp; terpersonalisasi</p>
              </div>
              <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,144,108,0.4), transparent)', marginBottom: 24 }} />
              <ul className="space-y-3 text-xs flex-1" style={{ color: '#4A5568' }}>
                {[
                  'Masa Aktif 12 Bulan',
                  'Galeri Foto Tak Terbatas',
                  'Unlimited Tamu Personal WhatsApp',
                  'Timeline Kisah Cinta',
                  'Amplop Digital & QRIS',
                  'Custom Musik Latar Sendiri',
                ].map(f => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#C9906C' }} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/create?plan=premium" className="block w-full mt-6">
                <button className="btn-primary w-full py-3.5 text-sm font-semibold" style={{ borderRadius: 14 }}>
                  Pilih Paket Premium
                </button>
              </Link>
            </div>

            {/* Gold */}
            <div className="glass-card-gold hover-lift p-8 flex flex-col">
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-widest block mb-3" style={{ color: '#C9A84C' }}>Gold</span>
                <div className="text-4xl font-light mb-1" style={{ color: '#1A1A2E' }}>Rp 149.000</div>
                <p className="text-xs" style={{ color: '#9CA3AF' }}>Pengalaman eksklusif VIP</p>
              </div>
              <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)', marginBottom: 24 }} />
              <ul className="space-y-3 text-xs flex-1" style={{ color: '#4A5568' }}>
                {[
                  'Masa Aktif Selamanya',
                  'Seluruh Fitur Premium',
                  'Prioritas Bantuan Tim Desain',
                  'Custom Subdomain Khusus',
                  'Bebas Watermark Platform',
                ].map(f => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#C9A84C' }} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/create?plan=gold" className="block w-full mt-6">
                <button className="btn-secondary w-full py-3.5 text-xs font-semibold" style={{ borderRadius: 14 }}>
                  Pilih Paket Gold
                </button>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================================
          FOOTER
          ===================================================================== */}
      <footer className="relative z-10 py-14">
        <div className="divider-gradient mx-auto max-w-6xl mb-14" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="glass-card p-8 sm:p-10 text-center">
            {/* Brand */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #C9906C, #C9A84C)' }}
              >
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-semibold" style={{ color: '#1A1A2E' }}>
                Titik Temu <span style={{ color: '#C9906C' }}>Invitation</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed max-w-md mx-auto mb-6" style={{ color: '#9CA3AF' }}>
              Bagian dari ekosistem Titik Temu Project. Standar keanggunan, teknologi modern,
              dan kesederhanaan untuk momen sakral Anda.
            </p>
            {/* Quick links */}
            <div className="flex items-center justify-center gap-6 text-xs mb-6" style={{ color: '#6B7280' }}>
              <Link href="/templates" className="hover:text-[#C9906C] transition-colors">Template</Link>
              <Link href="#fitur" className="hover:text-[#C9906C] transition-colors">Fitur</Link>
              <Link href="#harga" className="hover:text-[#C9906C] transition-colors">Harga</Link>
              <Link href="/create" className="hover:text-[#C9906C] transition-colors">Buat Undangan</Link>
            </div>
            <div className="text-[11px]" style={{ color: '#9CA3AF' }}>
              © {new Date().getFullYear()} Titik Temu Invitation. Hak Cipta Dilindungi.
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
