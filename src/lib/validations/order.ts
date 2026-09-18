import { z } from "zod";

export const CreateOrderSchema = z.object({
  invitationId: z.string().uuid("ID Undangan tidak valid"),
  planCode: z.enum(["basic", "premium"]),
  customerName: z.string().min(2, "Nama pemesan minimal 2 karakter").max(150),
  customerEmail: z.string().email("Format email tidak valid").max(150),
  customerPhone: z.string().min(8, "Nomor WhatsApp/telepon minimal 8 digit").max(50),
});

export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;
