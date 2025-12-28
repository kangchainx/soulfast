import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFasting } from './useFasting';
import { typography } from '../../shared/theme/typography';
import { colors } from '../../shared/theme/colors';

export const TimerDisplay = () => {
  const { status, formattedRemaining, progress } = useFasting();

  if (status === 'IDLE') {
    return (
      <View style={styles.container}>
        <Text style={[typography.cuteH2, { color: colors.text.secondary }]}>
          Ready to fast?
        </Text>
        <Text style={[typography.cuteBody, { color: colors.text.muted, marginTop: 8 }]}>
          16:8 Protocol
        </Text>
      </View>
    );
  }

  if (status === 'EATING') {
    return (
      <View style={styles.container}>
        <Text style={[typography.cuteH2, { color: colors.text.primary }]}>
          Eating Window
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Simple Progress Ring Placeholder */}
      <View style={styles.ringContainer}>
         <Text style={[typography.cuteH1, { color: colors.primary, fontVariant: ['tabular-nums'], fontSize: 48 }]}>
           {formattedRemaining}
         </Text>
      </View>
      <Text style={[typography.cuteCaption, { marginTop: 16 }]}>
        {progress.toFixed(1)}% Completed
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  ringContainer: {
    // Placeholder for a ring
    alignItems: 'center',
    justifyContent: 'center',
  }
});
