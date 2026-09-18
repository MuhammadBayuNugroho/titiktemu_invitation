"use client";

import { useWizard, WIZARD_STEPS } from "../_context/wizard-context";
import { InvitationRenderer } from "@/components/invitation/invitation-renderer";
import { getTemplateConfig } from "@/lib/templates/registry";
import type { InvitationData } from "@/types/invitation";
import {
  CheckCircle2Icon,
  EditIcon,
  EyeIcon,
  Loader2Icon,
  ShoppingCartIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function buildInvitationData(
  state: ReturnType<typeof useWizard>["state"]
): InvitationData {
  return {
    slug: "preview",
    templateSlug: state.templateSlug || "elegant",
    title:
      state.title ||
      `Pernikahan ${state.couple.brideName} & ${state.couple.groomName}`,
    openingText: state.openingText,
    couple: state.couple,
    event: state.event,
    media: state.media,
    stories: state.stories,
    gifts: state.gifts,
    status: "draft",
  };
}

export default function ReviewPage() {
  const { state, updateState } = useWizard();
  const router = useRouter();
  const [mode, setMode] = useState<"summary" | "preview">("summary");
  const [saving, setSaving] = useState(false);

  const template = getTemplateConfig(state.templateSlug || "elegant");
  const invitationData = buildInvitationData(state);

  const goToStep = (slug: string) => {
    const step = WIZARD_STEPS.find((s) => s.slug === slug);
    if (step) {
      updateState({ currentStep: step.id });
      router.push(`/create/steps/${slug}`);
    }
  };

  const handleCheckout = async () => {
    setSaving(true);
    try {
      router.push("/create/checkout");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="review-page">
      {/* ── Mode Toggle ── */}
      <div className="review-toggle">
        <button
          onClick={() => setMode("summary")}
          className={[
            "review-toggle__btn",
            mode === "summary" ? "review-toggle__btn--active" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <CheckCircle2Icon size={14} />
          Ringkasan
        </button>
        <button
          onClick={() => setMode("preview")}
          className={[
            "review-toggle__btn",
            mode === "preview" ? "review-toggle__btn--active" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <EyeIcon size={14} />
          Pratinjau Undangan
        </button>
      </div>

      {mode === "summary" ? (
        <div className="review-summary">
          <div className="step-header">
            <h1 className="step-header__title">Periksa Kembali</h1>
            <p className="step-header__desc">
              Tinjau semua data sebelum melanjutkan ke pembayaran.
            </p>
          </div>

          {/* Template */}
          <ReviewSection title="Template" onEdit={() => goToStep("template")}>
            <p className="review-value">{template.name}</p>
            <p className="review-value--sub">{template.description}</p>
          </ReviewSection>

          {/* Couple */}
          <ReviewSection
            title="Data Mempelai"
            onEdit={() => goToStep("couple")}
          >
            <div className="review-row">
              <ReviewItem
                label="Wanita"
                value={state.couple.brideFullName || "—"}
              />
              <ReviewItem
                label="Pria"
                value={state.couple.groomFullName || "—"}
              />
            </div>
          </ReviewSection>

          {/* Event */}
          <ReviewSection
            title="Detail Acara"
            onEdit={() => goToStep("event")}
          >
            <div className="review-row">
              <ReviewItem
                label="Tanggal"
                value={state.event.eventDate || "—"}
              />
              <ReviewItem
                label="Tempat"
                value={state.event.venueName || "—"}
              />
            </div>
            <ReviewItem
              label="Akad"
              value={
                state.event.akad.startTime
                  ? `${state.event.akad.startTime} – ${state.event.akad.endTime}`
                  : "—"
              }
            />
            <ReviewItem
              label="Resepsi"
              value={
                state.event.reception.startTime
                  ? `${state.event.reception.startTime} – ${state.event.reception.endTime}`
                  : "—"
              }
            />
          </ReviewSection>

          {/* Media */}
          <ReviewSection title="Media" onEdit={() => goToStep("media")}>
            <ReviewItem
              label="Foto Sampul"
              value={state.media.coverImageUrl ? "✓ Ditambahkan" : "Tidak ada"}
            />
            <ReviewItem
              label="Musik"
              value={state.media.musicUrl ? "✓ Ditambahkan" : "Tidak ada"}
            />
            <ReviewItem
              label="Galeri"
              value={`${state.media.gallery.length} foto`}
            />
          </ReviewSection>

          {/* Story */}
          <ReviewSection
            title="Kisah Cinta"
            onEdit={() => goToStep("story")}
          >
            <ReviewItem
              label="Jumlah Momen"
              value={`${state.stories.length} momen`}
            />
          </ReviewSection>

          {/* Gift */}
          <ReviewSection
            title="Wedding Gift"
            onEdit={() => goToStep("gift")}
          >
            <ReviewItem
              label="Rekening"
              value={
                state.gifts.length > 0
                  ? state.gifts
                      .map((g) => `${g.providerName} (${g.accountName})`)
                      .join(", ")
                  : "Tidak ada"
              }
            />
          </ReviewSection>

          {/* CTA */}
          <div className="review-cta">
            <p className="review-cta__note">
              Setelah pembayaran dikonfirmasi, undangan Anda akan dipublikasikan
              dengan link unik yang bisa langsung dibagikan.
            </p>
            <button
              type="button"
              onClick={handleCheckout}
              disabled={saving}
              className="review-cta__btn"
            >
              {saving ? (
                <Loader2Icon size={16} className="animate-spin" />
              ) : (
                <ShoppingCartIcon size={16} />
              )}
              {saving ? "Menyimpan…" : "Lanjutkan ke Pembayaran"}
            </button>
          </div>
        </div>
      ) : (
        <div className="review-preview">
          <div className="review-preview__device">
            <InvitationRenderer
              data={invitationData}
              templateSlug={state.templateSlug || "elegant"}
              isPreview
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ReviewSection({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="review-section">
      <div className="review-section__header">
        <h2 className="review-section__title">{title}</h2>
        <button
          type="button"
          onClick={onEdit}
          className="review-section__edit"
        >
          <EditIcon size={12} />
          Ubah
        </button>
      </div>
      <div className="review-section__body">{children}</div>
    </div>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="review-item">
      <span className="review-item__label">{label}</span>
      <span className="review-item__value">{value}</span>
    </div>
  );
}
