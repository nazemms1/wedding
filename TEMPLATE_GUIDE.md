# Wedding Invitation — Template Quick Start Guide

This is a **universal wedding invitation template** built with React 19, TypeScript, Vite, Tailwind CSS v4, and Framer Motion. Everything you need to customize for a new wedding is isolated in **three files**. You never need to touch any component code.

---

## The Three Files You Edit

| File | What you change |
|------|-----------------|
| `src/config.ts` | Names, dates, venue, images, verse, seed messages |
| `src/theme.ts` | Colors, fonts, shadows |
| `src/i18n.ts` | All visible text in Arabic and English |

---

## 1. Change Names, Dates & Venue

Open **`src/config.ts`**.

```ts
// Couple names (used in the envelope seal initials)
couple: {
  partner1: "Joudi",   // ← change this
  partner2: "Bisher",  // ← change this
  tagline: "We're getting married!",
},

// Wedding date — ISO 8601. Used by the live countdown timer.
event: {
  weddingDate: "2026-05-03T21:00:00",  // ← YYYY-MM-DDTHH:MM:SS
  displayDate: "Sunday, May 3rd, 2026",
  displayTime: "7:00 PM",
},

// Venue — googleMapsEmbedUrl and googleMapsLink are separate:
// Embed URL: used inside the <iframe> map on the page
// Link URL:  opens Google Maps in a new tab ("Get Directions" button)
venue: {
  name: "The Grand Rose Garden",
  address: "245 Blossom Lane, Beverly Hills, CA 90210",
  googleMapsEmbedUrl: "https://maps.google.com/maps?q=LAT,LNG&z=16&output=embed",
  googleMapsLink:     "https://www.google.com/maps?q=LAT,LNG",
},
```

> **Tip:** To get the Google Maps embed URL for a location, open Google Maps, click Share → Embed a map, and copy the `src="..."` value from the `<iframe>` HTML.

---

## 2. Change Colors

Open **`src/theme.ts`**. At the very top you will find six constants:

```ts
const PRIMARY        = '#D4AF6E'   // main accent (gold)
const PRIMARY_LIGHT  = '#EDD98A'   // lighter accent (large headings)
const PRIMARY_DARK   = '#C9A84C'   // darker accent (secondary headings)
const PRIMARY_BRIGHT = '#F0D080'   // brightest dust particle highlight
const BG_DEEP        = '#050E1F'   // deepest background
const BG_MID         = '#0A1A3A'   // mid-dark background
const BG_CARD        = '#0D1E45'   // card/section background
const BG_BASE        = '#081530'   // base background
```

Change only these constants. Every component, shadow, gradient, and ornament derives its color from them automatically — you do not need to touch any component file.

**Also update `src/index.css` → `@theme` block** for the scrollbar:

```css
--scrollbar-thumb-start: #D4AF6E;   /* match PRIMARY */
--scrollbar-thumb-mid:   #C9A84C;   /* match PRIMARY_DARK */
--scrollbar-thumb-end:   #B8924A;   /* darker still */
```

### Example: Rose Gold theme

```ts
const PRIMARY        = '#B76E79'
const PRIMARY_LIGHT  = '#D4919A'
const PRIMARY_DARK   = '#9A5560'
const PRIMARY_BRIGHT = '#E8A0AB'
const BG_DEEP        = '#1A0A0D'
const BG_MID         = '#2D1219'
const BG_CARD        = '#3A1820'
const BG_BASE        = '#220E14'
```

---

## 3. Change Fonts

Two places to update, both already connected:

### A. Load the font (index.css, line 1)

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;1,400&family=Raleway&display=swap');
```

Replace `Playfair+Display` / `Lato` with your chosen Google Fonts families.

### B. Set the font names (src/theme.ts)

```ts
font: {
  display: "'Cormorant Garamond', Georgia, serif",   // ← headings, names
  body:    "'Raleway', system-ui, sans-serif",        // ← body text, labels
},
```

> **Note:** For Arabic (RTL) visitors, the template automatically overrides all fonts to `Noto Naskh Arabic` via the CSS rule in `index.css`. This is intentional — Latin fonts render Arabic characters incorrectly.

---

## 4. Change Images

All section background images live in the `public/` folder and are referenced in `src/config.ts`:

```ts
sectionImages: {
  envelope:  "/wedding/envelope.jpeg",    // full-screen envelope intro background
  couple:    "/wedding/wedding-ring.jpeg", // hero / couple names section
  message:   "/wedding/message.jpeg",     // invitation message section
  date:      "/wedding/date.jpeg",        // countdown timer section
  venue:     "/wedding/venue.jpeg",       // venue & map section
  guestbook: "/wedding/guestbook.jpeg",   // guestbook section
  engagment: "/wedding/B-J.jpeg",         // engagement timeline section
},
```

**Steps:**
1. Add your photos to the `public/wedding/` folder (e.g. `public/wedding/couple-photo.jpeg`).
2. Update the path in `config.sectionImages` (e.g. `couple: "/wedding/couple-photo.jpeg"`).

**Recommended image specs:** JPEG, 1920×1080 or larger, compressed to ≤ 400 KB per image for fast loading.

---

## 5. Change All Visible Text

Open **`src/i18n.ts`**. It exports an object with `ar` (Arabic) and `en` (English) keys. Every user-visible string is here — partner names, invitations, countdown labels, guestbook prompts, timeline events, and more.

```ts
export const translations = {
  ar: {
    partner1: 'جودي',           // ← Arabic name of partner 1
    partner2: 'بشر',            // ← Arabic name of partner 2
    tagline: 'نحتفل بزفافنا',
    displayDate: 'الأحد، ٣ مايو ٢٠٢٦',
    venueName: 'صالة اللافندا',
    venueAddress: 'دمشق، سوريا',
    messageParagraphs: [
      'الفقرة الأولى...',
      'الفقرة الثانية...',
    ],
    timelineEvents: [
      { date: 'يونيو 2024', title: 'أول لقاء', description: '...', icon: '✦' },
      // add or remove events freely
    ],
    // ... (all other strings)
  },
  en: {
    partner1: 'Joudi',          // ← English name of partner 1
    partner2: 'Bisher',         // ← English name of partner 2
    // ... mirror of the Arabic object
  },
}
```

> **Adding a new string:** Add the key to both `ar` and `en` objects, then update the `Translations` type at the bottom of `i18n.ts` if it is an array type. Use `t.yourKey` in the component.

---

## 6. Change the Religious Verse (or Hide It)

The Quranic verse at the top of the Couple section is configured in `src/config.ts`:

```ts
branding: {
  // Set either to null to hide that line
  openingLine: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
  verse: "﴿ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم ... ﴾",
  verseFont: "'Scheherazade New', 'Noto Naskh Arabic', serif",
},
```

**To hide the verse entirely:**
```ts
branding: {
  openingLine: null,
  verse: null,
  verseFont: "'Scheherazade New', 'Noto Naskh Arabic', serif",
},
```

**To show a different quote (non-Arabic):**
```ts
branding: {
  openingLine: null,
  verse: '"Where there is love there is life." — Mahatma Gandhi',
  verseFont: "'Playfair Display', Georgia, serif",
},
```

---

## 7. Change Guestbook Seed Messages

Pre-populated messages are defined in `src/config.ts`:

```ts
guestbook: {
  seedMessages: [
    { name: "Sarah & Mark", message: "Wishing you both a lifetime of happiness!" },
    { name: "The Johnson Family", message: "Congratulations!" },
  ],
},
```

Set `seedMessages: []` for a blank guestbook on first load.

---

## 8. Add a New Section

Every section follows the same structural pattern. To add a new one:

**Step 1 — Create the component** at `src/components/MyNewSection.tsx`:

```tsx
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { config } from '../config'
import { theme } from '../theme'
import { useLanguage } from '../context/LanguageContext'

export function MyNewSection() {
  const { t } = useLanguage()
  const [ref, inView] = useScrollAnimation()

  return (
    <motion.section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-32 px-6 overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9 }}
    >
      {/* Background image */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${config.sectionImages.venue})`, // swap to your image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ background: theme.bg.section, opacity: 0.88 }} />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 style={{ fontFamily: theme.font.display, color: theme.color.goldLight }}>
          {t.partner1} &amp; {t.partner2}
        </h2>
      </div>
    </motion.section>
  )
}
```

**Step 2 — Add a translation key** in `src/i18n.ts` (both `ar` and `en`):
```ts
myNewSectionTitle: 'My Section',
```

**Step 3 — Mount it** in `src/App.tsx`:
```tsx
import { MyNewSection } from "./components/MyNewSection"

// Inside the <motion.main> block, add:
<SectionDivider />
<MyNewSection />
```

**Step 4 — Add a background image** to `public/wedding/` and reference it in `config.sectionImages` if needed.

---

## 9. Enable / Disable the Guestbook Section

The Guestbook is currently commented out in `src/App.tsx`:

```tsx
{/* <SectionDivider /> */}
{/* <GuestbookSection /> */}
```

To enable it, uncomment those two lines. The section is fully functional — messages are stored in local React state (no backend required).

---

## 10. Deploy

```bash
npm run dev       # local preview at http://localhost:5173/wedding/
npm run build     # TypeScript check + production build → dist/
npm run deploy    # build + push dist/ to gh-pages branch (GitHub Pages)
```

URLs follow this pattern:
- Arabic (default): `https://username.github.io/wedding/`
- English: `https://username.github.io/wedding/en`

---

## What NOT to Edit

These files contain internal logic — editing them is not needed for any customization and may break things:

| File | Why to leave alone |
|------|--------------------|
| `src/hooks/useCountdown.ts` | Countdown timer logic |
| `src/hooks/useScrollAnimation.ts` | Scroll-triggered animation logic |
| `src/components/FloatingHearts.tsx` | Canvas animation engine |
| `src/components/BackToTop.tsx` | Scroll-to-top button |
| `src/components/SectionDivider.tsx` | Decorative divider |
| `src/context/LanguageContext.tsx` | Language detection and context |
| `src/main.tsx` | App entry point and routing |
| `vite.config.ts` | Build configuration |

---

## Summary: What Was Changed to Make This a Template

| File | Change |
|------|--------|
| `src/types/config.ts` | Added `branding` and `guestbook` fields to `SiteConfig` interface |
| `src/config.ts` | Added `branding` block (verse/openingLine/verseFont) and `guestbook.seedMessages` |
| `src/theme.ts` | Extracted 8 color constants at the top (`PRIMARY`, `BG_*`) — all theme values derive from these |
| `src/index.css` | Scrollbar colors now use CSS custom properties (`--scrollbar-thumb-*`) instead of hardcoded hex |
| `src/components/CoupleSection.tsx` | Verse block reads from `config.branding` (supports null to hide) |
| `src/components/GuestbookSection.tsx` | Seed messages read from `config.guestbook.seedMessages` |

No features were removed. No logic was changed. All animations, RTL support, bilingual text, countdown timer, venue map, timeline, and envelope animation work identically to before.
