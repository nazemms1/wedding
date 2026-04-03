import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EnvelopeIntro } from "./components/EnvelopeIntro";
import { CoupleSection } from "./components/CoupleSection";
import { MessageSection } from "./components/MessageSection";
import { DateSection } from "./components/DateSection";
import { VenueSection } from "./components/VenueSection";
import { EngagementTimeline } from "./components/EngagementTimeline";
import { GuestbookSection } from "./components/GuestbookSection";
import { BackToTop } from "./components/BackToTop";
import { FloatingHearts } from "./components/FloatingHearts";
import { SectionDivider } from "./components/SectionDivider";

function App() {
  const [stage, setStage] = useState<"envelope" | "main">("envelope");

  return (
    <>
      <FloatingHearts />

      <AnimatePresence>
        {stage === "envelope" && (
          <EnvelopeIntro onOpen={() => setStage("main")} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage === "main" && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <CoupleSection />
            <SectionDivider />
            <EngagementTimeline />
            <SectionDivider />

            <MessageSection />
            <SectionDivider />
            <DateSection />
            <SectionDivider />
            <VenueSection />

            <SectionDivider />
            <GuestbookSection />
          </motion.main>
        )}
      </AnimatePresence>

      <BackToTop />
    </>
  );
}

export default App;
