// ─── Typography Scale ─────────────────────────────────────────────────────────
export const Typography = {
  sizes: {
    '2xs': 10,
    xs:    12,
    sm:    14,
    base:  16,
    lg:    18,
    xl:    20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 40,
  },
  weights: {
    light:    '300' as const,
    normal:   '400' as const,
    medium:   '500' as const,
    semibold: '600' as const,
    bold:     '700' as const,
    extrabold:'800' as const,
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