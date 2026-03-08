import { Colors, Semantic } from '@constants/colors';
import { BorderRadius, Spacing } from '@constants/spacing';
import { Typography } from '@constants/typography';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'primary' }) => {
  const variantColors = {
    primary: { bg: Colors.intelligenceBlue, text: Semantic.surface },
    success: { bg: Colors.success, text: Semantic.surface },
    warning: { bg: Colors.alertAmber, text: Semantic.surface },
    error: { bg: Colors.error, text: Semantic.surface },
    info: { bg: Colors.info, text: Semantic.surface },
  };

  const { bg, text } = variantColors[variant];

  const styles = StyleSheet.create({
    badge: {
      backgroundColor: bg,
      borderRadius: BorderRadius.full,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.xs,
      alignSelf: 'flex-start',
    },
    text: {
      color: text,
      fontSize: Typography.sizes.xs,
      fontWeight: Typography.weights.semibold,
    },
  });

  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};