import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EnvelopeIntro } from "./components/EnvelopeIntro";
import { CoupleSection } from "./components/CoupleSection";
import { MessageSection } from "./components/MessageSection";
import { DateSection } from "./components/DateSection";
import { VenueSection } from "./components/VenueSection";
import { SectionDivider } from "../../shared/SectionDivider";
import { BackToTop } from "../../shared/BackToTop";
import { FloatingHearts } from "../../shared/FloatingHearts";

// px per second — feels like a slow natural finger drag
const SCROLL_PX_PER_SEC = 500;

function useAutoScroll(active: boolean) {
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;

    let cancelled = false;
    let velocity = 0; // current speed px/s
    let lastTs: number | null = null;

    function tick(ts: number) {
      if (cancelled) return;

      const dt = lastTs !== null ? (ts - lastTs) / 1000 : 0;
      lastTs = ts;

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      // Gently accelerate up to target speed, decelerate near the bottom
      const remaining = maxScroll - window.scrollY;
      const targetSpeed =
        remaining > 80
          ? SCROLL_PX_PER_SEC
          : SCROLL_PX_PER_SEC * (remaining / 80);

      // Smooth acceleration (like a finger gaining/losing momentum)
      velocity += (targetSpeed - velocity) * Math.min(dt * 3, 1);

      const next = window.scrollY + velocity * dt;
      window.scrollTo(0, next);

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
