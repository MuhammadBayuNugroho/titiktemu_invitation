import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, Smartphone, Heart, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              TITIK TEMU <span className="font-light text-zinc-500">INVITATION</span>
            </span>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            <Link href="/templates" className="text-sm font-medium text-zinc-600 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white">
              Template
            </Link>
            <Link href="#cara-kerja" className="text-sm font-medium text-zinc-600 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white">
              Cara Kerja
            </Link>
            <Link href="#fitur" className="text-sm font-medium text-zinc-600 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white">
              Fitur
            </Link>
            <Link href="#harga" className="text-sm font-medium text-zinc-600 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white">
              Harga
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/create">
              <Button size="sm" className="font-semibold">
                Buat Undangan
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-zinc-200 bg-gradient-to-b from-zinc-50/50 to-white py-20 dark:border-zinc-800 dark:from-zinc-950 dark:to-zinc-900 md:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <Badge variant="secondary" className="mb-4 gap-1.5 py-1 px-3">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>Platform Undangan Digital Modern MVP V1</span>
          </Badge>

          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white sm:text-5xl md:text-6xl">
            Buat Undangan Digital yang Berkesan
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl">
            Pilih desain, isi data, upload foto, dan terbitkan undangan digital Anda dalam beberapa langkah sederhana tanpa kerumitan teknis.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/create" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto">
                Buat Undangan
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/templates" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Lihat Template
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500 sm:gap-8">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Tanpa Wajib Registrasi</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Terbit Otomatis Seketika</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Bisa Bagikan via WhatsApp</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="cara-kerja" className="border-b border-zinc-200 py-16 dark:border-zinc-800 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
              Alur Sangat Sederhana
            </h2>
            <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
              Hanya perlu beberapa menit untuk menyiapkan undangan pernikahan Anda.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-white font-bold text-sm">
                01
              </div>
              <h3 className="mt-4 font-semibold text-zinc-950 dark:text-white">Pilih Template</h3>
              <p className="mt-2 text-sm text-zinc-500">
                Tentukan gaya desain: 01 Elegant, 02 Minimalist, atau 03 Nusantara.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-white font-bold text-sm">
                02
              </div>
              <h3 className="mt-4 font-semibold text-zinc-950 dark:text-white">Lengkapi Data</h3>
              <p className="mt-2 text-sm text-zinc-500">
                Isi data mempelai, jadwal acara akad & resepsi, dan upload foto galeri.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-white font-bold text-sm">
                03
              </div>
              <h3 className="mt-4 font-semibold text-zinc-950 dark:text-white">Pratinjau & Bayar</h3>
              <p className="mt-2 text-sm text-zinc-500">
                Cek tampilan di hp Anda, pilih paket, lalu bayar aman via Midtrans Snap.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-white font-bold text-sm">
                04
              </div>
              <h3 className="mt-4 font-semibold text-zinc-950 dark:text-white">Sebarkan Undangan</h3>
              <p className="mt-2 text-sm text-zinc-500">
                Undangan langsung aktif! Bagikan link personal ke kerabat lewat WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="fitur" className="border-b border-zinc-200 bg-zinc-50/50 py-16 dark:border-zinc-800 dark:bg-zinc-900/30 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
              Fitur Lengkap Sesuai Kebutuhan
            </h2>
            <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
              Dirancang untuk memberikan pengalaman terbaik bagi Anda dan para tamu undangan.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
              <Smartphone className="h-6 w-6 text-zinc-900 dark:text-white" />
              <h3 className="mt-4 font-semibold text-zinc-950 dark:text-white">Tampilan Mobile-First</h3>
              <p className="mt-2 text-sm text-zinc-500">
                Optimal dan nyaman dibuka di semua jenis smartphone para tamu tanpa horizontal scroll.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
              <Heart className="h-6 w-6 text-zinc-900 dark:text-white" />
              <h3 className="mt-4 font-semibold text-zinc-950 dark:text-white">Nama Tamu Personalisasi</h3>
              <p className="mt-2 text-sm text-zinc-500">
                Sapa setiap tamu dengan nama mereka di halaman pembuka dan teks WhatsApp otomatis.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
              <Send className="h-6 w-6 text-zinc-900 dark:text-white" />
              <h3 className="mt-4 font-semibold text-zinc-950 dark:text-white">RSVP & Ucapan Tamu Realtime</h3>
              <p className="mt-2 text-sm text-zinc-500">
                Terima kepastian kehadiran serta ucapan dan doa terbaik dari tamu dengan aman.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="harga" className="border-b border-zinc-200 py-16 dark:border-zinc-800 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
              Pilihan Paket Transparan
            </h2>
            <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
              Harga terjangkau tanpa biaya tersembunyi.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
            {/* Basic Plan */}
            <Card className="flex flex-col justify-between">
              <CardHeader>
                <Badge variant="secondary" className="w-fit">Paket Dasar</Badge>
                <CardTitle className="mt-2 text-2xl">Basic</CardTitle>
                <CardDescription>Pilihan praktis untuk acara sakral yang intim</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-extrabold text-zinc-950 dark:text-white">Rp 49.000</span>
                  <span className="text-sm text-zinc-500"> / undangan</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Akses 1 Pilihan Template</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Masa Aktif 3 Bulan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Galeri s.d 5 Foto</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Countdown & Navigasi Maps</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>RSVP & Buku Ucapan Tamu</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Amplop Digital / Wedding Gift</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/create?plan=basic" className="w-full">
                  <Button variant="outline" className="w-full">Pilih Basic</Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Premium Plan */}
            <Card className="relative flex flex-col justify-between border-zinc-900 shadow-md dark:border-zinc-700">
              <div className="absolute -top-3 right-6">
                <Badge variant="default" className="bg-zinc-900 text-white">Paling Populer</Badge>
              </div>
              <CardHeader>
                <Badge variant="secondary" className="w-fit">Paket Lengkap</Badge>
                <CardTitle className="mt-2 text-2xl">Premium</CardTitle>
                <CardDescription>Fitur lengkap tanpa batas untuk pernikahan istimewa</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-extrabold text-zinc-950 dark:text-white">Rp 99.000</span>
                  <span className="text-sm text-zinc-500"> / undangan</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span className="font-medium text-zinc-900 dark:text-white">Bebas Akses Semua Template</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Masa Aktif 1 Tahun Penuh</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Galeri s.d 10 Foto HD</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Background Musik Pilihan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Love Story Timeline</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Tautan Tamu Personal Tak Terbatas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Integrasi WhatsApp Share Otomatis</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/create?plan=premium" className="w-full">
                  <Button className="w-full">Pilih Premium</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-12 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-zinc-500">
              © 2026 Titik Temu Invitation. Bagian dari ekosistem Titik Temu Project.
            </p>
            <div className="flex items-center gap-6 text-sm text-zinc-500">
              <Link href="/templates" className="hover:text-zinc-900">Template</Link>
              <Link href="/create" className="hover:text-zinc-900">Buat Undangan</Link>
              <Link href="/admin/login" className="hover:text-zinc-900">Admin</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
