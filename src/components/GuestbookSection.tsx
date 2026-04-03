import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { config } from '../config'
import { theme } from '../theme'

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
        background: theme.card.bg,
        boxShadow: '0 2px 24px rgba(0,0,0,0.2)',
        border: `1px solid ${theme.card.border}`,
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.08 * index, duration: 0.55 }}
      whileHover={{ y: -3, boxShadow: '0 8px 32px rgba(212,175,110,0.12)' }}
    >
      {/* Top gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: theme.card.topBar }} />

      {/* Decorative quote mark */}
      <div
        className="absolute top-4 right-5 text-6xl leading-none select-none pointer-events-none"
        style={{ fontFamily: theme.font.display, color: 'rgba(212,175,110,0.06)' }}
        aria-hidden="true"
      >
        "
      </div>

      <p
        className="text-base leading-relaxed mb-6"
        style={{ color: theme.color.textOnDark, fontWeight: 300, fontStyle: 'italic' }}
      >
        "{msg.message}"
      </p>

      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${theme.color.goldDark}, ${theme.color.gold})`, color: '#0A1A3A' }}
        >
          {msg.name.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-medium" style={{ color: theme.color.gold, fontFamily: theme.font.body }}>
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
      setMessages(prev => [{ id: Date.now(), name: name.trim(), message: message.trim() }, ...prev])
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
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
    >
      {/* Background image */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ backgroundImage: `url(${config.sectionImages.guestbook})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
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
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
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
              left: `${(i * 4.0 + 1) % 100}%`,
              top: `${(i * 5.9 + 3) % 100}%`,
              background: theme.dust[i % 4],
            }}
            animate={{ opacity: [0, 0.9, 0], scale: [0, 1.8, 0] }}
            transition={{ duration: 3 + (i % 6) * 0.7, repeat: Infinity, delay: (i * 0.28) % 5, ease: 'easeInOut' }}
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

      <div className="relative z-10 max-w-3xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.8 }}
        >
          {/* Top rule */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-10 sm:w-16" style={{ background: `linear-gradient(to right, transparent, ${theme.ornament.half})` }} />
            <div className="w-1 h-1 rounded-full" style={{ background: theme.ornament.solid, opacity: 0.5 }} />
            <div className="h-px w-10 sm:w-16" style={{ background: `linear-gradient(to left, transparent, ${theme.ornament.half})` }} />
          </div>

          <motion.p
            className="text-xs tracking-[0.45em] uppercase mb-5"
            style={{ color: theme.color.gold, fontFamily: theme.font.body }}
          >
            Leave a Wish
          </motion.p>

          <h3
            className="font-normal mb-4"
            style={{ fontFamily: theme.font.display, fontSize: 'clamp(2rem, 5vw, 3rem)', color: theme.color.goldLight }}
          >
            Congratulations Book
          </h3>

          <p className="text-sm leading-relaxed" style={{ color: theme.color.textMuted, fontWeight: 300, fontFamily: theme.font.body }}>
            Share your love and well wishes for{' '}
            <span style={{ color: theme.color.gold }}>{config.couple.partner1}</span>
            {' '}&amp;{' '}
            <span style={{ color: theme.color.goldDark }}>{config.couple.partner2}</span>
          </p>

          {/* Diamond ornament */}
          <motion.div
            className="flex items-center justify-center gap-3 mt-8"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.35, duration: 0.8 }}
          >
            <div className="h-px w-20" style={{ background: `linear-gradient(to right, transparent, ${theme.ornament.mid})` }} />
            <motion.svg
              width="18" height="18" viewBox="0 0 24 24" fill={theme.ornament.solid}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            >
              <path d="M12 21C12 21 3 14 3 8.5C3 5.4 5.4 3 8.5 3C10.2 3 11.7 3.8 12 5C12.3 3.8 13.8 3 15.5 3C18.6 3 21 5.4 21 8.5C21 14 12 21 12 21Z"/>
            </motion.svg>
            <div className="h-px w-20" style={{ background: `linear-gradient(to left, transparent, ${theme.ornament.mid})` }} />
          </motion.div>
        </motion.div>

        {/* Form card */}
        <motion.form
          onSubmit={handleSubmit}
          className="relative mb-14 p-8 md:p-10"
          style={{
            background: theme.card.bg,
            boxShadow: '0 4px 40px rgba(0,0,0,0.25)',
            border: `1px solid ${theme.card.border}`,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {/* Top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: theme.card.topBar }} />

          {/* Corner accents */}
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2" style={{ borderColor: theme.ornament.soft }} />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2" style={{ borderColor: theme.ornament.soft }} />

          <div className="relative flex flex-col gap-6">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-[0.25em] uppercase" style={{ color: theme.color.gold, fontFamily: theme.font.body }}>
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
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid ${theme.card.border}`,
                  color: theme.color.textOnDark,
                  caretColor: theme.color.gold,
                  fontFamily: theme.font.body,
                }}
                onFocus={e => (e.target.style.borderColor = theme.ornament.solid)}
                onBlur={e => (e.target.style.borderColor = theme.card.border)}
                required
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-[0.25em] uppercase" style={{ color: theme.color.gold, fontFamily: theme.font.body }}>
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
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid ${theme.card.border}`,
                  color: theme.color.textOnDark,
                  caretColor: theme.color.gold,
                  fontFamily: theme.font.body,
                }}
                onFocus={e => (e.target.style.borderColor = theme.ornament.solid)}
                onBlur={e => (e.target.style.borderColor = theme.card.border)}
                required
              />
              <div className="text-right text-xs" style={{ color: theme.color.subtle, fontFamily: theme.font.body }}>
                {message.length} / 400
              </div>
            </div>

            {/* Submit row */}
            <div className="flex items-center gap-5 pt-1">
              <motion.button
                type="submit"
                disabled={submitting || !name.trim() || !message.trim()}
                className="relative overflow-hidden px-9 py-3.5 text-sm tracking-[0.18em] uppercase disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                style={{
                  border: `1px solid ${theme.button.border}`,
                  color: theme.button.text,
                  background: 'transparent',
                  fontFamily: theme.font.body,
                }}
                whileHover={{ background: theme.button.hoverBg, scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                {submitting ? (
                  <motion.span
                    className="inline-block w-4 h-4 rounded-full border-2"
                    style={{ borderColor: `${theme.color.gold}40`, borderTopColor: theme.color.gold }}
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
                    style={{ color: theme.color.gold, fontFamily: theme.font.body }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={theme.ornament.solid} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
              style={{ color: theme.color.subtle, fontFamily: theme.font.body }}
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

        {/* Footer names */}
        <motion.p
          className="text-center text-sm italic mt-16"
          style={{ fontFamily: theme.font.display, color: theme.color.subtle }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          — <span style={{ color: theme.color.gold }}>{config.couple.partner1}</span>
          {' '}&amp;{' '}
          <span style={{ color: theme.color.goldDark }}>{config.couple.partner2}</span> —
        </motion.p>

        {/* Bottom rule */}
        <motion.div
          className="flex items-center justify-center gap-3 mt-8"
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
