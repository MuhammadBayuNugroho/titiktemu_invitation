import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Titik Temu Invitation — Undangan Digital Pernikahan Elegan",
  description: "Buat undangan digital pernikahan yang elegan, personal, dan mudah dibagikan dalam beberapa langkah. Template eksklusif, animasi indah, dan RSVP realtime.",
  keywords: ["undangan digital", "wedding invitation", "titik temu invitation", "undangan online", "undangan pernikahan", "digital invitation indonesia"],
  themeColor: "#F8F7F4",
  openGraph: {
    title: "Titik Temu Invitation — Undangan Digital Pernikahan Elegan",
    description: "Platform undangan digital pernikahan yang elegan dan modern.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Serif+Display:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
