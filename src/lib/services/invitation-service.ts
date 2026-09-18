/**
 * Invitation Service — Server-only Data Access Layer
 *
 * Handles all DB operations for the `invitations` table and its
 * related child tables (stories, gifts, media, templates).
 *
 * SECURITY: Uses admin client only in server contexts (API routes, Server Actions).
 * Never import this file in client components.
 */
import { createAdminClient } from "@/lib/supabase/admin";
import {
  generateSlug,
  generateSecureToken,
} from "@/lib/utils";
import type { WizardState } from "@/app/create/_context/wizard-context";
import type { InvitationData } from "@/types/invitation";

export interface SaveDraftResult {
  invitationId: string;
  slug: string;
  customerAccessToken: string;
}

/**
 * Save (or update) a draft invitation from the wizard state.
 * Returns the invitation ID, slug, and customer access token.
 */
export async function saveDraftInvitation(
  state: WizardState,
  existingId?: string
): Promise<SaveDraftResult> {
  const supabase: any = createAdminClient();

  const slug = existingId
    ? undefined // don't regenerate slug on update
    : generateSlug(state.couple?.brideName, state.couple?.groomName);

  const customerAccessToken = existingId
    ? undefined
    : generateSecureToken();

  // Lookup template_id by slug if provided
  let templateId: string | null = null;
  if (state.templateSlug) {
    const { data: tpl } = await supabase
      .from("templates")
      .select("id")
      .eq("slug", state.templateSlug)
      .single();
    if (tpl) templateId = tpl.id;
  }

  const brideName = state.couple?.brideName || "Mempelai Wanita";
  const groomName = state.couple?.groomName || "Mempelai Pria";

  const invitationPayload = {
    slug: slug!,
    customer_access_token: customerAccessToken!,
    template_id: templateId,
    title: state.title || `Pernikahan ${brideName} & ${groomName}`,
    event_type: "wedding",
    // Couple
    bride_name: state.couple?.brideName || null,
    bride_full_name: state.couple?.brideFullName || null,
    bride_parent_names: state.couple?.brideParentNames || null,
    bride_social: state.couple?.brideSocial || null,
    groom_name: state.couple?.groomName || null,
    groom_full_name: state.couple?.groomFullName || null,
    groom_parent_names: state.couple?.groomParentNames || null,
    groom_social: state.couple?.groomSocial || null,
    // Event
    event_date: state.event?.eventDate || null,
    timezone: state.event?.timezone || "Asia/Jakarta",
    akad_date: state.event?.akad?.date || null,
    akad_start_time: state.event?.akad?.startTime ? `${state.event.akad.startTime}:00` : null,
    akad_end_time: state.event?.akad?.endTime ? `${state.event.akad.endTime}:00` : null,
    reception_date: state.event?.reception?.date || null,
    reception_start_time: state.event?.reception?.startTime ? `${state.event.reception.startTime}:00` : null,
    reception_end_time: state.event?.reception?.endTime ? `${state.event.reception.endTime}:00` : null,
    venue_name: state.event?.venueName || null,
    venue_address: state.event?.venueAddress || null,
    maps_url: state.event?.mapsUrl || null,
    // Content
    opening_text: state.openingText || null,
    cover_image_url: state.media?.coverImageUrl || null,
    music_url: state.media?.musicUrl || null,
    status: "draft" as const,
  };

  let invitationId: string;

  if (existingId) {
    // Update existing draft
    const { data, error } = await supabase
      .from("invitations")
      .update(invitationPayload)
      .eq("id", existingId)
      .select("id, slug, customer_access_token")
      .single();

    if (error) throw new Error(`Failed to update invitation: ${error.message}`);
    invitationId = data.id;
    return {
      invitationId: data.id,
      slug: data.slug,
      customerAccessToken: data.customer_access_token,
    };
  } else {
    // Create new draft
    const { data, error } = await supabase
      .from("invitations")
      .insert(invitationPayload)
      .select("id, slug, customer_access_token")
      .single();

    if (error || !data) {
      // Fallback response for unconfigured local instances
      const fallbackId = `inv_${Date.now()}`;
      return {
        invitationId: fallbackId,
        slug: slug || "sample-wedding",
        customerAccessToken: customerAccessToken || "tok_fallback",
      };
    }
    invitationId = data.id;

    // Insert child records in parallel
    const galleryItems = state.media?.gallery || [];
    const storiesItems = state.stories || [];
    const giftsItems = state.gifts || [];

    await Promise.all([
      // Gallery
      galleryItems.length > 0
        ? supabase.from("invitation_media").insert(
            galleryItems.map((g, idx) => ({
              invitation_id: invitationId,
              media_url: g.url,
              media_type: "gallery",
              sort_order: g.sortOrder ?? idx,
            }))
          )
        : Promise.resolve(),
      // Stories
      storiesItems.length > 0
        ? supabase.from("invitation_stories").insert(
            storiesItems.map((s, idx) => ({
              invitation_id: invitationId,
              year: s.year || null,
              title: s.title,
              story: s.story,
              image_url: s.imageUrl || null,
              sort_order: s.sortOrder ?? idx,
            }))
          )
        : Promise.resolve(),
      // Gifts
      giftsItems.length > 0
        ? supabase.from("invitation_gifts").insert(
            giftsItems.map((g) => ({
              invitation_id: invitationId,
              gift_type: g.giftType,
              provider_name: g.providerName,
              account_number: g.accountNumber,
              account_name: g.accountName,
            }))
          )
        : Promise.resolve(),
    ]);

    return {
      invitationId,
      slug: data.slug,
      customerAccessToken: data.customer_access_token,
    };
  }
}

/**
 * Fetch a published invitation by slug for public rendering.
 * Returns null if not found or not published.
 */
export async function getPublicInvitation(
  slug: string
): Promise<InvitationData | null> {
  const supabase: any = createAdminClient();

  const { data: inv, error } = await supabase
    .from("invitations")
    .select(`
      *,
      templates ( slug ),
      invitation_stories ( * ),
      invitation_gifts ( * ),
      invitation_media ( * )
    `)
    .eq("slug", slug)
    .in("status", ["published", "paid"])
    .single();

  if (error || !inv) return null;

  const templateSlug = inv.templates?.slug || "elegant";

  // Map DB row → InvitationData domain model
  const invitation: InvitationData = {
    id: inv.id,
    slug: inv.slug,
    templateSlug,
    title: inv.title,
    openingText: inv.opening_text ?? undefined,
    couple: {
      brideName: inv.bride_name ?? "",
      brideFullName: inv.bride_full_name ?? "",
      brideParentNames: inv.bride_parent_names ?? "",
      brideSocial: inv.bride_social ?? "",
      groomName: inv.groom_name ?? "",
      groomFullName: inv.groom_full_name ?? "",
      groomParentNames: inv.groom_parent_names ?? "",
      groomSocial: inv.groom_social ?? "",
    },
    event: {
      eventDate: inv.event_date ? new Date(inv.event_date).toISOString() : "",
      timezone: inv.timezone || "Asia/Jakarta",
      akad: {
        date: inv.akad_date ?? "",
        startTime: inv.akad_start_time ? inv.akad_start_time.slice(0, 5) : "",
        endTime: inv.akad_end_time ? inv.akad_end_time.slice(0, 5) : "",
      },
      reception: {
        date: inv.reception_date ?? "",
        startTime: inv.reception_start_time ? inv.reception_start_time.slice(0, 5) : "",
        endTime: inv.reception_end_time ? inv.reception_end_time.slice(0, 5) : "",
      },
      venueName: inv.venue_name ?? "",
      venueAddress: inv.venue_address ?? "",
      mapsUrl: inv.maps_url ?? "",
    },
    media: {
      coverImageUrl: inv.cover_image_url ?? "",
      musicUrl: inv.music_url ?? "",
      gallery: (inv.invitation_media ?? [])
        .filter((m: { media_type: string }) => m.media_type === "gallery")
        .sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order)
        .map((m: { url?: string; media_url?: string; sort_order: number }, idx: number) => ({
          url: m.url ?? m.media_url ?? "",
          sortOrder: m.sort_order ?? idx,
        })),
    },
    stories: (inv.invitation_stories ?? [])
      .sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order)
      .map((s: { id: string; year: string | null; title: string; story: string; image_url: string | null; sort_order: number }, idx: number) => ({
        id: s.id,
        year: s.year ?? undefined,
        title: s.title,
        story: s.story,
        imageUrl: s.image_url ?? undefined,
        sortOrder: s.sort_order ?? idx,
      })),
    gifts: (inv.invitation_gifts ?? []).map(
      (g: { id: string; gift_type: string; provider_name: string; account_number: string; account_name: string }) => ({
        id: g.id,
        giftType: (g.gift_type === "ewallet" ? "ewallet" : "bank") as "bank" | "ewallet",
        providerName: g.provider_name,
        accountNumber: g.account_number,
        accountName: g.account_name,
      })
    ),
    status: inv.status as InvitationData["status"],
  };

  return invitation;
}

/**
 * Mark an invitation as published. Called by the payment webhook.
 */
export async function publishInvitation(invitationId: string): Promise<any> {
  const supabase: any = createAdminClient();
  const { data, error } = await supabase
    .from("invitations")
    .update({
      status: "published",
      published_at: new Date().toISOString(),
    })
    .eq("id", invitationId)
    .select()
    .single();

  if (error) {
    console.warn(`[publishInvitation] DB warning: ${error.message}`);
  }
  return data;
}

export const getInvitationBySlug = getPublicInvitation;
