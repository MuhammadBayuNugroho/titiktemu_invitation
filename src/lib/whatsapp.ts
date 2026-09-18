/**
 * WhatsApp Share Message Generator & Campaign Utilities
 *
 * Implements Section 35 & 36 of Titik Temu Invitation specifications.
 * Generates formatted invitation messages, direct click-to-chat WhatsApp URLs,
 * and bulk CSV exports with pre-formatted message text.
 */

export interface ShareParams {
  guestName?: string;
  phone?: string | null;
  groomNickname?: string;
  brideNickname?: string;
  eventDate?: string;
  invitationUrl: string;
  customTemplate?: string;
}

export interface GuestExportItem {
  name: string;
  phone?: string | null;
  category?: string;
  token: string;
  rsvp?: {
    status: string;
    paxCount: number;
    notes?: string;
  } | null;
}

/**
 * Generates official personalized WhatsApp message per Section 36:
 *
 * Assalamu'alaikum.
 *
 * Dengan penuh kebahagiaan, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara pernikahan kami.
 *
 * Kepada:
 * [NAMA TAMU]
 *
 * Berikut undangan digital kami:
 * [LINK]
 *
 * Merupakan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.
 */
export function generateWhatsAppMessage({
  guestName,
  invitationUrl,
  customTemplate,
}: ShareParams): string {
  const recipient = guestName ? guestName.trim() : "Bapak/Ibu/Saudara/i";

  if (customTemplate && customTemplate.trim().length > 0) {
    return customTemplate
      .replace(/\{nama\}|\[NAMA TAMU\]|\[nama\]/gi, recipient)
      .replace(/\{link\}|\[LINK\]|\[link\]/gi, invitationUrl);
  }

  return `Assalamu'alaikum Warahmatullahi Wabarakatuh.

Dengan penuh kebahagiaan, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara pernikahan kami.

Kepada:
*${recipient}*

Berikut tautan undangan digital kami:
${invitationUrl}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.

Terima kasih.`;
}

/**
 * Generate click-to-chat WhatsApp URL, supporting direct phone number if provided.
 */
export function generateWhatsAppUrl(params: ShareParams): string {
  const message = generateWhatsAppMessage(params);
  const encoded = encodeURIComponent(message);

  if (params.phone) {
    const cleanPhone = params.phone.replace(/[^0-9]/g, "").replace(/^0/, "62");
    if (cleanPhone.length >= 8) {
      return `https://wa.me/${cleanPhone}?text=${encoded}`;
    }
  }

  return `https://wa.me/?text=${encoded}`;
}

/**
 * Generate formatted CSV content for export with UTF-8 BOM so Excel opens cleanly.
 */
export function generateGuestListCSV(
  guests: GuestExportItem[],
  baseUrl: string,
  slug: string,
  customTemplate?: string
): string {
  const headers = [
    "Nama Tamu",
    "Kategori",
    "Nomor WhatsApp",
    "Status RSVP",
    "Jumlah Pax",
    "Link Undangan",
    "Pesan WhatsApp Siap Kirim",
  ];

  const escapeCSV = (str: string | number | undefined | null) => {
    if (str === undefined || str === null) return '""';
    const clean = String(str).replace(/"/g, '""');
    return `"${clean}"`;
  };

  const rows = guests.map((g) => {
    const guestUrl = `${baseUrl}/i/${slug}/${g.token}`;
    const msg = generateWhatsAppMessage({
      guestName: g.name,
      phone: g.phone,
      invitationUrl: guestUrl,
      customTemplate,
    });

    const rsvpStatus = g.rsvp
      ? g.rsvp.status === "attending"
        ? "Hadir"
        : g.rsvp.status === "declined"
        ? "Berhalangan"
        : "Ragu"
      : "Belum Konfirmasi";

    const pax = g.rsvp?.status === "attending" ? g.rsvp.paxCount : 0;

    return [
      escapeCSV(g.name),
      escapeCSV(g.category || "friend"),
      escapeCSV(g.phone || "-"),
      escapeCSV(rsvpStatus),
      escapeCSV(pax),
      escapeCSV(guestUrl),
      escapeCSV(msg),
    ].join(",");
  });

  // \uFEFF is UTF-8 Byte Order Mark for Excel
  return "\uFEFF" + [headers.join(","), ...rows].join("\r\n");
}
