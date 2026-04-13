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

const SCROLL_PX_PER_SEC = 600;

function useAutoScroll(active: boolean) {
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;

    let cancelled = false;
    let velocity = 0;
    let lastTs: number | null = null;

    function tick(ts: number) {
      if (cancelled) return;

      const dt = lastTs !== null ? (ts - lastTs) / 1000 : 0;
      lastTs = ts;

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      const remaining = maxScroll - window.scrollY;
      const targetSpeed =
        remaining > 80
          ? SCROLL_PX_PER_SEC
          : SCROLL_PX_PER_SEC * (remaining / 80);

      velocity += (targetSpeed - velocity) * Math.min(dt * 3, 1);

      window.scrollTo(0, window.scrollY + velocity * dt);

      if (window.scrollY < maxScroll - 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    const delay = setTimeout(() => {
      if (cancelled) return;
      window.scrollTo(0, 0);
      rafRef.current = requestAnimationFrame(tick);
    }, 1200);

    return () => {
      cancelled = true;
      clearTimeout(delay);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
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
