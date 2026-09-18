/**
 * WhatsApp Share Message Generator
 *
 * Generates formatted invitation messages and WhatsApp web/app URLs.
 */

export interface ShareParams {
  guestName?: string;
  groomNickname: string;
  brideNickname: string;
  eventDate: string;
  invitationUrl: string;
}

export function generateWhatsAppMessage({
  guestName,
  groomNickname,
  brideNickname,
  eventDate,
  invitationUrl,
}: ShareParams): string {
  const salutation = guestName
    ? `Kepada Yth. Bapak/Ibu/Saudara/i *${guestName}*,`
    : `Kepada Yth. Bapak/Ibu/Saudara/i,`;

  return `${salutation}

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Anda untuk menghadiri acara pernikahan kami:

*${groomNickname} & ${brideNickname}*

📅 Tanggal: ${eventDate}
🔗 Undangan Digital: ${invitationUrl}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.

Terima kasih.
_Wassalamu'alaikum Warahmatullahi Wabarakatuh_`;
}

export function generateWhatsAppUrl(params: ShareParams): string {
  const message = generateWhatsAppMessage(params);
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
