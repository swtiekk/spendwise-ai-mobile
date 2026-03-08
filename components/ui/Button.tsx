import { Colors, Semantic } from '@constants/colors';
import { BorderRadius, Spacing } from '@constants/spacing';
import { Typography } from '@constants/typography';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  style,
}) => {
  const isOnDark = variant !== 'outline';

  return (
    <TouchableOpacity
      style={[
        styles.base,
        styles[`variant_${variant}`],
        styles[`size_${size}`],
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.75}
    >
      <Text style={[styles.text, isOnDark ? styles.textLight : styles.textPrimary]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

// ✅ Module-level — created once, not on every render
const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  // Variants
  variant_primary:   { backgroundColor: Semantic.primary },
  variant_secondary: { backgroundColor: Semantic.secondary },
  variant_danger:    { backgroundColor: Colors.error },
  variant_outline:   { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: Semantic.primary },
  // Sizes
  size_sm: { paddingVertical: Spacing.sm,  paddingHorizontal: Spacing.md,  minHeight: 36 },
  size_md: { paddingVertical: Spacing.md,  paddingHorizontal: Spacing.lg,  minHeight: 44 },
  size_lg: { paddingVertical: Spacing.lg,  paddingHorizontal: Spacing.xl,  minHeight: 52 },
  // States
  disabled:    { opacity: 0.5 },
  text:        { fontSize: Typography.sizes.base, fontWeight: Typography.weights.semibold },
  textLight:   { color: Colors.white },
  textPrimary: { color: Semantic.primary },
});