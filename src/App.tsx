import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EnvelopeIntro } from "./components/EnvelopeIntro";
import { CoupleSection } from "./components/CoupleSection";
import { MessageSection } from "./components/MessageSection";
import { DateSection } from "./components/DateSection";
import { VenueSection } from "./components/VenueSection";

import { GuestbookSection } from "./components/GuestbookSection";
import { BackToTop } from "./components/BackToTop";
import { FloatingHearts } from "./components/FloatingHearts";
import { HeroSection } from "./components/HeroSection";

function App() {
  const [stage, setStage] = useState<"envelope" | "hero" | "main">("envelope");

  return (
    <>
      <FloatingHearts />

      <AnimatePresence>
        {stage === "envelope" && (
          <EnvelopeIntro onOpen={() => setStage("hero")} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage === "hero" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{ position: "fixed", inset: 0, zIndex: 50 }}
          >
            <HeroSection onEnter={() => setStage("main")} />
          </motion.div>
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
            <MessageSection />
            <DateSection />
            <VenueSection />
            <GuestbookSection />
          </motion.main>
        )}
      </AnimatePresence>

      <BackToTop />
    </>
  );
}

export default App;
