"use client";

import { WIZARD_STEPS, useWizard } from "../_context/wizard-context";
import { CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function WizardProgress() {
  const { state, canNavigateToStep, isStepCompleted } = useWizard();
  const router = useRouter();

  return (
    <div className="wizard-progress">
      {WIZARD_STEPS.map((step, index) => {
        const isActive = state.currentStep === step.id;
        const isCompleted = isStepCompleted(step.id);
        const canNav = canNavigateToStep(step.id);
        const isLast = index === WIZARD_STEPS.length - 1;

        return (
          <div key={step.id} className="wizard-progress__item">
            <button
              onClick={() => {
                if (canNav) {
                  router.push(`/create/steps/${step.slug}`);
                }
              }}
              disabled={!canNav}
              aria-current={isActive ? "step" : undefined}
              className={[
                "wizard-progress__circle",
                isActive ? "wizard-progress__circle--active" : "",
                isCompleted ? "wizard-progress__circle--completed" : "",
                !canNav && !isActive && !isCompleted
                  ? "wizard-progress__circle--locked"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {isCompleted ? (
                <CheckIcon size={14} strokeWidth={2.5} />
              ) : (
                <span>{step.id}</span>
              )}
            </button>

            <span
              className={[
                "wizard-progress__label",
                isActive ? "wizard-progress__label--active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {step.label}
            </span>

            {!isLast && (
              <div
                className={[
                  "wizard-progress__connector",
                  isCompleted ? "wizard-progress__connector--done" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
