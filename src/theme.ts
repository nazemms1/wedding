export const theme = {
   bg: {
     section: 'linear-gradient(160deg, #050E1F 0%, #0A1A3A 30%, #0D1E45 60%, #081530 100%)',
    vignette: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.5) 100%)', 
    glow: 'radial-gradient(ellipse 55% 40% at 50% 50%, rgba(212,175,110,0.08) 0%, transparent 70%)',
  },

  color: {
    gold: '#D4AF6E',
    goldLight: '#EDD98A',
    goldDark: '#C9A84C',
    navy: '#0F2557',
    textOnDark: 'rgba(255,255,255,0.85)',
    textMuted: 'rgba(255,255,255,0.3)',
    tagline: 'rgba(212,175,110,0.65)',
    subtle: 'rgba(212,175,110,0.35)',
  },

  ornament: {
    solid: '#D4AF6E',
    half: 'rgba(212,175,110,0.5)',
    soft: 'rgba(212,175,110,0.45)',
    mid: 'rgba(212,175,110,0.6)',
  },

  font: {
    display: "'Playfair Display', 'Noto Naskh Arabic', Georgia, serif",
    body: "'Lato', 'Noto Naskh Arabic', system-ui, sans-serif",
  },

  shadow: {
    name: '0 0 40px rgba(212,175,110,0.4), 0 0 80px rgba(212,175,110,0.15), 0 2px 20px rgba(0,0,0,0.5)',
  },

  scroll: {
    line: 'linear-gradient(to bottom, #D4AF6E, transparent)',
    label: 'rgba(212,175,110,0.35)',
  },

  dust: ['#D4AF6E', '#F0D080', '#B8924A', 'rgba(212,175,110,0.4)'] as string[],

   corner: {
    strokeOpacity: 0.6,
    innerStrokeOpacity: 0.25,
    dotOpacity: 0.7,
  },

   card: {
     bg: 'rgba(255,255,255,0.04)',
    border: 'rgba(212,175,110,0.15)',
     
    topBar: 'linear-gradient(to right, #D4AF6E, rgba(212,175,110,0.3))',
  },

   button: {
     bg: 'linear-gradient(135deg, #0A1A3A 0%, #0D1E45 100%)',
    border: 'rgba(212,175,110,0.5)',
    text: '#D4AF6E',
    hoverBg: 'rgba(212,175,110,0.1)',
  },
} as const
