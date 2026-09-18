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
      robots: { index: false, follow: false },
    };
  }

  const guest = await getGuestByToken(token, invitation.id);
  const groomName = invitation.couple.groomName || "Mempelai Pria";
  const brideName = invitation.couple.brideName || "Mempelai Wanita";
  const guestSalutation = guest?.name ? ` — Khusus untuk ${guest.name}` : "";
  const title = `Undangan Pernikahan ${groomName} & ${brideName}${guestSalutation}`;
  const description = guest?.name
    ? `Kepada Yth. Bapak/Ibu/Saudara/i ${guest.name}, tanpa mengurangi rasa hormat, kami mengundang Anda untuk hadir dalam acara pernikahan kami.`
    : `Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara pernikahan kami.`;

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://titiktemuinvitation.vercel.app";
  const canonicalUrl = `${baseUrl}/i/${slug}/${token}`;
  const coverImage =
    invitation.media.coverImageUrl ||
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Titik Temu Invitation",
      images: [
        {
          url: coverImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [coverImage],
    },
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
