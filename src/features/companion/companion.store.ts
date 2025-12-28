import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type EmotionState = "CALM" | "ENCOURAGED" | "DISAPPOINTED" | "HAPPY";
export type BeastType = "cat" | "dragon" | "fox";
export type BeastStage = 0 | 1 | 2; // 0: Child, 1: Growth, 2: Full

interface CompanionState {
  // Core Spirit Beast State
  hasAdopted: boolean;
  beastType: BeastType | null;
  xp: number;
  beastStage: BeastStage;

  // Emotional State
  emotion: EmotionState;

  // Actions
  adoptBeast: (type: BeastType) => void;
  addXp: (amount: number) => void;
  setEmotion: (emotion: EmotionState) => void;
  reset: () => void; // Dev helper
}

const calculateStage = (xp: number): BeastStage => {
  if (xp >= 400) return 2;
  if (xp >= 150) return 1;
  return 0;
};

export const useCompanionStore = create<CompanionState>()(
  persist(
    (set, get) => ({
      hasAdopted: false,
      beastType: null,
      xp: 0,
      beastStage: 0,
      emotion: "CALM",

      adoptBeast: (type) =>
        set({ hasAdopted: true, beastType: type, xp: 0, beastStage: 0 }),

      addXp: (amount) => {
        const currentXp = get().xp;
        const newXp = currentXp + amount;
        const newStage = calculateStage(newXp);
        set({ xp: newXp, beastStage: newStage });
      },

      setEmotion: (emotion) => set({ emotion }),

      reset: () =>
        set({
          hasAdopted: false,
          beastType: null,
          xp: 0,
          beastStage: 0,
          emotion: "CALM",
        }),
    }),
    {
      name: 'soulfast-companion-storage',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1, // Bump version to clear old v0.1 state
    }
  )
);
