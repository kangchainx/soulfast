import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { Sun } from "lucide-react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  runOnJS,
} from "react-native-reanimated";

interface SplashScreenProps {
  onFinish?: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);

  useEffect(() => {
    opacity.value = withSequence(
      withTiming(1, { duration: 800 }),
      withDelay(1500, withTiming(0, { duration: 500 }, (finished) => {
        if (finished && onFinish) {
          runOnJS(onFinish)();
        }
      }))
    );
    scale.value = withTiming(1, { duration: 800 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View className="flex-1 items-center justify-center bg-soul-bg">
      <Animated.View style={animatedStyle} className="items-center justify-center">
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
      </Animated.View>
    </View>
  );
}
