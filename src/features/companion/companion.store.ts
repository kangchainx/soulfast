import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type EmotionState = 'CALM' | 'ENCOURAGED' | 'DISAPPOINTED' | 'HAPPY';

interface CompanionState {
  emotion: EmotionState;
  setEmotion: (emotion: EmotionState) => void;
}

export const useCompanionStore = create<CompanionState>()(
  persist(
    (set) => ({
      emotion: 'CALM',
      setEmotion: (emotion) => set({ emotion }),
    }),
    {
      name: 'companion-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
