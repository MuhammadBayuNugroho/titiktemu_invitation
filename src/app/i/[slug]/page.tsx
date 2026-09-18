import { Metadata } from "next";
import { getInvitationBySlug } from "@/lib/services/invitation-service";
import { InvitationRenderer } from "@/components/invitation/invitation-renderer";
import type { InvitationData } from "@/types/invitation";

export const revalidate = 60; // ISR 60s

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const invitation = await getInvitationBySlug(slug);

  if (!invitation) {
    return {
      title: "Undangan Pernikahan | Titik Temu Invitation",
      description: "Undangan digital pernikahan eksklusif dan elegan.",
    };
  }

  const title = `Undangan Pernikahan ${invitation.couple.groomName} & ${invitation.couple.brideName}`;
  const description = `Dengan memohon rahmat Allah SWT, kami mengundang Anda pada pernikahan ${invitation.couple.groomFullName} & ${invitation.couple.brideFullName}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: invitation.media.coverImageUrl ? [{ url: invitation.media.coverImageUrl }] : [],
    },
  };
}

export default async function PublicInvitationPage({ params }: PageProps) {
  const { slug } = await params;
  const invitationFromDb = await getInvitationBySlug(slug);

  const fallbackData: InvitationData = {
    id: "demo-invitation-id",
    slug: slug,
    templateSlug: "elegant",
    title: "Pernikahan Rizky & Nabila",
    openingText: "Assalamu'alaikum Warahmatullahi Wabarakatuh. Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i pada acara pernikahan kami.",
    status: "published",
    couple: {
      groomFullName: "Ahmad Rizky Pratama",
      groomName: "Rizky",
      groomParentNames: "Bapak Hendra Pratama & Ibu Sri Wahyuni",
      groomSocial: "@rizkypratama",
      brideFullName: "Nabila Putri Ananda",
      brideName: "Nabila",
      brideParentNames: "Bapak Agus Ananda & Ibu Dewi Sartika",
      brideSocial: "@nabilaputri",
    },
    event: {
      eventDate: "2026-10-24T08:00:00.000Z",
      timezone: "WIB",
      akad: {
        date: "2026-10-24",
        startTime: "08:00",
        endTime: "10:00",
      },
      reception: {
        date: "2026-10-24",
        startTime: "11:00",
        endTime: "15:00",
      },
      venueName: "Grand Ballroom Hotel Indonesia",
      venueAddress: "Jl. M.H. Thamrin No. 1, Jakarta Pusat",
      mapsUrl: "https://maps.google.com",
    },
    stories: [
      {
        id: "1",
        year: "2021",
        title: "Pertemuan Pertama",
        story: "Kami pertama kali bertemu saat acara universitas di Jakarta.",
        sortOrder: 1,
      },
      {
        id: "2",
        year: "2024",
        title: "Lamaran",
        story: "Dengan restu kedua orang tua, kami sepakat untuk melangkah ke jenjang yang lebih serius.",
        sortOrder: 2,
      },
    ],
    gifts: [
      {
        id: "1",
        giftType: "bank",
        providerName: "BCA",
        accountNumber: "1234567890",
        accountName: "Ahmad Rizky Pratama",
      },
      {
        id: "2",
        giftType: "bank",
        providerName: "Mandiri",
        accountNumber: "0987654321",
        accountName: "Nabila Putri Ananda",
      },
    ],
    media: {
      coverImageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200",
      musicUrl: "",
      gallery: [
        { id: "1", url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800", sortOrder: 1 },
        { id: "2", url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800", sortOrder: 2 },
      ],
    },
  };

  const invitationData: InvitationData = invitationFromDb || fallbackData;

  return (
    <main className="min-h-screen bg-black">
      <InvitationRenderer data={invitationData} templateSlug={invitationData.templateSlug} />
    </main>
  );
}
