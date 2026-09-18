"use client";

import { useEffect, useState } from "react";
import { useWizard } from "../../_context/wizard-context";
import { StepNav } from "../../_components/step-nav";
import { FormField } from "../../_components/form-field";
import { CoupleSchema } from "@/lib/validations/invitation";
import type { CoupleData } from "@/types/invitation";
import { UserIcon, HeartIcon } from "lucide-react";

type CoupleErrors = Partial<Record<keyof CoupleData, string>>;

export default function CoupleStep() {
  const { state, updateState } = useWizard();
  const [errors, setErrors] = useState<CoupleErrors>({});
  const couple = state.couple;

  useEffect(() => {
    updateState({ currentStep: 2 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = (key: keyof CoupleData, value: string) => {
    updateState({ couple: { ...couple, [key]: value } });
    // clear error on change
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = async (): Promise<boolean> => {
    const result = CoupleSchema.safeParse(couple);
    if (result.success) {
      setErrors({});
      return true;
    }
    const fieldErrors: CoupleErrors = {};
    result.error.errors.forEach((e) => {
      const key = e.path[0] as keyof CoupleData;
      if (!fieldErrors[key]) fieldErrors[key] = e.message;
    });
    setErrors(fieldErrors);
    // Scroll to first error
    const firstEl = document.querySelector("[aria-invalid='true']") as HTMLElement;
    firstEl?.scrollIntoView({ behavior: "smooth", block: "center" });
    return false;
  };

  return (
    <div className="step-container">
      <div className="step-header">
        <h1 className="step-header__title">Data Mempelai</h1>
        <p className="step-header__desc">
          Lengkapi data kedua mempelai. Nama panggilan yang tertera di undangan.
        </p>
      </div>

      {/* Title */}
      <div className="step-section">
        <FormField
          label="Judul Undangan"
          htmlFor="title"
          required
          hint='Contoh: "Pernikahan Shava & Dedek" — akan tampil di tab browser.'
          error={undefined}
        >
          <input
            id="title"
            type="text"
            value={state.title}
            onChange={(e) => updateState({ title: e.target.value })}
            placeholder="Pernikahan Nama & Nama"
            className="form-input"
            maxLength={200}
          />
        </FormField>
      </div>

      {/* Bride */}
      <div className="step-section">
        <div className="step-section__heading">
          <HeartIcon size={16} className="step-section__icon step-section__icon--bride" />
          <h2 className="step-section__title">Mempelai Wanita</h2>
        </div>

        <div className="form-grid">
          <FormField label="Nama Panggilan" htmlFor="brideName" required error={errors.brideName}>
            <input
              id="brideName"
              type="text"
              value={couple.brideName}
              onChange={(e) => set("brideName", e.target.value)}
              placeholder="Shava"
              className="form-input"
              aria-invalid={!!errors.brideName}
              maxLength={100}
            />
          </FormField>

          <FormField label="Nama Lengkap" htmlFor="brideFullName" required error={errors.brideFullName}>
            <input
              id="brideFullName"
              type="text"
              value={couple.brideFullName}
              onChange={(e) => set("brideFullName", e.target.value)}
              placeholder="Shava Amaliya Putri"
              className="form-input"
              aria-invalid={!!errors.brideFullName}
              maxLength={200}
            />
          </FormField>

          <FormField
            label="Nama Orang Tua"
            htmlFor="brideParentNames"
            required
            hint="Putra/Putri dari Bapak X dan Ibu Y"
            error={errors.brideParentNames}
          >
            <input
              id="brideParentNames"
              type="text"
              value={couple.brideParentNames}
              onChange={(e) => set("brideParentNames", e.target.value)}
              placeholder="Bapak Ahmad Sari & Ibu Dewi Sari"
              className="form-input"
              aria-invalid={!!errors.brideParentNames}
            />
          </FormField>

          <FormField label="Akun Instagram (opsional)" htmlFor="brideSocial" error={errors.brideSocial}>
            <div className="form-input-prefix">
              <span className="form-input-prefix__icon">@</span>
              <input
                id="brideSocial"
                type="text"
                value={couple.brideSocial ?? ""}
                onChange={(e) => set("brideSocial", e.target.value)}
                placeholder="shavaamaliya"
                className="form-input form-input--has-prefix"
                maxLength={100}
              />
            </div>
          </FormField>
        </div>
      </div>

      {/* Groom */}
      <div className="step-section">
        <div className="step-section__heading">
          <UserIcon size={16} className="step-section__icon step-section__icon--groom" />
          <h2 className="step-section__title">Mempelai Pria</h2>
        </div>

        <div className="form-grid">
          <FormField label="Nama Panggilan" htmlFor="groomName" required error={errors.groomName}>
            <input
              id="groomName"
              type="text"
              value={couple.groomName}
              onChange={(e) => set("groomName", e.target.value)}
              placeholder="Dedek"
              className="form-input"
              aria-invalid={!!errors.groomName}
              maxLength={100}
            />
          </FormField>

          <FormField label="Nama Lengkap" htmlFor="groomFullName" required error={errors.groomFullName}>
            <input
              id="groomFullName"
              type="text"
              value={couple.groomFullName}
              onChange={(e) => set("groomFullName", e.target.value)}
              placeholder="Muhammad Dedek Firmansyah"
              className="form-input"
              aria-invalid={!!errors.groomFullName}
              maxLength={200}
            />
          </FormField>

          <FormField
            label="Nama Orang Tua"
            htmlFor="groomParentNames"
            required
            error={errors.groomParentNames}
          >
            <input
              id="groomParentNames"
              type="text"
              value={couple.groomParentNames}
              onChange={(e) => set("groomParentNames", e.target.value)}
              placeholder="Bapak Hasan & Ibu Fatimah"
              className="form-input"
              aria-invalid={!!errors.groomParentNames}
            />
          </FormField>

          <FormField label="Akun Instagram (opsional)" htmlFor="groomSocial" error={errors.groomSocial}>
            <div className="form-input-prefix">
              <span className="form-input-prefix__icon">@</span>
              <input
                id="groomSocial"
                type="text"
                value={couple.groomSocial ?? ""}
                onChange={(e) => set("groomSocial", e.target.value)}
                placeholder="dedekfirmansyah"
                className="form-input form-input--has-prefix"
                maxLength={100}
              />
            </div>
          </FormField>
        </div>
      </div>

      {/* Opening Text */}
      <div className="step-section">
        <FormField
          label="Teks Pembuka Undangan"
          htmlFor="openingText"
          hint="Teks sapaan yang tertera di bagian atas undangan."
        >
          <textarea
            id="openingText"
            value={state.openingText}
            onChange={(e) => updateState({ openingText: e.target.value })}
            rows={4}
            className="form-textarea"
            placeholder="Dengan memohon rahmat dan ridho Allah SWT, kami mengundang…"
          />
        </FormField>
      </div>

      <StepNav onNext={validate} />
    </div>
  );
}
