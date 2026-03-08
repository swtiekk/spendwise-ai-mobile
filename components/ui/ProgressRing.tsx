import { Colors, Semantic } from '@constants/colors';
import { Spacing } from '@constants/spacing';
import { Typography } from '@constants/typography';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ProgressRingProps {
  percentage: number;
  radius?: number;
  label?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  percentage,
  radius = 60,
  label,
}) => {
  const getColor = () => {
    if (percentage < 33) return Colors.success;
    if (percentage < 66) return Colors.alertAmber;
    return Colors.error;
  };

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    ring: {
      width: radius * 2,
      height: radius * 2,
      borderRadius: radius,
      borderWidth: 8,
      borderColor: Semantic.border,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      borderTopColor: getColor(),
      borderRightColor: getColor(),
      borderBottomColor: Semantic.border,
      borderLeftColor: Semantic.border,
    },
    percentage: {
      fontSize: Typography.sizes.lg,
      fontWeight: Typography.weights.bold,
      color: Semantic.text,
    },
    label: {
      fontSize: Typography.sizes.sm,
      color: Semantic.textSecondary,
      marginTop: Spacing.md,
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.ring}>
        <Text style={styles.percentage}>{Math.round(percentage)}%</Text>
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </View>
  );
};