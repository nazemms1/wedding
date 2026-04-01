import { useRef } from "react";
import { useInView } from "framer-motion";

type ScrollAnimationResult = [React.RefObject<HTMLElement | null>, boolean];

export function useScrollAnimation(): ScrollAnimationResult {
  const ref = useRef<HTMLElement>(null);

  const inView = useInView(ref, {
    once: true,
  });

  return [ref, inView];
}
