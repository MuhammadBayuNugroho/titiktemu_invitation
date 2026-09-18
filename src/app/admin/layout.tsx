import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Console · Titik Temu Invitation",
  description: "Platform management and operational control center.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
