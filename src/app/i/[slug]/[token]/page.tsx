import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getInvitationBySlug } from "@/lib/services/invitation-service";
import { getGuestByToken } from "@/lib/services/guest-service";
import { InvitationRenderer } from "@/components/invitation/invitation-renderer";

export const revalidate = 60;

interface PersonalPageProps {
  params: Promise<{ slug: string; token: string }>;
}

export async function generateMetadata({ params }: PersonalPageProps): Promise<Metadata> {
  const { slug, token } = await params;
  const invitation = await getInvitationBySlug(slug);
  if (!invitation) {
    return {
      title: "Undangan Tidak Ditemukan",
    };
  }

  const guest = await getGuestByToken(token, invitation.id);
  const guestName = guest?.name ? ` untuk ${guest.name}` : "";
  const groomName = invitation.couple.groomName || "Mempelai Pria";
  const brideName = invitation.couple.brideName || "Mempelai Wanita";

  return {
    title: `Undangan Pernikahan ${groomName} & ${brideName}${guestName}`,
    description: `Khusus ditujukan kepada ${guest?.name || "Bapak/Ibu/Saudara/i"}.`,
  };
}

export default async function PersonalizedInvitationPage({ params }: PersonalPageProps) {
  const { slug, token } = await params;
  const invitation = await getInvitationBySlug(slug);

  if (!invitation) {
    notFound();
  }

  const guest = await getGuestByToken(token, invitation.id);
  const guestName = guest?.name || undefined;

  return (
    <main className="min-h-screen bg-black">
      <InvitationRenderer
        data={invitation}
        templateSlug={invitation.templateSlug}
        guestName={guestName}
      />
    </main>
  );
}
