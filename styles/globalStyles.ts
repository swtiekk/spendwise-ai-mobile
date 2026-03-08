import { Semantic } from '@constants/colors';
import { Spacing } from '@constants/spacing';
import { Typography } from '@constants/typography';
import { StyleSheet } from 'react-native';

export const GlobalStyles = StyleSheet.create({
  // Screen backgrounds
  screenBackground: {
    flex: 1,
    backgroundColor: Semantic.background,
  },

  // Content spacing
  screenPadding: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },

  // Text styles
  headingLarge: {
    fontSize: Typography.sizes['3xl'],
    fontWeight: Typography.weights.bold,
    color: Semantic.text,
    lineHeight: Typography.lineHeights.tight,
  },
  headingMedium: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.semibold,
    color: Semantic.text,
    lineHeight: Typography.lineHeights.tight,
  },
  headingSmall: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
    color: Semantic.text,
  },

  // Body text
  bodyLarge: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.normal,
    color: Semantic.text,
    lineHeight: Typography.lineHeights.normal,
  },
  bodyRegular: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.normal,
    color: Semantic.textSecondary,
    lineHeight: Typography.lineHeights.normal,
  },
  bodySmall: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.normal,
    color: Semantic.textMuted,
  },

  // Labels
  labelLarge: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Semantic.text,
  },
  labelMedium: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Semantic.textSecondary,
  },
  labelSmall: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
    color: Semantic.textMuted,
  },

  // Links and interactive
  link: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Semantic.primary,
  },
  linkSecondary: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Semantic.secondary,
  },

  // Disabled state
  disabled: {
    opacity: 0.5,
  },
});