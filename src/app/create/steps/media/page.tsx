"use client";

import { useEffect, useState } from "react";
import { useWizard } from "../../_context/wizard-context";
import { StepNav } from "../../_components/step-nav";
import { FormField } from "../../_components/form-field";
import type { MediaData } from "@/types/invitation";
import {
  ImageIcon,
  MusicIcon,
  PlusIcon,
  TrashIcon,
  InfoIcon,
} from "lucide-react";

type MediaErrors = Record<string, string | undefined>;

export default function MediaStep() {
  const { state, updateState } = useWizard();
  const [errors, setErrors] = useState<MediaErrors>({});
  const [galleryInput, setGalleryInput] = useState("");
  const media = state.media;

  useEffect(() => {
    updateState({ currentStep: 4 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setMedia = (partial: Partial<MediaData>) => {
    updateState({ media: { ...media, ...partial } });
  };

  const addGalleryItem = () => {
    const trimmed = galleryInput.trim();
    if (!trimmed) return;

    try {
      new URL(trimmed);
    } catch {
      setErrors((e) => ({ ...e, galleryInput: "URL gambar tidak valid" }));
      return;
    }

    if (media.gallery.length >= 10) {
      setErrors((e) => ({ ...e, galleryInput: "Maksimal 10 foto galeri" }));
      return;
    }

    setMedia({
      gallery: [
        ...media.gallery,
        { url: trimmed, sortOrder: media.gallery.length },
      ],
    });
    setGalleryInput("");
    setErrors((e) => ({ ...e, galleryInput: undefined }));
  };

  const removeGalleryItem = (index: number) => {
    const updated = media.gallery
      .filter((_, i) => i !== index)
      .map((item, i) => ({ ...item, sortOrder: i }));
    setMedia({ gallery: updated });
  };

  // Media step is entirely optional — always valid
  const validate = async (): Promise<boolean> => {
    // Validate cover URL if provided
    if (media.coverImageUrl) {
      try {
        new URL(media.coverImageUrl);
      } catch {
        setErrors({ coverImageUrl: "URL gambar sampul tidak valid" });
        return false;
      }
    }
    if (media.musicUrl) {
      try {
        new URL(media.musicUrl);
      } catch {
        setErrors({ musicUrl: "URL musik tidak valid" });
        return false;
      }
    }
    setErrors({});
    return true;
  };

  return (
    <div className="step-container">
      <div className="step-header">
        <h1 className="step-header__title">Media & Foto</h1>
        <p className="step-header__desc">
          Tambahkan foto sampul, musik latar, dan galeri foto. Semua bersifat opsional.
        </p>
      </div>

      {/* Info banner */}
      <div className="info-banner">
        <InfoIcon size={14} className="info-banner__icon" />
        <p className="info-banner__text">
          Saat ini masukkan URL publik dari foto Anda (Google Drive, Cloudinary, dll).
          Fitur upload langsung akan tersedia dalam pembaruan berikutnya.
        </p>
      </div>

      {/* Cover Image */}
      <div className="step-section">
        <div className="step-section__heading">
          <ImageIcon size={16} className="step-section__icon" />
          <h2 className="step-section__title">Foto Sampul</h2>
        </div>

        <FormField
          label="URL Foto Sampul"
          htmlFor="coverImageUrl"
          hint="Foto utama yang tampil di awal undangan. Resolusi optimal: 9:16 atau 4:5."
          error={errors.coverImageUrl}
        >
          <input
            id="coverImageUrl"
            type="url"
            value={media.coverImageUrl ?? ""}
            onChange={(e) => {
              setErrors((er) => ({ ...er, coverImageUrl: undefined }));
              setMedia({ coverImageUrl: e.target.value });
            }}
            placeholder="https://..."
            className="form-input"
            aria-invalid={!!errors.coverImageUrl}
          />
        </FormField>

        {media.coverImageUrl && (
          <div className="media-preview">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={media.coverImageUrl}
              alt="Preview foto sampul"
              className="media-preview__image"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}
      </div>

      {/* Background Music */}
      <div className="step-section">
        <div className="step-section__heading">
          <MusicIcon size={16} className="step-section__icon" />
          <h2 className="step-section__title">Musik Latar</h2>
        </div>

        <FormField
          label="URL Musik (MP3)"
          htmlFor="musicUrl"
          hint="Tempel URL file MP3 publik. Musik akan autoplay saat tamu membuka undangan."
          error={errors.musicUrl}
        >
          <input
            id="musicUrl"
            type="url"
            value={media.musicUrl ?? ""}
            onChange={(e) => {
              setErrors((er) => ({ ...er, musicUrl: undefined }));
              setMedia({ musicUrl: e.target.value });
            }}
            placeholder="https://...example.mp3"
            className="form-input"
            aria-invalid={!!errors.musicUrl}
          />
        </FormField>
      </div>

      {/* Gallery */}
      <div className="step-section">
        <div className="step-section__heading">
          <ImageIcon size={16} className="step-section__icon" />
          <h2 className="step-section__title">
            Galeri Foto
            <span className="step-section__count">
              {media.gallery.length}/10
            </span>
          </h2>
        </div>

        <div className="gallery-add">
          <input
            type="url"
            value={galleryInput}
            onChange={(e) => {
              setGalleryInput(e.target.value);
              setErrors((er) => ({ ...er, galleryInput: undefined }));
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addGalleryItem();
              }
            }}
            placeholder="https://... (tekan Enter untuk tambah)"
            className="form-input gallery-add__input"
            aria-label="URL foto galeri"
            aria-invalid={!!errors.galleryInput}
          />
          <button
            type="button"
            onClick={addGalleryItem}
            className="gallery-add__btn"
            aria-label="Tambah foto"
          >
            <PlusIcon size={16} />
          </button>
        </div>
        {errors.galleryInput && (
          <p className="field-error">{errors.galleryInput}</p>
        )}

        {media.gallery.length > 0 && (
          <ul className="gallery-list">
            {media.gallery.map((item, i) => (
              <li key={i} className="gallery-list__item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={`Foto galeri ${i + 1}`}
                  className="gallery-list__thumb"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='1.5'%3E%3Crect x='3' y='3' width='18' height='18' rx='2'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpath d='m21 15-5-5L5 21'/%3E%3C/svg%3E";
                  }}
                />
                <span className="gallery-list__url">{item.url}</span>
                <button
                  type="button"
                  onClick={() => removeGalleryItem(i)}
                  className="gallery-list__remove"
                  aria-label={`Hapus foto ${i + 1}`}
                >
                  <TrashIcon size={14} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <StepNav onNext={validate} />
    </div>
  );
}
