// ── SpendWise AI — Animation Constants ───────────────────

export const Animations = {
  // Durations (ms)
  duration: {
    instant:  100,
    fast:     200,
    normal:   300,
    slow:     500,
    verySlow: 800,
  },

  // Spring configs
  spring: {
    gentle: {
      damping:   15,
      stiffness: 100,
      mass:      1,
    },
    bouncy: {
      damping:   8,
      stiffness: 180,
      mass:      1,
    },
    snappy: {
      damping:   20,
      stiffness: 250,
      mass:      0.8,
    },
  },

  // Easing names (for reference with Animated.timing)
  easing: {
    ease:     'ease',
    easeIn:   'ease-in',
    easeOut:  'ease-out',
    linear:   'linear',
  },

  // Fade presets
  fade: {
    in:  { from: 0, to: 1 },
    out: { from: 1, to: 0 },
  },

  // Slide presets (translateY)
  slide: {
    fromBottom: { from: 100, to: 0 },
    fromTop:    { from: -100, to: 0 },
  },

  // Scale presets
  scale: {
    press:  { from: 1, to: 0.95 },
    pop:    { from: 0, to: 1 },
  },
} as const;
