import { z } from "zod";

export const CoupleSchema = z.object({
  brideName: z.string().min(1, "Nama panggilan mempelai wanita wajib diisi").max(100),
  brideFullName: z.string().min(1, "Nama lengkap mempelai wanita wajib diisi").max(200),
  brideParentNames: z.string().min(1, "Nama orang tua mempelai wanita wajib diisi"),
  brideSocial: z.string().max(100).optional().or(z.literal("")),
  groomName: z.string().min(1, "Nama panggilan mempelai pria wajib diisi").max(100),
  groomFullName: z.string().min(1, "Nama lengkap mempelai pria wajib diisi").max(200),
  groomParentNames: z.string().min(1, "Nama orang tua mempelai pria wajib diisi"),
  groomSocial: z.string().max(100).optional().or(z.literal("")),
});

export const EventScheduleSchema = z.object({
  date: z.string().min(1, "Tanggal acara wajib diisi"),
  startTime: z.string().min(1, "Waktu mulai wajib diisi"),
  endTime: z.string().min(1, "Waktu selesai wajib diisi"),
});

export const EventSchema = z.object({
  eventDate: z.string().min(1, "Tanggal utama acara wajib diisi"),
  timezone: z.string().default("Asia/Jakarta"),
  akad: EventScheduleSchema,
  reception: EventScheduleSchema,
  venueName: z.string().min(1, "Nama tempat/gedung wajib diisi").max(200),
  venueAddress: z.string().min(1, "Alamat lokasi wajib diisi"),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  mapsUrl: z.string().url("URL Google Maps harus valid").optional().or(z.literal("")),
});

export const MediaSchema = z.object({
  coverImageUrl: z.string().url().optional().or(z.literal("")),
  musicUrl: z.string().url().optional().or(z.literal("")),
  gallery: z.array(
    z.object({
      url: z.string().url("URL gambar tidak valid"),
      sortOrder: z.number().default(0),
    })
  ).max(10, "Maksimal 10 foto dalam galeri"),
});

export const StoryItemSchema = z.object({
  year: z.string().max(20).optional().or(z.literal("")),
  title: z.string().min(1, "Judul cerita wajib diisi").max(150),
  story: z.string().min(1, "Kisah cerita wajib diisi"),
  imageUrl: z.string().url().optional().or(z.literal("")),
  sortOrder: z.number().default(0),
});

export const GiftItemSchema = z.object({
  giftType: z.enum(["bank", "ewallet"]),
  providerName: z.string().min(1, "Nama bank/e-wallet wajib diisi"),
  accountNumber: z.string().min(1, "Nomor rekening/telepon wajib diisi"),
  accountName: z.string().min(1, "Nama pemilik rekening wajib diisi"),
});

export const InvitationSchema = z.object({
  templateSlug: z.string().min(1, "Pilihan template wajib ditentukan"),
  title: z.string().min(3, "Judul undangan minimal 3 karakter").max(200),
  openingText: z.string().optional().or(z.literal("")),
  couple: CoupleSchema,
  event: EventSchema,
  media: MediaSchema,
  stories: z.array(StoryItemSchema).default([]),
  gifts: z.array(GiftItemSchema).default([]),
});

export type InvitationFormData = z.infer<typeof InvitationSchema>;
