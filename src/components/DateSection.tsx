import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useCountdown } from '../hooks/useCountdown'
import { config } from '../config'
import { theme } from '../theme'
import { useLanguage } from '../context/LanguageContext'

interface CountdownBoxProps {
  value: number
  label: string
  delay: number
  inView: boolean
}

function CountdownBox({ value, label, delay, inView }: CountdownBoxProps) {
  return (
    <motion.div
      className="flex flex-col items-center gap-4"
      initial={{ opacity: 0, y: 40, scale: 0.85 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay, duration: 0.7, type: 'spring', stiffness: 120 }}
    >
      <motion.div
        className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 flex items-center justify-center"
        style={{
          background: 'linear-gradient(145deg, rgba(212,175,110,0.08) 0%, rgba(255,255,255,0.03) 100%)',
          border: `1px solid ${theme.card.border}`,
          boxShadow: `0 0 30px rgba(212,175,110,0.12), 0 8px 32px rgba(0,0,0,0.3)`,
        }}
        animate={{ boxShadow: ['0 0 20px rgba(212,175,110,0.1)', '0 0 40px rgba(212,175,110,0.25)', '0 0 20px rgba(212,175,110,0.1)'] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span
          className="text-4xl sm:text-5xl md:text-6xl font-light tabular-nums"
          style={{ fontFamily: theme.font.display, color: theme.color.gold, textShadow: '0 0 20px rgba(212,175,110,0.5)' }}
        >
          {String(value).padStart(2, '0')}
        </span>
         <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2" style={{ borderColor: theme.ornament.solid }} />
        <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2" style={{ borderColor: theme.ornament.solid }} />
        <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2" style={{ borderColor: theme.ornament.solid }} />
        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2" style={{ borderColor: theme.ornament.solid }} />
      </motion.div>
      <span className="text-[11px] tracking-[0.35em] uppercase" style={{ color: theme.color.gold, fontFamily: theme.font.body, opacity: 0.75 }}>
        {label}
      </span>
    </motion.div>
  )
}

export function DateSection() {
  const { t } = useLanguage()
  const [ref, inView] = useScrollAnimation()
  const { days, hours, minutes, seconds, isPast } = useCountdown(config.event.weddingDate)

  const boxes = [
    { value: days,    label: t.days },
    { value: hours,   label: t.hours },
    { value: minutes, label: t.minutes },
    { value: seconds, label: t.seconds },
  ]

  return (
    <motion.section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-32 md:py-44 px-6 text-center overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9 }}
    >
       <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ backgroundImage: `url(${config.sectionImages.date})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
      />
       <div className="absolute inset-0" style={{ background: theme.bg.section, opacity: 0.88 }} />

       <div className="absolute inset-0 pointer-events-none" style={{ background: theme.bg.vignette }} />

       <motion.div
        className="absolute pointer-events-none"
        style={{ inset: 0, background: theme.bg.glow }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

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
          {t.saveTheDate}
        </motion.p>

        <motion.h3
          className="font-normal mb-3"
          style={{ fontFamily: theme.font.display, fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', color: theme.color.goldLight }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {t.displayDate}
        </motion.h3>

        <motion.p
          className="text-base tracking-widest mb-14"
          style={{ color: theme.color.tagline, fontWeight: 300, fontFamily: theme.font.body }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          {t.displayTime}
        </motion.p>

        {isPast ? (
          <div className="flex flex-col items-center gap-6">

             <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.9, type: 'spring', stiffness: 100 }}
            >
              <svg width="72" height="48" viewBox="0 0 72 48" fill="none" aria-hidden="true">
                <circle cx="24" cy="24" r="18" stroke={theme.color.gold} strokeWidth="2.5" fill="none" opacity="0.9"/>
                <circle cx="48" cy="24" r="18" stroke={theme.color.goldLight} strokeWidth="2.5" fill="none" opacity="0.9"/>
                <motion.circle cx="24" cy="24" r="18" stroke={theme.color.gold} strokeWidth="1" fill="none"
                  animate={{ r: [18, 24, 18], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
                />
                <motion.circle cx="48" cy="24" r="18" stroke={theme.color.goldLight} strokeWidth="1" fill="none"
                  animate={{ r: [18, 24, 18], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
                />
              </svg>
            </motion.div>

             <motion.p
              className="text-xs tracking-[0.45em] uppercase"
              style={{ color: theme.color.gold, fontFamily: theme.font.body }}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.45, duration: 0.7 }}
            >
              {t.weAreMarried}
            </motion.p>

             <motion.h3
              className="font-normal text-center"
              style={{
                fontFamily: theme.font.display,
                fontSize: 'clamp(2rem, 6vw, 4rem)',
                color: theme.color.goldLight,
                textShadow: theme.shadow.name,
                lineHeight: 1.2,
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {t.congratsHeading}
            </motion.h3>

             <motion.div
              className="flex items-center gap-3"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.75, duration: 0.8 }}
            >
              <div className="h-px w-16 sm:w-24" style={{ background: `linear-gradient(to right, transparent, ${theme.ornament.mid})` }} />
              <motion.div
                className="w-2 h-2 rotate-45"
                style={{ background: theme.color.gold }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="h-px w-16 sm:w-24" style={{ background: `linear-gradient(to left, transparent, ${theme.ornament.mid})` }} />
            </motion.div>

             <motion.p
              className="text-base md:text-lg leading-relaxed text-center max-w-lg"
              style={{ color: theme.color.textOnDark, fontWeight: 300, fontFamily: theme.font.body }}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.85, duration: 0.8 }}
            >
              {t.congratsSubtitle}
            </motion.p>

             <motion.p
              className="text-sm italic"
              style={{ color: theme.color.tagline, fontFamily: theme.font.display }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.05, duration: 0.8 }}
            >
              {t.congratsTagline}
            </motion.p>

          </div>
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
