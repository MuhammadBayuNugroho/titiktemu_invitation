/**
 * Admin Service — Server-only Data Access Layer
 *
 * Implements Section 44 & Phase 9 of Titik Temu Invitation specifications.
 * Provides administrative reporting, order auditing, invitation lifecycle control,
 * and content moderation using the privileged Supabase admin client.
 *
 * SECURITY: Never import or call from client components.
 */
import { createAdminClient } from "@/lib/supabase/admin";

export interface AdminMetrics {
  totalRevenue: number;
  totalOrders: number;
  paidOrders: number;
  pendingOrders: number;
  totalInvitations: number;
  publishedInvitations: number;
  totalGuests: number;
  attendingPax: number;
}

export interface AdminInvitationItem {
  id: string;
  slug: string;
  title: string;
  brideName: string;
  groomName: string;
  status: string;
  createdAt: string;
  publishedAt: string | null;
  customerAccessToken: string;
  templateName: string;
  templateSlug: string;
  orderNumber?: string;
  orderStatus?: string;
}

export interface AdminOrderItem {
  id: string;
  orderNumber: string;
  amount: number;
  status: "pending" | "paid" | "failed" | "cancelled";
  paymentType: string | null;
  createdAt: string;
  planName: string;
  planCode: string;
  invitationSlug?: string;
  invitationTitle?: string;
}

export interface AdminTemplateItem {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  isActive: boolean;
  previewImageUrl: string | null;
}

export interface AdminPlanItem {
  id: string;
  code: string;
  name: string;
  price: number;
  features: string[];
  isActive: boolean;
}

export interface AdminWishItem {
  id: string;
  name: string;
  message: string;
  createdAt: string;
  invitationSlug?: string;
  invitationTitle?: string;
}

/**
 * Validate admin passkey against environment configuration.
 */
export function verifyAdminKey(key: string | null | undefined): boolean {
  if (!key) return false;
  const expectedKey = process.env.ADMIN_SECRET_KEY || "titiktemu_admin_secret_2026";
  return key === expectedKey;
}

/**
 * Fetch top-level platform KPI metrics.
 */
export async function getAdminMetrics(): Promise<AdminMetrics> {
  const supabase: any = createAdminClient();

  // Fetch orders
  const { data: orders } = await supabase
    .from("orders")
    .select("amount, status");

  const orderList = orders || [];
  const totalOrders = orderList.length;
  const paidOrders = orderList.filter((o: any) => o.status === "paid").length;
  const pendingOrders = orderList.filter((o: any) => o.status === "pending").length;
  const totalRevenue = orderList
    .filter((o: any) => o.status === "paid")
    .reduce((sum: number, o: any) => sum + Number(o.amount || 0), 0);

  // Fetch invitations
  const { data: invitations } = await supabase
    .from("invitations")
    .select("status");

  const invList = invitations || [];
  const totalInvitations = invList.length;
  const publishedInvitations = invList.filter((i: any) => i.status === "published" || i.status === "paid").length;

  // Fetch guests & RSVPs
  const { data: guests } = await supabase
    .from("guests")
    .select("id");
  const totalGuests = guests?.length || 0;

  const { data: rsvps } = await supabase
    .from("rsvp")
    .select("pax_count, status")
    .eq("status", "attending");

  const attendingPax = (rsvps || []).reduce(
    (sum: number, r: any) => sum + Number(r.pax_count || 1),
    0
  );

  return {
    totalRevenue,
    totalOrders,
    paidOrders,
    pendingOrders,
    totalInvitations,
    publishedInvitations,
    totalGuests,
    attendingPax,
  };
}

/**
 * List all invitations in the platform.
 */
export async function listAllInvitations(): Promise<AdminInvitationItem[]> {
  const supabase: any = createAdminClient();

  const { data, error } = await supabase
    .from("invitations")
    .select(`
      id,
      slug,
      title,
      bride_name,
      groom_name,
      status,
      created_at,
      published_at,
      customer_access_token,
      templates ( name, slug ),
      orders ( order_number, status )
    `)
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((inv: any) => {
    const latestOrder = Array.isArray(inv.orders) && inv.orders.length > 0 ? inv.orders[0] : null;
    return {
      id: inv.id,
      slug: inv.slug,
      title: inv.title || `Pernikahan ${inv.bride_name} & ${inv.groom_name}`,
      brideName: inv.bride_name || "-",
      groomName: inv.groom_name || "-",
      status: inv.status,
      createdAt: inv.created_at,
      publishedAt: inv.published_at,
      customerAccessToken: inv.customer_access_token,
      templateName: inv.templates?.name || "Standard",
      templateSlug: inv.templates?.slug || "elegant",
      orderNumber: latestOrder?.order_number,
      orderStatus: latestOrder?.status,
    };
  });
}

/**
 * Toggle invitation publishing status (publish or unpublish).
 */
export async function toggleInvitationPublish(
  invitationId: string,
  publish: boolean
): Promise<{ success: boolean; status: string }> {
  const supabase: any = createAdminClient();

  const targetStatus = publish ? "published" : "pending_payment";
  const publishedAt = publish ? new Date().toISOString() : null;

  const { data, error } = await supabase
    .from("invitations")
    .update({
      status: targetStatus,
      published_at: publishedAt,
    })
    .eq("id", invitationId)
    .select("status")
    .single();

  if (error || !data) {
    throw new Error(error?.message || "Failed to update publication status");
  }

  return {
    success: true,
    status: data.status,
  };
}

/**
 * List all transactions/orders.
 */
export async function listAllOrders(): Promise<AdminOrderItem[]> {
  const supabase: any = createAdminClient();

  const { data, error } = await supabase
    .from("orders")
    .select(`
      id,
      order_number,
      amount,
      status,
      payment_type,
      created_at,
      plans ( name, code ),
      invitations ( slug, title )
    `)
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((o: any) => ({
    id: o.id,
    orderNumber: o.order_number,
    amount: Number(o.amount),
    status: o.status,
    paymentType: o.payment_type,
    createdAt: o.created_at,
    planName: o.plans?.name || "Paket",
    planCode: o.plans?.code || "basic",
    invitationSlug: o.invitations?.slug,
    invitationTitle: o.invitations?.title,
  }));
}

/**
 * List all templates.
 */
export async function listAllTemplates(): Promise<AdminTemplateItem[]> {
  const supabase: any = createAdminClient();

  const { data, error } = await supabase
    .from("templates")
    .select("id, slug, name, description, is_active, preview_image_url")
    .order("name", { ascending: true });

  if (error || !data) return [];

  return data.map((t: any) => ({
    id: t.id,
    slug: t.slug,
    name: t.name,
    description: t.description,
    isActive: t.is_active,
    previewImageUrl: t.preview_image_url,
  }));
}

/**
 * List all pricing plans.
 */
export async function listAllPlans(): Promise<AdminPlanItem[]> {
  const supabase: any = createAdminClient();

  const { data, error } = await supabase
    .from("plans")
    .select("id, code, name, price, features, is_active")
    .order("price", { ascending: true });

  if (error || !data) return [];

  return data.map((p: any) => ({
    id: p.id,
    code: p.code,
    name: p.name,
    price: Number(p.price),
    features: Array.isArray(p.features) ? p.features : [],
    isActive: p.is_active,
  }));
}

/**
 * List recent wishes from guests.
 */
export async function listRecentWishes(limit = 20): Promise<AdminWishItem[]> {
  const supabase: any = createAdminClient();

  const { data, error } = await supabase
    .from("wishes")
    .select(`
      id,
      name,
      message,
      created_at,
      invitations ( slug, title )
    `)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !data) return [];

  return data.map((w: any) => ({
    id: w.id,
    name: w.name,
    message: w.message,
    createdAt: w.created_at,
    invitationSlug: w.invitations?.slug,
    invitationTitle: w.invitations?.title,
  }));
}

/**
 * Delete a wish (content moderation).
 */
export async function deleteWish(wishId: string): Promise<boolean> {
  const supabase: any = createAdminClient();
  const { error } = await supabase.from("wishes").delete().eq("id", wishId);
  return !error;
}
