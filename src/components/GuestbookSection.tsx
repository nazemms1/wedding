import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { config } from '../config'

interface GuestMessage {
  id: number
  name: string
  message: string
}

const SEED_MESSAGES: GuestMessage[] = [
  { id: 1, name: 'Sarah & Mark', message: 'Wishing you both a lifetime of happiness and endless adventures together. So thrilled to celebrate you!' },
  { id: 2, name: 'The Johnson Family', message: 'May your love grow stronger with every passing year. Congratulations to the most beautiful couple!' },
]

function MessageCard({ msg, index, inView }: { msg: GuestMessage; index: number; inView: boolean }) {
  return (
    <motion.div
      className="relative p-7"
      style={{
        background: 'linear-gradient(135deg, #DBEAFE 0%, #BAE6FD 100%)',
        boxShadow: '0 2px 24px rgba(15,37,87,0.07)',
        border: '1px solid rgba(56,189,248,0.12)',
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.08 * index, duration: 0.55 }}
      whileHover={{ y: -3, boxShadow: '0 8px 32px rgba(56,189,248,0.15)' }}
    >
      {/* Top sky blue line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: 'linear-gradient(to right, #38BDF8, #D4AF6E)' }}
      />

      {/* Decorative quote mark */}
      <div
        className="absolute top-4 right-5 text-6xl leading-none select-none pointer-events-none"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          color: 'rgba(56,189,248,0.08)',
        }}
        aria-hidden="true"
      >
        "
      </div>

      <p
        className="text-base leading-relaxed mb-6"
        style={{ color: '#4A5568', fontWeight: 300, fontStyle: 'italic' }}
      >
        "{msg.message}"
      </p>

      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 text-white"
          style={{ background: 'linear-gradient(135deg, #38BDF8, #D4AF6E)' }}
        >
          {msg.name.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-medium" style={{ color: '#0F2557' }}>
          {msg.name}
        </span>
      </div>
    </motion.div>
  )
}

export function GuestbookSection() {
  const [ref, inView] = useScrollAnimation()
  const [messages, setMessages] = useState<GuestMessage[]>(SEED_MESSAGES)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return

    setSubmitting(true)
    setTimeout(() => {
      setMessages(prev => [
        { id: Date.now(), name: name.trim(), message: message.trim() },
        ...prev,
      ])
      setName('')
      setMessage('')
      setSubmitting(false)
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3500)
    }, 700)
  }

  return (
    <motion.section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-32 md:py-44 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #EFF6FF 0%, #DBEAFE 40%, #BAE6FD 70%, #C7D9F5 100%)' }}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
    >
      {/* Soft background blobs */}
      <motion.div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.09) 0%, transparent 70%)', filter: 'blur(50px)' }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(15,37,87,0.06) 0%, transparent 70%)', filter: 'blur(50px)' }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.8 }}
        >
          <motion.p
            className="text-xs tracking-[0.45em] uppercase mb-5"
            style={{ color: '#0EA5E9' }}
          >
            Leave a Wish
          </motion.p>

          <h3
            className="font-normal mb-4"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              color: '#0F2557',
            }}
          >
            Congratulations Book
          </h3>

          <p className="text-sm leading-relaxed" style={{ color: '#6B7280', fontWeight: 300 }}>
            Share your love and well wishes for <span style={{ color: '#7DD3FC' }}>{config.couple.partner1}</span> &amp; <span style={{ color: '#4A90D9' }}>{config.couple.partner2}</span>
          </p>

          {/* Ornament */}
          <motion.div
            className="flex items-center justify-center gap-4 mt-8"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.35, duration: 0.8 }}
          >
            <div className="h-px w-20" style={{ background: 'linear-gradient(to right, transparent, #38BDF8)' }} />
            <motion.svg
              width="18" height="18" viewBox="0 0 24 24" fill="#38BDF8"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            >
              <path d="M12 21C12 21 3 14 3 8.5C3 5.4 5.4 3 8.5 3C10.2 3 11.7 3.8 12 5C12.3 3.8 13.8 3 15.5 3C18.6 3 21 5.4 21 8.5C21 14 12 21 12 21Z"/>
            </motion.svg>
            <div className="h-px w-20" style={{ background: 'linear-gradient(to left, transparent, #38BDF8)' }} />
          </motion.div>
        </motion.div>

        {/* Form card */}
        <motion.form
          onSubmit={handleSubmit}
          className="relative mb-14 p-8 md:p-10"
          style={{
            background: 'linear-gradient(135deg, #DBEAFE 0%, #BAE6FD 100%)',
            boxShadow: '0 4px 40px rgba(15,37,87,0.08)',
            border: '1px solid rgba(56,189,248,0.14)',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {/* Sky blue top accent bar */}
          <div
            className="absolute top-0 left-0 right-0 h-1 rounded-t"
            style={{ background: 'linear-gradient(to right, #38BDF8, #D4AF6E, #0F2557)' }}
          />

          {/* Corner accents */}
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2" style={{ borderColor: 'rgba(15,37,87,0.2)' }} />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2" style={{ borderColor: 'rgba(56,189,248,0.25)' }} />

          <div className="relative flex flex-col gap-6">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-[0.25em] uppercase" style={{ color: '#0F2557' }}>
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Sarah & Mark"
                maxLength={60}
                className="w-full px-4 py-3.5 text-sm outline-none transition-all duration-200"
                style={{
                  background: '#DBEAFE',
                  border: '1px solid rgba(15,37,87,0.15)',
                  color: '#0F2557',
                  caretColor: '#38BDF8',
                }}
                onFocus={e => (e.target.style.borderColor = '#38BDF8')}
                onBlur={e => (e.target.style.borderColor = 'rgba(15,37,87,0.15)')}
                required
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-[0.25em] uppercase" style={{ color: '#0F2557' }}>
                Your Message
              </label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Share your wishes, memories, or a heartfelt note…"
                rows={4}
                maxLength={400}
                className="w-full px-4 py-3.5 text-sm outline-none transition-all duration-200 resize-none"
                style={{
                  background: '#DBEAFE',
                  border: '1px solid rgba(15,37,87,0.15)',
                  color: '#0F2557',
                  caretColor: '#38BDF8',
                }}
                onFocus={e => (e.target.style.borderColor = '#38BDF8')}
                onBlur={e => (e.target.style.borderColor = 'rgba(15,37,87,0.15)')}
                required
              />
              <div className="text-right text-xs" style={{ color: 'rgba(15,37,87,0.3)' }}>
                {message.length} / 400
              </div>
            </div>

            {/* Submit row */}
            <div className="flex items-center gap-5 pt-1">
              <motion.button
                type="submit"
                disabled={submitting || !name.trim() || !message.trim()}
                className="relative overflow-hidden px-9 py-3.5 text-sm tracking-[0.18em] uppercase text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #0EA5E9 0%, #0369A1 100%)' }}
                whileHover={{ scale: 1.04, boxShadow: '0 6px 30px rgba(14,165,233,0.4)' }}
                whileTap={{ scale: 0.97 }}
              >
                {submitting ? (
                  <motion.span
                    className="inline-block w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  />
                ) : (
                  'Send Wishes'
                )}
              </motion.button>

              <AnimatePresence>
                {submitted && (
                  <motion.p
                    className="text-sm flex items-center gap-2"
                    style={{ color: '#0F2557' }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Message sent!
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.form>

        {/* Messages grid */}
        {messages.length > 0 && (
          <div>
            <motion.p
              className="text-xs tracking-[0.35em] uppercase mb-8 text-center"
              style={{ color: 'rgba(15,37,87,0.4)' }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              {messages.length} {messages.length === 1 ? 'Wish' : 'Wishes'} Shared
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {messages.map((msg, i) => (
                <MessageCard key={msg.id} msg={msg} index={i} inView={inView} />
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <motion.p
          className="text-center text-sm italic mt-16"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", color: 'rgba(15,37,87,0.35)' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          — <span style={{ color: 'rgba(125,211,252,0.6)' }}>{config.couple.partner1}</span> &amp; <span style={{ color: 'rgba(74,144,217,0.6)' }}>{config.couple.partner2}</span> —
        </motion.p>
      </div>
    </motion.section>
  )
}
