import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useCountdown } from '../hooks/useCountdown'
import { config } from '../config'
import { theme } from '../theme'

interface CountdownBoxProps {
  value: number
  label: string
  delay: number
  inView: boolean
}

function CountdownBox({ value, label, delay, inView }: CountdownBoxProps) {
  return (
    <motion.div
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0, y: 40, scale: 0.85 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay, duration: 0.7, type: 'spring', stiffness: 120 }}
    >
      <div
        className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: `1px solid ${theme.card.border}`,
          boxShadow: `0 4px 24px rgba(212,175,110,0.1)`,
        }}
      >
        <span
          className="text-3xl sm:text-4xl md:text-5xl font-light tabular-nums"
          style={{ fontFamily: theme.font.display, color: theme.color.gold }}
        >
          {String(value).padStart(2, '0')}
        </span>
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2" style={{ borderColor: theme.ornament.solid }} />
        <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2" style={{ borderColor: theme.ornament.solid }} />
        <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2" style={{ borderColor: theme.ornament.solid }} />
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2" style={{ borderColor: theme.ornament.solid }} />
      </div>
      <span className="text-[11px] tracking-[0.3em] uppercase" style={{ color: theme.color.tagline, fontFamily: theme.font.body }}>
        {label}
      </span>
    </motion.div>
  )
}

export function DateSection() {
  const [ref, inView] = useScrollAnimation()
  const { days, hours, minutes, seconds, isPast } = useCountdown(config.event.weddingDate)

  const boxes = [
    { value: days,    label: 'Days' },
    { value: hours,   label: 'Hours' },
    { value: minutes, label: 'Minutes' },
    { value: seconds, label: 'Seconds' },
  ]

  return (
    <motion.section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-32 md:py-44 px-6 text-center overflow-hidden"
      style={{ background: theme.bg.section }}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9 }}
    >
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: theme.bg.vignette }} />

      {/* Gold glow */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ inset: 0, background: theme.bg.glow }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
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
              left: `${(i * 3.9 + 5) % 100}%`,
              top: `${(i * 5.8 + 1) % 100}%`,
              background: theme.dust[i % 4],
            }}
            animate={{ opacity: [0, 0.9, 0], scale: [0, 1.8, 0] }}
            transition={{ duration: 3 + (i % 6) * 0.7, repeat: Infinity, delay: (i * 0.29) % 5, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Orbiting rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <motion.div
          className="w-[700px] h-[700px] rounded-full"
          style={{ border: '1px solid rgba(212,175,110,0.06)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{ border: '1px solid rgba(212,175,110,0.04)' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
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

      <div className="relative z-10 max-w-3xl mx-auto">

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
          className="text-xs tracking-[0.45em] uppercase mb-6"
          style={{ color: theme.color.gold, fontFamily: theme.font.body }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Save the Date
        </motion.p>

        <motion.h3
          className="font-normal mb-3"
          style={{ fontFamily: theme.font.display, fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', color: theme.color.goldLight }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {config.event.displayDate}
        </motion.h3>

        <motion.p
          className="text-base tracking-widest mb-14"
          style={{ color: theme.color.tagline, fontWeight: 300, fontFamily: theme.font.body }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          {config.event.displayTime}
        </motion.p>

        {isPast ? (
          <motion.p
            className="text-2xl italic"
            style={{ fontFamily: theme.font.display, color: theme.color.gold }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            We are now married — thank you for celebrating with us!
          </motion.p>
        ) : (
          <div className="flex items-start justify-center gap-3 sm:gap-5 md:gap-7 flex-wrap">
            {boxes.map((box, i) => (
              <div key={box.label} className="flex items-start gap-3 sm:gap-5 md:gap-7">
                <CountdownBox
                  value={box.value}
                  label={box.label}
                  delay={0.4 + i * 0.12}
                  inView={inView}
                />
                {i < boxes.length - 1 && (
                  <motion.span
                    className="text-3xl mt-7 sm:mt-9"
                    style={{ color: theme.color.gold, opacity: 0.5 }}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 0.5 } : {}}
                    transition={{ delay: 0.5 + i * 0.12 }}
                  >
                    :
                  </motion.span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Bottom rule */}
        <motion.div
          className="flex items-center justify-center gap-3 mt-14"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <div className="h-px w-16 sm:w-24" style={{ background: `linear-gradient(to right, transparent, ${theme.ornament.soft})` }} />
          <div className="w-1.5 h-1.5 rotate-45 border" style={{ borderColor: theme.ornament.soft }} />
          <div className="h-px w-16 sm:w-24" style={{ background: `linear-gradient(to left, transparent, ${theme.ornament.soft})` }} />
        </motion.div>

      </div>
    </motion.section>
  )
}
