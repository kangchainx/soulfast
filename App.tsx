import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MainScreen } from './src/app/MainScreen';
import { colors } from './src/shared/theme/colors';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <MainScreen />
    </SafeAreaProvider>
  );
}
