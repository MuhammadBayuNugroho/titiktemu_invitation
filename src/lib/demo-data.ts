import type { InvitationData } from "@/types/invitation";

export const DEMO_INVITATION: InvitationData = {
  id: "demo-shava-dedek",
  slug: "shava-dedek",
  templateSlug: "elegant",
  title: "Pernikahan Shava & Dedek",
  openingText: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. (QS. Ar-Rum: 21)",
  couple: {
    brideName: "Shava",
    brideFullName: "Shavira Putri Ananda, S.I.Kom",
    brideParentNames: "Putri pertama dari Bpk. Bambang Irawan & Ibu Siti Aminah",
    brideSocial: "@shaviraputri",
    groomName: "Dedek",
    groomFullName: "Dedek Kurniawan, S.T",
    groomParentNames: "Putra kedua dari Bpk. H. Ahmad Sudrajat & Ibu Hj. Ratna Juwita",
    groomSocial: "@dedekkurniawan",
  },
  event: {
    eventDate: "2026-10-24",
    timezone: "Asia/Jakarta",
    akad: {
      date: "2026-10-24",
      startTime: "08:00",
      endTime: "10:00",
    },
    reception: {
      date: "2026-10-24",
      startTime: "11:00",
      endTime: "14:00",
    },
    venueName: "Grand Ballroom Sasana Kriya",
    venueAddress: "Taman Mini Indonesia Indah (TMII), Jl. Raya Taman Mini, Ceger, Cipayung, Kota Jakarta Timur, DKI Jakarta",
    latitude: -6.302445,
    longitude: 106.895155,
    mapsUrl: "https://maps.google.com/?q=Sasana+Kriya+TMII",
  },
  media: {
    coverImageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
    musicUrl: "https://assets.mixkit.co/music/preview/mixkit-romantic-moment-50.mp3",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop",
        sortOrder: 1,
      },
      {
        url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
        sortOrder: 2,
      },
      {
        url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop",
        sortOrder: 3,
      },
      {
        url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800&auto=format&fit=crop",
        sortOrder: 4,
      },
      {
        url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop",
        sortOrder: 5,
      },
      {
        url: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800&auto=format&fit=crop",
        sortOrder: 6,
      },
    ],
  },
  stories: [
    {
      year: "2021",
      title: "Pertemuan Pertama",
      story: "Takdir mempertemukan kami di sebuah seminar fotografi kreatif di Bandung. Sebuah percakapan sederhana tentang seni visual membuka jalan persahabatan yang bermakna.",
      sortOrder: 1,
    },
    {
      year: "2023",
      title: "Menjalin Komitmen",
      story: "Setelah dua tahun saling mengenal kepribadian, nilai-nilai hidup, dan visi masa depan, kami sepakat untuk melangkah ke jenjang yang lebih serius dengan restu kedua keluarga.",
      sortOrder: 2,
    },
    {
      year: "2026",
      title: "Menuju Babak Baru",
      story: "Dengan memohon ridho Allah SWT dan restu dari orang tua tercinta, kami memutuskan untuk mengikat janji suci pernikahan dan menyatukan dua keluarga dalam satu ikatan cinta abadi.",
      sortOrder: 3,
    },
  ],
  gifts: [
    {
      giftType: "bank",
      providerName: "Bank Central Asia (BCA)",
      accountNumber: "8691823910",
      accountName: "Shavira Putri Ananda",
    },
    {
      giftType: "bank",
      providerName: "Bank Mandiri",
      accountNumber: "1370019283741",
      accountName: "Dedek Kurniawan",
    },
    {
      giftType: "ewallet",
      providerName: "GoPay / QRIS",
      accountNumber: "081298765432",
      accountName: "Dedek Kurniawan",
    },
  ],
  status: "published",
};
