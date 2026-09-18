import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  verifyAdminKey,
  getAdminMetrics,
  listAllInvitations,
  listAllOrders,
  listAllTemplates,
  listAllPlans,
  listRecentWishes,
} from "@/lib/services/admin-service";
import { AdminDashboardClient } from "./admin-dashboard-client";

export const revalidate = 0; // Dynamic server component for administrative dashboard

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("admin_session")?.value;

  if (!verifyAdminKey(sessionToken)) {
    redirect("/admin/login");
  }

  // Fetch all administrative reporting data in parallel
  const [metrics, invitations, orders, templates, plans, wishes] =
    await Promise.all([
      getAdminMetrics(),
      listAllInvitations(),
      listAllOrders(),
      listAllTemplates(),
      listAllPlans(),
      listRecentWishes(),
    ]);

  return (
    <AdminDashboardClient
      initialMetrics={metrics}
      initialInvitations={invitations}
      initialOrders={orders}
      initialTemplates={templates}
      initialPlans={plans}
      initialWishes={wishes}
    />
  );
}
