import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { config } from '../config'

export function MessageSection() {
  const [ref, inView] = useScrollAnimation()

  return (
    <motion.section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-28 md:py-40 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0F2557 0%, #1A3A80 40%, #1E72C8 70%, #7DD3FC 100%)' }}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.9 }}
    >
      {/* Animated orb — sky blue */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.2) 0%, transparent 70%)', filter: 'blur(40px)' }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Animated orb — gold */}
      <motion.div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,175,110,0.15) 0%, transparent 70%)', filter: 'blur(40px)' }}
        animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Subtle aurora shimmer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 60%, rgba(56,189,248,0.08) 0%, transparent 70%)' }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Large quote mark */}
      <div
        className="absolute top-8 left-6 md:left-16 select-none pointer-events-none"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '180px',
          lineHeight: 1,
          color: 'rgba(212,175,110,0.08)',
        }}
        aria-hidden="true"
      >
        "
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Label */}
        <motion.p
          className="text-xs tracking-[0.45em] uppercase mb-10"
          style={{ color: '#D4AF6E' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.7 }}
        >
          A Message From the Couple
        </motion.p>

        {/* Paragraphs */}
        {config.message.paragraphs.map((para, i) => (
          <motion.p
            key={i}
            className="text-lg md:text-xl leading-relaxed mb-6 last:mb-0"
            style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 300 }}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 + i * 0.2, duration: 0.8 }}
          >
            {para}
          </motion.p>
        ))}

        {/* Shimmer divider */}
        <motion.div
          className="my-10 h-px w-48 mx-auto shimmer-line"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
        />

        {/* Signature */}
        <motion.p
          className="text-2xl md:text-3xl italic"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: '#7DD3FC',
            textShadow: '0 0 20px rgba(56,189,248,0.3)',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.85, duration: 0.8 }}
        >
          {config.message.signature}
        </motion.p>
      </div>
    </motion.section>
  )
}
