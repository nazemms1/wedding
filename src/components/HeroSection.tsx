import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { config } from "../config";
import { theme } from "../theme";

interface HeroSectionProps {
  onEnter: () => void;
}

function Sparkles() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {Array.from({ length: 28 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 2 + Math.random() * 3,
            height: 2 + Math.random() * 3,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background:
              i % 3 === 0
                ? theme.color.gold
                : i % 3 === 1
                  ? theme.color.goldLight
                  : theme.color.goldDark,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.6, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function HeroSection({ onEnter }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [, setVideoFailed] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => setVideoFailed(true));
  }, []);

  function handleEnter() {
    setIsExiting(true);
    setTimeout(onEnter, 950);
  }

  return (
    <motion.div
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      animate={
        isExiting
          ? { opacity: 0, scale: 1.06, filter: "blur(8px)" }
          : { opacity: 1, scale: 1, filter: "blur(0px)" }
      }
      transition={{ duration: 0.95, ease: "easeInOut" }}
    >
      {/* Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={config.video.poster}
        src={config.video.src}
        onError={() => setVideoFailed(true)}
      />

      {/* Fallback */}

      {/* Multi-layer overlay */}
      <div
        className="absolute inset-0 bg-black/55"
        style={{
          background:
            "linear-gradient(160deg, rgba(5,14,31,0.85) 0%, rgba(10,26,58,0.75) 60%, rgba(8,21,48,0.7) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-black/20" />

      {/* Animated aurora glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: theme.bg.glow,
        }}
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.08, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <Sparkles />

      {/* Animated border lines */}
      <motion.div
        className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2"
        style={{ borderColor: theme.ornament.mid }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      />
      <motion.div
        className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2"
        style={{ borderColor: theme.ornament.mid }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      />
      <motion.div
        className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2"
        style={{ borderColor: theme.ornament.mid }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      />
      <motion.div
        className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2"
        style={{ borderColor: theme.ornament.mid }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      />

      {/* Center content */}
      <div className="relative z-10 text-center px-6">
        <motion.p
          className="text-xs tracking-[0.5em] uppercase mb-8"
          style={{ color: theme.color.tagline }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          You are cordially invited
        </motion.p>

        {/* Bride name — sky blue */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.75, duration: 0.9, ease: "easeOut" }}
        >
          <h1
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-normal leading-none mb-1"
            style={{
              fontFamily: theme.font.display,
              color: theme.color.goldLight,
              textShadow: theme.shadow.name,
            }}
          >
            {config.couple.partner1}
          </h1>
        </motion.div>

        {/* Animated ampersand */}
        <motion.div
          className="my-2 flex items-center justify-center gap-4"
          initial={{ opacity: 0, scale: 0.3, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            delay: 1.05,
            duration: 0.7,
            type: "spring",
            stiffness: 200,
          }}
        >
          <motion.div
            className="h-px w-16 sm:w-24"
            style={{
              background: `linear-gradient(to right, transparent, ${theme.ornament.solid})`,
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          />
          <span
            className="text-3xl sm:text-5xl italic"
            style={{
              fontFamily: theme.font.display,
              color: theme.color.gold,
              textShadow: "0 0 20px rgba(212,175,110,0.6)",
            }}
          >
            &amp;
          </span>
          <motion.div
            className="h-px w-16 sm:w-24"
            style={{
              background: `linear-gradient(to left, transparent, ${theme.ornament.solid})`,
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          />
        </motion.div>

        {/* Groom name — deep navy */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.25, duration: 0.9, ease: "easeOut" }}
        >
          <h1
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-normal leading-none mb-10"
            style={{
              fontFamily: theme.font.display,
              color: theme.color.goldDark,
              textShadow: theme.shadow.name,
            }}
          >
            {config.couple.partner2}
          </h1>
        </motion.div>

        {/* Enter button */}
        <motion.button
          onClick={handleEnter}
          className="group relative overflow-hidden px-10 py-4 text-sm tracking-[0.25em] uppercase cursor-pointer"
          style={{
            border: `1px solid ${theme.button.border}`,
            color: theme.button.text,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.7 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <motion.div
            className="absolute inset-0 -z-10"
            style={{
              background: theme.button.hoverBg,
            }}
            initial={{ scaleX: 0, originX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />
          <span className="flex items-center gap-3">
            Open Invitation
            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.4,
                ease: "easeInOut",
              }}
            >
              →
            </motion.span>
          </span>
        </motion.button>
      </div>

      {/* Skip button */}
      <motion.button
        onClick={handleEnter}
        className="absolute top-6 right-6 z-20 text-white/40 text-xs tracking-widest uppercase hover:text-white/70 transition-colors duration-200 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
      >
        Skip
      </motion.button>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <span
          className="text-[10px] tracking-widest uppercase"
          style={{ color: theme.scroll.label }}
        >
          Scroll
        </span>
        <motion.div
          className="w-px h-10"
          style={{
            background: theme.scroll.line,
          }}
          animate={{ scaleY: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        />
      </motion.div>
    </motion.div>
  );
}
