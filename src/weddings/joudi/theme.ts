const PRIMARY        = '#D4AF6E'   // main accent (gold)
const PRIMARY_LIGHT  = '#EDD98A'   // lighter accent (for large headings)
const PRIMARY_DARK   = '#C9A84C'   // darker accent (secondary headings)
const PRIMARY_BRIGHT = '#F0D080'   // brightest highlight (dust particle)
const BG_DEEP        = '#050E1F'   // deepest background
const BG_MID         = '#0A1A3A'   // mid-dark background
const BG_CARD        = '#0D1E45'   // card/section background
const BG_BASE        = '#081530'   // base background

export const scrollbarColors = {
  main: {
    track:   BG_DEEP,
    thumb1:  PRIMARY,
    thumb2:  PRIMARY_DARK,
    thumb3:  '#B8924A',
  },
}

export const theme = {
  bg: {
    section: `linear-gradient(160deg, ${BG_DEEP} 0%, ${BG_MID} 30%, ${BG_CARD} 60%, ${BG_BASE} 100%)`,
    vignette: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.5) 100%)',
    glow: `radial-gradient(ellipse 55% 40% at 50% 50%, rgba(212,175,110,0.08) 0%, transparent 70%)`,
  },

  color: {
    gold:        PRIMARY,
    goldLight:   PRIMARY_LIGHT,
    goldDark:    PRIMARY_DARK,
    navy:        '#0F2557',
    textOnDark:  'rgba(255,255,255,0.85)',
    textMuted:   'rgba(255,255,255,0.3)',
    tagline:     'rgba(212,175,110,0.65)',
    subtle:      'rgba(212,175,110,0.35)',
  },

  ornament: {
    solid: PRIMARY,
    half:  'rgba(212,175,110,0.5)',
    soft:  'rgba(212,175,110,0.45)',
    mid:   'rgba(212,175,110,0.6)',
  },

  font: {
    display: "'Playfair Display', 'Noto Naskh Arabic', Georgia, serif",
    body:    "'Lato', 'Noto Naskh Arabic', system-ui, sans-serif",
  },

  shadow: {
    name: `0 0 40px rgba(212,175,110,0.4), 0 0 80px rgba(212,175,110,0.15), 0 2px 20px rgba(0,0,0,0.5)`,
  },

  scroll: {
    line:  `linear-gradient(to bottom, ${PRIMARY}, transparent)`,
    label: 'rgba(212,175,110,0.35)',
  },

  dust: [PRIMARY, PRIMARY_BRIGHT, PRIMARY_DARK, 'rgba(212,175,110,0.4)'] as string[],

  corner: {
    strokeOpacity:      0.6,
    innerStrokeOpacity: 0.25,
    dotOpacity:         0.7,
  },

  card: {
    bg:     'rgba(255,255,255,0.04)',
    border: 'rgba(212,175,110,0.15)',
    topBar: `linear-gradient(to right, ${PRIMARY}, rgba(212,175,110,0.3))`,
  },

  button: {
    bg:      `linear-gradient(135deg, ${BG_MID} 0%, ${BG_CARD} 100%)`,
    border:  'rgba(212,175,110,0.5)',
    text:    PRIMARY,
    hoverBg: 'rgba(212,175,110,0.1)',
  },
} as const
