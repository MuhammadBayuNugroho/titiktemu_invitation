/**
 * WhatsApp Share Message Generator
 *
 * Implements Section 35 & 36 of Titik Temu Invitation specifications.
 * Generates formatted invitation messages and WhatsApp web/app URLs.
 */

export interface ShareParams {
  guestName?: string;
  phone?: string;
  groomNickname?: string;
  brideNickname?: string;
  eventDate?: string;
  invitationUrl: string;
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
}: ShareParams): string {
  const recipient = guestName ? guestName.trim() : "Bapak/Ibu/Saudara/i";

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
