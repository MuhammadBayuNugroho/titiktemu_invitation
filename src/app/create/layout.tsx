import type { Metadata } from "next";
import { WizardProvider } from "./_context/wizard-context";
import { WizardProgress } from "./_components/wizard-progress";
import Link from "next/link";
import "../wizard.css";

export const metadata: Metadata = {
  title: "Buat Undangan — Titik Temu Invitation",
  description: "Buat undangan digital pernikahan Anda dalam beberapa langkah mudah.",
};

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WizardProvider>
      <div className="wizard-layout">
        {/* ── Header ── */}
        <header className="wizard-header">
          <div className="wizard-header__inner">
            <Link href="/" className="wizard-header__brand">
              <span className="wizard-header__brand-dot" />
              Titik Temu
            </Link>
            <p className="wizard-header__tagline">Pembuat Undangan</p>
          </div>
        </header>

        {/* ── Progress Bar ── */}
        <div className="wizard-progress-bar">
          <WizardProgress />
        </div>

        {/* ── Content Area ── */}
        <main className="wizard-main">{children}</main>

        {/* ── Footer ── */}
        <footer className="wizard-footer">
          <p>© 2025 Titik Temu Invitation · Data tersimpan otomatis</p>
        </footer>
      </div>
    </WizardProvider>
  );
}
