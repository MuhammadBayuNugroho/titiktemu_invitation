"use client";

import { WIZARD_STEPS, useWizard } from "../_context/wizard-context";
import { ChevronLeftIcon, ChevronRightIcon, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface StepNavProps {
  onNext: () => Promise<boolean>; // returns true if validation passes
  isFirstStep?: boolean;
  isLastStep?: boolean;
  nextLabel?: string;
}

export function StepNav({
  onNext,
  isFirstStep = false,
  isLastStep = false,
  nextLabel,
}: StepNavProps) {
  const { state, updateState, markStepCompleted } = useWizard();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const currentStepInfo = WIZARD_STEPS.find((s) => s.id === state.currentStep);

  const handleBack = () => {
    if (isFirstStep) {
      router.push("/");
    } else {
      const prevStep = WIZARD_STEPS[state.currentStep - 2];
      if (prevStep) {
        updateState({ currentStep: prevStep.id });
        router.push(`/create/steps/${prevStep.slug}`);
      }
    }
  };

  const handleNext = async () => {
    setLoading(true);
    try {
      const valid = await onNext();
      if (!valid) return;

      markStepCompleted(state.currentStep);

      if (isLastStep) {
        // Last step → go to review/checkout
        router.push("/create/review");
      } else {
        const nextStep = WIZARD_STEPS[state.currentStep]; // [currentStep] is index of NEXT
        if (nextStep) {
          updateState({ currentStep: nextStep.id });
          router.push(`/create/steps/${nextStep.slug}`);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="step-nav">
      <button
        type="button"
        onClick={handleBack}
        className="step-nav__back"
        disabled={loading}
      >
        <ChevronLeftIcon size={16} />
        {isFirstStep ? "Beranda" : "Kembali"}
      </button>

      <span className="step-nav__hint">
        Langkah {currentStepInfo?.id} dari {WIZARD_STEPS.length}
      </span>

      <button
        type="button"
        onClick={handleNext}
        disabled={loading}
        className="step-nav__next"
      >
        {loading ? (
          <Loader2Icon size={16} className="animate-spin" />
        ) : null}
        {nextLabel ?? (isLastStep ? "Pratinjau" : "Lanjutkan")}
        {!loading && <ChevronRightIcon size={16} />}
      </button>
    </div>
  );
}
