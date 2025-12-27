import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useCompanionStore } from './companion.store';
import { useTimerStore } from '../timer/timer.store';
import { Smiley, SmileySad, SmileyMeh, Heart, SealCheck } from 'phosphor-react-native';
import { colors } from '../../shared/theme/colors';
import { typography } from '../../shared/theme/typography';

export const Companion = () => {
  const { emotion } = useCompanionStore();
  const { status } = useTimerStore();

  const getIcon = () => {
    // Mapping emotion to icon
    const size = 120;
    const weight = 'duotone';

    switch (emotion) {
      case 'ENCOURAGED':
        return <Smiley size={size} color={colors.status.success} weight={weight} />;
      case 'DISAPPOINTED':
        return <SmileySad size={size} color={colors.status.error} weight={weight} />;
      case 'HAPPY':
         return <Heart size={size} color={colors.status.warning} weight="fill" />;
      case 'CALM':
      default:
        return <SmileyMeh size={size} color={colors.secondary} weight={weight} />;
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
      <Text style={[typography.h2, styles.message]}>
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
