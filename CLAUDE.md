# CLAUDE.md — Wedding Invitation: Joudi & Bisher

## Project Overview

A luxurious animated wedding invitation website hosting **two separate weddings** in one codebase:
- **Joudi's wedding** — gold/navy theme, routed at `/wedding/`
- **Bisher's wedding** — sky blue/navy theme, routed at `/wedding/bisher`

Built with React 19, TypeScript, Vite, Tailwind CSS v4, and Framer Motion. Deployed to GitHub Pages at `/wedding/`.

---

## Commands

```bash
npm run dev        # Start dev server (http://localhost:5173/wedding/)
npm run build      # TypeScript check + Vite production build → dist/
npm run deploy     # Build then push dist/ to gh-pages branch
npm run lint       # ESLint check
```

Always run `npm run build` to verify there are no TypeScript errors before finishing a task.

---

## Project Structure

```
src/
├── main.tsx                        # Entry: detects /bisher route, mounts correct wedding + context
├── index.css                       # Global styles including Arabic RTL overrides
├── hooks/
│   ├── useCountdown.ts             # Live countdown → { days, hours, minutes, seconds, isPast }
│   └── useScrollAnimation.ts       # Framer Motion useInView → [ref, inView], triggers once
├── shared/
│   ├── BackToTop.tsx               # Fixed scroll-to-top button (shared by both weddings)
│   ├── FloatingHearts.tsx          # Canvas-based 60fps floating hearts (shared)
│   └── SectionDivider.tsx          # Decorative section separator (shared)
├── types/
│   └── config.ts                   # Shared SiteConfig interface used by both weddings
├── weddings/
│   ├── joudi/                      # Joudi's wedding (gold/navy theme)
│   │   ├── App.tsx                 # Two-stage app: "envelope" → "main"
│   │   ├── config.ts               # Content config (dates, venue, images, etc.)
│   │   ├── theme.ts                # Gold/navy design tokens
│   │   ├── i18n.ts                 # Bilingual translations: ar + en
│   │   ├── context.tsx             # LanguageContext + useLanguage() + detectLang()
│   │   └── components/
│   │       ├── EnvelopeIntro.tsx   # Animated envelope, plays Indila.m4a on click
│   │       ├── CoupleSection.tsx   # Full-screen hero: names, diamond divider, tagline
│   │       ├── MessageSection.tsx  # Invitation message paragraphs + signature
│   │       ├── DateSection.tsx     # Countdown timer OR congratulations screen
│   │       ├── VenueSection.tsx    # Venue, Google Maps embed, directions button
│   │       └── EngagementTimeline.tsx # Vertical alternating timeline with milestones
│   └── bisher/                     # Bisher's wedding (sky blue/navy theme)
│       ├── App.tsx                 # Two-stage app: "envelope" → "main"
│       ├── config.ts               # Content config (dates, venue, images, etc.)
│       ├── theme.ts                # Sky blue/navy design tokens
│       ├── i18n.ts                 # Bilingual translations: ar + en
│       ├── context.tsx             # WeddingContext + useWedding() + detectLang() + makeContextValue()
│       └── components/
│           ├── EnvelopeIntro.tsx   # Animated envelope, plays Indila.m4a on click
│           ├── CoupleSection.tsx   # Full-screen hero: names, diamond divider, tagline
│           ├── MessageSection.tsx  # Invitation message paragraphs + signature
│           ├── DateSection.tsx     # Countdown timer OR congratulations screen
│           └── VenueSection.tsx    # Venue, Google Maps embed, directions button
└── assets/
    └── sound/
        └── Indila.m4a              # Music that plays when envelope is opened
```

`public/` contains static background images served at `/wedding/*.jpeg`.

---

## Key Architecture Decisions

### Routing

`main.tsx` checks `window.location.pathname` for `/bisher`:
- `/wedding/bisher` → mounts `BisherApp` wrapped in `WeddingContext.Provider`
- `/wedding/` → mounts Joudi's `App` wrapped in `LanguageContext.Provider`

### Context Pattern

Each wedding has its own React context providing translated strings + theme + config:

**Joudi:** `useLanguage()` → `{ lang, t, dir }`
**Bisher:** `useWedding()` → `{ lang, t, dir, config, theme }`

### Language Detection

Language is detected **once at load** from the URL path:
- `/en` in path → English
- default → Arabic

### Theme System

Each wedding has its own `theme.ts` — the single source of truth for colors/fonts. Never hardcode colors — always use `theme.*`.

**Joudi theme keys:**
```ts
theme.color.gold / goldLight / goldDark
theme.bg.section / vignette / glow
theme.font.display / body
theme.ornament.solid / half / soft
theme.card.border / bg
```

**Bisher theme keys:** Same structure but sky blue palette (`theme.color.skyBlue`, `theme.color.skyBlueLight`, etc.)

### Adding a new translated string

1. Add the key to both `ar` and `en` objects in the wedding's `i18n.ts`
2. Update the `Translations` type at the bottom of `i18n.ts` if it's an array type
3. Use `t.yourKey` in the component

### Arabic RTL Font Handling

`index.css` has global overrides for `html[dir="rtl"]`:
- Forces **Noto Naskh Arabic** on all elements
- Resets all `letter-spacing` to 0 (wide tracking destroys Arabic readability)
- Increases font sizes slightly for readability

### Countdown & Post-Wedding State

`useCountdown(config.event.weddingDate)` returns `isPast: boolean`. When `isPast` is true, `DateSection` shows the congratulatory screen instead of the countdown boxes.

### Section Pattern

Every section follows the same structure:
1. Background image (fixed parallax via `backgroundAttachment: fixed`)
2. Dark overlay (`opacity: 0.88`)
3. Vignette + glow (animated)
4. Dust particles (24 animated dots)
5. Corner SVG ornaments (4 corners, animate in on scroll)
6. Content with `useScrollAnimation()` stagger

---

## Config: What Lives Where

| Data | Location |
|------|----------|
| Wedding date (countdown) | `weddings/<name>/config.ts` → `config.event.weddingDate` |
| Display date/time text | `weddings/<name>/i18n.ts` → `t.displayDate`, `t.displayTime` |
| Partner names | `weddings/<name>/i18n.ts` → `t.partner1`, `t.partner2` |
| Venue name & address | `weddings/<name>/i18n.ts` → `t.venueName`, `t.venueAddress` |
| Google Maps URLs | `weddings/<name>/config.ts` → `config.venue.*` |
| Section background images | `weddings/<name>/config.ts` → `config.sectionImages.*` |
| Invitation message paragraphs | `weddings/<name>/i18n.ts` → `t.messageParagraphs[]` |
| Timeline events | `weddings/<name>/i18n.ts` → `t.timelineEvents[]` |

> `config.ts` holds non-translatable data (URLs, dates, image paths). `i18n.ts` holds everything user-visible.

---

## Deployment

- **Base path**: `/wedding/` (set in `vite.config.ts`)
- **Deploy**: `npm run deploy` → builds and pushes `dist/` to `gh-pages` branch
- **URL pattern**:
  - Joudi: `https://<user>.github.io/wedding/` or `/wedding/en`
  - Bisher: `https://<user>.github.io/wedding/bisher` or `/wedding/bisher/en`

---

## Styling Rules

- **No hardcoded colors** in components — use `theme.*`
- **No hardcoded text** in components — use `t.*` from the wedding's context hook
- Tailwind for layout/spacing; inline `style={{}}` for theme values (colors, fonts, shadows)
- RTL layout is handled by `dir={dir}` on the `<section>` element plus CSS overrides
- `letter-spacing` classes are automatically neutralized in Arabic via CSS — do not conditionally remove them in JS

---

## Sound

`src/assets/sound/Indila.m4a` is imported as a Vite asset in each wedding's `EnvelopeIntro.tsx` and played via `new Audio(indilaSound)` when the user clicks the envelope. Volume is set to 0.7. Autoplay block errors are silently caught.
