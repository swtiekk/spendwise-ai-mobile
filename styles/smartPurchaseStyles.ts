import { Colors, Semantic } from '@constants/colors';
import { BorderRadius, Shadow, Spacing } from '@constants/spacing';
import { Typography } from '@constants/typography';
import { StyleSheet } from 'react-native';

export const SmartPurchaseStyles = StyleSheet.create({

  // =========================================================================
  // BOTTOM SHEET (Modal overlay)
  // =========================================================================
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: Semantic.surface,
    borderTopLeftRadius: BorderRadius['3xl'],
    borderTopRightRadius: BorderRadius['3xl'],
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xxxl,
    maxHeight: '92%',
    // Top shadow
    shadowColor: Colors.trustNavy,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 16,
  },
  handle: {
    width: 40, height: 4,
    backgroundColor: Semantic.border,
    borderRadius: BorderRadius.full,
    alignSelf: 'center',
    marginBottom: Spacing.lg,
  },

  // =========================================================================
  // SHEET HEADER
  // =========================================================================
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  sheetHeaderLeft:  { flex: 1, gap: 3 },
  sheetAiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Semantic.secondaryBg,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
    marginBottom: Spacing.xs,
  },
  sheetAiBadgeText: {
    fontSize: Typography.sizes['2xs'],
    color: Semantic.secondary,
    fontWeight: Typography.weights.bold,
    letterSpacing: 0.3,
  },
  sheetTitle: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.extrabold,
    color: Semantic.text,
    letterSpacing: -0.3,
  },
  sheetSubtitle: {
    fontSize: Typography.sizes.xs,
    color: Semantic.textMuted,
    lineHeight: 18,
  },
  sheetCloseBtn: {
    width: 34, height: 34,
    borderRadius: BorderRadius.md,
    backgroundColor: Semantic.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },

  // =========================================================================
  // PREFILL NOTICE (shows item + amount from form)
  // =========================================================================
  prefillCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Semantic.secondaryBg,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    gap: Spacing.md,
  },
  prefillIconWrap: {
    width: 36, height: 36,
    borderRadius: BorderRadius.md,
    backgroundColor: 'rgba(99,102,241,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  prefillContent: { flex: 1 },
  prefillLabel:   { fontSize: Typography.sizes['2xs'], color: Semantic.textMuted, fontWeight: Typography.weights.medium },
  prefillValue:   { fontSize: Typography.sizes.sm, fontWeight: Typography.weights.bold, color: Semantic.text },

  // =========================================================================
  // FORM (when no decision yet)
  // =========================================================================
  formGroup: { marginBottom: Spacing.md },

  // =========================================================================
  // ANALYZE BUTTON
  // =========================================================================
  analyzeBtn: {
    height: 54,
    borderRadius: BorderRadius.lg,
    backgroundColor: Semantic.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    ...Shadow.indigo,
  },
  analyzeBtnDisabled: { opacity: 0.55, elevation: 0, shadowOpacity: 0 },
  analyzeBtnText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    color: Colors.white,
  },

  // =========================================================================
  // RISK INDICATOR
  // =========================================================================
  riskIndicator: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  riskTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  riskLabelWrap: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  riskIconWrap: {
    width: 36, height: 36,
    borderRadius: BorderRadius.md,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  riskLabel: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.extrabold,
  },
  riskScoreBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  riskScoreText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
  },
  riskBarTrack: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  riskBarFill: {
    height: 8,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.75)',
  },

  // =========================================================================
  // PURCHASE RECOMMENDATION
  // =========================================================================
  recContainer:    { marginBottom: Spacing.lg },
  recReasoningBox: {
    backgroundColor: Semantic.background,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderLeftWidth: 3,
  },
  recReasoningText: {
    fontSize: Typography.sizes.sm,
    color: Semantic.text,
    lineHeight: 21,
  },
  recSuggestionsTitle: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Semantic.text,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
  },
  recSuggestionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  recSuggestionIconWrap: {
    width: 22, height: 22,
    borderRadius: BorderRadius.xs,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    marginTop: 1,
  },
  recSuggestionText: {
    fontSize: Typography.sizes.sm,
    color: Semantic.text,
    flex: 1,
    lineHeight: 20,
  },

  // =========================================================================
  // ACTION BUTTONS (after result)
  // =========================================================================
  actionRow:      { flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.md },
  proceedBtn: {
    flex: 1, height: 50,
    borderRadius: BorderRadius.lg,
    backgroundColor: Semantic.success,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  proceedBtnText: { fontSize: Typography.sizes.sm, fontWeight: Typography.weights.bold, color: Colors.white },
  checkAgainBtn: {
    flex: 1, height: 50,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    borderColor: Semantic.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  checkAgainBtnText: { fontSize: Typography.sizes.sm, fontWeight: Typography.weights.semibold, color: Semantic.textSecondary },
  closeBtn: {
    height: 46,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    borderColor: Semantic.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: { fontSize: Typography.sizes.sm, fontWeight: Typography.weights.semibold, color: Semantic.textSecondary },

  // =========================================================================
  // FOOTER NOTE
  // =========================================================================
  footerNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    marginTop: Spacing.md,
  },
  footerNoteText: {
    fontSize: Typography.sizes['2xs'],
    color: Semantic.textMuted,
  },

  // =========================================================================
  // ADD EXPENSE — "Check with AI" trigger button
  // =========================================================================
  aiCheckBtn: {
    height: 50,
    borderRadius: BorderRadius.lg,
    backgroundColor: Semantic.secondaryBg,
    borderWidth: 1.5,
    borderColor: Colors.intelligenceBlue + '40',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  aiCheckBtnText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Semantic.secondary,
  },
});