"use client";

import { useEffect, useState } from "react";
import { useWizard } from "../../_context/wizard-context";
import { StepNav } from "../../_components/step-nav";
import { FormField } from "../../_components/form-field";
import { EventSchema } from "@/lib/validations/invitation";
import type { EventData, EventSchedule } from "@/types/invitation";
import { ClockIcon, MapPinIcon, CalendarDaysIcon } from "lucide-react";

type EventErrors = Record<string, string | undefined>;

const TIMEZONES = [
  { value: "Asia/Jakarta", label: "WIB (Waktu Indonesia Barat)" },
  { value: "Asia/Makassar", label: "WITA (Waktu Indonesia Tengah)" },
  { value: "Asia/Jayapura", label: "WIT (Waktu Indonesia Timur)" },
];

export default function EventStep() {
  const { state, updateState } = useWizard();
  const [errors, setErrors] = useState<EventErrors>({});
  const event = state.event;

  useEffect(() => {
    updateState({ currentStep: 3 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setEvent = (partial: Partial<EventData>) => {
    updateState({ event: { ...event, ...partial } });
  };

  const setSchedule = (
    type: "akad" | "reception",
    partial: Partial<EventSchedule>
  ) => {
    updateState({
      event: { ...event, [type]: { ...event[type], ...partial } },
    });
  };

  const clearError = (path: string) => {
    if (errors[path]) setErrors((e) => ({ ...e, [path]: undefined }));
  };

  const validate = async (): Promise<boolean> => {
    const result = EventSchema.safeParse(event);
    if (result.success) {
      setErrors({});
      return true;
    }
    const fieldErrors: EventErrors = {};
    result.error.errors.forEach((e) => {
      const key = e.path.join(".");
      if (!fieldErrors[key]) fieldErrors[key] = e.message;
    });
    setErrors(fieldErrors);
    const firstEl = document.querySelector("[aria-invalid='true']") as HTMLElement;
    firstEl?.scrollIntoView({ behavior: "smooth", block: "center" });
    return false;
  };

  return (
    <div className="step-container">
      <div className="step-header">
        <h1 className="step-header__title">Detail Acara</h1>
        <p className="step-header__desc">
          Waktu dan lokasi acara pernikahan Anda.
        </p>
      </div>

      {/* Main date & timezone */}
      <div className="step-section">
        <div className="step-section__heading">
          <CalendarDaysIcon size={16} className="step-section__icon" />
          <h2 className="step-section__title">Tanggal Pernikahan</h2>
        </div>

        <div className="form-grid form-grid--2">
          <FormField label="Tanggal Utama" htmlFor="eventDate" required error={errors.eventDate}>
            <input
              id="eventDate"
              type="date"
              value={event.eventDate}
              onChange={(e) => {
                const v = e.target.value;
                clearError("eventDate");
                // auto-fill akad & reception dates
                setEvent({
                  eventDate: v,
                  akad: { ...event.akad, date: v },
                  reception: { ...event.reception, date: v },
                });
              }}
              className="form-input"
              aria-invalid={!!errors.eventDate}
            />
          </FormField>

          <FormField label="Zona Waktu" htmlFor="timezone" required>
            <select
              id="timezone"
              value={event.timezone}
              onChange={(e) => setEvent({ timezone: e.target.value })}
              className="form-select"
            >
              {TIMEZONES.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </FormField>
        </div>
      </div>

      {/* Akad schedule */}
      <div className="step-section">
        <div className="step-section__heading">
          <ClockIcon size={16} className="step-section__icon" />
          <h2 className="step-section__title">Jadwal Akad Nikah</h2>
        </div>

        <div className="form-grid form-grid--3">
          <FormField label="Tanggal Akad" htmlFor="akadDate" required error={errors["akad.date"]}>
            <input
              id="akadDate"
              type="date"
              value={event.akad.date}
              onChange={(e) => {
                clearError("akad.date");
                setSchedule("akad", { date: e.target.value });
              }}
              className="form-input"
              aria-invalid={!!errors["akad.date"]}
            />
          </FormField>
          <FormField label="Mulai" htmlFor="akadStart" required error={errors["akad.startTime"]}>
            <input
              id="akadStart"
              type="time"
              value={event.akad.startTime}
              onChange={(e) => {
                clearError("akad.startTime");
                setSchedule("akad", { startTime: e.target.value });
              }}
              className="form-input"
              aria-invalid={!!errors["akad.startTime"]}
            />
          </FormField>
          <FormField label="Selesai" htmlFor="akadEnd" required error={errors["akad.endTime"]}>
            <input
              id="akadEnd"
              type="time"
              value={event.akad.endTime}
              onChange={(e) => {
                clearError("akad.endTime");
                setSchedule("akad", { endTime: e.target.value });
              }}
              className="form-input"
              aria-invalid={!!errors["akad.endTime"]}
            />
          </FormField>
        </div>
      </div>

      {/* Reception schedule */}
      <div className="step-section">
        <div className="step-section__heading">
          <ClockIcon size={16} className="step-section__icon" />
          <h2 className="step-section__title">Jadwal Resepsi</h2>
        </div>

        <div className="form-grid form-grid--3">
          <FormField label="Tanggal Resepsi" htmlFor="receptionDate" required error={errors["reception.date"]}>
            <input
              id="receptionDate"
              type="date"
              value={event.reception.date}
              onChange={(e) => {
                clearError("reception.date");
                setSchedule("reception", { date: e.target.value });
              }}
              className="form-input"
              aria-invalid={!!errors["reception.date"]}
            />
          </FormField>
          <FormField label="Mulai" htmlFor="receptionStart" required error={errors["reception.startTime"]}>
            <input
              id="receptionStart"
              type="time"
              value={event.reception.startTime}
              onChange={(e) => {
                clearError("reception.startTime");
                setSchedule("reception", { startTime: e.target.value });
              }}
              className="form-input"
              aria-invalid={!!errors["reception.startTime"]}
            />
          </FormField>
          <FormField label="Selesai" htmlFor="receptionEnd" required error={errors["reception.endTime"]}>
            <input
              id="receptionEnd"
              type="time"
              value={event.reception.endTime}
              onChange={(e) => {
                clearError("reception.endTime");
                setSchedule("reception", { endTime: e.target.value });
              }}
              className="form-input"
              aria-invalid={!!errors["reception.endTime"]}
            />
          </FormField>
        </div>
      </div>

      {/* Venue */}
      <div className="step-section">
        <div className="step-section__heading">
          <MapPinIcon size={16} className="step-section__icon" />
          <h2 className="step-section__title">Lokasi</h2>
        </div>

        <div className="form-grid">
          <FormField label="Nama Gedung / Tempat" htmlFor="venueName" required error={errors.venueName}>
            <input
              id="venueName"
              type="text"
              value={event.venueName}
              onChange={(e) => {
                clearError("venueName");
                setEvent({ venueName: e.target.value });
              }}
              placeholder="Ballroom Hotel Grand Hyatt"
              className="form-input"
              aria-invalid={!!errors.venueName}
              maxLength={200}
            />
          </FormField>

          <FormField label="Alamat Lengkap" htmlFor="venueAddress" required error={errors.venueAddress}>
            <textarea
              id="venueAddress"
              value={event.venueAddress}
              onChange={(e) => {
                clearError("venueAddress");
                setEvent({ venueAddress: e.target.value });
              }}
              placeholder="Jl. MH Thamrin No. 1, Jakarta Pusat 10310"
              rows={3}
              className="form-textarea"
              aria-invalid={!!errors.venueAddress}
            />
          </FormField>

          <FormField
            label="Link Google Maps (opsional)"
            htmlFor="mapsUrl"
            hint="URL yang muncul setelah klik 'Share' di Google Maps."
            error={errors.mapsUrl}
          >
            <input
              id="mapsUrl"
              type="url"
              value={event.mapsUrl ?? ""}
              onChange={(e) => {
                clearError("mapsUrl");
                setEvent({ mapsUrl: e.target.value });
              }}
              placeholder="https://maps.app.goo.gl/..."
              className="form-input"
              aria-invalid={!!errors.mapsUrl}
            />
          </FormField>
        </div>
      </div>

      <StepNav onNext={validate} />
    </div>
  );
}
