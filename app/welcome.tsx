import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useTimerStore } from "@/store/useTimerStore";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const router = useRouter();
  const { completeWelcome } = useTimerStore();

  const handleStart = () => {
    completeWelcome();
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView className="flex-1 bg-soul-bg">
      <View className="flex-1 p-8 justify-end">
        {/* A. 装饰性元素 */}
        <View className="w-10 h-0.5 bg-soul-muted opacity-30 mb-2" />

        {/* B. 主标题区域 */}
        <View className="mb-8">
          <Text className="text-3xl font-sans-bold text-soul-text">
            开启 16:8
          </Text>
          <Text className="text-3xl font-sans italic opacity-60 text-soul-text mt-1">
            Health Rhythm
          </Text>
        </View>

        {/* C. 功能描述正文 */}
        <Text className="text-[12px] text-soul-text opacity-60 leading-relaxed font-sans mb-12">
          16 小时禁食，8 小时进食。让身体在规律的节奏中自我修复，找回轻盈状态。
        </Text>

        {/* D. 核心操作按钮 */}
        <Pressable
          onPress={handleStart}
          className="w-full bg-soul-accent py-4 rounded-2xl items-center justify-center shadow-lg shadow-orange-100 active:scale-95 transition-transform"
        >
          <Text className="text-white text-[10px] font-sans-bold tracking-[0.2em] uppercase">
            开启今日断食
          </Text>
        </Pressable>
        
        {/* 底部留白，确保不贴底 */}
        <View className="h-12" />
      </View>
    </SafeAreaView>
  );
}
