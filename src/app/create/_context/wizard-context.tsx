"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  CoupleData,
  EventData,
  GiftItem,
  MediaData,
  StoryItem,
} from "@/types/invitation";

// ─── Step Definition ────────────────────────────────────────────────────────

export const WIZARD_STEPS = [
  { id: 1, slug: "template", label: "Template", icon: "Layers" },
  { id: 2, slug: "couple", label: "Mempelai", icon: "Heart" },
  { id: 3, slug: "event", label: "Acara", icon: "CalendarDays" },
  { id: 4, slug: "media", label: "Media", icon: "Images" },
  { id: 5, slug: "story", label: "Kisah", icon: "BookOpen" },
  { id: 6, slug: "gift", label: "Hadiah", icon: "Gift" },
] as const;

export type WizardStepSlug = (typeof WIZARD_STEPS)[number]["slug"];

// ─── Wizard State ────────────────────────────────────────────────────────────

export interface WizardState {
  currentStep: number;
  completedSteps: number[];
  templateSlug: string;
  title: string;
  openingText: string;
  couple: CoupleData;
  event: EventData;
  media: MediaData;
  stories: StoryItem[];
  gifts: GiftItem[];
}

const DEFAULT_STATE: WizardState = {
  currentStep: 1,
  completedSteps: [],
  templateSlug: "",
  title: "",
  openingText:
    "Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara pernikahan kami.",
  couple: {
    brideName: "",
    brideFullName: "",
    brideParentNames: "",
    brideSocial: "",
    groomName: "",
    groomFullName: "",
    groomParentNames: "",
    groomSocial: "",
  },
  event: {
    eventDate: "",
    timezone: "Asia/Jakarta",
    akad: { date: "", startTime: "", endTime: "" },
    reception: { date: "", startTime: "", endTime: "" },
    venueName: "",
    venueAddress: "",
    mapsUrl: "",
  },
  media: {
    coverImageUrl: "",
    musicUrl: "",
    gallery: [],
  },
  stories: [],
  gifts: [],
};

// ─── Context ─────────────────────────────────────────────────────────────────

interface WizardContextValue {
  state: WizardState;
  updateState: (partial: Partial<WizardState>) => void;
  markStepCompleted: (step: number) => void;
  isStepCompleted: (step: number) => boolean;
  canNavigateToStep: (step: number) => boolean;
  resetWizard: () => void;
}

const WizardContext = createContext<WizardContextValue | null>(null);

const STORAGE_KEY = "titiktemu_wizard_state";

// ─── Provider ─────────────────────────────────────────────────────────────────

export function WizardProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<WizardState>(DEFAULT_STATE);
  const initialized = useRef(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<WizardState>;
        setState((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // silently ignore parse errors
    }
  }, []);

  // Persist to localStorage on every state change (debounced-ish via useEffect)
  useEffect(() => {
    if (!initialized.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage quota exceeded – ignore
    }
  }, [state]);

  const updateState = useCallback((partial: Partial<WizardState>) => {
    setState((prev) => ({ ...prev, ...partial }));
  }, []);

  const markStepCompleted = useCallback((step: number) => {
    setState((prev) => ({
      ...prev,
      completedSteps: prev.completedSteps.includes(step)
        ? prev.completedSteps
        : [...prev.completedSteps, step],
    }));
  }, []);

  const isStepCompleted = useCallback(
    (step: number) => state.completedSteps.includes(step),
    [state.completedSteps]
  );

  // Users can only jump to step N if all steps before N are completed
  const canNavigateToStep = useCallback(
    (step: number) => {
      if (step === 1) return true;
      for (let i = 1; i < step; i++) {
        if (!state.completedSteps.includes(i)) return false;
      }
      return true;
    },
    [state.completedSteps]
  );

  const resetWizard = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState(DEFAULT_STATE);
  }, []);

  const value = useMemo(
    () => ({
      state,
      updateState,
      markStepCompleted,
      isStepCompleted,
      canNavigateToStep,
      resetWizard,
    }),
    [state, updateState, markStepCompleted, isStepCompleted, canNavigateToStep, resetWizard]
  );

  return (
    <WizardContext.Provider value={value}>{children}</WizardContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useWizard() {
  const ctx = useContext(WizardContext);
  if (!ctx) {
    throw new Error("useWizard must be used within <WizardProvider>");
  }
  return ctx;
}
