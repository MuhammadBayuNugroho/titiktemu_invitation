import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Titik Temu Invitation — Platform Undangan Digital Elegan",
  description: "Buat undangan digital pernikahan yang elegan, personal, dan mudah dibagikan dalam beberapa langkah.",
  keywords: ["undangan digital", "wedding invitation", "titik temu invitation", "undangan online", "undangan pernikahan"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
