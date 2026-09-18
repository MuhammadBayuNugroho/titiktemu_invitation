"use client";

import { useEffect, useState } from "react";
import { useWizard } from "../../_context/wizard-context";
import { StepNav } from "../../_components/step-nav";
import { FormField } from "../../_components/form-field";
import type { GiftItem } from "@/types/invitation";
import { GiftIcon, PlusIcon, TrashIcon, CreditCardIcon } from "lucide-react";

type GiftErrors = Record<string, string | undefined>;

const BANK_PROVIDERS = [
  "BCA", "BNI", "BRI", "Mandiri", "CIMB Niaga",
  "BSI", "BTN", "Bank Jago", "Danamon", "Permata",
];

const EWALLET_PROVIDERS = ["GoPay", "OVO", "DANA", "ShopeePay", "LinkAja"];

const emptyGift = (): GiftItem => ({
  giftType: "bank",
  providerName: "",
  accountNumber: "",
  accountName: "",
});

export default function GiftStep() {
  const { state, updateState } = useWizard();
  const [errors, setErrors] = useState<GiftErrors>({});
  const gifts = state.gifts;

  useEffect(() => {
    updateState({ currentStep: 6 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addGift = () => {
    updateState({ gifts: [...gifts, { ...emptyGift() }] });
  };

  const removeGift = (index: number) => {
    updateState({ gifts: gifts.filter((_, i) => i !== index) });
    const cleanErrors = { ...errors };
    Object.keys(cleanErrors).forEach((k) => {
      if (k.startsWith(`${index}.`)) delete cleanErrors[k];
    });
    setErrors(cleanErrors);
  };

  const updateGift = (index: number, partial: Partial<GiftItem>) => {
    updateState({
      gifts: gifts.map((g, i) => (i === index ? { ...g, ...partial } : g)),
    });
    Object.keys(partial).forEach((key) => {
      const errKey = `${index}.${key}`;
      if (errors[errKey]) setErrors((e) => ({ ...e, [errKey]: undefined }));
    });
  };

  const validate = async (): Promise<boolean> => {
    const fieldErrors: GiftErrors = {};
    gifts.forEach((g, i) => {
      if (!g.providerName) fieldErrors[`${i}.providerName`] = "Pilih bank/e-wallet";
      if (!g.accountNumber.trim())
        fieldErrors[`${i}.accountNumber`] = "Nomor rekening wajib diisi";
      if (!g.accountName.trim())
        fieldErrors[`${i}.accountName`] = "Nama pemilik rekening wajib diisi";
    });
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  return (
    <div className="step-container">
      <div className="step-header">
        <h1 className="step-header__title">Wedding Gift</h1>
        <p className="step-header__desc">
          Tambahkan rekening bank atau dompet digital untuk hadiah pernikahan. Opsional.
        </p>
      </div>

      {gifts.length === 0 ? (
        <div className="empty-state">
          <GiftIcon size={40} className="empty-state__icon" />
          <p className="empty-state__text">Belum ada rekening ditambahkan</p>
          <p className="empty-state__hint">
            Tamu dapat mengirim hadiah secara digital melalui rekening yang Anda cantumkan
          </p>
        </div>
      ) : (
        <div className="gift-list">
          {gifts.map((gift, index) => {
            const providers =
              gift.giftType === "bank" ? BANK_PROVIDERS : EWALLET_PROVIDERS;

            return (
              <div key={index} className="gift-card">
                <div className="gift-card__header">
                  <div className="gift-card__icon-wrap">
                    <CreditCardIcon size={16} />
                  </div>
                  <span className="gift-card__num">Rekening {index + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeGift(index)}
                    className="gift-card__remove"
                    aria-label={`Hapus rekening ${index + 1}`}
                  >
                    <TrashIcon size={14} />
                  </button>
                </div>

                <div className="form-grid form-grid--2">
                  {/* Type */}
                  <FormField label="Jenis" htmlFor={`gift-type-${index}`}>
                    <div className="toggle-group" role="group" aria-label="Jenis rekening">
                      {(["bank", "ewallet"] as const).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() =>
                            updateGift(index, {
                              giftType: type,
                              providerName: "",
                            })
                          }
                          className={[
                            "toggle-group__btn",
                            gift.giftType === type
                              ? "toggle-group__btn--active"
                              : "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                          aria-pressed={gift.giftType === type}
                        >
                          {type === "bank" ? "Bank" : "E-Wallet"}
                        </button>
                      ))}
                    </div>
                  </FormField>

                  {/* Provider */}
                  <FormField
                    label={gift.giftType === "bank" ? "Nama Bank" : "E-Wallet"}
                    htmlFor={`gift-provider-${index}`}
                    required
                    error={errors[`${index}.providerName`]}
                  >
                    <select
                      id={`gift-provider-${index}`}
                      value={gift.providerName}
                      onChange={(e) =>
                        updateGift(index, { providerName: e.target.value })
                      }
                      className="form-select"
                      aria-invalid={!!errors[`${index}.providerName`]}
                    >
                      <option value="">— Pilih —</option>
                      {providers.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </FormField>

                  {/* Account number */}
                  <FormField
                    label="Nomor Rekening / No. HP"
                    htmlFor={`gift-number-${index}`}
                    required
                    error={errors[`${index}.accountNumber`]}
                  >
                    <input
                      id={`gift-number-${index}`}
                      type="text"
                      value={gift.accountNumber}
                      onChange={(e) =>
                        updateGift(index, { accountNumber: e.target.value })
                      }
                      placeholder="1234567890"
                      className="form-input"
                      aria-invalid={!!errors[`${index}.accountNumber`]}
                      inputMode="numeric"
                    />
                  </FormField>

                  {/* Account name */}
                  <FormField
                    label="Nama Pemilik"
                    htmlFor={`gift-name-${index}`}
                    required
                    error={errors[`${index}.accountName`]}
                  >
                    <input
                      id={`gift-name-${index}`}
                      type="text"
                      value={gift.accountName}
                      onChange={(e) =>
                        updateGift(index, { accountName: e.target.value })
                      }
                      placeholder="Shava Amaliya Putri"
                      className="form-input"
                      aria-invalid={!!errors[`${index}.accountName`]}
                    />
                  </FormField>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <button type="button" onClick={addGift} className="add-item-btn">
        <PlusIcon size={16} />
        Tambah Rekening
      </button>

      <StepNav onNext={validate} isLastStep nextLabel="Lihat Pratinjau" />
    </div>
  );
}
