// Bisher theme: navy + silver + sky blue — no gold
export const theme = {
  bg: {
    section: 'linear-gradient(160deg, #040D1E 0%, #071628 30%, #0A1E3A 60%, #051020 100%)',
    vignette: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)',
    glow: 'radial-gradient(ellipse 55% 40% at 50% 50%, rgba(56,189,248,0.08) 0%, rgba(148,163,184,0.03) 60%, transparent 100%)',
  },

  color: {
    
    gold: '#38BDF8',
    goldLight: '#7DD3FC',
    goldDark: '#0EA5E9',
     skyBlue: '#38BDF8',
    skyBlueLight: '#7DD3FC',
    skyBlueDark: '#0EA5E9',
     silver: '#CBD5E1',
    silverLight: '#E2E8F0',
    silverDark: '#94A3B8',
     navy: '#071628',
    textOnDark: 'rgba(255,255,255,0.88)',
    textMuted: 'rgba(203,213,225,0.45)',
    tagline: 'rgba(56,189,248,0.75)',
    subtle: 'rgba(148,163,184,0.45)',
  },

  ornament: {
    solid: '#38BDF8',
    half: 'rgba(56,189,248,0.5)',
    soft: 'rgba(56,189,248,0.35)',
    mid: 'rgba(56,189,248,0.6)',
     skyHalf: 'rgba(56,189,248,0.4)',
    skySoft: 'rgba(56,189,248,0.25)',
  },

  font: {
    display: "'Playfair Display', 'Noto Naskh Arabic', Georgia, serif",
    body: "'Lato', 'Noto Naskh Arabic', system-ui, sans-serif",
  },

  shadow: {
    name: '0 0 40px rgba(56,189,248,0.3), 0 0 80px rgba(56,189,248,0.1), 0 2px 20px rgba(0,0,0,0.5)',
  },

  scroll: {
    line: 'linear-gradient(to bottom, #38BDF8, transparent)',
    label: 'rgba(56,189,248,0.4)',
  },

  dust: ['#38BDF8', '#7DD3FC', '#CBD5E1', 'rgba(56,189,248,0.4)'] as string[],

  corner: {
    strokeOpacity: 0.6,
    innerStrokeOpacity: 0.25,
    dotOpacity: 0.7,
  },

  card: {
    bg: 'rgba(255,255,255,0.04)',
    border: 'rgba(56,189,248,0.2)',
    topBar: 'linear-gradient(to right, #38BDF8, rgba(148,163,184,0.4))',
  },

  button: {
    bg: 'linear-gradient(135deg, #071628 0%, #0A1E3A 100%)',
    border: 'rgba(56,189,248,0.55)',
    text: '#38BDF8',
    hoverBg: 'rgba(56,189,248,0.1)',
  },
} as const
