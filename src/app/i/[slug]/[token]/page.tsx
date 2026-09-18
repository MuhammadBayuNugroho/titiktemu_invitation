import { Metadata } from "next";
import { getInvitationBySlug } from "@/lib/services/invitation-service";
import { getGuestByToken } from "@/lib/services/guest-service";
import { InvitationRenderer } from "@/components/invitation/invitation-renderer";
import type { InvitationData } from "@/types/invitation";

export const revalidate = 60;

interface PersonalPageProps {
  params: Promise<{ slug: string; token: string }>;
}

export async function generateMetadata({ params }: PersonalPageProps): Promise<Metadata> {
  const { slug, token } = await params;
  const invitation = await getInvitationBySlug(slug);
  const guest = await getGuestByToken(token);

  const guestName = guest?.name ? ` untuk ${guest.name}` : "";
  const groomName = invitation?.couple.groomName || "Mempelai Pria";
  const brideName = invitation?.couple.brideName || "Mempelai Wanita";

  return {
    title: `Undangan Pernikahan ${groomName} & ${brideName}${guestName}`,
    description: `Khusus ditujukan kepada ${guest?.name || "Bapak/Ibu/Saudara/i"}.`,
  };
}

export default async function PersonalizedInvitationPage({ params }: PersonalPageProps) {
  const { slug, token } = await params;
  const invitationFromDb = await getInvitationBySlug(slug);
  const guest = await getGuestByToken(token);
  const guestName = guest?.name || undefined;

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
    stories: [],
    gifts: [],
    media: {
      coverImageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200",
      musicUrl: "",
      gallery: [],
    },
  };

  const invitationData: InvitationData = invitationFromDb || fallbackData;

  return (
    <main className="min-h-screen bg-black">
      <InvitationRenderer
        data={invitationData}
        templateSlug={invitationData.templateSlug}
        guestName={guestName}
      />
    </main>
  );
}
