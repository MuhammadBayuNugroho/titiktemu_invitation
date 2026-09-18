/**
 * Guest Service — Server-only
 *
 * Manages guest records, secure tokens, and RSVP statuses.
 * Per SECURITY rules: Tokens are cryptographically random, high entropy, non-sequential.
 */
import { createAdminClient } from "@/lib/supabase/admin";
import { generateGuestToken } from "@/lib/utils";
import type { GuestData, GuestWithRSVP } from "@/types/invitation";

/**
 * Lookup a guest by their personalized URL access token.
 * Strictly queries database without returning dummy mocks.
 */
export async function getGuestByToken(
  token: string,
  invitationId?: string
): Promise<GuestData | null> {
  const supabase: any = createAdminClient();

  let query = supabase
    .from("guests")
    .select("id, name, phone, category, token, invitation_id")
    .eq("token", token);

  if (invitationId) {
    query = query.eq("invitation_id", invitationId);
  }

  const { data, error } = await query.maybeSingle();

  if (error || !data) {
    return null;
  }

  return {
    id: data.id,
    name: data.name,
    phone: data.phone ?? undefined,
    category: data.category as GuestData["category"],
    token: data.token,
  };
}

/**
 * Retrieve an invitation using the opaque customer access token.
 * Used for customer portal authorization without requiring account passwords.
 */
export async function getInvitationByCustomerToken(customerAccessToken: string) {
  if (!customerAccessToken) return null;
  const supabase: any = createAdminClient();

  const { data, error } = await supabase
    .from("invitations")
    .select(`
      id,
      slug,
      title,
      bride_name,
      groom_name,
      event_date,
      status,
      customer_access_token,
      templates (slug, name)
    `)
    .eq("customer_access_token", customerAccessToken)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    brideName: data.bride_name,
    groomName: data.groom_name,
    eventDate: data.event_date,
    status: data.status,
    customerAccessToken: data.customer_access_token,
    templateName: (data.templates as any)?.name ?? "Standard",
    templateSlug: (data.templates as any)?.slug ?? "elegant",
  };
}

/**
 * Create a new guest with a secure random token.
 */
export async function createGuest(input: {
  invitationId: string;
  name: string;
  phone?: string;
  category?: GuestData["category"];
}): Promise<GuestData | null> {
  const supabase: any = createAdminClient();
  const token = generateGuestToken(10);

  const { data, error } = await supabase
    .from("guests")
    .insert({
      invitation_id: input.invitationId,
      name: input.name.trim(),
      phone: input.phone ? input.phone.trim() : null,
      category: input.category ?? "friend",
      token,
    })
    .select("id, name, phone, category, token")
    .single();

  if (error || !data) {
    console.error("Error creating guest in Supabase:", error);
    return null;
  }

  return {
    id: data.id,
    name: data.name,
    phone: data.phone ?? undefined,
    category: data.category as GuestData["category"],
    token: data.token,
  };
}

/**
 * Bulk create multiple guests at once (e.g. pasted newline-separated names).
 */
export async function createBulkGuests(
  invitationId: string,
  guests: { name: string; phone?: string; category?: GuestData["category"] }[]
): Promise<GuestData[]> {
  if (!guests.length) return [];
  const supabase: any = createAdminClient();

  const rows = guests
    .filter((g) => g.name.trim().length > 0)
    .map((g) => ({
      invitation_id: invitationId,
      name: g.name.trim(),
      phone: g.phone ? g.phone.trim() : null,
      category: g.category ?? "friend",
      token: generateGuestToken(10),
    }));

  if (!rows.length) return [];

  const { data, error } = await supabase
    .from("guests")
    .insert(rows)
    .select("id, name, phone, category, token");

  if (error || !data) {
    console.error("Error bulk creating guests:", error);
    return [];
  }

  return data.map((g: any) => ({
    id: g.id,
    name: g.name,
    phone: g.phone ?? undefined,
    category: g.category as GuestData["category"],
    token: g.token,
  }));
}

/**
 * List all guests for an invitation along with their RSVP response if present.
 */
export async function listGuestsWithRSVP(invitationId: string): Promise<GuestWithRSVP[]> {
  const supabase: any = createAdminClient();

  // Fetch guests
  const { data: guests, error: guestErr } = await supabase
    .from("guests")
    .select("id, name, phone, category, token")
    .eq("invitation_id", invitationId)
    .order("created_at", { ascending: false });

  if (guestErr || !guests) {
    console.error("Error listing guests:", guestErr);
    return [];
  }

  // Fetch RSVPs for this invitation
  const { data: rsvps } = await supabase
    .from("rsvps")
    .select("guest_id, guest_name, attendance_status, pax_count, notes, created_at")
    .eq("invitation_id", invitationId);

  const rsvpByGuestId = new Map<string, any>();
  const rsvpByName = new Map<string, any>();

  if (rsvps) {
    rsvps.forEach((r: any) => {
      if (r.guest_id) rsvpByGuestId.set(r.guest_id, r);
      if (r.guest_name) rsvpByName.set(r.guest_name.toLowerCase().trim(), r);
    });
  }

  return guests.map((g: any) => {
    const matchedRsvp =
      rsvpByGuestId.get(g.id) ||
      rsvpByName.get(g.name.toLowerCase().trim()) ||
      null;

    return {
      id: g.id,
      name: g.name,
      phone: g.phone ?? undefined,
      category: g.category as GuestData["category"],
      token: g.token,
      rsvp: matchedRsvp
        ? {
            status: matchedRsvp.attendance_status,
            paxCount: matchedRsvp.pax_count ?? 1,
            notes: matchedRsvp.notes ?? undefined,
            createdAt: matchedRsvp.created_at,
          }
        : null,
    };
  });
}

/**
 * Delete a guest by ID (guarded by invitationId).
 */
export async function deleteGuest(guestId: string, invitationId: string): Promise<boolean> {
  const supabase: any = createAdminClient();

  const { error } = await supabase
    .from("guests")
    .delete()
    .eq("id", guestId)
    .eq("invitation_id", invitationId);

  if (error) {
    console.error("Error deleting guest:", error);
    return false;
  }
  return true;
}
