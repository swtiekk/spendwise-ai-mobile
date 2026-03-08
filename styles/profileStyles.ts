import { Colors, Semantic } from '@constants/colors';
import { BorderRadius, Shadow, Spacing } from '@constants/spacing';
import { Typography } from '@constants/typography';
import { StyleSheet } from 'react-native';

export const ProfileStyles = StyleSheet.create({

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
  headerTitle: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.extrabold,
    color: Semantic.text,
    letterSpacing: Typography.letterSpacing.tight,
  },
  headerEyebrow: {
    fontSize: Typography.sizes.xs,
    color: Semantic.textMuted,
    fontWeight: Typography.weights.medium,
    letterSpacing: Typography.letterSpacing.wide,
  },

  // ── NEW: Edit Profile button in the header ────────────────────────────────
  headerEditBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Semantic.primaryBg,
    paddingHorizontal: Spacing.md,
    paddingVertical: 7,
    borderRadius: BorderRadius.full,
  },
  headerEditBtnText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Semantic.primary,
  },
  // ─────────────────────────────────────────────────────────────────────────

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
  sectionDotIndigo: {
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
  // USER HERO CARD (navy)
  // =========================================================================
  userHeroCard: {
    backgroundColor: Colors.trustNavy,
    borderRadius: BorderRadius['2xl'],
    padding: Spacing.xl,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.07)',
    ...Shadow.navy,
  },
  userHeroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  avatar: {
    width: 60, height: 60,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.growthTeal,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  avatarText: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.extrabold,
    color: Colors.white,
    letterSpacing: Typography.letterSpacing.tight,
  },
  userNameCol:  { flex: 1 },
  userName: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.extrabold,
    color: Colors.white,
    marginBottom: 3,
  },
  userEmail: {
    fontSize: Typography.sizes.sm,
    color: 'rgba(255,255,255,0.50)',
  },
  userHeroDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.10)',
    marginBottom: Spacing.lg,
  },
  userHeroStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userHeroStatItem:  { alignItems: 'center', flex: 1 },
  userHeroStatLabel: {
    fontSize: Typography.sizes['2xs'],
    color: 'rgba(255,255,255,0.40)',
    fontWeight: Typography.weights.medium,
    textTransform: 'uppercase',
    letterSpacing: Typography.letterSpacing.wide,
    marginBottom: 4,
  },
  userHeroStatValue: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Colors.white,
    textTransform: 'capitalize',
  },
  userHeroStatTeal: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Colors.growthTeal,
  },
  userHeroStatDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.10)',
  },

  // =========================================================================
  // INCOME SETTINGS CARD
  // =========================================================================
  incomeCard: {
    backgroundColor: Semantic.surface,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    ...Shadow.sm,
  },
  incomeCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Semantic.divider,
  },
  incomeCardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  incomeCardTitle: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Semantic.text,
  },
  incomeEditBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    backgroundColor: Semantic.primaryBg,
  },
  incomeEditBtnText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Semantic.primary,
  },
  incomeSaveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    backgroundColor: Semantic.primary,
  },
  incomeSaveBtnText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Colors.white,
  },
  incomeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Semantic.divider,
  },
  incomeRowLast: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  incomeRowLeft:  { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  incomeRowLabel: { fontSize: Typography.sizes.sm, color: Semantic.textSecondary },
  incomeRowValue: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Semantic.text,
  },
  incomePill: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
    backgroundColor: Semantic.primaryBg,
  },
  incomePillText: {
    fontSize: Typography.sizes['2xs'],
    fontWeight: Typography.weights.bold,
    color: Semantic.primary,
    textTransform: 'capitalize',
  },
  incomeEditField: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Semantic.divider,
    gap: Spacing.sm,
  },
  incomeInput: {
    borderWidth: 1.5,
    borderColor: Colors.growthTeal,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    fontSize: Typography.sizes.base,
    color: Semantic.text,
    backgroundColor: Semantic.primaryBg,
  },
  incomeCancelBtn:  { paddingVertical: Spacing.sm, alignItems: 'center' },
  incomeCancelText: {
    fontSize: Typography.sizes.sm,
    color: Semantic.textMuted,
    fontWeight: Typography.weights.medium,
  },

  // =========================================================================
  // SAVINGS GOALS CARD
  // =========================================================================
  goalsCard: {
    backgroundColor: Semantic.surface,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    ...Shadow.sm,
  },
  goalsCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Semantic.divider,
  },
  goalsCardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  goalsCardTitle: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Semantic.text,
  },
  goalsCountBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    backgroundColor: Semantic.primaryBg,
  },
  goalsCountText: {
    fontSize: Typography.sizes['2xs'],
    fontWeight: Typography.weights.bold,
    color: Semantic.primary,
  },
  goalItem: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Semantic.divider,
  },
  goalItemLast: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  goalTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  goalName: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Semantic.text,
  },
  goalPct: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Semantic.primary,
  },
  goalBarBg: {
    height: 6,
    backgroundColor: Semantic.divider,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
  },
  goalBarFill: {
    height: 6,
    backgroundColor: Semantic.primary,
    borderRadius: BorderRadius.full,
  },
  goalAmountsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  goalAmountText: { fontSize: Typography.sizes.xs, color: Semantic.textMuted },

  // =========================================================================
  // NOTIFICATIONS CARD
  // =========================================================================
  notifCard: {
    backgroundColor: Semantic.surface,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    ...Shadow.sm,
  },
  notifCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Semantic.divider,
  },
  notifCardTitle: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Semantic.text,
  },
  notifRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Semantic.divider,
  },
  notifRowLast: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  notifRowLeft:  { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, flex: 1 },
  notifIconWrap: {
    width: 34, height: 34,
    borderRadius: BorderRadius.md,
    backgroundColor: Semantic.secondaryBg,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  notifTextCol: { flex: 1 },
  notifLabel: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.medium,
    color: Semantic.text,
  },
  notifDesc: {
    fontSize: Typography.sizes.xs,
    color: Semantic.textMuted,
    marginTop: 2,
  },

  // =========================================================================
  // SIGN OUT BUTTON
  // =========================================================================
  signOutBtn: {
    height: 54,
    borderRadius: BorderRadius.lg,
    backgroundColor: '#FEF2F2',
    borderWidth: 1.5,
    borderColor: '#FECACA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  signOutBtnText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    color: Colors.error,
  },

  // =========================================================================
  // SIGN OUT MODAL
  // =========================================================================
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  modalCard: {
    backgroundColor: Semantic.surface,
    borderRadius: BorderRadius['2xl'],
    padding: Spacing.xl,
    width: '100%',
    alignItems: 'center',
    ...Shadow.lg,
  },
  modalIconWrap: {
    width: 56, height: 56,
    borderRadius: BorderRadius.full,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  modalTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.extrabold,
    color: Semantic.text,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: Typography.sizes.sm,
    color: Semantic.textSecondary,
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: Spacing.xl,
  },
  modalBtnRow:    { flexDirection: 'row', gap: Spacing.md, width: '100%' },
  modalCancelBtn: {
    flex: 1, height: 48,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    borderColor: Semantic.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCancelText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Semantic.textSecondary,
  },
  modalSignOutBtn: {
    flex: 1, height: 48,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.error,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSignOutText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Colors.white,
  },

  // =========================================================================
  // APP FOOTER
  // =========================================================================
  appFooter: {
    alignItems: 'center',
    gap: 4,
    paddingBottom: Spacing.sm,
  },
  appFooterName: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Semantic.textMuted,
    letterSpacing: Typography.letterSpacing.wide,
  },
  appFooterVersion: {
    fontSize: Typography.sizes['2xs'],
    color: Semantic.textMuted,
  },
});