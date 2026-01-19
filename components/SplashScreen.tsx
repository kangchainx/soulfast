import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { Sun } from "lucide-react-native";

interface SplashScreenProps {
  onFinish?: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  useEffect(() => {
    // 简单的定时器，2.8秒后调用 onFinish
    const timer = setTimeout(() => {
      if (onFinish) {
        onFinish();
      }
    }, 2800);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View className="flex-1 items-center justify-center bg-soul-bg">
      <View className="items-center justify-center">
        {/* 图标卡片 */}
        <View className="w-24 h-24 bg-white rounded-[24px] shadow-lg items-center justify-center mb-8 rotate-12">
          <Sun size={48} color="#FF8C69" strokeWidth={1.5} />
        </View>

        {/* Logo 文字 */}
        <Text className="font-cinzel text-3xl text-soul-text mb-2">
          SoulFast
        </Text>

        {/* 副标题 */}
        <Text className="text-[10px] tracking-[0.4em] text-soul-text opacity-30 font-sans uppercase">
          16:8 科学断食管理
        </Text>
      </View>
    </View>
  );
}
