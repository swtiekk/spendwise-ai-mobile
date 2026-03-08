import { Colors, Semantic } from '@constants/colors';
import { BorderRadius, Shadow, Spacing } from '@constants/spacing';
import { Typography } from '@constants/typography';
import { StyleSheet } from 'react-native';

export const HistoryStyles = StyleSheet.create({

  // =========================================================================
  // SCREEN
  // =========================================================================
  screen: { flex: 1, backgroundColor: Semantic.background },

  // =========================================================================
  // HEADER
  // =========================================================================
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
    backgroundColor: Semantic.background,
  },
  headerLeft:    { gap: 2 },
  headerEyebrow: {
    fontSize: Typography.sizes.xs,
    color: Semantic.textMuted,
    fontWeight: Typography.weights.medium,
    letterSpacing: Typography.letterSpacing.wide,
  },
  headerTitle: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.extrabold,
    color: Semantic.text,
    letterSpacing: Typography.letterSpacing.tight,
  },

  // =========================================================================
  // SUMMARY STRIP
  // =========================================================================
  summaryStrip: {
    flexDirection: 'row',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    backgroundColor: Semantic.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    gap: Spacing.lg,
    ...Shadow.sm,
  },
  summaryItem:      { flex: 1, alignItems: 'center', gap: 3 },
  summaryDivider:   { width: 1, backgroundColor: Semantic.divider },
  summaryLabel: {
    fontSize: Typography.sizes['2xs'],
    color: Semantic.textMuted,
    fontWeight: Typography.weights.medium,
    letterSpacing: Typography.letterSpacing.wide,
    textTransform: 'uppercase',
  },
  summaryValue: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.extrabold,
    color: Semantic.text,
  },
  summaryValueTeal: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.extrabold,
    color: Semantic.primary,
  },
  summaryValueRed: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.extrabold,
    color: Semantic.error,
  },

  // =========================================================================
  // FILTER BAR
  // =========================================================================
  filterWrap: {
    borderBottomWidth: 1,
    borderBottomColor: Semantic.divider,
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  filterContent:  { flexDirection: 'row', gap: Spacing.sm, paddingHorizontal: Spacing.lg },
  filterBtn: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 7,
    borderRadius: BorderRadius.full,
    borderWidth: 1.5,
    borderColor: Semantic.border,
    backgroundColor: Semantic.surface,
  },
  filterBtnActive: {
    borderColor: Colors.growthTeal,
    backgroundColor: Colors.growthTeal,
  },
  filterText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
    color: Semantic.textSecondary,
  },
  filterTextActive: {
    color: Colors.white,
  },

  // =========================================================================
  // LIST
  // =========================================================================
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: 40,
  },

  // Date group header
  dateGroup:     { marginBottom: Spacing.sm },
  dateGroupLabel:{
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Semantic.textMuted,
    letterSpacing: Typography.letterSpacing.wider,
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
    marginTop: Spacing.md,
  },

  // =========================================================================
  // EXPENSE CARD
  // =========================================================================
  expenseCard: {
    backgroundColor: Semantic.surface,
    borderRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    marginBottom: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Semantic.divider,
    ...Shadow.sm,
  },
  expenseIconWrap: {
    width: 44, height: 44,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
    flexShrink: 0,
  },
  expenseInfo:     { flex: 1 },
  expenseTitle: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Semantic.text,
    marginBottom: 3,
  },
  expenseMeta:     { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  expenseCategoryPill: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
  },
  expenseCategoryText: {
    fontSize: Typography.sizes['2xs'],
    fontWeight: Typography.weights.bold,
  },
  expenseDot: {
    width: 3, height: 3,
    borderRadius: BorderRadius.full,
    backgroundColor: Semantic.border,
  },
  expenseDate: {
    fontSize: Typography.sizes.xs,
    color: Semantic.textMuted,
  },
  expenseRight:    { alignItems: 'flex-end', gap: 3 },
  expenseAmount: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Semantic.text,
  },

  // =========================================================================
  // EMPTY STATE
  // =========================================================================
  emptyWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xxl,
    gap: Spacing.md,
  },
  emptyIconWrap: {
    width: 76, height: 76,
    borderRadius: BorderRadius.full,
    backgroundColor: Semantic.primaryBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  emptyTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Semantic.text,
    textAlign: 'center',
  },
  emptyMessage: {
    fontSize: Typography.sizes.sm,
    color: Semantic.textMuted,
    textAlign: 'center',
    lineHeight: 21,
  },

  // =========================================================================
  // ERROR MESSAGE
  // =========================================================================
  errorWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Semantic.errorBg,
    borderRadius: BorderRadius.xl,
    borderLeftWidth: 3,
    borderLeftColor: Semantic.error,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    margin: Spacing.lg,
    gap: Spacing.md,
  },
  errorIconWrap: {
    width: 34, height: 34,
    borderRadius: BorderRadius.md,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  errorContent:  { flex: 1 },
  errorTitle: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: '#991B1B',
    marginBottom: 2,
  },
  errorMessage: {
    fontSize: Typography.sizes.xs,
    color: '#7F1D1D',
    lineHeight: 17,
  },
  errorDismiss: { padding: Spacing.xs },
  errorRetryBtn: {
    marginTop: Spacing.sm,
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadius.md,
    backgroundColor: Semantic.error,
  },
  errorRetryText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Colors.white,
  },
});