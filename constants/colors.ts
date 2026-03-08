// ─── Brand Palette ────────────────────────────────────────────────────────────
// These never change. Every other token references these.
export const Colors = {
  // Brand
  trustNavy:         '#1A2B47',
  growthTeal:        '#2DD4BF',
  intelligenceBlue:  '#6366F1',
  alertAmber:        '#F59E0B',
  softSlate:         '#F8FAFC',

  // Neutrals
  white:   '#FFFFFF',
  black:   '#000000',
  gray50:  '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',

  // Semantic status
  success:    '#22C55E',
  successBg:  '#F0FDF4',
  warning:    '#F59E0B',
  warningBg:  '#FFFBEB',
  error:      '#EF4444',
  errorBg:    '#FFF1F2',
  errorText:  '#991B1B',
  info:       '#3B82F6',
  infoBg:     '#EFF6FF',

  // Tints (used for icon backgrounds, chip fills, etc.)
  tealBg:   '#F0FDFB',
  indigoBg: '#EEF2FF',
  navyBg:   '#EEF2F7',
} as const;

// ─── Semantic Tokens ──────────────────────────────────────────────────────────
// Use these in components — never raw hex values outside of this file.
export const Semantic = {
  // Surfaces
  background: Colors.softSlate,
  surface:    Colors.white,
  surfaceAlt: Colors.gray50,

  // Text hierarchy
  text:          Colors.trustNavy,
  textSecondary: Colors.gray600,
  textMuted:     Colors.gray500,
  textOnDark:    Colors.white,
  textOnDarkMuted: 'rgba(255,255,255,0.55)',

  // Borders
  border:  Colors.gray200,
  divider: Colors.gray100,

  // Brand actions
  primary:   Colors.growthTeal,
  primaryBg: Colors.tealBg,
  secondary: Colors.intelligenceBlue,
  secondaryBg: Colors.indigoBg,

  // State colors
  warning:   Colors.alertAmber,
  warningBg: Colors.warningBg,
  error:     Colors.error,
  errorBg:   Colors.errorBg,
  success:   Colors.success,
  successBg: Colors.successBg,

  // Card / hero
  cardHeroBg:     Colors.trustNavy,
  cardHeroBorder: 'rgba(255,255,255,0.08)',
  cardHeroMuted:  'rgba(255,255,255,0.45)',
  cardHeroSubtle: 'rgba(255,255,255,0.1)',
} as const;