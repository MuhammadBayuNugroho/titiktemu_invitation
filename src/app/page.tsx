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
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function Home() {
  return (
    <div
      className="relative flex min-h-screen flex-col overflow-x-hidden"
      style={{
        /**
         * PERFORMANCE: Single static CSS radial-gradient.
         * Zero GPU cost vs animated blobs. Gives warm depth.
         */
        background: `
          radial-gradient(ellipse 90% 55% at 15% 0%,   rgba(201,144,108,0.11) 0%, transparent 60%),
          radial-gradient(ellipse 70% 45% at 85% 100%, rgba(201,168,76,0.08)  0%, transparent 60%),
          #F8F7F4
        `,
        color: '#1A1A2E',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* =====================================================================
          FLOATING GLASS PILL NAVIGATION
          NOTE: backdrop-filter only here (single fixed element) = acceptable cost
          ===================================================================== */}
      <header className="fixed top-5 inset-x-0 z-50 flex justify-center pointer-events-none px-4">
        <div className="glass-pill animate-fade-down pointer-events-auto rounded-full px-5 sm:px-7 py-3 flex items-center justify-between w-full max-w-5xl">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
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
          <Link href="/create">
            <button className="btn-primary px-5 py-2 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all">
              <span>Mulai Buat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>
      </header>

      {/* =====================================================================
          HERO SECTION — No animated blobs, instant render
          ===================================================================== */}
      <section className="relative min-h-screen flex items-center justify-center pt-28 pb-20">
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 text-center">

          {/* Badge — fade down on load */}
          <div className="animate-fade-down mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide cursor-default glass" style={{ color: '#C9906C' }}>
            <Sparkles className="w-3.5 h-3.5" style={{ color: '#C9A84C' }} />
            <span>Platform Undangan Digital #1 Indonesia</span>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#C9906C' }} />
          </div>

          {/* Main headline */}
          <h1 className="animate-fade-up delay-100 text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.08] mb-6" style={{ color: '#1A1A2E' }}>
            Undangan digital pernikahan,
            <br />
            <span
              className="text-gradient-rose"
              style={{ fontFamily: "'DM Serif Display', serif", fontStyle: 'italic', fontSize: '1.05em' }}
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
              <button className="btn-primary w-full sm:w-auto px-8 py-4 text-sm font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all">
                <span>Buat Undangan Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/templates" className="w-full sm:w-auto">
              <button className="btn-secondary w-full sm:w-auto px-8 py-4 text-sm font-medium flex items-center justify-center gap-2 active:scale-95 transition-all">
                <Eye className="w-4 h-4" style={{ color: '#C9906C' }} />
                <span>Eksplorasi Template</span>
              </button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="animate-fade-up delay-400 flex flex-wrap items-center justify-center gap-4">
            {[
              { icon: ShieldCheck, text: 'Tanpa Akun Rumit',  color: '#10B981' },
              { icon: Zap,         text: 'Terbit Otomatis',   color: '#C9A84C' },
              { icon: Smartphone,  text: 'Mobile-First',      color: '#3B82F6' },
              { icon: Star,        text: '500+ Pasangan',     color: '#C9906C' },
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
          FEATURED TEMPLATES
          ===================================================================== */}
      <section id="template" className="py-24">
        <div className="divider-gradient mx-auto max-w-6xl mb-20" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">

          <ScrollReveal className="text-center mb-14">
            <span className="inline-block mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: '#C9906C' }}>
              Pilihan Tema Berkelas
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight mb-3" style={{ color: '#1A1A2E' }}>
              Tiga Koleksi{' '}
              <span style={{ fontFamily: "'DM Serif Display', serif", fontStyle: 'italic' }}>Mahakarya</span>
            </h2>
            <p className="text-sm max-w-xl mx-auto leading-relaxed" style={{ color: '#6B7280' }}>
              Setiap template dilengkapi animasi ornamen khas yang hidup, elegan, dan menawan bagi tamu Anda.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 01 Elegant */}
            <ScrollReveal delay={0}>
              <div className="glass-card-rose hover-lift p-7 flex flex-col justify-between h-full group">
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold" style={{ color: '#C9906C' }}>01</span>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(201,144,108,0.10)', color: '#C9906C' }}>
                      Kelopak Emas
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl mb-2" style={{ fontFamily: "'DM Serif Display', serif", fontStyle: 'italic', color: '#1A1A2E' }}>
                      01 Elegant
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: '#6B7280' }}>
                      Tipografi serif klasik dipadu aksen emas mawar, tata letak simetris megah, dan butiran kilau cahaya lembut.
                    </p>
                  </div>
                  <div className="h-20 rounded-xl flex items-center justify-center" style={{ background: 'rgba(201,144,108,0.06)' }}>
                    <span className="text-4xl animate-float">🌹</span>
                  </div>
                </div>
                <div className="mt-6 space-y-2.5 border-t pt-5" style={{ borderColor: 'rgba(201,144,108,0.12)' }}>
                  <Link href="/demo/shava-dedek?template=elegant" target="_blank" className="block w-full">
                    <button className="btn-secondary w-full py-2.5 text-xs font-medium flex items-center justify-center gap-1.5" style={{ borderRadius: 12 }}>
                      <Eye className="w-3.5 h-3.5" style={{ color: '#C9906C' }} />
                      Lihat Pratinjau Demo
                    </button>
                  </Link>
                  <Link href="/create?template=elegant" className="block w-full">
                    <button className="btn-primary w-full py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all" style={{ borderRadius: 12 }}>
                      <span>Pilih Desain Ini</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* 02 Minimalist */}
            <ScrollReveal delay={80}>
              <div className="glass-card hover-lift p-7 flex flex-col justify-between h-full group">
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold" style={{ color: '#4A5568' }}>02</span>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(74,85,104,0.08)', color: '#4A5568' }}>
                      Dedaunan
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-light tracking-tight mb-2" style={{ color: '#1A1A2E' }}>
                      02 Minimalist
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: '#6B7280' }}>
                      Estetika bersih terinspirasi majalah editorial modern. Garis kontras tipis, ruang bernapas lapang.
                    </p>
                  </div>
                  <div className="h-20 rounded-xl flex items-center justify-center" style={{ background: 'rgba(74,85,104,0.05)' }}>
                    <span className="text-4xl animate-leaf" style={{ display: 'inline-block' }}>🌿</span>
                  </div>
                </div>
                <div className="mt-6 space-y-2.5 border-t pt-5" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
                  <Link href="/demo/shava-dedek?template=minimalist" target="_blank" className="block w-full">
                    <button className="btn-secondary w-full py-2.5 text-xs font-medium flex items-center justify-center gap-1.5" style={{ borderRadius: 12 }}>
                      <Eye className="w-3.5 h-3.5" style={{ color: '#4A5568' }} />
                      Lihat Pratinjau Demo
                    </button>
                  </Link>
                  <Link href="/create?template=minimalist" className="block w-full">
                    <button className="w-full py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all" style={{ background: '#1A1A2E', color: '#fff', borderRadius: 12 }}>
                      <span>Pilih Desain Ini</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* 03 Nusantara */}
            <ScrollReveal delay={160}>
              <div className="glass-card-gold hover-lift p-7 flex flex-col justify-between h-full group">
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold" style={{ color: '#C9A84C' }}>03</span>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(201,168,76,0.10)', color: '#C9A84C' }}>
                      Gunungan &amp; Melati
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl mb-2" style={{ fontFamily: "'DM Serif Display', serif", color: '#1A1A2E' }}>
                      03 Nusantara
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: '#6B7280' }}>
                      Pesona tradisi Indonesia dengan siluet Gunungan Wayang dan taburan kelopak bunga melati.
                    </p>
                  </div>
                  <div className="h-20 rounded-xl flex items-center justify-center gap-3" style={{ background: 'rgba(201,168,76,0.06)' }}>
                    <span className="text-3xl animate-gunungan" style={{ display: 'inline-block' }}>🏯</span>
                    <span className="text-3xl animate-petal" style={{ display: 'inline-block', ['--fall-duration' as string]: '8s' }}>🌸</span>
                  </div>
                </div>
                <div className="mt-6 space-y-2.5 border-t pt-5" style={{ borderColor: 'rgba(201,168,76,0.14)' }}>
                  <Link href="/demo/shava-dedek?template=nusantara" target="_blank" className="block w-full">
                    <button className="btn-secondary w-full py-2.5 text-xs font-medium flex items-center justify-center gap-1.5" style={{ borderRadius: 12 }}>
                      <Eye className="w-3.5 h-3.5" style={{ color: '#C9A84C' }} />
                      Lihat Pratinjau Demo
                    </button>
                  </Link>
                  <Link href="/create?template=nusantara" className="block w-full">
                    <button className="btn-primary w-full py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all" style={{ borderRadius: 12 }}>
                      <span>Pilih Desain Ini</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* =====================================================================
          FEATURES BENTO GRID
          ===================================================================== */}
      <section id="fitur" className="py-24">
        <div className="divider-gradient mx-auto max-w-6xl mb-20" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">

          <ScrollReveal className="text-center mb-14">
            <span className="inline-block mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: '#C9906C' }}>
              Teknologi &amp; Keanggunan
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight mb-3" style={{ color: '#1A1A2E' }}>
              Semua yang Anda{' '}
              <span style={{ fontFamily: "'DM Serif Display', serif", fontStyle: 'italic' }}>Butuhkan</span>
            </h2>
            <p className="text-sm max-w-xl mx-auto leading-relaxed" style={{ color: '#6B7280' }}>
              Dirancang dengan ketelitian tingkat tinggi agar setiap detail undangan Anda tampil sempurna.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Smartphone, color: '#3B82F6', bg: 'rgba(59,130,246,0.08)', title: 'Mobile-First Fluid',              desc: 'Dikalibrasi presisi untuk berbagai ukuran layar iPhone dan Android tanpa horizontal scrolling.',         card: 'glass-card' },
              { icon: Heart,      color: '#EC4899', bg: 'rgba(236,72,153,0.08)',  title: 'Personalisasi Tamu WhatsApp',     desc: 'Generate ribuan link personal instan dengan salam eksklusif untuk setiap tamu.',                    card: 'glass-card-rose' },
              { icon: Send,       color: '#06B6D4', bg: 'rgba(6,182,212,0.08)',   title: 'RSVP & Ucapan Realtime',          desc: 'Pantau konfirmasi kehadiran dan baca doa restu digital langsung di portal Anda.',                  card: 'glass-card' },
              { icon: Music,      color: '#8B5CF6', bg: 'rgba(139,92,246,0.08)', title: 'Pemutar Musik Latar',              desc: 'Alunan melodi romantis yang mulai berputar lembut saat tamu membuka amplop digital.',              card: 'glass-card' },
              { icon: MapPin,     color: '#10B981', bg: 'rgba(16,185,129,0.08)', title: 'Petunjuk Arah Google Maps',        desc: 'Tamu dapat membuka navigasi GPS langsung menuju venue akad dan resepsi dengan satu sentuhan.',     card: 'glass-card' },
              { icon: Gift,       color: '#C9A84C', bg: 'rgba(201,168,76,0.08)', title: 'Amplop Digital & Rekening',        desc: 'Fitur salin nomor rekening bank atau dompet digital yang rapi, santun, dan aman.',                card: 'glass-card-gold' },
            ].map(({ icon: Icon, color, bg, title, desc, card }, i) => (
              <ScrollReveal key={title} delay={i * 60}>
                <div className={`${card} hover-lift p-7 group h-full`}>
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: bg }}
                  >
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  <h3 className="text-base font-semibold mb-2" style={{ color: '#1A1A2E' }}>{title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: '#6B7280' }}>{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          HOW IT WORKS — 4 Steps
          ===================================================================== */}
      <section id="cara-kerja" className="py-24">
        <div className="divider-gradient mx-auto max-w-6xl mb-20" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">

          <ScrollReveal className="text-center mb-14">
            <span className="inline-block mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: '#C9906C' }}>
              Sederhana &amp; Cepat
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight mb-3" style={{ color: '#1A1A2E' }}>
              Hanya{' '}
              <span style={{ fontFamily: "'DM Serif Display', serif", fontStyle: 'italic' }}>4 Langkah</span>{' '}
              Mudah
            </h2>
            <p className="text-sm max-w-xl mx-auto leading-relaxed" style={{ color: '#6B7280' }}>
              Tanpa perlu keahlian desain atau teknis. Selesai dalam hitungan menit.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { step: '01', label: 'Pilih Template',      color: '#C9906C', bg: 'rgba(201,144,108,0.08)', desc: 'Tentukan nuansa yang mewakili kepribadian Anda dan pasangan dari koleksi eksklusif kami.' },
              { step: '02', label: 'Isi Informasi',       color: '#4A5568', bg: 'rgba(74,85,104,0.07)',   desc: 'Lengkapi nama mempelai, jadwal acara akad & resepsi, kisah cinta, dan detail venue.' },
              { step: '03', label: 'Pratinjau Nyata',     color: '#3B82F6', bg: 'rgba(59,130,246,0.07)',  desc: 'Periksa langsung di layar simulasi smartphone sebelum melakukan pembayaran.' },
              { step: '04', label: 'Bagikan ke WhatsApp', color: '#10B981', bg: 'rgba(16,185,129,0.07)',  desc: 'Undangan langsung aktif dan siap disebarkan ke seluruh daftar tamu Anda.' },
            ].map(({ step, label, color, bg, desc }, i) => (
              <ScrollReveal key={step} delay={i * 80}>
                <div className="glass-card hover-lift p-7 flex flex-col gap-4 group h-full">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-transform duration-300 group-hover:scale-110"
                    style={{ background: bg, color }}
                  >
                    {step}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold mb-2" style={{ color: '#1A1A2E' }}>{label}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: '#6B7280' }}>{desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          PRICING
          ===================================================================== */}
      <section id="harga" className="py-24">
        <div className="divider-gradient mx-auto max-w-6xl mb-20" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">

          <ScrollReveal className="text-center mb-14">
            <span className="inline-block mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: '#C9906C' }}>
              Transparan &amp; Jelas
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight mb-3" style={{ color: '#1A1A2E' }}>
              Pilihan Paket{' '}
              <span style={{ fontFamily: "'DM Serif Display', serif", fontStyle: 'italic' }}>Layanan</span>
            </h2>
            <p className="text-sm max-w-xl mx-auto leading-relaxed" style={{ color: '#6B7280' }}>
              Investasi terbaik untuk hari istimewa Anda dengan masa aktif panjang dan kuota tamu tak terbatas.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">

            {/* Basic */}
            <ScrollReveal delay={0}>
              <div className="glass-card hover-lift p-8 flex flex-col h-full">
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest block mb-3" style={{ color: '#6B7280' }}>Basic</span>
                  <div className="text-4xl font-light mb-1" style={{ color: '#1A1A2E' }}>Rp 49.000</div>
                  <p className="text-xs" style={{ color: '#9CA3AF' }}>Pilihan hemat esensial</p>
                </div>
                <div className="divider-gradient mb-5" />
                <ul className="space-y-3 text-xs flex-1" style={{ color: '#4A5568' }}>
                  {['Masa Aktif 6 Bulan', 'Galeri hingga 5 Foto', 'RSVP & Digital Guestbook', 'Navigasi Google Maps', 'Musik Latar Pilihan'].map(f => (
                    <li key={f} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#10B981' }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/create?plan=basic" className="block w-full mt-6">
                  <button className="btn-secondary w-full py-3.5 px-4 text-xs font-semibold flex items-center justify-center text-center gap-2 active:scale-95 transition-all" style={{ borderRadius: 14 }}>
                    <span>Pilih Paket Basic</span>
                  </button>
                </Link>
              </div>
            </ScrollReveal>

            {/* Premium — Featured */}
            <ScrollReveal delay={80}>
              <div className="glass-card-rose hover-lift p-8 flex flex-col relative h-full" style={{ borderColor: 'rgba(201,144,108,0.30)' }}>
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide text-white shadow-sm"
                  style={{ background: 'linear-gradient(135deg, #C9906C, #C9A84C)', whiteSpace: 'nowrap' }}
                >
                  Paling Populer
                </div>
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest block mb-3" style={{ color: '#C9906C' }}>Premium</span>
                  <div className="text-4xl font-light mb-1" style={{ color: '#1A1A2E' }}>Rp 99.000</div>
                  <p className="text-xs" style={{ color: '#9CA3AF' }}>Fitur lengkap &amp; terpersonalisasi</p>
                </div>
                <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,144,108,0.35), transparent)', marginBottom: 20 }} />
                <ul className="space-y-3 text-xs flex-1" style={{ color: '#4A5568' }}>
                  {['Masa Aktif 12 Bulan', 'Galeri Foto Tak Terbatas', 'Unlimited Tamu Personal WhatsApp', 'Timeline Kisah Cinta', 'Amplop Digital & QRIS', 'Custom Musik Latar Sendiri'].map(f => (
                    <li key={f} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#C9906C' }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/create?plan=premium" className="block w-full mt-6">
                  <button className="btn-primary w-full py-3.5 px-4 text-sm font-semibold flex items-center justify-center text-center gap-2 active:scale-95 transition-all" style={{ borderRadius: 14 }}>
                    <span>Pilih Paket Premium</span>
                    <ArrowRight className="w-4 h-4 flex-shrink-0" />
                  </button>
                </Link>
              </div>
            </ScrollReveal>

            {/* Gold */}
            <ScrollReveal delay={160}>
              <div className="glass-card-gold hover-lift p-8 flex flex-col h-full">
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest block mb-3" style={{ color: '#C9A84C' }}>Gold</span>
                  <div className="text-4xl font-light mb-1" style={{ color: '#1A1A2E' }}>Rp 149.000</div>
                  <p className="text-xs" style={{ color: '#9CA3AF' }}>Pengalaman eksklusif VIP</p>
                </div>
                <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.35), transparent)', marginBottom: 20 }} />
                <ul className="space-y-3 text-xs flex-1" style={{ color: '#4A5568' }}>
                  {['Masa Aktif Selamanya', 'Seluruh Fitur Premium', 'Prioritas Bantuan Tim Desain', 'Custom Subdomain Khusus', 'Bebas Watermark Platform'].map(f => (
                    <li key={f} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#C9A84C' }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/create?plan=gold" className="block w-full mt-6">
                  <button className="btn-secondary w-full py-3.5 px-4 text-xs font-semibold flex items-center justify-center text-center gap-2 active:scale-95 transition-all" style={{ borderRadius: 14 }}>
                    <span>Pilih Paket Gold</span>
                  </button>
                </Link>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* =====================================================================
          FOOTER
          ===================================================================== */}
      <footer className="py-14">
        <div className="divider-gradient mx-auto max-w-6xl mb-14" />
        <ScrollReveal direction="none">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="glass-card p-8 sm:p-10 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #C9906C, #C9A84C)' }}>
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <span className="text-base font-semibold" style={{ color: '#1A1A2E' }}>
                  Titik Temu <span style={{ color: '#C9906C' }}>Invitation</span>
                </span>
              </div>
              <p className="text-xs leading-relaxed max-w-md mx-auto mb-6" style={{ color: '#9CA3AF' }}>
                Bagian dari ekosistem Titik Temu Project. Standar keanggunan, teknologi modern, dan kesederhanaan untuk momen sakral Anda.
              </p>
              <div className="flex items-center justify-center gap-6 text-xs mb-6" style={{ color: '#6B7280' }}>
                <Link href="/templates" className="hover:text-[#C9906C] transition-colors">Template</Link>
                <Link href="#fitur"     className="hover:text-[#C9906C] transition-colors">Fitur</Link>
                <Link href="#harga"     className="hover:text-[#C9906C] transition-colors">Harga</Link>
                <Link href="/create"    className="hover:text-[#C9906C] transition-colors">Buat Undangan</Link>
              </div>
              <div className="text-[11px]" style={{ color: '#9CA3AF' }}>
                © {new Date().getFullYear()} Titik Temu Invitation. Hak Cipta Dilindungi.
              </div>
            </div>
          </div>
        </ScrollReveal>
      </footer>

    </div>
  );
}
