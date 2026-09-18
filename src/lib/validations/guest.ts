import { z } from "zod";

export const CreateGuestSchema = z.object({
  invitationId: z.string().uuid("ID Undangan tidak valid"),
  name: z.string().min(2, "Nama tamu minimal 2 karakter").max(150),
  phone: z.string().max(50).optional().or(z.literal("")),
  category: z.enum(["family", "friend", "coworker", "organization", "other"]).default("friend"),
});

export const RSVPSchema = z.object({
  invitationId: z.string().uuid("ID Undangan tidak valid"),
  guestId: z.string().uuid().optional(),
  name: z.string().min(2, "Nama wajib diisi").max(150),
  attendance: z.enum(["hadir", "tidak_hadir", "masih_ragu"]),
  guestCount: z.number().int().min(1, "Minimal 1 tamu").max(10, "Maksimal 10 tamu"),
  message: z.string().max(500, "Pesan maksimal 500 karakter").optional().or(z.literal("")),
});

export const WishSchema = z.object({
  invitationId: z.string().uuid("ID Undangan tidak valid"),
  name: z.string().min(2, "Nama pengirim minimal 2 karakter").max(150),
  message: z.string().min(2, "Ucapan minimal 2 karakter").max(1000, "Ucapan maksimal 1000 karakter"),
});

export type CreateGuestInput = z.infer<typeof CreateGuestSchema>;
export type RSVPFormData = z.infer<typeof RSVPSchema>;
export type WishFormData = z.infer<typeof WishSchema>;
