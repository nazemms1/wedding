// import { useRef, useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import domtoimage from 'dom-to-image-more'
// import { config } from '../config'
// import { theme } from '../theme'

// function InvitationCard({ cardRef }: { cardRef: React.RefObject<HTMLDivElement> }) {
//   return (
//     <div
//       ref={cardRef}
//       style={{
//         // width: 600,
//         background: 'linear-gradient(160deg, #050E1F 0%, #0A1A3A 40%, #0D1E45 70%, #081530 100%)',
//         padding: '60px 50px',
//         fontFamily: "'Georgia', serif",
//         position: 'relative',
//         overflow: 'hidden',
//       }}
//     >
//       {/* Gold border */}
//       <div style={{ position: 'absolute', inset: 12, border: '1px solid rgba(212,175,110,0.35)', pointerEvents: 'none' }} />
//       <div style={{ position: 'absolute', inset: 18, border: '1px solid rgba(212,175,110,0.12)', pointerEvents: 'none' }} />

//       {/* Corner ornaments */}
//       {[
//         { top: 12, left: 12 },
//         { top: 12, right: 12 },
//         { bottom: 12, left: 12 },
//         { bottom: 12, right: 12 },
//       ].map((pos, i) => (
//         <div key={i} style={{ position: 'absolute', width: 24, height: 24, ...pos }}>
//           <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//             {i === 0 && <><path d="M1 12 L1 1 L12 1" stroke="#D4AF6E" strokeWidth="1.5" opacity="0.6" /><circle cx="1" cy="1" r="1.5" fill="#D4AF6E" opacity="0.7" /></>}
//             {i === 1 && <><path d="M23 12 L23 1 L12 1" stroke="#D4AF6E" strokeWidth="1.5" opacity="0.6" /><circle cx="23" cy="1" r="1.5" fill="#D4AF6E" opacity="0.7" /></>}
//             {i === 2 && <><path d="M1 12 L1 23 L12 23" stroke="#D4AF6E" strokeWidth="1.5" opacity="0.6" /><circle cx="1" cy="23" r="1.5" fill="#D4AF6E" opacity="0.7" /></>}
//             {i === 3 && <><path d="M23 12 L23 23 L12 23" stroke="#D4AF6E" strokeWidth="1.5" opacity="0.6" /><circle cx="23" cy="23" r="1.5" fill="#D4AF6E" opacity="0.7" /></>}
//           </svg>
//         </div>
//       ))}

//       {/* Top rule */}
//       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 28 }}>
//         <div style={{ height: 1, width: 60, background: 'linear-gradient(to right, transparent, rgba(212,175,110,0.6))' }} />
//         <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
//           <path d="M7 1 L13 7 L7 13 L1 7 Z" stroke="#D4AF6E" strokeWidth="1" fill="rgba(212,175,110,0.15)" />
//           <circle cx="7" cy="7" r="1.5" fill="#D4AF6E" />
//         </svg>
//         <div style={{ height: 1, width: 60, background: 'linear-gradient(to left, transparent, rgba(212,175,110,0.6))' }} />
//       </div>

//       {/* Eyebrow */}
//       <p style={{ color: '#D4AF6E', letterSpacing: '0.4em', fontSize: 10, textAlign: 'center', textTransform: 'uppercase', marginBottom: 24, fontFamily: "'Arial', sans-serif" }}>
//         You are cordially invited
//       </p>

//       {/* Names */}
//       <h1 style={{ fontFamily: "'Georgia', serif", fontSize: 52, fontWeight: 400, color: '#D4AF6E', textAlign: 'center', lineHeight: 1.1, marginBottom: 4, textShadow: '0 0 30px rgba(212,175,110,0.4)' }}>
//         {config.couple.partner1}
//       </h1>
//       <p style={{ color: 'rgba(212,175,110,0.5)', textAlign: 'center', fontSize: 22, marginBottom: 4 }}>
//         &amp;
//       </p>
//       <h1 style={{ fontFamily: "'Georgia', serif", fontSize: 52, fontWeight: 400, color: '#D4AF6E', textAlign: 'center', lineHeight: 1.1, marginBottom: 32, textShadow: '0 0 30px rgba(212,175,110,0.4)' }}>
//         {config.couple.partner2}
//       </h1>

//       {/* Divider */}
//       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 28 }}>
//         <div style={{ height: 1, width: 80, background: 'linear-gradient(to right, transparent, rgba(212,175,110,0.5))' }} />
//         <svg width="16" height="16" viewBox="0 0 24 24" fill="#D4AF6E">
//           <path d="M12 21C12 21 3 14 3 8.5C3 5.4 5.4 3 8.5 3C10.2 3 11.7 3.8 12 5C12.3 3.8 13.8 3 15.5 3C18.6 3 21 5.4 21 8.5C21 14 12 21 12 21Z" />
//         </svg>
//         <div style={{ height: 1, width: 80, background: 'linear-gradient(to left, transparent, rgba(212,175,110,0.5))' }} />
//       </div>

//       {/* Date & Time */}
//       <p style={{ color: 'rgba(212,175,110,0.9)', textAlign: 'center', fontSize: 18, letterSpacing: '0.15em', marginBottom: 6, fontFamily: "'Georgia', serif" }}>
//         {config.event.displayDate}
//       </p>
//       <p style={{ color: 'rgba(212,175,110,0.55)', textAlign: 'center', fontSize: 13, letterSpacing: '0.3em', marginBottom: 24, fontFamily: "'Arial', sans-serif", textTransform: 'uppercase' }}>
//         {config.event.displayTime}
//       </p>

//       {/* Venue */}
//       <div style={{ textAlign: 'center', marginBottom: 32 }}>
//         <p style={{ color: 'rgba(212,175,110,0.7)', fontSize: 14, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: "'Arial', sans-serif", marginBottom: 4 }}>
//           {config.venue.name}
//         </p>
//         <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, letterSpacing: '0.1em', fontFamily: "'Arial', sans-serif" }}>
//           {config.venue.address}
//         </p>
//       </div>

//       {/* Hashtag */}
//       <p style={{ color: 'rgba(212,175,110,0.35)', textAlign: 'center', fontSize: 11, letterSpacing: '0.3em', fontFamily: "'Arial', sans-serif" }}>
//         {config.closing.hashtag}
//       </p>
//     </div>
//   )
// }

// export function SaveInvitation() {
//   const cardRef = useRef<HTMLDivElement>(null)
//   const [saving, setSaving] = useState(false)
//   const [showPreview, setShowPreview] = useState(false)

//   async function handleSave() {
//     if (!cardRef.current) return
//     setSaving(true)
//     try {
//       const dataUrl = await domtoimage.toPng(cardRef.current, { width: cardRef.current.offsetWidth * 2, height: cardRef.current.offsetHeight * 2, style: { transform: 'scale(2)', transformOrigin: 'top left' } })
//       const link = document.createElement('a')
//       link.download = `${config.couple.partner1}-${config.couple.partner2}-invitation.png`
//       link.href = dataUrl
//       link.click()
//     } finally {
//       setSaving(false)
//     }
//   }

//   return (
//     <>
//       {/* Trigger button */}
//       <motion.button
//         onClick={() => setShowPreview(true)}
//         className="flex items-center gap-2 px-6 py-3 text-xs tracking-[0.2em] uppercase cursor-pointer"
//         style={{ border: `1px solid ${theme.ornament.soft}`, color: theme.color.gold, background: 'transparent', fontFamily: theme.font.body }}
//         whileHover={{ background: 'rgba(212,175,110,0.06)', scale: 1.03 }}
//         whileTap={{ scale: 0.97 }}
//       >
//         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//           <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
//           <polyline points="7 10 12 15 17 10" />
//           <line x1="12" y1="15" x2="12" y2="3" />
//         </svg>
//         Save Invitation
//       </motion.button>

//       {/* Preview Modal */}
//       <AnimatePresence>
//         {showPreview && (
//           <motion.div
//             className="fixed inset-0 z-50 flex items-center justify-center p-6"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             {/* Backdrop */}
//             <motion.div
//               className="absolute inset-0 backdrop-blur-sm"
//               style={{ background: 'rgba(5,14,31,0.85)' }}
//               onClick={() => setShowPreview(false)}
//             />

//             <motion.div
//               className="relative z-10 flex flex-col items-center gap-6"
//               initial={{ opacity: 0, scale: 0.9, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.9, y: 20 }}
//               transition={{ type: 'spring', stiffness: 200 }}
//             >
//               {/* Card preview — scaled down on mobile */}
//               <div style={{ transform: 'scale(0.75)', transformOrigin: 'top center' }}>
//                 <InvitationCard cardRef={cardRef as React.RefObject<HTMLDivElement>} />
//               </div>

//               {/* Actions */}
//               <div className="flex gap-4 -mt-12">
//                 <motion.button
//                   onClick={handleSave}
//                   disabled={saving}
//                   className="flex items-center gap-2 px-8 py-3.5 text-sm tracking-[0.18em] uppercase disabled:opacity-50 cursor-pointer"
//                   style={{ background: 'linear-gradient(135deg, rgba(212,175,110,0.2), rgba(212,175,110,0.08))', border: `1px solid ${theme.ornament.solid}`, color: theme.color.gold, fontFamily: theme.font.body }}
//                   whileHover={{ scale: 1.04 }}
//                   whileTap={{ scale: 0.97 }}
//                 >
//                   {saving ? (
//                     <motion.span className="inline-block w-4 h-4 rounded-full border-2" style={{ borderColor: `${theme.color.gold}40`, borderTopColor: theme.color.gold }} animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
//                   ) : (
//                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                       <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
//                       <polyline points="7 10 12 15 17 10" />
//                       <line x1="12" y1="15" x2="12" y2="3" />
//                     </svg>
//                   )}
//                   {saving ? 'Saving...' : 'Download PNG'}
//                 </motion.button>

//                 <motion.button
//                   onClick={() => setShowPreview(false)}
//                   className="px-6 py-3.5 text-xs tracking-widest uppercase cursor-pointer"
//                   style={{ border: `1px solid rgba(255,255,255,0.1)`, color: 'rgba(255,255,255,0.4)', fontFamily: theme.font.body }}
//                   whileHover={{ opacity: 0.7 }}
//                 >
//                   Close
//                 </motion.button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   )
// }
