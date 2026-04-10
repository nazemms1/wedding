import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EnvelopeIntro } from './components/EnvelopeIntro'
import { CoupleSection } from './components/CoupleSection'
import { MessageSection } from './components/MessageSection'
import { DateSection } from './components/DateSection'
import { VenueSection } from './components/VenueSection'
import { SectionDivider } from '../../shared/SectionDivider'
import { BackToTop } from '../../shared/BackToTop'
import { FloatingHearts } from '../../shared/FloatingHearts'

export function BisherApp() {
  const [stage, setStage] = useState<'envelope' | 'main'>('envelope')

  return (
    <>
      <FloatingHearts />

      <AnimatePresence>
        {stage === 'envelope' && (
          <EnvelopeIntro onOpen={() => setStage('main')} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage === 'main' && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <CoupleSection />
            <SectionDivider />
            <MessageSection />
            <SectionDivider />
            <DateSection />
            <SectionDivider />
            <VenueSection />
          </motion.main>
        )}
      </AnimatePresence>

      <BackToTop />
    </>
  )
}
