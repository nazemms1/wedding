import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EnvelopeIntro } from "./components/EnvelopeIntro";
import { CoupleSection } from "./components/CoupleSection";
import { MessageSection } from "./components/MessageSection";
import { DateSection } from "./components/DateSection";
import { VenueSection } from "./components/VenueSection";
import { BackToTop } from "../../shared/BackToTop";
import { FloatingHearts } from "../../shared/FloatingHearts";
import { SectionDivider } from "../../shared/SectionDivider";
import { EngagementTimeline } from "../joudi/components/EngagementTimeline";

const SCROLL_SPEED = 1.8;

function useAutoScroll(active: boolean) {
  const rafRef = useRef<number | null>(null);
  const isAutoScrollingRef = useRef(false);

  useEffect(() => {
    if (!active) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      isAutoScrollingRef.current = false;
      return;
    }

    let lastTimestamp = 0;

    const animateScroll = (timestamp: number) => {
      if (!isAutoScrollingRef.current) return;

      if (timestamp - lastTimestamp < 16) {
        rafRef.current = requestAnimationFrame(animateScroll);
        return;
      }

      lastTimestamp = timestamp;

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      if (currentScroll >= maxScroll - 10) {
        window.scrollTo(0, maxScroll);
        return;
      }

      let newScroll = currentScroll + SCROLL_SPEED;
      if (newScroll > maxScroll) newScroll = maxScroll;

      window.scrollTo(0, newScroll);
      rafRef.current = requestAnimationFrame(animateScroll);
    };

    const startAutoScroll = () => {
      if (isAutoScrollingRef.current) return;
      isAutoScrollingRef.current = true;
      lastTimestamp = 0;
      rafRef.current = requestAnimationFrame(animateScroll);
    };

    const startDelay = setTimeout(startAutoScroll, 1500);

    return () => {
      clearTimeout(startDelay);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      isAutoScrollingRef.current = false;
    };
  }, [active]);
}

export function BisherApp() {
  const [stage, setStage] = useState<"envelope" | "main">("envelope");
  useAutoScroll(stage === "main");

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
          </motion.main>
        )}
      </AnimatePresence>

      <BackToTop />
    </>
  );
}

export default BisherApp;
