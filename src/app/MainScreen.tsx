import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal } from 'react-native';
import { useTimerStore } from '../features/timer/timer.store';
import { useCompanionStore } from '../features/companion/companion.store';
import { useFasting } from '../features/timer/useFasting';
import { TimerDisplay } from '../features/timer/TimerDisplay';
import { Companion } from '../features/companion/Companion';
import { colors } from '../shared/theme/colors';
import { typography } from '../shared/theme/typography';
import { SafeAreaView } from 'react-native-safe-area-context';

export const MainScreen = () => {
  const { startFast, endFast, setStatus } = useTimerStore();
  const { setEmotion } = useCompanionStore();
  const { status, remainingMs } = useFasting();
  const [showInterruption, setShowInterruption] = useState(false);

  const handleStart = () => {
    startFast();
    setEmotion('ENCOURAGED');
    // After 5 seconds, settle to CALM
    setTimeout(() => {
      setEmotion('CALM');
    }, 5000);
  };

  const handleStopAttempt = () => {
    if (remainingMs > 0) {
        // Early termination attempt
        setEmotion('DISAPPOINTED');
        setShowInterruption(true);
    } else {
        // Successful completion
        setEmotion('HAPPY');
        setStatus('EATING'); // Switch to eating window
        // Reset timer stats? Logic for "End Fast" usually means stop the timer.
        endFast(); 
        // Keep happy emotion for a bit
        setTimeout(() => setEmotion('CALM'), 10000);
    }
  };

  const confirmStop = () => {
      setShowInterruption(false);
      endFast();
      // Leave emotional trace
      setEmotion('DISAPPOINTED');
      // Settle back after a long delay (loss aversion lingering)
      setTimeout(() => setEmotion('CALM'), 60000); 
  };

  const cancelStop = () => {
      setShowInterruption(false);
      setEmotion('ENCOURAGED'); // Relief
      setTimeout(() => setEmotion('CALM'), 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Companion />
        <TimerDisplay />
        
        <View style={styles.controls}>
            {status === 'IDLE' && (
                <TouchableOpacity style={styles.buttonPrimary} onPress={handleStart}>
                    <Text style={styles.buttonText}>Start Fast</Text>
                </TouchableOpacity>
            )}
            
            {status === 'FASTING' && (
                <TouchableOpacity style={styles.buttonDanger} onPress={handleStopAttempt}>
                    <Text style={styles.buttonText}>End Fasting</Text>
                </TouchableOpacity>
            )}

            {status === 'EATING' && (
                 <TouchableOpacity style={styles.buttonPrimary} onPress={handleStart}>
                    <Text style={styles.buttonText}>Start Next Fast</Text>
                </TouchableOpacity>
            )}
        </View>
      </View>

      <Modal visible={showInterruption} transparent animationType="fade">
          <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                  <Text style={[typography.h2, { color: colors.text.primary, marginBottom: 16 }]}>
                      Wait...
                  </Text>
                  <Text style={[typography.body, { color: colors.text.secondary, marginBottom: 24 }]}>
                      We promised to do this together. Stopping now would break our streak. Are you absolutely sure?
                  </Text>
                  
                  <TouchableOpacity style={styles.buttonPrimary} onPress={cancelStop}>
                      <Text style={styles.buttonText}>I'll Keep Going</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={[styles.buttonGhost, { marginTop: 12 }]} onPress={confirmStop}>
                      <Text style={[styles.buttonText, { color: colors.status.error }]}>I Give Up</Text>
                  </TouchableOpacity>
              </View>
          </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
    paddingBottom: 48,
  },
  controls: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 100,
    width: '100%',
    alignItems: 'center',
  },
  buttonDanger: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.status.error,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 100,
    width: '100%',
    alignItems: 'center',
  },
  buttonGhost: {
      padding: 16,
  },
  buttonText: {
    ...typography.h2,
    fontSize: 18,
    color: colors.background, // Text on primary button
  },
  modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.8)',
      justifyContent: 'center',
      padding: 24,
  },
  modalContent: {
      backgroundColor: colors.surface,
      padding: 32,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: colors.text.muted,
  }
});
