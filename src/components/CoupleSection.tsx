import { motion } from "framer-motion";
import { config } from "../config";

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
            width: 1.5 + (i % 4) * 0.8,
            height: 1.5 + (i % 4) * 0.8,
            left: `${(i * 3.7 + 2) % 100}%`,
            top: `${(i * 6.3 + 1) % 100}%`,
            background:
              i % 3 === 0 ? "#38BDF8" : i % 3 === 1 ? "#D4AF6E" : "#7DD3FC",
          }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.6, 0] }}
          transition={{
            duration: 2.5 + (i % 5) * 0.8,
            repeat: Infinity,
            delay: (i * 0.31) % 4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function CoupleSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* ── Dark navy background (same palette as HeroSection) ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgb(4,40,92) 0%, rgb(15,50,110) 35%, rgb(30,80,160) 65%, rgb(56,130,200) 100%)",
        }}
      />

      {/* Aurora glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 60% 40%, rgba(56,189,248,0.12) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.08, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <Sparkles />

      {/* Corner border ornaments */}
      <motion.div
        className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-sky/50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      />
      <motion.div
        className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-gold/60"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      />
      <motion.div
        className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-gold/60"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      />
      <motion.div
        className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-sky/50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 text-center px-6">
        {/* Eyebrow */}
        <motion.p
          className="text-gold text-xs tracking-[0.5em] uppercase mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          You are cordially invited
        </motion.p>

        {/* Partner 1 (bride) */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.55, duration: 0.9, ease: "easeOut" }}
        >
          <h1
            className="font-normal leading-none mb-1"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(3.5rem, 12vw, 7rem)",
              color: "#7DD3FC",
              textShadow:
                "0 0 50px rgba(56,189,248,0.6), 0 0 100px rgba(56,189,248,0.2), 0 2px 20px rgba(0,0,0,0.4)",
            }}
          >
            {config.couple.partner1}
          </h1>
        </motion.div>

        {/* Ampersand + lines */}
        <motion.div
          className="my-2 flex items-center justify-center gap-4"
          initial={{ opacity: 0, scale: 0.3, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.85, duration: 0.7, type: "spring", stiffness: 200 }}
        >
          <motion.div
            className="h-px w-16 sm:w-24"
            style={{ background: "linear-gradient(to right, transparent, #D4AF6E)" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          />
          <span
            className="text-3xl sm:text-5xl italic"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#D4AF6E",
              textShadow: "0 0 20px rgba(212,175,110,0.6)",
            }}
          >
            &amp;
          </span>
          <motion.div
            className="h-px w-16 sm:w-24"
            style={{ background: "linear-gradient(to left, transparent, #D4AF6E)" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          />
        </motion.div>

        {/* Partner 2 (groom) */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.05, duration: 0.9, ease: "easeOut" }}
        >
          <h1
            className="font-normal leading-none mb-10"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(3.5rem, 12vw, 7rem)",
              color: "#4A90D9",
              textShadow:
                "0 0 50px rgba(30,80,180,0.7), 0 0 100px rgba(30,80,180,0.3), 0 2px 20px rgba(0,0,0,0.4)",
            }}
          >
            {config.couple.partner2}
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-xs tracking-[0.4em] uppercase"
          style={{ color: "rgba(212,175,110,0.65)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          {config.couple.tagline}
        </motion.p>

        {/* Date */}
        <motion.p
          className="mt-3 text-xs tracking-[0.3em] uppercase"
          style={{ color: "rgba(255,255,255,0.3)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          {config.event.displayDate}
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <span className="text-white/30 text-[10px] tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          className="w-px h-10"
          style={{ background: "linear-gradient(to bottom, #38BDF8, transparent)" }}
          animate={{ scaleY: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        />
      </motion.div>
    </section>
  );
}
