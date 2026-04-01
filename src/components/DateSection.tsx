import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useCountdown } from '../hooks/useCountdown'
import { config } from '../config'

interface CountdownBoxProps {
  value: number
  label: string
  delay: number
  inView: boolean
  accent: string
}

function CountdownBox({ value, label, delay, inView, accent }: CountdownBoxProps) {
  return (
    <motion.div
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0, y: 40, scale: 0.85 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay, duration: 0.7, type: 'spring', stiffness: 120 }}
    >
      <div
        className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center glow-pulse"
        style={{
          background: 'linear-gradient(135deg, rgba(248,251,255,0.98) 0%, rgba(224,242,254,0.92) 100%)',
          border: `1px solid ${accent}50`,
          boxShadow: `0 4px 24px ${accent}25`,
        }}
      >
        <span
          className="text-3xl sm:text-4xl md:text-5xl font-light tabular-nums"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: accent,
          }}
        >
          {String(value).padStart(2, '0')}
        </span>
        {/* Animated corner accents */}
        <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2" style={{ borderColor: accent }} />
        <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2" style={{ borderColor: accent }} />
        <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2" style={{ borderColor: accent }} />
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2" style={{ borderColor: accent }} />
      </div>
      <span className="text-[11px] tracking-[0.3em] uppercase" style={{ color: '#6B7280' }}>
        {label}
      </span>
    </motion.div>
  )
}

export function DateSection() {
  const [ref, inView] = useScrollAnimation()
  const { days, hours, minutes, seconds, isPast } = useCountdown(config.event.weddingDate)

  const boxes = [
    { value: days,    label: 'Days',    accent: '#0EA5E9' },
    { value: hours,   label: 'Hours',   accent: '#0F2557' },
    { value: minutes, label: 'Minutes', accent: '#38BDF8' },
    { value: seconds, label: 'Seconds', accent: '#D4AF6E' },
  ]

  return (
    <motion.section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-32 md:py-44 px-6 text-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #EFF6FF 0%, #DBEAFE 40%, #BAE6FD 70%, #C7D9F5 100%)' }}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9 }}
    >
      {/* Orbiting ring decoration */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <motion.div
          className="w-[700px] h-[700px] rounded-full"
          style={{ border: '1px solid rgba(56,189,248,0.1)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{ border: '1px solid rgba(15,37,87,0.07)' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.p
          className="text-xs tracking-[0.45em] uppercase mb-6"
          style={{ color: '#0EA5E9' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1, duration: 0.7 }}
        >
          Save the Date
        </motion.p>

        <motion.h3
          className="font-normal mb-3"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
            color: '#0F2557',
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {config.event.displayDate}
        </motion.h3>

        <motion.p
          className="text-base tracking-widest mb-14"
          style={{ color: '#6B7280', fontWeight: 300 }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35, duration: 0.7 }}
        >
          {config.event.displayTime}
        </motion.p>

        {isPast ? (
          <motion.p
            className="text-2xl italic"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#0EA5E9' }}
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
                  accent={box.accent}
                  delay={0.4 + i * 0.12}
                  inView={inView}
                />
                {i < boxes.length - 1 && (
                  <motion.span
                    className="text-3xl mt-7 sm:mt-9"
                    style={{ color: '#D4AF6E', opacity: 0.6 }}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 0.6 } : {}}
                    transition={{ delay: 0.5 + i * 0.12 }}
                  >
                    :
                  </motion.span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  )
}
