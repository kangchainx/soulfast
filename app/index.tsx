import { useState, useEffect } from "react";
import { Redirect, useRouter } from "expo-router";
import { useTimerStore } from "@/store/useTimerStore";
import SplashScreen from "@/components/SplashScreen";

export default function Index() {
  const router = useRouter();
  const { hasSeenWelcome } = useTimerStore();
  const [isReady, setIsReady] = useState(false);

  // 处理 Splash 结束后的回调
  const handleSplashFinish = () => {
    if (hasSeenWelcome) {
      router.replace("/(tabs)");
    } else {
      router.replace("/welcome");
    }
  };

  return <SplashScreen onFinish={handleSplashFinish} />;
}
