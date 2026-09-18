import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getInvitationByCustomerToken,
  listGuestsWithRSVP,
} from "@/lib/services/guest-service";
import { GuestManagerClient } from "./guest-manager-client";

export const revalidate = 0; // Always fresh for dashboard management

interface ManagePageProps {
  params: Promise<{ token: string }>;
}

export async function generateMetadata({ params }: ManagePageProps): Promise<Metadata> {
  const { token } = await params;
  const invitation = await getInvitationByCustomerToken(token);

  if (!invitation) {
    return {
      title: "Portal Tidak Ditemukan · Titik Temu Invitation",
    };
  }

  return {
    title: `Kelola Tamu Undangan · ${invitation.brideName} & ${invitation.groomName}`,
    description: "Portal personalisasi tamu dan pembagian undangan via WhatsApp.",
  };
}

export default async function ManageGuestsPage({ params }: ManagePageProps) {
  const { token } = await params;
  const invitation = await getInvitationByCustomerToken(token);

  if (!invitation) {
    notFound();
  }

  const guests = await listGuestsWithRSVP(invitation.id);

  return (
    <GuestManagerClient
      token={token}
      initialInvitation={invitation}
      initialGuests={guests}
    />
  );
}
