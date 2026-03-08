import { Colors, Semantic } from '@constants/colors';
import { BorderRadius, Spacing } from '@constants/spacing';
import { Typography } from '@constants/typography';
import { StyleSheet } from 'react-native';

export const GlobalTheme = {
  colors: Semantic,
  spacing: Spacing,
  borderRadius: BorderRadius,
  typography: Typography,
};

export const CommonStyles = StyleSheet.create({
  // Basic containers
  container: {
    flex: 1,
    backgroundColor: Semantic.background,
  },
  safeContainer: {
    flex: 1,
    backgroundColor: Semantic.background,
    paddingHorizontal: Spacing.lg,
  },

  // Flex utilities
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },

  // Spacing utilities
  marginSmall: {
    marginVertical: Spacing.sm,
  },
  marginMedium: {
    marginVertical: Spacing.md,
  },
  marginLarge: {
    marginVertical: Spacing.lg,
  },
  paddingSmall: {
    padding: Spacing.sm,
  },
  paddingMedium: {
    padding: Spacing.md,
  },
  paddingLarge: {
    padding: Spacing.lg,
  },

  // Shadows & Elevation
  shadow: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  shadowMedium: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  shadowLarge: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },

  // Borders
  borderTopSmall: {
    borderTopWidth: 1,
    borderTopColor: Semantic.divider,
  },
  borderBottomSmall: {
    borderBottomWidth: 1,
    borderBottomColor: Semantic.divider,
  },
  borderTopMedium: {
    borderTopWidth: 2,
    borderTopColor: Semantic.border,
  },
});