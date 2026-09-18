# TITIK TEMU INVITATION — ARCHITECTURE SPECIFICATION

## 1. High-Level Architectural Flow

Arsitektur aplikasi mengikuti prinsip pemisahan tanggung jawab (Separation of Concerns) secara berlapis:

```text
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer (UI)                  │
│   Landing Page  │  Builder Wizard  │  Admin  │ Public Slug  │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                  Application Layer (Next.js)                │
│   Server Actions  │  Route Handlers (API)  │  Middleware    │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                    Business Logic Layer                     │
│  Template Engine │ Order Service │ Payment │ Token Service  │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                   Data Access Layer (DAL)                   │
│   Supabase Client (Browser/Server) │ Zod Validation Schemas │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                Database & Infrastructure Layer               │
│   PostgreSQL (Supabase) + RLS │ Storage Buckets │ Midtrans  │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Decoupled Template Engine

Template tidak boleh berupa halaman monolitik yang terkunci dengan data. 
Sistem mengadopsi pola **Agnostic Data-Driven Renderer**:

```text
┌──────────────────────────────┐
│       Invitation Data        │
│  (Mempelai, Acara, Media)    │
└──────────────┬───────────────┘
               │
┌──────────────▼───────────────┐
│      Invitation Engine       │
│  Validates & Normalizes Data │
└──────────────┬───────────────┘
               │
┌──────────────▼───────────────┐
│     Template Config & Map    │
│  - 01 Elegant                │
│  - 02 Minimalist             │
│  - 03 Nusantara              │
└──────────────┬───────────────┘
               │
┌──────────────▼───────────────┐
│      InvitationRenderer      │
│  Shared across /preview and  │
│         /[slug]              │
└──────────────────────────────┘
```

Komponen seksi yang dapat digunakan kembali (*reusable sections*):
- `InvitationCover`
- `InvitationOpening`
- `GuestGreeting`
- `CoupleProfile`
- `EventSection`
- `Countdown`
- `LocationSection`
- `StoryTimeline`
- `GallerySection`
- `RSVPSection`
- `GuestbookSection`
- `WeddingGiftSection`
- `MusicPlayer`
- `ClosingSection`

---

## 3. Payment Provider Abstraction

Untuk memastikan fleksibilitas dan kemampuan pengujian lokal tanpa ketergantungan wajib pada sandbox eksternal, payment diatur dengan pola interface:

```typescript
export interface PaymentTransactionResult {
  token: string
  redirectUrl: string
  orderNumber: string
}

export interface PaymentWebhookPayload {
  orderId: string
  transactionStatus: string
  fraudStatus?: string
  statusCode: string
  grossAmount: string
  signatureKey: string
  rawPayload: Record<string, unknown>
}

export interface IPaymentProvider {
  createTransaction(params: {
    orderNumber: string
    amount: number
    customer: { name: string; email: string; phone: string }
    invitationTitle: string
  }): Promise<PaymentTransactionResult>

  verifyWebhook(payload: PaymentWebhookPayload): Promise<boolean>
}
```

Implementasi:
- `MidtransPaymentProvider` (Produksi & Midtrans Sandbox)
- `MockPaymentProvider` (Development/Testing lokal dengan verifikasi instan)

---

## 4. Security & Access Boundaries

1. **Anonymous Customer Access**: Customer tidak wajib membuat akun. Akses edit draft diamankan melalui `access_token` berbasis UUID v4/kriptografis yang disimpan di state aman client (localStorage/cookie terenkripsi).
2. **Public Invitation Access**: Hanya undangan dengan status `published` yang dapat diakses publik. Route publik `/[slug]` langsung me-return 404 / Notice jika status draft atau belum bayar.
3. **Database Security (RLS)**: Public client hanya memiliki izin `SELECT` pada baris yang berstatus `published`. Akses update status pembayaran dan pembuatan order resmi diisolasi melalui backend API route / Supabase Service Role.
