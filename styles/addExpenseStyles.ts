import { Colors, Semantic } from '@constants/colors';
import { BorderRadius, Shadow, Spacing } from '@constants/spacing';
import { Typography } from '@constants/typography';
import { StyleSheet } from 'react-native';

export const AddExpenseStyles = StyleSheet.create({

  // =========================================================================
  // SCREEN
  // =========================================================================
  screen:        { flex: 1, backgroundColor: Semantic.background },
  scroll:        { flex: 1 },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,  // was 52 — tightened so no dead space at bottom
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
  headerBackBtn: {
    width: 38, height: 38,
    borderRadius: BorderRadius.md,
    backgroundColor: Semantic.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Semantic.divider,
  },
  headerCloseBtn: {
    width: 38, height: 38,
    borderRadius: BorderRadius.md,
    backgroundColor: Semantic.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Semantic.divider,
  },
  headerResetBtn: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  headerResetText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Semantic.textMuted,
  },

  // =========================================================================
  // SECTION HEADER (dot + uppercase label)
  // =========================================================================
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  sectionDot: {
    width: 6, height: 6,
    borderRadius: BorderRadius.full,
    backgroundColor: Semantic.primary,
  },
  sectionTitle: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Semantic.text,
    letterSpacing: Typography.letterSpacing.wider,
    textTransform: 'uppercase',
  },

  // =========================================================================
  // AMOUNT CARD (dark navy hero)
  // =========================================================================
  amountCard: {
    backgroundColor: Colors.trustNavy,
    borderRadius: BorderRadius['2xl'],
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.07)',
    ...Shadow.navy,
  },
  amountCardLabel: {
    fontSize: Typography.sizes.xs,
    color: 'rgba(255,255,255,0.45)',
    fontWeight: Typography.weights.medium,
    letterSpacing: Typography.letterSpacing.wider,
    textTransform: 'uppercase',
    marginBottom: Spacing.md,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  amountCurrency: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: 'rgba(255,255,255,0.55)',
    marginTop: 10,
    marginRight: 4,
  },
  amountInput: {
    fontSize: Typography.sizes['4xl'],
    fontWeight: Typography.weights.extrabold,
    color: Colors.white,
    letterSpacing: Typography.letterSpacing.tight,
    minWidth: 80,
    textAlign: 'center',
  },
  amountInputError: { color: Colors.error },
  amountError: {
    fontSize: Typography.sizes.xs,
    color: 'rgba(239,68,68,0.85)',
    marginTop: Spacing.sm,
  },
  amountHint: {
    fontSize: Typography.sizes.xs,
    color: 'rgba(255,255,255,0.28)',
    marginTop: Spacing.sm,
  },

  // =========================================================================
  // SECTION CARD
  // =========================================================================
  sectionCard: {
    backgroundColor: Semantic.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    ...Shadow.sm,
  },
  sectionLabel: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Semantic.text,
    letterSpacing: Typography.letterSpacing.wider,
    textTransform: 'uppercase',
    marginBottom: Spacing.md,
  },

  // =========================================================================
  // CATEGORY SELECTOR
  // =========================================================================
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  categoryItem: {
    width: '22%',
    aspectRatio: 1,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    borderColor: Semantic.border,
    backgroundColor: Semantic.background,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  categoryItemSelected: {
    borderColor: Colors.growthTeal,
    backgroundColor: Semantic.primaryBg,
  },
  categoryItemName: {
    fontSize: Typography.sizes['2xs'],
    color: Semantic.textMuted,
    fontWeight: Typography.weights.medium,
    textAlign: 'center',
  },
  categoryItemNameSelected: {
    color: Colors.growthTeal,
    fontWeight: Typography.weights.bold,
  },
  categoryError: {
    fontSize: Typography.sizes.xs,
    color: Semantic.error,
    marginTop: Spacing.sm,
  },

  // =========================================================================
  // DESCRIPTION INPUT
  // =========================================================================
  descInput: {
    borderWidth: 1.5,
    borderColor: Semantic.border,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    fontSize: Typography.sizes.sm,
    color: Semantic.text,
    backgroundColor: Semantic.background,
    minHeight: 90,
    textAlignVertical: 'top',
    lineHeight: 21,
  },
  descInputFocused: {
    borderColor: Colors.growthTeal,
    backgroundColor: Semantic.primaryBg,
  },
  descCharCount: {
    fontSize: Typography.sizes.xs,
    color: Semantic.textMuted,
    textAlign: 'right',
    marginTop: 5,
  },

  // =========================================================================
  // BUTTONS
  // =========================================================================
  buttonRow: { flexDirection: 'row', gap: Spacing.md },
  submitBtn: {
    flex: 1,
    height: 54,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.growthTeal,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    ...Shadow.teal,
  },
  submitBtnDisabled: { opacity: 0.55, elevation: 0, shadowOpacity: 0 },
  submitBtnText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    color: Colors.white,
  },
  cancelBtn: {
    flex: 1,
    height: 54,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    borderColor: Semantic.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Semantic.textSecondary,
  },

  // =========================================================================
  // SUCCESS NOTIFICATION
  // =========================================================================
  successWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Semantic.successBg,
    borderRadius: BorderRadius.xl,
    borderLeftWidth: 3,
    borderLeftColor: Semantic.success,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
    ...Shadow.sm,
  },
  successIconWrap: {
    width: 36, height: 36,
    borderRadius: BorderRadius.md,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  successContent: { flex: 1 },
  successTitle: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: '#065F46',
    marginBottom: 2,
  },
  successMessage: {
    fontSize: Typography.sizes.xs,
    color: '#047857',
    lineHeight: 17,
  },

  // =========================================================================
  // SHARED UI — Button
  // =========================================================================
  btnBase:      { borderRadius: BorderRadius.lg, justifyContent: 'center', alignItems: 'center' },
  btnPrimary:   { backgroundColor: Semantic.primary },
  btnSecondary: { backgroundColor: Semantic.secondary },
  btnDanger:    { backgroundColor: Colors.error },
  btnOutline:   { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: Semantic.primary },
  btnSm: { paddingVertical: Spacing.sm,  paddingHorizontal: Spacing.md,  minHeight: 36 },
  btnMd: { paddingVertical: Spacing.md,  paddingHorizontal: Spacing.lg,  minHeight: 44 },
  btnLg: { paddingVertical: Spacing.lg,  paddingHorizontal: Spacing.xl,  minHeight: 52 },
  btnDisabled:    { opacity: 0.5 },
  btnText:        { fontSize: Typography.sizes.base, fontWeight: Typography.weights.semibold },
  btnTextOnDark:  { color: Colors.white },
  btnTextOnLight: { color: Semantic.primary },

  // =========================================================================
  // SHARED UI — Input
  // =========================================================================
  inputContainer:    {},
  inputLabel: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
    color: Semantic.text,
    marginBottom: 7,
    letterSpacing: Typography.letterSpacing.wide,
  },
  inputField: {
    borderWidth: 1.5,
    borderColor: Semantic.border,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    fontSize: Typography.sizes.base,
    color: Semantic.text,
    backgroundColor: Semantic.surface,
    minHeight: 50,
  },
  inputFieldError:   { borderColor: Colors.error,      backgroundColor: '#FFF8F8' },
  inputFieldFocused: { borderColor: Colors.growthTeal, backgroundColor: Semantic.primaryBg },
  inputErrorText: {
    fontSize: Typography.sizes.xs,
    color: Colors.error,
    marginTop: 5,
    marginLeft: 2,
  },
});