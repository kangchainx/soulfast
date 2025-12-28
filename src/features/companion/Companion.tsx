import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useCompanionStore } from './companion.store';
import { useTimerStore } from '../timer/timer.store';
import { Star, Fire, PawPrint, Heart, SmileySad } from 'phosphor-react-native';
import { colors } from '../../shared/theme/colors';
import { typography } from '../../shared/theme/typography';

export const Companion = () => {
  const { emotion, beastType } = useCompanionStore();
  const { status } = useTimerStore();

  const getIcon = () => {
    const size = 120;
    const weight = emotion === 'HAPPY' ? 'fill' : 'duotone';
    
    // Explicitly type as string because colors is 'as const'
    let color: string = colors.secondary;
    if (emotion === 'ENCOURAGED') color = colors.status.success;
    if (emotion === 'DISAPPOINTED') color = colors.status.error;
    if (emotion === 'HAPPY') color = colors.status.warning;

    // Special case for Disappointed
    if (emotion === 'DISAPPOINTED') {
        return <SmileySad size={size} color={color} weight="duotone" />;
    }

    if (emotion === 'HAPPY') {
        return <Heart size={size} color={color} weight="fill" />;
    }

    // Default Beast Icons
    switch (beastType) {
      case 'dragon':
        return <Fire size={size} color={color} weight={weight} />;
      case 'fox':
        return <PawPrint size={size} color={color} weight={weight} />;
      case 'cat':
      default:
        return <Star size={size} color={color} weight={weight} />;
    }
  };

  const getMessage = () => {
    if (status === 'IDLE') return "I'm ready when you are.";
    if (status === 'EATING') return "Enjoy your meal!";
    
    switch (emotion) {
      case 'ENCOURAGED': return "You're doing great!";
      case 'DISAPPOINTED': return "I believed in us...";
      case 'HAPPY': return "We did it!";
      case 'CALM': return "I'm right here with you.";
      default: return "...";
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {getIcon()}
      </View>
      <Text style={[typography.cuteH2, styles.message]}>
        {getMessage()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
  },
  iconContainer: {
    marginBottom: 24,
    // Add a simple float animation equivalent later
  },
  message: {
    color: colors.text.primary,
    textAlign: 'center',
  }
});
