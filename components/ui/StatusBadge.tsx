import { BorderRadius, Spacing } from '@constants/spacing';
import { Typography } from '@constants/typography';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Status = 'safe' | 'caution' | 'danger';

interface StatusBadgeProps {
  status: Status;
  label?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  label = status.toUpperCase() 
}) => {
  const statusColors = {
    safe: { bg: '#D1FAE5', text: '#065F46' },
    caution: { bg: '#FEF3C7', text: '#92400E' },
    danger: { bg: '#FEE2E2', text: '#991B1B' },
  };

  const { bg, text } = statusColors[status];

  const styles = StyleSheet.create({
    badge: {
      backgroundColor: bg,
      borderRadius: BorderRadius.lg,
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.sm,
      alignSelf: 'flex-start',
    },
    text: {
      color: text,
      fontSize: Typography.sizes.sm,
      fontWeight: Typography.weights.semibold,
    },
  });

  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};