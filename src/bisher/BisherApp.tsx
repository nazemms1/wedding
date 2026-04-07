import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BisherEnvelopeIntro } from './BisherEnvelopeIntro'
import { BisherCoupleSection } from './BisherCoupleSection'
import { BisherMessageSection } from './BisherMessageSection'
import { BisherDateSection } from './BisherDateSection'
import { BisherVenueSection } from './BisherVenueSection'
import { SectionDivider } from '../components/SectionDivider'
import { BackToTop } from '../components/BackToTop'
import { FloatingHearts } from '../components/FloatingHearts'

export function BisherApp() {
  const [stage, setStage] = useState<'envelope' | 'main'>('envelope')

  return (
    <>
      <FloatingHearts />

      <AnimatePresence>
        {stage === 'envelope' && (
          <BisherEnvelopeIntro onOpen={() => setStage('main')} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage === 'main' && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <BisherCoupleSection />
            <SectionDivider />
            <BisherMessageSection />
            <SectionDivider />
            <BisherDateSection />
            <SectionDivider />
            <BisherVenueSection />
          </motion.main>
        )}
      </AnimatePresence>

      <BackToTop />
    </>
  )
}
