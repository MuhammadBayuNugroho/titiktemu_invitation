"use client";

import { useEffect, useState } from "react";
import { useWizard } from "../../_context/wizard-context";
import { StepNav } from "../../_components/step-nav";
import { FormField } from "../../_components/form-field";
import type { StoryItem } from "@/types/invitation";
import {
  BookOpenIcon,
  PlusIcon,
  TrashIcon,
  GripVerticalIcon,
} from "lucide-react";

type StoryErrors = Record<string, string | undefined>;

const emptyStory = (): StoryItem => ({
  title: "",
  story: "",
  year: "",
  imageUrl: "",
  sortOrder: 0,
});

export default function StoryStep() {
  const { state, updateState } = useWizard();
  const [errors, setErrors] = useState<StoryErrors>({});
  const stories = state.stories;

  useEffect(() => {
    updateState({ currentStep: 5 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addStory = () => {
    updateState({
      stories: [...stories, { ...emptyStory(), sortOrder: stories.length }],
    });
  };

  const removeStory = (index: number) => {
    const updated = stories
      .filter((_, i) => i !== index)
      .map((s, i) => ({ ...s, sortOrder: i }));
    updateState({ stories: updated });
    // Clear errors for removed item
    const cleanErrors = { ...errors };
    Object.keys(cleanErrors).forEach((k) => {
      if (k.startsWith(`${index}.`)) delete cleanErrors[k];
    });
    setErrors(cleanErrors);
  };

  const updateStory = (index: number, partial: Partial<StoryItem>) => {
    const updated = stories.map((s, i) =>
      i === index ? { ...s, ...partial } : s
    );
    updateState({ stories: updated });
    // Clear related errors
    Object.keys(partial).forEach((key) => {
      const errKey = `${index}.${key}`;
      if (errors[errKey])
        setErrors((e) => ({ ...e, [errKey]: undefined }));
    });
  };

  const validate = async (): Promise<boolean> => {
    const fieldErrors: StoryErrors = {};
    stories.forEach((s, i) => {
      if (!s.title.trim()) fieldErrors[`${i}.title`] = "Judul kisah wajib diisi";
      if (!s.story.trim()) fieldErrors[`${i}.story`] = "Isi kisah wajib diisi";
    });
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      const firstEl = document.querySelector("[aria-invalid='true']") as HTMLElement;
      firstEl?.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    setErrors({});
    return true;
  };

  return (
    <div className="step-container">
      <div className="step-header">
        <h1 className="step-header__title">Kisah Cinta</h1>
        <p className="step-header__desc">
          Ceritakan perjalanan cinta Anda. Kisah ini tampil di bagian{" "}
          <em>Love Story</em> undangan.
          Opsional — boleh dilewati jika tidak ingin ditampilkan.
        </p>
      </div>

      {stories.length === 0 ? (
        <div className="empty-state">
          <BookOpenIcon size={40} className="empty-state__icon" />
          <p className="empty-state__text">Belum ada kisah ditambahkan</p>
          <p className="empty-state__hint">Tambahkan momen-momen berharga perjalanan cinta Anda</p>
        </div>
      ) : (
        <div className="story-list">
          {stories.map((story, index) => (
            <div key={index} className="story-card">
              <div className="story-card__header">
                <div className="story-card__drag">
                  <GripVerticalIcon size={16} />
                </div>
                <span className="story-card__num">Momen {index + 1}</span>
                <button
                  type="button"
                  onClick={() => removeStory(index)}
                  className="story-card__remove"
                  aria-label={`Hapus momen ${index + 1}`}
                >
                  <TrashIcon size={14} />
                </button>
              </div>

              <div className="form-grid">
                <FormField
                  label="Tahun (opsional)"
                  htmlFor={`story-year-${index}`}
                >
                  <input
                    id={`story-year-${index}`}
                    type="text"
                    value={story.year ?? ""}
                    onChange={(e) => updateStory(index, { year: e.target.value })}
                    placeholder="2021"
                    className="form-input"
                    maxLength={20}
                  />
                </FormField>

                <FormField
                  label="Judul Momen"
                  htmlFor={`story-title-${index}`}
                  required
                  error={errors[`${index}.title`]}
                >
                  <input
                    id={`story-title-${index}`}
                    type="text"
                    value={story.title}
                    onChange={(e) => updateStory(index, { title: e.target.value })}
                    placeholder="Pertama Kali Bertemu"
                    className="form-input"
                    aria-invalid={!!errors[`${index}.title`]}
                    maxLength={150}
                  />
                </FormField>

                <FormField
                  label="Cerita"
                  htmlFor={`story-story-${index}`}
                  required
                  error={errors[`${index}.story`]}
                >
                  <textarea
                    id={`story-story-${index}`}
                    value={story.story}
                    onChange={(e) => updateStory(index, { story: e.target.value })}
                    placeholder="Ceritakan momen ini dengan indah…"
                    rows={4}
                    className="form-textarea"
                    aria-invalid={!!errors[`${index}.story`]}
                  />
                </FormField>

                <FormField
                  label="URL Foto Momen (opsional)"
                  htmlFor={`story-img-${index}`}
                  error={errors[`${index}.imageUrl`]}
                >
                  <input
                    id={`story-img-${index}`}
                    type="url"
                    value={story.imageUrl ?? ""}
                    onChange={(e) => updateStory(index, { imageUrl: e.target.value })}
                    placeholder="https://..."
                    className="form-input"
                  />
                </FormField>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={addStory}
        className="add-item-btn"
      >
        <PlusIcon size={16} />
        Tambah Momen
      </button>

      <StepNav onNext={validate} />
    </div>
  );
}
