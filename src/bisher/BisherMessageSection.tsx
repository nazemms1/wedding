import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useBisher } from '../context/BisherContext'

export function BisherMessageSection() {
  const { t, theme, config } = useBisher()
  const [ref, inView] = useScrollAnimation()

  return (
    <motion.section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-28 md:py-40 px-6 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.9 }}
    >
      <div aria-hidden="true" className="absolute inset-0"
        style={{ backgroundImage: `url(${config.sectionImages.message})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }} />
      <div className="absolute inset-0" style={{ background: theme.bg.section, opacity: 0.88 }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: theme.bg.vignette }} />
      <motion.div className="absolute pointer-events-none" style={{ inset: 0, background: theme.bg.glow }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} />

      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.div key={i} className="absolute rounded-full"
            style={{ width: 1.2 + (i % 5) * 0.6, height: 1.2 + (i % 5) * 0.6, left: `${(i * 4.1 + 3) % 100}%`, top: `${(i * 6.3 + 2) % 100}%`, background: (theme.dust as unknown as string[])[i % 4] }}
            animate={{ opacity: [0, 0.9, 0], scale: [0, 1.8, 0] }}
            transition={{ duration: 3 + (i % 6) * 0.7, repeat: Infinity, delay: (i * 0.31) % 5, ease: 'easeInOut' }} />
        ))}
      </div>

      {/* Corner ornaments — sky blue */}
      {[
        { cls: 'absolute top-5 left-5', d1: 'M2 30 L2 2 L30 2', d2: 'M8 30 L8 8 L30 8', cx: 2, cy: 2, delay: 0.2 },
        { cls: 'absolute top-5 right-5', d1: 'M62 30 L62 2 L34 2', d2: 'M56 30 L56 8 L34 8', cx: 62, cy: 2, delay: 0.3 },
        { cls: 'absolute bottom-5 left-5', d1: 'M2 34 L2 62 L30 62', d2: 'M8 34 L8 56 L30 56', cx: 2, cy: 62, delay: 0.4 },
        { cls: 'absolute bottom-5 right-5', d1: 'M62 34 L62 62 L34 62', d2: 'M56 34 L56 56 L34 56', cx: 62, cy: 62, delay: 0.5 },
      ].map((c, i) => (
        <motion.div key={i} className={c.cls} initial={{ opacity: 0, scale: 0 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: c.delay, duration: 0.7 }}>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <path d={c.d1} stroke={theme.ornament.solid} strokeWidth="1.5" opacity={theme.corner.strokeOpacity} />
            <path d={c.d2} stroke={theme.ornament.solid} strokeWidth="0.8" opacity={theme.corner.innerStrokeOpacity} />
            <circle cx={c.cx} cy={c.cy} r="2" fill={theme.ornament.solid} opacity={theme.corner.dotOpacity} />
          </svg>
        </motion.div>
      ))}

      <div className="absolute top-8 left-6 md:left-16 select-none pointer-events-none"
        style={{ fontFamily: theme.font.display, fontSize: '180px', lineHeight: 1, color: 'rgba(56,189,248,0.04)' }} aria-hidden="true">
        "
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div className="flex items-center justify-center gap-3 mb-8"
          initial={{ opacity: 0, y: -10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.8 }}>
          <div className="h-px w-10 sm:w-16" style={{ background: `linear-gradient(to right, transparent, ${theme.ornament.skyHalf})` }} />
          <div className="w-1 h-1 rounded-full" style={{ background: theme.color.skyBlue, opacity: 0.5 }} />
          <div className="h-px w-10 sm:w-16" style={{ background: `linear-gradient(to left, transparent, ${theme.ornament.skyHalf})` }} />
        </motion.div>

        <motion.p className="text-xs tracking-[0.45em] uppercase mb-10" style={{ color: theme.color.skyBlue, fontFamily: theme.font.body }}
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.7 }}>
          {t.eyebrow}
        </motion.p>

        {t.messageParagraphs.map((para, i) => (
          <motion.p key={i} className="text-lg md:text-xl leading-relaxed mb-6 last:mb-0"
            style={{ color: theme.color.textOnDark, fontWeight: 300 }}
            initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 + i * 0.2, duration: 0.8 }}>
            {para}
          </motion.p>
        ))}

        <motion.div className="flex items-center justify-center gap-3 my-10"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.7, duration: 0.8 }}>
          <motion.div className="h-px flex-1 max-w-30"
            style={{ background: `linear-gradient(to right, transparent, ${theme.ornament.mid})` }}
            initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ delay: 0.8, duration: 0.7 }} />
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M14 2 L26 14 L14 26 L2 14 Z" stroke={theme.color.skyBlue} strokeWidth="1.2" fill="rgba(56,189,248,0.08)" />
            <path d="M14 7 L21 14 L14 21 L7 14 Z" fill={theme.color.skyBlue} opacity="0.3" />
            <circle cx="14" cy="14" r="2" fill={theme.color.skyBlue} />
          </svg>
          <motion.div className="h-px flex-1 max-w-30"
            style={{ background: `linear-gradient(to left, transparent, ${theme.ornament.mid})` }}
            initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ delay: 0.8, duration: 0.7 }} />
        </motion.div>

        <motion.p className="text-2xl md:text-3xl italic"
          style={{ fontFamily: theme.font.display, color: theme.color.goldLight, textShadow: theme.shadow.name }}
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.9, duration: 0.8 }}>
          {t.signature}
        </motion.p>

        <motion.div className="flex items-center justify-center gap-3 mt-8"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.0, duration: 0.8 }}>
          <div className="h-px w-16 sm:w-24" style={{ background: `linear-gradient(to right, transparent, ${theme.ornament.skySoft})` }} />
          <div className="w-1.5 h-1.5 rotate-45 border" style={{ borderColor: theme.ornament.skySoft }} />
          <div className="h-px w-16 sm:w-24" style={{ background: `linear-gradient(to left, transparent, ${theme.ornament.skySoft})` }} />
        </motion.div>
      </div>
    </motion.section>
  )
}
