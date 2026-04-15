import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EnvelopeIntro } from "./components/EnvelopeIntro";
import { CoupleSection } from "./components/CoupleSection";
import { MessageSection } from "./components/MessageSection";
import { DateSection } from "./components/DateSection";
import { VenueSection } from "./components/VenueSection";
import { EngagementTimeline } from "./components/EngagementTimeline";
import { BackToTop } from "../../shared/BackToTop";
import { FloatingHearts } from "../../shared/FloatingHearts";
import { SectionDivider } from "../../shared/SectionDivider";

const SCROLL_SPEED = 2.5;

function getScrollY(): number {
  return window.scrollY ?? document.documentElement.scrollTop ?? 0;
}

function scrollTo(y: number) {
   try {
    window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
  } catch {
    window.scrollTo(0, y);
  }
}

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
        document.documentElement.scrollHeight -
        (window.visualViewport?.height ?? window.innerHeight);
      const currentScroll = getScrollY();

      if (currentScroll >= maxScroll - 10) {
        scrollTo(maxScroll);
        isAutoScrollingRef.current = false;
        document.documentElement.classList.remove("auto-scrolling");
        return;
      }

      let newScroll = currentScroll + SCROLL_SPEED;
      if (newScroll > maxScroll) newScroll = maxScroll;

      scrollTo(newScroll);
      rafRef.current = requestAnimationFrame(animateScroll);
    };

    const startAutoScroll = () => {
      if (isAutoScrollingRef.current) return;
      isAutoScrollingRef.current = true;
      lastTimestamp = 0;
      document.documentElement.classList.add("auto-scrolling");
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
      document.documentElement.classList.remove("auto-scrolling");
    };
  }, [active]);
}

function App() {
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

            {/* <SectionDivider /> */}
            {/* <GuestbookSection /> */}
          </motion.main>
        )}
      </AnimatePresence>

      <BackToTop />
    </>
  );
}

export default App;
