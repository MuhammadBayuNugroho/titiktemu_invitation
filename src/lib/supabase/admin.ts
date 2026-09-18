import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

/**
 * Service Role Supabase Client
 * PERINGATAN KEAMANAN:
 * Client ini memiliki hak akses bypass Row Level Security (RLS).
 * HANYA boleh digunakan di server untuk operasi khusus seperti:
 * - Pemrosesan webhook payment (Midtrans)
 * - Eksekusi tugas background / cron
 * DILARANG KERAS mengekspos client atau kuncinya ke browser!
 */
export function createAdminClient() {
  const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co")
    .replace(/\/rest\/v1\/?$/, "")
    .replace(/\/$/, "");
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  return createSupabaseClient<Database>(
    supabaseUrl,
    serviceRoleKey || "placeholder-service-key",
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}
