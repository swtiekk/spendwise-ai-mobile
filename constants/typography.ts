import { ms } from '../utils/scale';

// ─── Typography Scale ─────────────────────────────────────────────────────────
export const Typography = {
  sizes: {
    '2xs': ms(10),
    xs:    ms(12),
    sm:    ms(14),
    base:  ms(16),
    lg:    ms(18),
    xl:    ms(20),
    '2xl': ms(24),
    '3xl': ms(28),
    '4xl': ms(32),
    '5xl': ms(40),
  },
  weights: {
    light:     '300' as const,
    normal:    '400' as const,
    medium:    '500' as const,
    semibold:  '600' as const,
    bold:      '700' as const,
    extrabold: '800' as const,
  },
  lineHeights: {
    tight:   1.2,
    snug:    1.35,
    normal:  1.5,
    relaxed: 1.75,
  },
  letterSpacing: {
    tight:  -0.5,
    normal:  0,
    wide:    0.3,
    wider:   1.5,
    widest:  2.5,
  },
} as const;