import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { config } from '../config'

export function VenueSection() {
  const [ref, inView] = useScrollAnimation()

  return (
    <motion.section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-28 md:py-40 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #DBEAFE 0%, #EFF6FF 40%, #E0F2FE 70%, #C7E8FA 100%)' }}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9 }}
    >
      {/* Background accent blobs */}
      <motion.div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(15,37,87,0.07) 0%, transparent 70%)', filter: 'blur(30px)' }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 70%)', filter: 'blur(30px)' }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="max-w-4xl mx-auto">
        <motion.p
          className="text-xs tracking-[0.45em] uppercase mb-6 text-center"
          style={{ color: '#0F2557' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1, duration: 0.7 }}
        >
          The Celebration
        </motion.p>

        <motion.h3
          className="font-normal text-center mb-4"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: '#0F2557',
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {config.venue.name}
        </motion.h3>

        {/* Address with pin icon */}
        <motion.div
          className="flex items-center justify-center gap-2 mb-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35, duration: 0.7 }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <address className="not-italic text-base tracking-wide" style={{ color: '#6B7280', fontWeight: 300 }}>
            {config.venue.address}
          </address>
        </motion.div>

        {/* Map */}
        <motion.div
          className="relative w-full overflow-hidden mb-10"
          style={{ paddingBottom: '42%', minHeight: '240px' }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.45, duration: 0.85 }}
        >
          <iframe
            src={config.venue.googleMapsEmbedUrl}
            title={`Map to ${config.venue.name}`}
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          {/* Dual-color border overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ border: '2px solid transparent', background: 'linear-gradient(135deg, #DBEAFE, #BAE6FD) padding-box, linear-gradient(135deg, #38BDF8, #D4AF6E, #0F2557) border-box' }}
          />
        </motion.div>

        {/* Get Directions */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65, duration: 0.7 }}
        >
          <motion.a
            href={config.venue.googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-9 py-4 text-sm tracking-[0.18em] uppercase text-white"
            style={{ background: 'linear-gradient(135deg, #0F2557 0%, #0369A1 100%)' }}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 30px rgba(3,105,161,0.4)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            Get Directions
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  )
}
