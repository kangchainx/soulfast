import "../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { Cinzel_400Regular } from "@expo-google-fonts/cinzel";
import {
  NotoSans_400Regular,
  NotoSans_500Medium,
  NotoSans_700Bold,
} from "@expo-google-fonts/noto-sans";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { View, StyleSheet, Platform } from "react-native";
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
  // 在 Web 平台使用 Google Fonts，在原生平台使用本地 .otf 文件
  const fontConfig = Platform.OS === 'web'
    ? {
        "NotoSansSC-Regular": NotoSans_400Regular,
        "NotoSansSC-Medium": NotoSans_500Medium,
        "NotoSansSC-Bold": NotoSans_700Bold,
        "Cinzel-Regular": Cinzel_400Regular,
      }
    : {
        "NotoSansSC-Regular": require("../assets/fonts/NotoSansSC-Regular.otf"),
        "NotoSansSC-Medium": require("../assets/fonts/NotoSansSC-Medium.otf"),
        "NotoSansSC-Bold": require("../assets/fonts/NotoSansSC-Bold.otf"),
        "Cinzel-Regular": Cinzel_400Regular,
      };

  const [fontsLoaded, fontError] = useFonts(fontConfig);

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
          <Stack.Screen name="index" />
          <Stack.Screen name="welcome" />
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
