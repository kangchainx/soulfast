import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal, Animated } from 'react-native';
import { useTimerStore } from '../features/timer/timer.store';
import { useCompanionStore } from '../features/companion/companion.store';
import { useFasting } from '../features/timer/useFasting';
import { TimerDisplay } from '../features/timer/TimerDisplay';
import { Companion } from '../features/companion/Companion';
import { colors } from '../shared/theme/colors';
import { typography } from '../shared/theme/typography';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AdoptionScreen } from '../features/onboarding/AdoptionScreen';
import * as Haptics from 'expo-haptics';

export const MainScreen = () => {
  const { startFast, endFast, setStatus } = useTimerStore();
  const { setEmotion, hasAdopted, beastStage, xp, beastType, reset } = useCompanionStore();
  const { status, remainingMs } = useFasting();
  const [showInterruption, setShowInterruption] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);
  const [confirmDelay, setConfirmDelay] = useState(2); // 2 seconds lock
  const [canConfirm, setCanConfirm] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const checkHydration = async () => {
        setHydrated(true);
    };
    checkHydration();
  }, []);

  const currentBackground = status === 'FASTING' ? colors.phases.fasting : colors.phases.eating;

  if (!hydrated) return null;

  if (!hasAdopted) {
    return <AdoptionScreen />;
  }

  const handleStart = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    startFast();
    setEmotion('ENCOURAGED');
    setTimeout(() => {
      setEmotion('CALM');
    }, 5000);
  };

  const handleStopAttempt = () => {
    if (remainingMs > 0) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        setEmotion('DISAPPOINTED');
        setShowInterruption(true);
        setConfirmDelay(2);
        setCanConfirm(false);
        const interval = setInterval(() => {
            setConfirmDelay((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setCanConfirm(true);
                    return 0;
                }
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                return prev - 1;
            });
        }, 1000);
    } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        const gain = endFast();
        setEarnedXp(gain);
        setEmotion('HAPPY');
        setStatus('EATING'); 
        setShowSuccess(true);
        setTimeout(() => setEmotion('CALM'), 10000);
    }
  };

  const confirmStop = () => {
      if (!canConfirm) return;
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setShowInterruption(false);
      const gain = endFast();
      setEarnedXp(gain);
      setEmotion('DISAPPOINTED');
      setShowSuccess(true);
      setTimeout(() => setEmotion('CALM'), 60000); 
  };

  const cancelStop = () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setShowInterruption(false);
      setEmotion('ENCOURAGED'); 
      setTimeout(() => setEmotion('CALM'), 3000);
  };

  const handleDevFinish = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const gain = endFast();
    setEarnedXp(gain);
    setEmotion('HAPPY');
    setStatus('EATING'); 
    setShowSuccess(true);
    setTimeout(() => setEmotion('CALM'), 5000);
  };

  const getProgress = () => {
      if (beastStage === 0) return Math.min(xp / 150, 1);
      if (beastStage === 1) return Math.min((xp - 150) / (400 - 150), 1);
      return 1;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentBackground }]}>
      <View style={styles.content}>
        
        {/* Evolution Header */}
        <View style={styles.header}>
            <Text style={styles.beastName}>{beastType?.toUpperCase()} • STAGE {beastStage}</Text>
            <View style={styles.xpBarContainer}>
                <View style={[styles.xpBarFill, { width: `${getProgress() * 100}%` }]} />
            </View>
            <Text style={styles.xpText}>{xp} XP</Text>
        </View>

        <View style={styles.glowContainer}>
             <Companion />
        </View>

        <TimerDisplay />
        
        <View style={styles.controls}>
            {status === 'IDLE' && (
                <TouchableOpacity style={styles.buttonPrimary} onPress={handleStart}>
                    <Text style={styles.buttonText}>Start Fast</Text>
                </TouchableOpacity>
            )}
            
            {status === 'FASTING' && (
                <>
                    <TouchableOpacity style={styles.buttonDanger} onPress={handleStopAttempt}>
                        <Text style={[styles.buttonText, { color: colors.status.error }]}>End Fasting</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 8 }} onPress={handleDevFinish}>
                        <Text style={{ color: colors.primary, fontSize: 12, textDecorationLine: 'underline', fontFamily: 'Fredoka-Regular' }}>
                            Dev: Finish Now (Hack)
                        </Text>
                    </TouchableOpacity>
                </>
            )}

            {status === 'EATING' && (
                 <TouchableOpacity style={styles.buttonPrimary} onPress={handleStart}>
                    <Text style={styles.buttonText}>Start Next Fast</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity 
                style={{ marginTop: 24 }} 
                onPress={() => {
                    reset();
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
                }}
            >
                <Text style={{ color: colors.text.muted, fontSize: 12, fontFamily: 'Fredoka-Regular' }}>Dev: Reset All Data</Text>
            </TouchableOpacity>
        </View>
      </View>

      {/* Interruption Modal */}
      <Modal visible={showInterruption} transparent animationType="fade">
          <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                  <Text style={[typography.cuteH2, { color: colors.text.primary, marginBottom: 16 }]}>
                      Wait...
                  </Text>
                  <Text style={[typography.cuteBody, { color: colors.text.secondary, marginBottom: 24, textAlign: 'center' }]}>
                      {beastType === 'dragon' 
                        ? "Your dragon growls in frustration. Strength is forged in patience." 
                        : "Your spirit companion looks at you with sadness. Don't break the bond."}
                  </Text>
                  
                  <TouchableOpacity style={styles.buttonPrimary} onPress={cancelStop}>
                      <Text style={styles.buttonText}>I'll Keep Going</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.buttonGhost, { marginTop: 12, opacity: canConfirm ? 1 : 0.5 }]} 
                    onPress={confirmStop}
                    disabled={!canConfirm}
                  >
                      <Text style={[styles.buttonText, { color: colors.status.error }]}>
                          {canConfirm ? "I Give Up" : `Wait ${confirmDelay}s...`}
                      </Text>
                  </TouchableOpacity>
              </View>
          </View>
      </Modal>

      {/* Success Modal */}
      <Modal visible={showSuccess} transparent animationType="slide">
          <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                  <Text style={[typography.cuteH2, { color: colors.status.success, marginBottom: 16 }]}>
                      Fast Completed!
                  </Text>
                  <Text style={[typography.cuteBody, { color: colors.text.secondary, marginBottom: 8, textAlign: 'center' }]}>
                      Your willpower is inspiring.
                  </Text>
                  <Text style={[typography.cuteH1, { color: colors.primary, marginBottom: 24 }]}>
                      +{earnedXp} XP
                  </Text>
                  
                  <TouchableOpacity style={styles.buttonPrimary} onPress={() => setShowSuccess(false)}>
                      <Text style={styles.buttonText}>Continue</Text>
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
    // @ts-ignore
    transition: 'background-color 0.5s ease', 
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
    paddingBottom: 48,
  },
  header: {
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 8,
      gap: 8,
  },
  beastName: {
      ...typography.cuteCaption,
      color: colors.text.secondary,
      letterSpacing: 2,
      fontFamily: 'Fredoka-Bold',
  },
  xpBarContainer: {
      width: 120,
      height: 4,
      backgroundColor: 'rgba(255,255,255,0.1)',
      borderRadius: 2,
      overflow: 'hidden',
  },
  xpBarFill: {
      height: '100%',
      backgroundColor: colors.primary,
  },
  xpText: {
      ...typography.cuteCaption,
      fontSize: 10,
  },
  glowContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
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
    ...typography.cuteH3,
    color: colors.background,
    fontFamily: 'Fredoka-Bold',
  },
  modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.85)',
      justifyContent: 'center',
      padding: 24,
  },
  modalContent: {
      backgroundColor: colors.surface,
      padding: 32,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.1)',
      alignItems: 'center',
  }
});
