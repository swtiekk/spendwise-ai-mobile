import { Colors, Semantic } from '@constants/colors';
import { BorderRadius, Shadow, Spacing } from '@constants/spacing';
import { Typography } from '@constants/typography';
import { StyleSheet } from 'react-native';

export const InsightsStyles = StyleSheet.create({

  // =========================================================================
  // SCREEN
  // =========================================================================
  screen:        { flex: 1, backgroundColor: Semantic.background },
  scroll:        { flex: 1 },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.lg,
    gap: Spacing.lg,
  },

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
  headerAiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Semantic.secondaryBg,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
  },
  headerAiBadgeText: {
    fontSize: Typography.sizes.xs,
    color: Semantic.secondary,
    fontWeight: Typography.weights.bold,
  },

  // =========================================================================
  // SECTION HEADER
  // =========================================================================
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  sectionDot: {
    width: 6, height: 6,
    borderRadius: BorderRadius.full,
    backgroundColor: Semantic.secondary,
  },
  sectionTitle: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Semantic.text,
    letterSpacing: Typography.letterSpacing.wider,
    textTransform: 'uppercase',
  },

  // =========================================================================
  // MONEY FORECAST — navy hero card (was "Income Sustainability")
  // =========================================================================
  sustainHeroCard: {
    backgroundColor: Colors.trustNavy,
    borderRadius: BorderRadius['2xl'],
    padding: Spacing.xl,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.07)',
    ...Shadow.navy,
  },
  sustainHeroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  sustainHeroLabelWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sustainHeroLabelDot: {
    width: 6, height: 6,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.growthTeal,
  },
  sustainHeroLabel: {
    fontSize: Typography.sizes.xs,
    color: Colors.growthTeal,
    fontWeight: Typography.weights.bold,
    letterSpacing: Typography.letterSpacing.wider,
    textTransform: 'uppercase',
  },
  sustainHeroStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  sustainHeroStatusText: {
    fontSize: Typography.sizes['2xs'],
    color: 'rgba(255,255,255,0.55)',
    fontWeight: Typography.weights.medium,
  },
  sustainHeroDaysRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    marginBottom: Spacing.sm,
  },
  sustainHeroDays: {
    fontSize: Typography.sizes['5xl'],
    fontWeight: Typography.weights.extrabold,
    color: Colors.white,
    letterSpacing: Typography.letterSpacing.tight,
    lineHeight: 48,
  },
  sustainHeroDaysSub: {
    fontSize: Typography.sizes.base,
    color: 'rgba(255,255,255,0.55)',
    marginBottom: 6,
  },
  sustainHeroPrediction: {
    fontSize: Typography.sizes.sm,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 21,
    marginBottom: Spacing.lg,
  },
  sustainHeroDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginBottom: Spacing.lg,
  },
  sustainHeroFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sustainHeroFooterItem: { gap: 3 },
  sustainHeroFooterLabel: {
    fontSize: Typography.sizes['2xs'],
    color: 'rgba(255,255,255,0.4)',
    fontWeight: Typography.weights.medium,
    textTransform: 'uppercase',
    letterSpacing: Typography.letterSpacing.wide,
  },
  sustainHeroFooterValue: {
    fontSize: Typography.sizes.sm,
    color: Colors.white,
    fontWeight: Typography.weights.bold,
  },
  sustainHeroFooterTeal: {
    fontSize: Typography.sizes.sm,
    color: Colors.growthTeal,
    fontWeight: Typography.weights.bold,
  },

  // =========================================================================
  // SPENDING HEALTH CARD (was "Risk Level")
  // =========================================================================
  riskCard: {
    borderRadius: BorderRadius['2xl'],
    padding: Spacing.xl,
    ...Shadow.md,
  },
  riskCardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  riskCardLabel: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    letterSpacing: Typography.letterSpacing.wider,
    textTransform: 'uppercase',
    opacity: 0.7,
  },
  riskIconWrap: {
    width: 44, height: 44,
    borderRadius: BorderRadius.lg,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  riskLevelText: {
    fontSize: Typography.sizes['3xl'],
    fontWeight: Typography.weights.extrabold,
    letterSpacing: Typography.letterSpacing.tight,
    marginBottom: Spacing.sm,
  },
  riskDescription: {
    fontSize: Typography.sizes.sm,
    lineHeight: 21,
    opacity: 0.85,
    marginBottom: Spacing.lg,
  },
  riskMeterTrack: {
    height: 8,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
    marginBottom: Spacing.sm,
  },
  riskMeterFill: {
    height: 8,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  riskMeterLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  riskMeterLabelText: {
    fontSize: Typography.sizes['2xs'],
    opacity: 0.6,
    fontWeight: Typography.weights.medium,
  },

  // =========================================================================
  // MONEY PERSONALITY CARD (was "Spending Behavior Cluster")
  // =========================================================================
  clusterCard: {
    backgroundColor: Semantic.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    ...Shadow.sm,
  },
  clusterTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  clusterIconWrap: {
    width: 50, height: 50,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  clusterTypeLabel: {
    fontSize: Typography.sizes.xs,
    color: Semantic.textMuted,
    fontWeight: Typography.weights.medium,
    marginBottom: 3,
  },
  clusterName: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.extrabold,
  },
  clusterDescription: {
    fontSize: Typography.sizes.sm,
    color: Semantic.textSecondary,
    lineHeight: 21,
    marginBottom: Spacing.md,
  },
  clusterFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Semantic.divider,
  },
  clusterFooterDot: {
    width: 8, height: 8,
    borderRadius: BorderRadius.full,
  },
  clusterFooterText: {
    fontSize: Typography.sizes.xs,
    color: Semantic.textMuted,
  },

  // =========================================================================
  // SPENDING THIS WEEK (was "Behavior Trends")
  // =========================================================================
  trendsCard: {
    backgroundColor: Semantic.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    ...Shadow.sm,
  },
  trendsTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  trendsCardTitle: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Semantic.text,
  },
  trendsTotalText: {
    fontSize: Typography.sizes.xs,
    color: Semantic.textMuted,
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 110,
    marginBottom: Spacing.sm,
  },
  barCol:              { alignItems: 'center', flex: 1, justifyContent: 'flex-end' },
  barAmountText:       { fontSize: Typography.sizes['2xs'], color: Semantic.textMuted, marginBottom: 4, textAlign: 'center' },
  bar:                 { width: '55%', borderRadius: BorderRadius.sm, minHeight: 4 },
  barDayText:          { fontSize: Typography.sizes.xs, color: Semantic.textMuted, marginTop: 5, fontWeight: Typography.weights.medium },
  barDayTextHighlight: { fontSize: Typography.sizes.xs, color: Semantic.text, marginTop: 5, fontWeight: Typography.weights.bold },
  trendsLegendRow:     { flexDirection: 'row', gap: 14, marginTop: 4 },
  trendsLegendItem:    { flexDirection: 'row', alignItems: 'center', gap: 5 },
  trendsLegendDot:     { width: 8, height: 8, borderRadius: 2 },
  trendsLegendText:    { fontSize: Typography.sizes.xs, color: Semantic.textMuted },

  // =========================================================================
  // TIPS FOR YOU (was "AI Recommendations")
  // =========================================================================
  recsCard: {
    backgroundColor: Semantic.surface,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    ...Shadow.sm,
  },
  recsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Semantic.divider,
  },
  recsHeaderLeft:  { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  recsHeaderTitle: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Semantic.text,
  },
  recsCountBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    backgroundColor: Semantic.secondaryBg,
  },
  recsCountText: {
    fontSize: Typography.sizes['2xs'],
    fontWeight: Typography.weights.bold,
    color: Semantic.secondary,
  },
  recItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Semantic.divider,
  },
  recItemLast: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  recIconWrap: {
    width: 32, height: 32,
    borderRadius: BorderRadius.md,
    backgroundColor: Semantic.secondaryBg,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    marginTop: 1,
  },
  recText: {
    fontSize: Typography.sizes.sm,
    color: Semantic.text,
    flex: 1,
    lineHeight: 21,
  },
});