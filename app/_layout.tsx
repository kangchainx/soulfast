import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// 防止启动画面自动隐藏
SplashScreen.preventAutoHideAsync();

// 设计规范颜色
export const colors = {
  background: "#FFF9F2",
  accent: "#FF8C69",
  text: "#4A4238",
  muted: "#D4A373",
  white: "#FFFFFF",
};

export default function RootLayout() {
  // 加载 Noto Sans 字体系列
  const [fontsLoaded, fontError] = useFonts({
    "NotoSansSC-Regular": require("../assets/fonts/NotoSansSC-Regular.otf"),
    "NotoSansSC-Medium": require("../assets/fonts/NotoSansSC-Medium.otf"),
    "NotoSansSC-Bold": require("../assets/fonts/NotoSansSC-Bold.otf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // 字体加载中时显示空白背景
  if (!fontsLoaded && !fontError) {
    return <View style={styles.loading} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="dark" backgroundColor={colors.background} />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
            animation: "fade",
          }}
        >
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
