import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useTimerStore } from "@/store/useTimerStore";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";

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
        <Animated.View 
          entering={FadeInDown.duration(1000).springify()}
          className="pb-12"
        >
          {/* 装饰线 */}
          <View className="w-10 h-0.5 bg-soul-muted mb-8" />

          {/* 主标题 */}
          <Text className="text-4xl text-soul-text mb-6 leading-tight font-sans-bold">
            开启 16:8{"\n"}
            <Text className="font-sans italic opacity-60">Health Rhythm</Text>
          </Text>

          {/* 正文描述 */}
          <Text className="text-base text-soul-text leading-relaxed font-sans mb-12 opacity-80">
            16 小时禁食，8 小时进食。让身体在规律的节奏中自我修复，找回轻盈状态。
          </Text>

          {/* 行动按钮 */}
          <Pressable
            onPress={handleStart}
            className="w-full bg-soul-accent h-16 rounded-2xl items-center justify-center shadow-md active:scale-95 transition-transform"
          >
            <Text className="text-white text-lg font-sans-bold">
              开启今日断食
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
