import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { config } from '../config'
import { theme } from '../theme'

export function VenueSection() {
  const [ref, inView] = useScrollAnimation()

  return (
    <motion.section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-28 md:py-40 px-6 overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9 }}
    >
      {/* Background image */}
      <img
        src={config.sectionImages.venue}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay replaces solid bg */}
      <div className="absolute inset-0" style={{ background: theme.bg.section, opacity: 0.88 }} />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: theme.bg.vignette }} />

      {/* Gold glow */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ inset: 0, background: theme.bg.glow }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Gold dust particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 1.2 + (i % 5) * 0.6,
              height: 1.2 + (i % 5) * 0.6,
              left: `${(i * 4.3 + 2) % 100}%`,
              top: `${(i * 5.4 + 4) % 100}%`,
              background: theme.dust[i % 4],
            }}
            animate={{ opacity: [0, 0.9, 0], scale: [0, 1.8, 0] }}
            transition={{ duration: 3 + (i % 6) * 0.7, repeat: Infinity, delay: (i * 0.33) % 5, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Corner ornaments */}
      <motion.div className="absolute top-5 left-5" initial={{ opacity: 0, scale: 0 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.2, duration: 0.7 }}>
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <path d="M2 30 L2 2 L30 2" stroke={theme.ornament.solid} strokeWidth="1.5" opacity={theme.corner.strokeOpacity} />
          <path d="M8 30 L8 8 L30 8" stroke={theme.ornament.solid} strokeWidth="0.8" opacity={theme.corner.innerStrokeOpacity} />
          <circle cx="2" cy="2" r="2" fill={theme.ornament.solid} opacity={theme.corner.dotOpacity} />
        </svg>
      </motion.div>
      <motion.div className="absolute top-5 right-5" initial={{ opacity: 0, scale: 0 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.3, duration: 0.7 }}>
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <path d="M62 30 L62 2 L34 2" stroke={theme.ornament.solid} strokeWidth="1.5" opacity={theme.corner.strokeOpacity} />
          <path d="M56 30 L56 8 L34 8" stroke={theme.ornament.solid} strokeWidth="0.8" opacity={theme.corner.innerStrokeOpacity} />
          <circle cx="62" cy="2" r="2" fill={theme.ornament.solid} opacity={theme.corner.dotOpacity} />
        </svg>
      </motion.div>
      <motion.div className="absolute bottom-5 left-5" initial={{ opacity: 0, scale: 0 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.4, duration: 0.7 }}>
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <path d="M2 34 L2 62 L30 62" stroke={theme.ornament.solid} strokeWidth="1.5" opacity={theme.corner.strokeOpacity} />
          <path d="M8 34 L8 56 L30 56" stroke={theme.ornament.solid} strokeWidth="0.8" opacity={theme.corner.innerStrokeOpacity} />
          <circle cx="2" cy="62" r="2" fill={theme.ornament.solid} opacity={theme.corner.dotOpacity} />
        </svg>
      </motion.div>
      <motion.div className="absolute bottom-5 right-5" initial={{ opacity: 0, scale: 0 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.5, duration: 0.7 }}>
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <path d="M62 34 L62 62 L34 62" stroke={theme.ornament.solid} strokeWidth="1.5" opacity={theme.corner.strokeOpacity} />
          <path d="M56 34 L56 56 L34 56" stroke={theme.ornament.solid} strokeWidth="0.8" opacity={theme.corner.innerStrokeOpacity} />
          <circle cx="62" cy="62" r="2" fill={theme.ornament.solid} opacity={theme.corner.dotOpacity} />
        </svg>
      </motion.div>

      <div className="max-w-4xl mx-auto">

        {/* Top rule */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.8 }}
        >
          <div className="h-px w-10 sm:w-16" style={{ background: `linear-gradient(to right, transparent, ${theme.ornament.half})` }} />
          <div className="w-1 h-1 rounded-full" style={{ background: theme.ornament.solid, opacity: 0.5 }} />
          <div className="h-px w-10 sm:w-16" style={{ background: `linear-gradient(to left, transparent, ${theme.ornament.half})` }} />
        </motion.div>

        <motion.p
          className="text-xs tracking-[0.45em] uppercase mb-6 text-center"
          style={{ color: theme.color.gold, fontFamily: theme.font.body }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          The Celebration
        </motion.p>

        <motion.h3
          className="font-normal text-center mb-4"
          style={{ fontFamily: theme.font.display, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: theme.color.goldLight }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {config.venue.name}
        </motion.h3>

        {/* Address */}
        <motion.div
          className="flex items-center justify-center gap-2 mb-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={theme.ornament.solid} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <address className="not-italic text-base tracking-wide" style={{ color: theme.color.textMuted, fontWeight: 300, fontFamily: theme.font.body }}>
            {config.venue.address}
          </address>
        </motion.div>

        {/* Map card */}
        <motion.div
          className="relative mb-10"
          style={{
            background: 'rgba(5,14,31,0.7)',
            border: `1px solid ${theme.ornament.half}`,
            boxShadow: `0 0 0 4px rgba(212,175,110,0.06), 0 32px 80px rgba(0,0,0,0.5)`,
          }}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.85 }}
        >
          {/* Top accent bar */}
          <div className="h-0.5 w-full" style={{ background: `linear-gradient(to right, transparent, ${theme.ornament.solid}, transparent)` }} />

          {/* Card header */}
          <div
            className="flex items-center justify-between px-5 py-3"
            style={{ borderBottom: `1px solid ${theme.ornament.soft}` }}
          >
            <div className="flex items-center gap-2">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={theme.ornament.solid} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span style={{ fontFamily: theme.font.body, fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: theme.color.tagline }}>
                {config.venue.address}
              </span>
            </div>
            <motion.a
              href={config.venue.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-1.5 text-xs tracking-[0.15em] uppercase"
              style={{
                border: `1px solid ${theme.button.border}`,
                color: theme.button.text,
                fontFamily: theme.font.body,
              }}
              whileHover={{ background: theme.button.hoverBg, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              Directions
            </motion.a>
          </div>

          {/* iframe */}
          <div className="relative w-full" style={{ paddingBottom: '52%', minHeight: '300px' }}>
            <iframe
              src={config.venue.googleMapsEmbedUrl}
              title={`Map to ${config.venue.name}`}
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          {/* Corner ornaments */}
          <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2" style={{ borderColor: theme.ornament.solid }} />
          <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2" style={{ borderColor: theme.ornament.solid }} />
          <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2" style={{ borderColor: theme.ornament.solid }} />
          <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2" style={{ borderColor: theme.ornament.solid }} />
        </motion.div>

        {/* Bottom rule */}
        <motion.div
          className="flex items-center justify-center gap-3 mt-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="h-px w-16 sm:w-24" style={{ background: `linear-gradient(to right, transparent, ${theme.ornament.soft})` }} />
          <div className="w-1.5 h-1.5 rotate-45 border" style={{ borderColor: theme.ornament.soft }} />
          <div className="h-px w-16 sm:w-24" style={{ background: `linear-gradient(to left, transparent, ${theme.ornament.soft})` }} />
        </motion.div>

      </div>
    </motion.section>
  )
}
