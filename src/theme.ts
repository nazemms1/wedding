/**
 * WEDDING THEME — Single source of truth for all colors and styles.
 * Edit values here and every section updates automatically.
 */

export const theme = {
  // ─── Backgrounds ──────────────────────────────────────────────────────────
  bg: {
    /** Main section background gradient (navy) */
    section: 'linear-gradient(160deg, #050E1F 0%, #0A1A3A 30%, #0D1E45 60%, #081530 100%)',
    /** Vignette overlay — darkens edges, keeps focus center */
    vignette: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.5) 100%)',
    /** Subtle gold glow in section center */
    glow: 'radial-gradient(ellipse 55% 40% at 50% 50%, rgba(212,175,110,0.08) 0%, transparent 70%)',
  },

  // ─── Brand colors ─────────────────────────────────────────────────────────
  color: {
    /** Primary gold — headings, labels, ornaments */
    gold: '#D4AF6E',
    /** Lighter gold — large display names */
    goldLight: '#EDD98A',
    /** Darker gold — secondary names / accents */
    goldDark: '#C9A84C',
    /** Deep navy — used ONLY where a dark text color is needed on non-dark bg */
    navy: '#0F2557',
    /** Body text on dark bg */
    textOnDark: 'rgba(255,255,255,0.85)',
    /** Muted text on dark bg */
    textMuted: 'rgba(255,255,255,0.3)',
    /** Tagline / sub-labels */
    tagline: 'rgba(212,175,110,0.65)',
    /** Subtle counter/date text */
    subtle: 'rgba(212,175,110,0.35)',
  },

  // ─── Ornament colors (lines, corners, diamonds) ───────────────────────────
  ornament: {
    /** Solid gold for SVG strokes/fills */
    solid: '#D4AF6E',
    /** Gold at 50% opacity — gradient endpoints */
    half: 'rgba(212,175,110,0.5)',
    /** Gold at 45% opacity — bottom rule lines */
    soft: 'rgba(212,175,110,0.45)',
    /** Gold at 60% opacity — diamond divider lines */
    mid: 'rgba(212,175,110,0.6)',
  },

  // ─── Typography ───────────────────────────────────────────────────────────
  font: {
    display: "'Playfair Display', Georgia, serif",
    body: "'Lato', system-ui, sans-serif",
  },

  // ─── Shared text shadows ──────────────────────────────────────────────────
  shadow: {
    /** Glow shadow for gold display names */
    name: '0 0 40px rgba(212,175,110,0.4), 0 0 80px rgba(212,175,110,0.15), 0 2px 20px rgba(0,0,0,0.5)',
  },

  // ─── Scroll indicator ─────────────────────────────────────────────────────
  scroll: {
    line: 'linear-gradient(to bottom, #D4AF6E, transparent)',
    label: 'rgba(212,175,110,0.35)',
  },

  // ─── Particle dust ────────────────────────────────────────────────────────
  dust: ['#D4AF6E', '#F0D080', '#B8924A', 'rgba(212,175,110,0.4)'] as string[],

  // ─── Corner SVG ornaments ─────────────────────────────────────────────────
  corner: {
    strokeOpacity: 0.6,
    innerStrokeOpacity: 0.25,
    dotOpacity: 0.7,
  },

  // ─── Cards / form surfaces ────────────────────────────────────────────────
  card: {
    /** Background for cards on the navy bg */
    bg: 'rgba(255,255,255,0.04)',
    border: 'rgba(212,175,110,0.15)',
    /** Top accent bar gradient */
    topBar: 'linear-gradient(to right, #D4AF6E, rgba(212,175,110,0.3))',
  },

  // ─── Buttons ──────────────────────────────────────────────────────────────
  button: {
    /** Primary CTA background */
    bg: 'linear-gradient(135deg, #0A1A3A 0%, #0D1E45 100%)',
    border: 'rgba(212,175,110,0.5)',
    text: '#D4AF6E',
    hoverBg: 'rgba(212,175,110,0.1)',
  },
} as const
