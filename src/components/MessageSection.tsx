import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { config } from '../config'
import { theme } from '../theme'

export function MessageSection() {
  const [ref, inView] = useScrollAnimation()

  return (
    <motion.section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-28 md:py-40 px-6 overflow-hidden"
      style={{ background: theme.bg.section }}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.9 }}
    >
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: theme.bg.vignette }} />

      {/* Gold glow */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ inset: 0, background: theme.bg.glow }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
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
              left: `${(i * 4.1 + 3) % 100}%`,
              top: `${(i * 6.3 + 2) % 100}%`,
              background: theme.dust[i % 4],
            }}
            animate={{ opacity: [0, 0.9, 0], scale: [0, 1.8, 0] }}
            transition={{ duration: 3 + (i % 6) * 0.7, repeat: Infinity, delay: (i * 0.31) % 5, ease: 'easeInOut' }}
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

      {/* Large decorative quote mark */}
      <div
        className="absolute top-8 left-6 md:left-16 select-none pointer-events-none"
        style={{ fontFamily: theme.font.display, fontSize: '180px', lineHeight: 1, color: 'rgba(212,175,110,0.05)' }}
        aria-hidden="true"
      >
        "
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">

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

        {/* Label */}
        <motion.p
          className="text-xs tracking-[0.45em] uppercase mb-10"
          style={{ color: theme.color.gold, fontFamily: theme.font.body }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          A Message From the Couple
        </motion.p>

        {/* Paragraphs */}
        {config.message.paragraphs.map((para, i) => (
          <motion.p
            key={i}
            className="text-lg md:text-xl leading-relaxed mb-6 last:mb-0"
            style={{ color: theme.color.textOnDark, fontWeight: 300 }}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.2, duration: 0.8 }}
          >
            {para}
          </motion.p>
        ))}

        {/* Diamond divider */}
        <motion.div
          className="flex items-center justify-center gap-3 my-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <motion.div
            className="h-px flex-1 max-w-30"
            style={{ background: `linear-gradient(to right, transparent, ${theme.ornament.mid})` }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.7 }}
          />
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M14 2 L26 14 L14 26 L2 14 Z" stroke={theme.ornament.solid} strokeWidth="1.2" fill="rgba(212,175,110,0.08)" />
            <path d="M14 7 L21 14 L14 21 L7 14 Z" fill={theme.ornament.solid} opacity="0.3" />
            <circle cx="14" cy="14" r="2" fill={theme.ornament.solid} />
          </svg>
          <motion.div
            className="h-px flex-1 max-w-30"
            style={{ background: `linear-gradient(to left, transparent, ${theme.ornament.mid})` }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.7 }}
          />
        </motion.div>

        {/* Signature */}
        <motion.p
          className="text-2xl md:text-3xl italic"
          style={{ fontFamily: theme.font.display, color: theme.color.goldLight, textShadow: theme.shadow.name }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          {config.message.signature}
        </motion.p>

        {/* Bottom rule */}
        <motion.div
          className="flex items-center justify-center gap-3 mt-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          <div className="h-px w-16 sm:w-24" style={{ background: `linear-gradient(to right, transparent, ${theme.ornament.soft})` }} />
          <div className="w-1.5 h-1.5 rotate-45 border" style={{ borderColor: theme.ornament.soft }} />
          <div className="h-px w-16 sm:w-24" style={{ background: `linear-gradient(to left, transparent, ${theme.ornament.soft})` }} />
        </motion.div>

      </div>
    </motion.section>
  )
}
