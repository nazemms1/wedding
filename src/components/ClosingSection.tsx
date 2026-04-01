import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { config } from '../config'

function RsvpModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ background: 'rgba(15,37,87,0.75)' }}
        onClick={onClose}
      />
      <motion.div
        className="relative max-w-md w-full p-10 text-center"
        style={{ background: 'linear-gradient(135deg, #DBEAFE 0%, #BAE6FD 100%)' }}
        initial={{ opacity: 0, scale: 0.88, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 30 }}
        transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
      >
        {/* Gradient border */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ border: '2px solid transparent', background: 'linear-gradient(135deg, #DBEAFE, #BAE6FD) padding-box, linear-gradient(135deg, #38BDF8, #D4AF6E, #0F2557) border-box' }}
        />
        {/* Corner accents */}
        <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2" style={{ borderColor: '#38BDF8' }} />
        <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2" style={{ borderColor: '#0F2557' }} />
        <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2" style={{ borderColor: '#0F2557' }} />
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2" style={{ borderColor: '#38BDF8' }} />

        {/* Heart icon */}
        <motion.div
          className="flex justify-center mb-5"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="#38BDF8" aria-hidden="true">
            <path d="M12 21C12 21 3 14 3 8.5C3 5.4 5.4 3 8.5 3C10.2 3 11.7 3.8 12 5C12.3 3.8 13.8 3 15.5 3C18.6 3 21 5.4 21 8.5C21 14 12 21 12 21Z"/>
          </svg>
        </motion.div>

        <h4
          className="text-2xl font-normal mb-3"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#0F2557' }}
        >
          RSVP
        </h4>
        <p className="text-sm leading-relaxed mb-8" style={{ color: '#6B7280' }}>
          Please let us know if you'll be joining us on our special day.
        </p>
        <motion.a
          href={config.closing.rsvpLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full py-4 text-white text-sm tracking-[0.18em] uppercase mb-4"
          style={{ background: 'linear-gradient(135deg, #0EA5E9 0%, #0369A1 100%)' }}
          whileHover={{ scale: 1.02, boxShadow: '0 6px 24px rgba(14,165,233,0.4)' }}
          whileTap={{ scale: 0.98 }}
        >
          Fill Out RSVP Form
        </motion.a>
        <button
          onClick={onClose}
          className="text-xs tracking-widest uppercase cursor-pointer hover:opacity-70 transition-opacity"
          style={{ color: '#6B7280' }}
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  )
}

export function ClosingSection() {
  const [ref, inView] = useScrollAnimation()
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <motion.section
        ref={ref as React.RefObject<HTMLElement>}
        className="relative py-36 md:py-52 px-6 text-center overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #EFF6FF 0%, #DBEAFE 40%, #BAE6FD 70%, #C7D9F5 100%)' }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        {/* Large sky blue glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.14) 0%, transparent 70%)', filter: 'blur(50px)' }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Navy glow */}
        <motion.div
          className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(15,37,87,0.1) 0%, transparent 70%)', filter: 'blur(40px)' }}
          animate={{ scale: [1, 1.15, 1], x: [0, 20, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Shimmer divider top */}
          <motion.div
            className="h-px w-32 mx-auto mb-12 shimmer-line"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ delay: 0.15, duration: 0.8 }}
          />

          <motion.p
            className="text-xs tracking-[0.45em] uppercase mb-8"
            style={{ color: '#0EA5E9' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25, duration: 0.7 }}
          >
            Join Us
          </motion.p>

          <motion.h3
            className="font-normal leading-snug mb-6"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.8rem, 5vw, 3.2rem)',
              color: '#0F2557',
            }}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.85 }}
          >
            {config.closing.message}
          </motion.h3>

          <motion.p
            className="text-sm tracking-widest mb-14"
            style={{ color: '#0EA5E9', opacity: 0.7 }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.7 } : {}}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            {config.closing.hashtag}
          </motion.p>

          {/* RSVP Button */}
          <motion.button
            onClick={() => setShowModal(true)}
            className="relative overflow-hidden px-12 py-4 text-white text-sm tracking-[0.2em] uppercase cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #0EA5E9 0%, #0F2557 100%)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.7 }}
            whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(14,165,233,0.4)' }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Shimmer sweep on hover */}
            <motion.div
              className="absolute inset-0 -skew-x-12 pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)', translateX: '-100%' }}
              whileHover={{ translateX: '200%' }}
              transition={{ duration: 0.5 }}
            />
            RSVP Now
          </motion.button>

          {/* Couple names */}
          <motion.p
            className="mt-16 text-sm italic"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#6B7280' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            — <span style={{ color: '#7DD3FC' }}>{config.couple.partner1}</span> &amp; <span style={{ color: '#4A90D9' }}>{config.couple.partner2}</span> —
          </motion.p>
        </div>
      </motion.section>

      <AnimatePresence>
        {showModal && <RsvpModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </>
  )
}
