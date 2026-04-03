# CLAUDE.md — Wedding Invitation: Joudi & Bisher

## Project Overview

A luxurious animated wedding invitation website for **Joudi & Bisher** (wedding date: May 3, 2026). Built with React 19, TypeScript, Vite, Tailwind CSS v4, and Framer Motion. Deployed to GitHub Pages at `/wedding/`.

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
├── main.tsx                  # Entry: detects language, sets html[lang/dir], wraps app in LanguageContext
├── App.tsx                   # Two-stage app: "envelope" → "main" (all sections)
├── config.ts                 # Master content config (names, dates, venue, images, etc.)
├── theme.ts                  # Design system — single source of truth for all colors/fonts
├── i18n.ts                   # Bilingual translations: ar + en
├── index.css                 # Global styles including Arabic RTL overrides
├── context/
│   └── LanguageContext.tsx   # React context: { lang, t, dir } + detectLang() + useLanguage()
├── hooks/
│   ├── useCountdown.ts       # Live countdown to weddingDate → { days, hours, minutes, seconds, isPast }
│   └── useScrollAnimation.ts # Framer Motion useInView → [ref, inView], triggers once on scroll
├── components/
│   ├── EnvelopeIntro.tsx     # Animated card splitting open, wax seal, plays Indila.m4a on click
│   ├── CoupleSection.tsx     # Full-screen hero: couple names, diamond divider, tagline, date
│   ├── MessageSection.tsx    # Invitation message paragraphs + signature
│   ├── DateSection.tsx       # Countdown timer OR congratulations screen (when isPast)
│   ├── VenueSection.tsx      # Venue name, address, Google Maps embed, directions button
│   ├── EngagementTimeline.tsx# Vertical alternating timeline with 5 milestones
│   ├── GuestbookSection.tsx  # Message form + display of submitted wishes
│   ├── SectionDivider.tsx    # Decorative separator between sections
│   ├── FloatingHearts.tsx    # Canvas-based 60fps floating hearts background
│   └── BackToTop.tsx         # Fixed scroll-to-top button (appears after 400px)
└── assets/
    └── sound/
        └── Indila.m4a        # Music that plays when envelope is opened
```

`public/` contains static background images served at `/wedding/*.jpeg`.

---

## Key Architecture Decisions

### Language / Translation System

Language is detected **once at load** from the URL path:
- `/wedding/ar` → Arabic (default)
- `/wedding/en` → English

```ts
// src/context/LanguageContext.tsx
export function detectLang(): Lang {
  const path = window.location.pathname
  if (path.includes('/en')) return 'en'
  return 'ar'  // default
}
```

`main.tsx` sets `document.documentElement.lang` and `document.documentElement.dir`, then wraps the app in `<LanguageContext.Provider>`.

Every component reads translations via:
```ts
const { t, lang, dir } = useLanguage()
```

**Adding a new translated string:**
1. Add the key to both `ar` and `en` objects in `src/i18n.ts`
2. Update the `Translations` type at the bottom of `i18n.ts` if it's an array type
3. Use `t.yourKey` in the component

### Theme System

`src/theme.ts` is the single source of truth. Never hardcode colors — always use `theme.*`:

```ts
theme.color.gold         // #D4AF6E  — primary gold
theme.color.goldLight    // #EDD98A  — large headings
theme.color.goldDark     // #C9A84C  — secondary accents
theme.color.textOnDark   // rgba(255,255,255,0.85)
theme.bg.section         // navy gradient
theme.font.display       // Playfair Display + Noto Naskh Arabic fallback
theme.font.body          // Lato + Noto Naskh Arabic fallback
theme.ornament.solid     // #D4AF6E — SVG strokes
theme.ornament.half      // gold at 50% opacity
theme.card.border        // gold at 15% opacity
```

### Arabic RTL Font Handling

`index.css` has global overrides for `html[dir="rtl"]`:
- Forces **Noto Naskh Arabic** (loaded from Google Fonts) on all elements
- Resets all `letter-spacing` to 0 (wide tracking destroys Arabic readability)
- Increases `text-xs` from 0.75rem → 1rem (Arabic glyphs are smaller)
- Bumps `clamp(7px/8px/11px, ...)` sizes upward to be legible
- Bumps `.text-sm`, `.text-base`, `.text-lg`, `.text-xl` slightly larger

### Countdown & Post-Wedding State

`useCountdown(config.event.weddingDate)` returns `isPast: boolean`. When `isPast` is true, `DateSection` shows the congratulatory screen instead of the countdown boxes. The congratulations UI has animated interlocked rings, a heading, subtitle, and thank-you tagline — all translated.

### Section Pattern

Every section follows the same structure:
1. Background image (fixed parallax via `backgroundAttachment: fixed`)
2. Dark navy overlay (`opacity: 0.88`)
3. Vignette + gold glow (animated)
4. Gold dust particles (24 animated dots)
5. Corner SVG ornaments (4 corners, animate in on scroll)
6. Content with `useScrollAnimation()` stagger

---

## Config: What Lives Where

| Data | Location |
|------|----------|
| Wedding date (used by countdown) | `config.event.weddingDate` |
| Display date/time text | `i18n.ts` → `t.displayDate`, `t.displayTime` |
| Partner names | `i18n.ts` → `t.partner1`, `t.partner2` |
| Venue name & address | `i18n.ts` → `t.venueName`, `t.venueAddress` |
| Google Maps URLs | `config.venue.googleMapsEmbedUrl` / `googleMapsLink` |
| Section background images | `config.sectionImages.*` → paths in `public/` |
| Invitation message paragraphs | `i18n.ts` → `t.messageParagraphs[]` |
| Timeline events | `i18n.ts` → `t.timelineEvents[]` |

> `config.ts` holds non-translatable data (URLs, dates, image paths). `i18n.ts` holds everything user-visible.

---

## Deployment

- **Base path**: `/wedding/` (set in `vite.config.ts`)
- **Deploy**: `npm run deploy` → builds and pushes `dist/` to `gh-pages` branch
- **URL pattern**: `https://<user>.github.io/wedding/` (English: `/wedding/en`, Arabic default: `/wedding/` or `/wedding/ar`)

---

## Styling Rules

- **No hardcoded colors** in components — use `theme.*`
- **No hardcoded text** in components — use `t.*` from `useLanguage()`
- Tailwind for layout/spacing; inline `style={{}}` for theme values (colors, fonts, shadows)
- RTL layout is handled by `dir={dir}` on the `<section>` element in each component plus CSS overrides
- `letter-spacing` classes (`tracking-[0.45em]` etc.) are automatically neutralized in Arabic via CSS — do not conditionally remove them in JS

---

## Sound

`src/assets/sound/Indila.m4a` is imported as a Vite asset in `EnvelopeIntro.tsx` and played via `new Audio(indilaSound)` when the user clicks the envelope. Volume is set to 0.7. Autoplay block errors are silently caught.

---

## Do Not Touch

- `src/components/ClosingSection.tsx` — fully commented out, not used
- `src/components/HeroSection.tsx` — commented out in App.tsx
- `src/components/SaveInvitation.tsx` — fully commented out
- `src/components/GallerySection.tsx` — not currently mounted in App.tsx
