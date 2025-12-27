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
  endFast: () => void;
  setStatus: (status: FastingStatus) => void;
}

export const useTimerStore = create<TimerState>()(
  persist(
    (set) => ({
      status: 'IDLE',
      startTime: null,
      endTime: null,
      durationMinutes: 16 * 60,

      startFast: () => {
        const now = new Date();
        const end = new Date(now.getTime() + 16 * 60 * 60 * 1000);
        set({ 
          status: 'FASTING', 
          startTime: now.toISOString(), 
          endTime: end.toISOString() 
        });
      },

      endFast: () => {
         set({ status: 'IDLE', startTime: null, endTime: null });
      },

      setStatus: (status) => set({ status }),
    }),
    {
      name: 'timer-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
