import { Colors, Semantic } from '@constants/colors';
import { BorderRadius, Shadow, Spacing } from '@constants/spacing';
import { Typography } from '@constants/typography';
import { StyleSheet } from 'react-native';

export const DashboardStyles = StyleSheet.create({

  // =========================================================================
  // SCREEN
  // =========================================================================
  screen:        { flex: 1, backgroundColor: Semantic.background },
  scroll:        { flex: 1 },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: 40,
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
  headerLeft:     { gap: 2 },
  headerGreeting: {
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
  headerAvatar: {
    width: 40, height: 40,
    borderRadius: BorderRadius.lg,
    backgroundColor: Semantic.text,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadow.md,
  },

  // =========================================================================
  // DATE RANGE FILTER TABS
  // =========================================================================
  filterRow: {
    flexDirection: 'row',
    backgroundColor: Semantic.surface,
    borderRadius: BorderRadius.xl,
    padding: 4,
    ...Shadow.sm,
  },
  filterTab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    borderRadius: BorderRadius.lg,
  },
  filterTabActive: {
    backgroundColor: Colors.trustNavy,
    ...Shadow.navy,
  },
  filterTabText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
    color: Semantic.textMuted,
  },
  filterTabTextActive: {
    color: Colors.white,
    fontWeight: Typography.weights.bold,
  },

  // =========================================================================
  // QUICK EXPENSE SHORTCUTS
  // =========================================================================
  quickRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  quickItem: {
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  quickIconWrap: {
    width: 52, height: 52,
    borderRadius: BorderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Semantic.border,
  },
  quickIconWrapActive: {
    borderColor: 'transparent',
  },
  quickLabel: {
    fontSize: Typography.sizes['2xs'],
    color: Semantic.textMuted,
    fontWeight: Typography.weights.medium,
    textAlign: 'center',
  },

  // =========================================================================
  // SECTION LABEL
  // =========================================================================
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  sectionDot:      { width: 6, height: 6, borderRadius: BorderRadius.full, backgroundColor: Semantic.primary },
  sectionTitle: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Semantic.text,
    letterSpacing: Typography.letterSpacing.wider,
    textTransform: 'uppercase',
  },
  sectionAction: {
    fontSize: Typography.sizes.xs,
    color: Semantic.primary,
    fontWeight: Typography.weights.semibold,
  },

  // =========================================================================
  // BALANCE CARD
  // =========================================================================
  balanceCard: {
    backgroundColor: Semantic.cardHeroBg,
    borderRadius: BorderRadius['2xl'],
    padding: Spacing.xl,
    borderTopWidth: 1,
    borderTopColor: Semantic.cardHeroBorder,
    ...Shadow.navy,
  },
  balanceTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  balanceLiveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Semantic.cardHeroSubtle,
    paddingHorizontal: Spacing.md,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
  },
  balanceLiveDot:  { width: 6, height: 6, borderRadius: BorderRadius.full, backgroundColor: Semantic.primary },
  balanceLiveText: {
    fontSize: Typography.sizes.xs,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: Typography.weights.semibold,
  },
  balanceWalletIcon: { opacity: 0.3 },
  balanceLabel: {
    fontSize: Typography.sizes.xs,
    color: Semantic.cardHeroMuted,
    fontWeight: Typography.weights.medium,
    letterSpacing: Typography.letterSpacing.wide,
    marginBottom: Spacing.xs,
  },
  balanceAmountRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: Spacing.xl },
  balanceCurrency: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.white,
    marginTop: 6,
    marginRight: 3,
    opacity: 0.7,
  },
  balanceAmount: {
    fontSize: Typography.sizes['4xl'],
    fontWeight: Typography.weights.extrabold,
    color: Colors.white,
    letterSpacing: Typography.letterSpacing.tight,
  },
  balanceDivider:    { height: 1, backgroundColor: Semantic.cardHeroBorder, marginBottom: Spacing.lg },
  balanceFooterRow:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  balanceFooterItem: { gap: 3 },
  balanceFooterLabel: {
    fontSize: Typography.sizes['2xs'],
    color: Semantic.cardHeroMuted,
    fontWeight: Typography.weights.medium,
  },
  balanceFooterValue: {
    fontSize: Typography.sizes.sm,
    color: Colors.white,
    fontWeight: Typography.weights.bold,
  },
  balanceFooterTeal: {
    fontSize: Typography.sizes.sm,
    color: Semantic.primary,
    fontWeight: Typography.weights.bold,
  },

  // =========================================================================
  // STATS ROW
  // =========================================================================
  statsRow: { flexDirection: 'row', gap: Spacing.md },
  statCard: {
    flex: 1,
    backgroundColor: Semantic.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    ...Shadow.sm,
  },
  statIconWrap: {
    width: 36, height: 36,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  statLabel: {
    fontSize: Typography.sizes.xs,
    color: Semantic.textMuted,
    fontWeight: Typography.weights.medium,
    marginBottom: 3,
  },
  statValue: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.extrabold,
    color: Semantic.text,
  },
  statSubtext: {
    fontSize: Typography.sizes.xs,
    color: Semantic.textMuted,
    marginTop: 2,
  },

  // =========================================================================
  // SUSTAINABILITY STATUS CARD
  // =========================================================================
  sustainCard: {
    backgroundColor: Semantic.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    ...Shadow.sm,
  },
  sustainTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  sustainLabel: {
    fontSize: Typography.sizes.xs,
    color: Semantic.textMuted,
    fontWeight: Typography.weights.medium,
    marginBottom: 4,
  },
  sustainDaysRow:  { flexDirection: 'row', alignItems: 'baseline', gap: 5 },
  sustainDays: {
    fontSize: Typography.sizes['3xl'],
    fontWeight: Typography.weights.extrabold,
    color: Semantic.text,
  },
  sustainDaysSub: {
    fontSize: Typography.sizes.sm,
    color: Semantic.textMuted,
  },
  sustainRiskBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
  },
  sustainRiskText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
  },
  sustainTrack: {
    height: 6,
    backgroundColor: Semantic.border,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
  },
  sustainFill: { height: 6, borderRadius: BorderRadius.full },
  sustainFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  sustainFooterText: {
    fontSize: Typography.sizes.xs,
    color: Semantic.textMuted,
  },

  // =========================================================================
  // SPENDING BREAKDOWN CARD
  // =========================================================================
  spendingCard: {
    backgroundColor: Semantic.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    ...Shadow.sm,
  },
  spendingTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: Spacing.lg,
    paddingBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Semantic.divider,
  },
  spendingTotalLabel:     { fontSize: Typography.sizes.xs, color: Semantic.textMuted, marginBottom: 3 },
  spendingTotalAmount:    { fontSize: Typography.sizes['2xl'], fontWeight: Typography.weights.extrabold, color: Semantic.text },
  spendingTotalCycleLabel:{ fontSize: Typography.sizes.xs, color: Semantic.textMuted },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Semantic.divider,
  },
  categoryRowLast: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.md },
  categoryIconWrap: {
    width: 38, height: 38,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  categoryInfo:    { flex: 1 },
  categoryName:    { fontSize: Typography.sizes.sm, fontWeight: Typography.weights.semibold, color: Semantic.text, marginBottom: 5 },
  categoryBar:     { height: 4, borderRadius: BorderRadius.full, backgroundColor: Semantic.border, overflow: 'hidden' },
  categoryFill:    { height: 4, borderRadius: BorderRadius.full },
  categoryRight:   { alignItems: 'flex-end', marginLeft: Spacing.md },
  categoryAmount:  { fontSize: Typography.sizes.sm, fontWeight: Typography.weights.bold, color: Semantic.text },
  categoryPct:     { fontSize: Typography.sizes.xs, color: Semantic.textMuted, marginTop: 2 },

  // =========================================================================
  // ALERTS LIST CARD
  // =========================================================================
  alertsCard: {
    backgroundColor: Semantic.surface,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    ...Shadow.sm,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Semantic.divider,
  },
  alertItemLast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  alertIconWrap: {
    width: 36, height: 36,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  alertContent:  { flex: 1 },
  alertTitle:    { fontSize: Typography.sizes.sm, fontWeight: Typography.weights.semibold, color: Semantic.text, marginBottom: 2 },
  alertMessage:  { fontSize: Typography.sizes.xs, color: Semantic.textSecondary, lineHeight: 17 },
  alertEmptyWrap:  { alignItems: 'center', paddingVertical: Spacing.xxl, gap: Spacing.sm },
  alertEmptyTitle: { fontSize: Typography.sizes.sm, fontWeight: Typography.weights.semibold, color: Semantic.text },
  alertEmptyText:  { fontSize: Typography.sizes.xs, color: Semantic.textMuted, textAlign: 'center', paddingHorizontal: Spacing.xl },

  // =========================================================================
  // INCOME INFO CARD
  // =========================================================================
  incomeCard: {
    backgroundColor: Semantic.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    ...Shadow.sm,
  },
  incomeTopRow:    { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  incomeLeft:      { gap: 4 },
  incomeLabel:     { fontSize: Typography.sizes.xs, color: Semantic.textMuted, fontWeight: Typography.weights.medium },
  incomeAmount:    { fontSize: Typography.sizes['2xl'], fontWeight: Typography.weights.extrabold, color: Semantic.text },
  incomeMetaRow:   { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginTop: 2 },
  incomePill:      { paddingHorizontal: Spacing.sm, paddingVertical: 3, borderRadius: BorderRadius.sm, backgroundColor: Semantic.primaryBg },
  incomePillText:  { fontSize: Typography.sizes.xs, fontWeight: Typography.weights.semibold, color: Semantic.primary },
  incomeSeparator: { width: 3, height: 3, borderRadius: BorderRadius.full, backgroundColor: Semantic.border },
  incomeCycleText: { fontSize: Typography.sizes.xs, color: Semantic.textMuted },
  incomeIconWrap:  { width: 48, height: 48, borderRadius: BorderRadius.lg, backgroundColor: Semantic.primaryBg, justifyContent: 'center', alignItems: 'center' },
  incomeDivider:   { height: 1, backgroundColor: Semantic.divider, marginVertical: Spacing.lg },
  incomeNextRow:   { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  incomeNextLabel: { fontSize: Typography.sizes.xs, color: Semantic.textMuted },
  incomeNextDate:  { fontSize: Typography.sizes.sm, fontWeight: Typography.weights.bold, color: Semantic.text },

  // =========================================================================
  // ERROR STATE
  // =========================================================================
  errorState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.xxl,
  },
  errorStateTitle:   { fontSize: Typography.sizes.lg, fontWeight: Typography.weights.bold, color: Semantic.text },
  errorStateMessage: { fontSize: Typography.sizes.sm, color: Semantic.textMuted, textAlign: 'center', lineHeight: 21 },

  // =========================================================================
  // LOADING SKELETON
  // =========================================================================
  skeletonWrap:  { flex: 1, padding: Spacing.lg, gap: Spacing.lg },
  skeletonBlock: { borderRadius: BorderRadius.xl, backgroundColor: Semantic.border },
});