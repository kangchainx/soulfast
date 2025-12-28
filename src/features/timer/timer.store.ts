import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type FastingStatus = 'IDLE' | 'FASTING' | 'EATING';

interface TimerState {
  status: FastingStatus;
  startTime: string | null; // ISO Date string
  endTime: string | null;
  durationMinutes: number; // Default 16*60 = 960
  
  startFast: () => void;
  endFast: () => number; // Returns earned XP
  setStatus: (status: FastingStatus) => void;
}

// Import companion store to trigger XP update
import { useCompanionStore } from '../companion/companion.store';

export const useTimerStore = create<TimerState>()(
  persist(
    (set, get) => ({
      status: 'IDLE',
      startTime: null,
      endTime: null,
      durationMinutes: 16 * 60,

      startFast: () => {
        const now = new Date();
        const end = new Date(now.getTime() - (-16 * 60 * 60 * 1000)); // Hack to avoid sign confusion, +16h
        set({ 
          status: 'FASTING', 
          startTime: now.toISOString(), 
          endTime: end.toISOString() 
        });
      },

      endFast: () => {
         const { startTime, status } = get();
         let xpEarned = 0;
         if (status === 'FASTING' && startTime) {
           const start = new Date(startTime);
           const now = new Date();
           const durationHours = (now.getTime() - start.getTime()) / (1000 * 60 * 60);
           
           if (durationHours > 0.1) {
             xpEarned = Math.floor(durationHours * 10);
             useCompanionStore.getState().addXp(xpEarned);
           }
         }
         set({ status: 'IDLE', startTime: null, endTime: null });
         return xpEarned;
      },

      setStatus: (status) => set({ status }),
    }),
    {
      name: 'timer-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
