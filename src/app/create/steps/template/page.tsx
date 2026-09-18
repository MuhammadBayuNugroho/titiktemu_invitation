"use client";

import { useEffect } from "react";
import { useWizard } from "../../_context/wizard-context";
import { StepNav } from "../../_components/step-nav";
import { getAllTemplates } from "@/lib/templates/registry";
import { CheckIcon, StarIcon } from "lucide-react";

const templates = getAllTemplates();

export default function TemplateStep() {
  const { state, updateState } = useWizard();

  useEffect(() => {
    updateState({ currentStep: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validate = async (): Promise<boolean> => {
    return !!state.templateSlug;
  };

  return (
    <div className="step-container">
      <div className="step-header">
        <h1 className="step-header__title">Pilih Template</h1>
        <p className="step-header__desc">
          Setiap template dirancang dengan cermat. Anda bisa mengubahnya kapan saja.
        </p>
      </div>

      {!state.templateSlug && (
        <p className="step-validation-hint" role="alert">
          ✦ Silakan pilih satu template untuk melanjutkan
        </p>
      )}

      <div className="template-grid">
        {templates.map((tpl) => {
          const isSelected = state.templateSlug === tpl.slug;

          return (
            <button
              key={tpl.slug}
              type="button"
              onClick={() =>
                updateState({ templateSlug: tpl.slug, title: state.title })
              }
              className={[
                "template-card",
                isSelected ? "template-card--selected" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-pressed={isSelected}
            >
              {/* Visual swatch */}
              <div
                className="template-card__swatch"
                style={{ background: tpl.colors.background }}
              >
                {/* Color palette dots */}
                <div className="template-card__palette">
                  {[tpl.colors.primary, tpl.colors.secondary, tpl.colors.accent].map(
                    (c) => (
                      <span
                        key={c}
                        className="template-card__dot"
                        style={{ background: c }}
                      />
                    )
                  )}
                </div>

                {/* Mockup lines */}
                <div className="template-card__mockup">
                  <div
                    className="template-card__mockup-line template-card__mockup-line--title"
                    style={{ background: tpl.colors.primary, opacity: 0.7 }}
                  />
                  <div
                    className="template-card__mockup-line template-card__mockup-line--sub"
                    style={{ background: tpl.colors.secondary, opacity: 0.5 }}
                  />
                  <div
                    className="template-card__mockup-line"
                    style={{ background: tpl.colors.foreground, opacity: 0.15 }}
                  />
                  <div
                    className="template-card__mockup-line"
                    style={{ background: tpl.colors.foreground, opacity: 0.1 }}
                  />
                </div>

                {isSelected && (
                  <div className="template-card__check">
                    <CheckIcon size={16} strokeWidth={2.5} />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="template-card__info">
                <div className="template-card__name-row">
                  <span className="template-card__name">{tpl.name}</span>
                  {tpl.slug === "elegant" && (
                    <span className="template-card__badge">
                      <StarIcon size={10} />
                      Populer
                    </span>
                  )}
                </div>
                <p className="template-card__desc">{tpl.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Preview link */}
      {state.templateSlug && (
        <div className="template-preview-row">
          <a
            href={`/demo/shava-dedek`}
            target="_blank"
            rel="noopener noreferrer"
            className="template-preview-link"
          >
            Lihat demo template →
          </a>
        </div>
      )}

      <StepNav onNext={validate} isFirstStep />
    </div>
  );
}
