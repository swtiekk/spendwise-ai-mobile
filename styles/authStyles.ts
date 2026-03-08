import { StyleSheet } from 'react-native';

// ─── SpendWise AI · Design Tokens ────────────────────────────────────────────
export const Colors = {
  navy:     '#1A2B47',
  teal:     '#2DD4BF',
  indigo:   '#6366F1',
  amber:    '#F59E0B',
  slate:    '#F8FAFC',
  white:    '#FFFFFF',
  border:   '#E2E8F0',
  muted:    '#64748B',
  subtle:   '#94A3B8',
  label:    '#374151',
  red:      '#EF4444',
  redBg:    '#FFF1F2',
  redText:  '#991B1B',
  tealBg:   '#F0FDFB',
  inputBg:  '#F8FAFC',
  indigoBg: '#EEF2FF',
};

export const authStyles = StyleSheet.create({

  // =========================================================================
  // SHARED — used by both login.tsx and register.tsx
  // =========================================================================

  // ── Root & scroll ─────────────────────────────────────────────────────────
  root:   { flex: 1, backgroundColor: Colors.slate },
  scroll: { flexGrow: 1, paddingBottom: 44 },

  // ── 3-px teal accent bar ──────────────────────────────────────────────────
  accentBar: { width: '100%', height: 3, backgroundColor: Colors.teal },

  // ── Brand block (full — used by login) ───────────────────────────────────
  brand:    { alignItems: 'center', paddingTop: 48, paddingBottom: 32 },
  brandIcon: {
    width: 54, height: 54, borderRadius: 16,
    backgroundColor: Colors.navy,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 14,
    shadowColor: Colors.navy,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18, shadowRadius: 10, elevation: 6,
  },
  brandName: {
    fontSize: 26, fontWeight: '800',
    color: Colors.navy, letterSpacing: 0.3,
  },
  brandTagline: {
    fontSize: 10, fontWeight: '700',
    color: Colors.indigo, letterSpacing: 2.5, marginTop: 4,
  },

  // ── Card ──────────────────────────────────────────────────────────────────
  card: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    marginHorizontal: 20,
    paddingHorizontal: 26,
    paddingVertical: 30,
    shadowColor: Colors.navy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07, shadowRadius: 20, elevation: 3,
  },
  cardTitle: {
    fontSize: 22, fontWeight: '800',
    color: Colors.navy, letterSpacing: 0.1, marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 13.5, color: Colors.muted,
    lineHeight: 21, marginBottom: 24,
  },

  // ── Error banner ──────────────────────────────────────────────────────────
  errorBox: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.redBg, borderRadius: 10,
    borderLeftWidth: 3, borderLeftColor: Colors.red,
    paddingHorizontal: 13, paddingVertical: 11,
    marginBottom: 20, gap: 9,
  },
  errorText: { flex: 1, fontSize: 13, color: Colors.redText, lineHeight: 19 },

  // ── Field ─────────────────────────────────────────────────────────────────
  fieldGroup: { marginBottom: 16 },
  label: {
    fontSize: 12.5, fontWeight: '600',
    color: Colors.label, marginBottom: 7, letterSpacing: 0.1,
  },
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.inputBg, borderRadius: 11,
    borderWidth: 1.5, borderColor: Colors.border,
    paddingHorizontal: 13, height: 50,
  },
  inputFocused: { borderColor: Colors.teal, backgroundColor: Colors.tealBg },
  inputErr:     { borderColor: Colors.red,  backgroundColor: '#FFF8F8' },
  inputIcon:    { marginRight: 10 },
  inputText:    { flex: 1, fontSize: 15, color: Colors.navy, height: '100%' },
  fieldError:   { fontSize: 11.5, color: Colors.red, marginTop: 5, marginLeft: 2 },

  // ── Forgot password ───────────────────────────────────────────────────────
  forgotRow: {
    alignSelf: 'flex-end', marginBottom: 24,
    marginTop: -4, paddingVertical: 2,
  },
  forgotText: { fontSize: 13, color: Colors.indigo, fontWeight: '600' },

  // ── Primary CTA button ────────────────────────────────────────────────────
  cta: {
    height: 52, borderRadius: 13,
    backgroundColor: Colors.teal,
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 8,
    shadowColor: Colors.teal,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.28, shadowRadius: 10, elevation: 5,
  },
  ctaDisabled: { opacity: 0.6, shadowOpacity: 0, elevation: 0 },
  ctaText: {
    fontSize: 15.5, fontWeight: '700',
    color: Colors.white, letterSpacing: 0.3,
  },

  // ── Divider ───────────────────────────────────────────────────────────────
  dividerRow: {
    flexDirection: 'row', alignItems: 'center',
    marginVertical: 22, gap: 12,
  },
  dividerLine:  { flex: 1, height: 1, backgroundColor: Colors.border },
  dividerLabel: { fontSize: 11, color: Colors.subtle, fontWeight: '600', letterSpacing: 1.5 },

  // ── Footer / nav link ─────────────────────────────────────────────────────
  registerRow:  { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  registerText: { fontSize: 13.5, color: Colors.muted },
  registerLink: { fontSize: 13.5, fontWeight: '700', color: Colors.teal },

  // ── Secure note ───────────────────────────────────────────────────────────
  secureRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 5, marginTop: 26,
  },
  secureNote: { fontSize: 11.5, color: Colors.subtle, letterSpacing: 0.3 },

  // ── Loading dim overlay ───────────────────────────────────────────────────
  formDimmed: { opacity: 0.5 },


  // =========================================================================
  // REGISTER ONLY — register.tsx exclusive styles
  // =========================================================================

  // ── Header row (back button + inline brand) ───────────────────────────────
  regHeaderRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 16, paddingBottom: 4,
  },
  regBackBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: Colors.white,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: Colors.navy, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07, shadowRadius: 6, elevation: 2,
  },
  regHeaderBrand:    { flexDirection: 'row', alignItems: 'center', gap: 8 },
  regBrandIconSmall: {
    width: 28, height: 28, borderRadius: 8,
    backgroundColor: Colors.navy,
    justifyContent: 'center', alignItems: 'center',
  },
  regBrandNameSmall: { fontSize: 15, fontWeight: '800', color: Colors.navy },

  // ── Page heading (sits above card) ────────────────────────────────────────
  regHeading: {
    paddingHorizontal: 20, paddingTop: 24, paddingBottom: 20,
  },
  regHeadingTitle: {
    fontSize: 24, fontWeight: '800',
    color: Colors.navy, marginBottom: 6,
  },
  regHeadingSubtitle: {
    fontSize: 14, color: Colors.muted, lineHeight: 21,
  },

  // ── Card override for register (slightly less vertical padding) ───────────
  regCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    marginHorizontal: 20,
    paddingHorizontal: 26,
    paddingVertical: 26,
    shadowColor: Colors.navy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07, shadowRadius: 20, elevation: 3,
  },

  // ── Section divider (Personal Info / Income Setup) ────────────────────────
  sectionHeader: {
    flexDirection: 'row', alignItems: 'center',
    gap: 8, marginBottom: 16,
  },
  sectionHeaderSpaced: {
    flexDirection: 'row', alignItems: 'center',
    gap: 8, marginBottom: 16, marginTop: 8,
  },
  sectionDot:   { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.teal },
  sectionDotAI: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.indigo },
  sectionTitle: {
    fontSize: 12, fontWeight: '700',
    color: Colors.navy, letterSpacing: 1, textTransform: 'uppercase',
  },
  sectionNote: {
    fontSize: 12.5, color: Colors.muted,
    marginTop: -10, marginBottom: 16, lineHeight: 19,
  },

  // ── Password strength bar ─────────────────────────────────────────────────
  strengthRow:  { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 8 },
  strengthBar:  { flex: 1, height: 3, borderRadius: 2 },
  strengthLabel:{ fontSize: 11, fontWeight: '600', marginLeft: 4 },

  // ── Income type / cycle chip selectors ────────────────────────────────────
  chipRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  chip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, paddingVertical: 9,
    borderRadius: 10, borderWidth: 1.5,
    borderColor: Colors.border, backgroundColor: Colors.white,
  },
  chipActive:     { backgroundColor: Colors.navy, borderColor: Colors.navy },
  chipText:       { fontSize: 13, fontWeight: '600', color: Colors.muted },
  chipTextActive: { color: Colors.white },

  // ── CTA with top margin for register card ─────────────────────────────────
  regCta: {
    height: 52, borderRadius: 13,
    backgroundColor: Colors.teal,
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 8, marginTop: 8,
    shadowColor: Colors.teal, shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.28, shadowRadius: 10, elevation: 5,
  },
});