import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getInvitationBySlug } from "@/lib/services/invitation-service";
import { InvitationRenderer } from "@/components/invitation/invitation-renderer";

export const revalidate = 60; // ISR 60s

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const invitation = await getInvitationBySlug(slug);

  if (!invitation) {
    return {
      title: "Undangan Tidak Ditemukan | Titik Temu Invitation",
      robots: { index: false, follow: false },
    };
  }

  const groomName = invitation.couple.groomName || "Mempelai Pria";
  const brideName = invitation.couple.brideName || "Mempelai Wanita";
  const title = `Undangan Pernikahan ${groomName} & ${brideName}`;
  const description = `Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Anda untuk hadir dalam acara pernikahan ${invitation.couple.groomFullName} & ${invitation.couple.brideFullName}.`;

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://titiktemuinvitation.vercel.app";
  const canonicalUrl = `${baseUrl}/i/${slug}`;
  const coverImage = invitation.media.coverImageUrl || "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200";

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

export default async function PublicInvitationPage({ params }: PageProps) {
  const { slug } = await params;
  const invitation = await getInvitationBySlug(slug);

  if (!invitation) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black">
      <InvitationRenderer
        data={invitation}
        templateSlug={invitation.templateSlug}
      />
    </main>
  );
}
