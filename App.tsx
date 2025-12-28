import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MainScreen } from './src/app/MainScreen';
import { SplashScreen } from './src/features/onboarding/SplashScreen';
import { useFonts, Cinzel_700Bold, Cinzel_400Regular } from '@expo-google-fonts/cinzel';
import { NotoSerifSC_400Regular, NotoSerifSC_700Bold } from '@expo-google-fonts/noto-serif-sc';
import { Fredoka_400Regular, Fredoka_700Bold } from '@expo-google-fonts/fredoka';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  
  const [fontsLoaded] = useFonts({
    'Cinzel-Bold': Cinzel_700Bold,
    'Cinzel-Regular': Cinzel_400Regular,
    'NotoSerif-Regular': NotoSerifSC_400Regular,
    'NotoSerif-Bold': NotoSerifSC_700Bold,
    'Fredoka-Regular': Fredoka_400Regular,
    'Fredoka-Bold': Fredoka_700Bold,
  });

  if (showSplash || !fontsLoaded) {
    return (
      <SafeAreaProvider>
        <SplashScreen onFinish={() => {
            if (fontsLoaded) setShowSplash(false);
        }} />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <MainScreen />
    </SafeAreaProvider>
  );
}
