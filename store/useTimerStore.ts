import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 断食阶段定义
export const FASTING_PHASES = [
  { hours: 0, title: "消化阶段", description: "身体正在消化最后一餐" },
  { hours: 4, title: "血糖下降期", description: "血糖开始稳定下降" },
  { hours: 8, title: "脂肪燃烧期", description: "身体开始消耗储存的脂肪" },
  { hours: 12, title: "酮体生成期", description: "肝脏开始产生酮体供能" },
  { hours: 16, title: "细胞自噬期", description: "细胞开始自我修复和清理" },
] as const;

interface TimerState {
  // 状态
  isRunning: boolean;
  startTime: number | null;
  targetDuration: number; // 目标时长（毫秒），默认 16 小时
  
  // 统计数据
  totalFastingTime: number; // 累计断食时长（毫秒）
  completedSessions: number; // 完成次数（总数）
  currentStreak: number; // 连续天数
  sessionTimestamps: number[]; // 每次完成的时间戳（用于周统计）
  lastCompletionDate: string | null; // 最后完成日期 (YYYY-MM-DD)
  
  // 操作
  startFasting: () => void;
  stopFasting: () => void;
  resetTimer: () => void;
  
  // 计算属性辅助
  getElapsedTime: () => number;
  getRemainingTime: () => number;
  getProgress: () => number;
  getCurrentPhase: () => typeof FASTING_PHASES[number];
  getWeeklyCompletedSessions: () => number; // 本周完成次数
}

const SIXTEEN_HOURS_MS = 16 * 60 * 60 * 1000;
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000; // 30天，用于清理旧数据

export const useTimerStore = create<TimerState>()(
  persist(
    (set, get) => ({
      isRunning: false,
      startTime: null,
      targetDuration: SIXTEEN_HOURS_MS,
      totalFastingTime: 0,
      completedSessions: 0,
      currentStreak: 0,
      sessionTimestamps: [],
      lastCompletionDate: null,

      startFasting: () => {
        set({
          isRunning: true,
          startTime: Date.now(),
        });
      },

      stopFasting: () => {
        const state = get();
        if (state.startTime) {
          const elapsed = Date.now() - state.startTime;
          const newTotal = state.totalFastingTime + elapsed;
          const completed = elapsed >= state.targetDuration;
          const now = Date.now();
          
          // 计算日期（YYYY-MM-DD 格式）
          const today = new Date(now).toISOString().split('T')[0];
          
          let newStreak = state.currentStreak;
          
          if (completed) {
            if (!state.lastCompletionDate) {
              // 第一次完成
              newStreak = 1;
            } else if (state.lastCompletionDate === today) {
              // 同一天内多次完成，保持 streak 不变
              newStreak = state.currentStreak;
            } else {
              // 检查是否是连续的第二天
              const lastDate = new Date(state.lastCompletionDate);
              const todayDate = new Date(today);
              const diffTime = todayDate.getTime() - lastDate.getTime();
              const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
              
              if (diffDays === 1) {
                // 连续的第二天，递增
                newStreak = state.currentStreak + 1;
              } else if (diffDays > 1) {
                // 跳过了天数，重置为 1
                newStreak = 1;
              }
            }
          } else {
            // 未完成，重置 streak
            newStreak = 0;
          }
          
          set({
            isRunning: false,
            startTime: null,
            totalFastingTime: newTotal,
            completedSessions: completed
              ? state.completedSessions + 1
              : state.completedSessions,
            currentStreak: newStreak,
            sessionTimestamps: completed
              ? [...state.sessionTimestamps, now].filter(
                  (timestamp) => now - timestamp < THIRTY_DAYS_MS
                )
              : state.sessionTimestamps,
            lastCompletionDate: completed ? today : state.lastCompletionDate,
          });
        }
      },

      resetTimer: () => {
        set({
          isRunning: false,
          startTime: null,
        });
      },

      getElapsedTime: () => {
        const state = get();
        if (!state.startTime) return 0;
        return Date.now() - state.startTime;
      },

      getRemainingTime: () => {
        const state = get();
        if (!state.startTime) return state.targetDuration;
        const elapsed = Date.now() - state.startTime;
        return Math.max(0, state.targetDuration - elapsed);
      },

      getProgress: () => {
        const state = get();
        if (!state.startTime) return 0;
        const elapsed = Date.now() - state.startTime;
        return Math.min(1, elapsed / state.targetDuration);
      },

      getCurrentPhase: () => {
        const state = get();
        if (!state.startTime) return FASTING_PHASES[0];
        
        const elapsedHours = (Date.now() - state.startTime) / (1000 * 60 * 60);
        
        // 找到当前阶段
        let currentPhase = FASTING_PHASES[0];
        for (const phase of FASTING_PHASES) {
          if (elapsedHours >= phase.hours) {
            currentPhase = phase;
          } else {
            break;
          }
        }
        return currentPhase;
      },

      getWeeklyCompletedSessions: () => {
        const state = get();
        const now = Date.now();
        const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;
        
        // 过滤出本周的会话（过去 7 天）
        return state.sessionTimestamps.filter(
          (timestamp) => timestamp >= oneWeekAgo
        ).length;
      },
    }),
    {
      name: "soulfast-timer-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        totalFastingTime: state.totalFastingTime,
        completedSessions: state.completedSessions,
        currentStreak: state.currentStreak,
        sessionTimestamps: state.sessionTimestamps,
        lastCompletionDate: state.lastCompletionDate,
        // 持久化运行状态，支持应用重启后恢复
        isRunning: state.isRunning,
        startTime: state.startTime,
      }),
    }
  )
);
