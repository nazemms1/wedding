import { motion } from "framer-motion";
import { config } from "../config";
import { useLanguage } from "../context/LanguageContext";

function GoldDust() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {Array.from({ length: 36 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 1.2 + (i % 5) * 0.6,
            height: 1.2 + (i % 5) * 0.6,
            left: `${(i * 2.8 + 3) % 100}%`,
            top: `${(i * 5.7 + 2) % 100}%`,
            background:
              i % 4 === 0
                ? "#D4AF6E"
                : i % 4 === 1
                  ? "#F0D080"
                  : i % 4 === 2
                    ? "#B8924A"
                    : "rgba(212,175,110,0.4)",
          }}
          animate={{ opacity: [0, 0.9, 0], scale: [0, 1.8, 0] }}
          transition={{
            duration: 3 + (i % 6) * 0.7,
            repeat: Infinity,
            delay: (i * 0.27) % 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Decorative diamond ornament
function DiamondDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-4">
      <motion.div
        className="h-px flex-1 max-w-30"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(212,175,110,0.6))",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.9, duration: 0.7 }}
      />
      <motion.div
        initial={{ opacity: 0, rotate: -45, scale: 0 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{
          delay: 0.85,
          duration: 0.6,
          type: "spring",
          stiffness: 180,
        }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path
            d="M14 2 L26 14 L14 26 L2 14 Z"
            stroke="#D4AF6E"
            strokeWidth="1.2"
            fill="rgba(15,37,87,0.08)"
          />
          <path d="M14 7 L21 14 L14 21 L7 14 Z" fill="#D4AF6E" opacity="0.3" />
          <circle cx="14" cy="14" r="2" fill="#D4AF6E" />
        </svg>
      </motion.div>
      <motion.div
        className="h-px flex-1 max-w-30"
        style={{
          background:
            "linear-gradient(to left, transparent, rgba(212,175,110,0.6))",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.9, duration: 0.7 }}
      />
    </div>
  );
}

export function CoupleSection() {
  const { t } = useLanguage();
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* ── Background image ── */}
      <img
        src={config.sectionImages.couple}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-contain sm:object-cover"
        style={{
          objectPosition: "center center",
          background: "#050E1F",
          transform: "scale(1.4)",
          transformOrigin: "center center",
        }}
      />

      {/* ── Navy overlay ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, rgba(5,14,31,0.88) 0%, rgba(10,26,58,0.82) 30%, rgba(13,30,69,0.80) 60%, rgba(8,21,48,0.88) 100%)",
        }}
      />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      {/* Gold glow in center */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          inset: 0,
          background:
            "radial-gradient(ellipse 55% 40% at 50% 50%, rgba(212,175,110,0.08) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <GoldDust />

      {/* ── Corner ornaments ── */}
      {/* Top-left */}
      <motion.div
        className="absolute top-5 left-5"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <path
            d="M2 30 L2 2 L30 2"
            stroke="#D4AF6E"
            strokeWidth="1.5"
            opacity="0.5"
          />
          <path
            d="M8 30 L8 8 L30 8"
            stroke="#D4AF6E"
            strokeWidth="0.8"
            opacity="0.25"
          />
          <circle cx="2" cy="2" r="2" fill="#D4AF6E" opacity="0.6" />
        </svg>
      </motion.div>
      {/* Top-right */}
      <motion.div
        className="absolute top-5 right-5"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <path
            d="M62 30 L62 2 L34 2"
            stroke="#D4AF6E"
            strokeWidth="1.5"
            opacity="0.5"
          />
          <path
            d="M56 30 L56 8 L34 8"
            stroke="#D4AF6E"
            strokeWidth="0.8"
            opacity="0.25"
          />
          <circle cx="62" cy="2" r="2" fill="#D4AF6E" opacity="0.6" />
        </svg>
      </motion.div>
      {/* Bottom-left */}
      <motion.div
        className="absolute bottom-5 left-5"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.7 }}
      >
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <path
            d="M2 34 L2 62 L30 62"
            stroke="#D4AF6E"
            strokeWidth="1.5"
            opacity="0.5"
          />
          <path
            d="M8 34 L8 56 L30 56"
            stroke="#D4AF6E"
            strokeWidth="0.8"
            opacity="0.25"
          />
          <circle cx="2" cy="62" r="2" fill="#D4AF6E" opacity="0.6" />
        </svg>
      </motion.div>
      {/* Bottom-right */}
      <motion.div
        className="absolute bottom-5 right-5"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <path
            d="M62 34 L62 62 L34 62"
            stroke="#D4AF6E"
            strokeWidth="1.5"
            opacity="0.5"
          />
          <path
            d="M56 34 L56 56 L34 56"
            stroke="#D4AF6E"
            strokeWidth="0.8"
            opacity="0.25"
          />
          <circle cx="62" cy="62" r="2" fill="#D4AF6E" opacity="0.6" />
        </svg>
      </motion.div>

      {/* ── Main content ── */}
      <div className="relative z-10 text-center px-6 flex flex-col items-center">
        {/* Top rule */}
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8 }}
        >
          <div
            className="h-px w-10 sm:w-16"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(212,175,110,0.5))",
            }}
          />
          <div
            className="w-1 h-1 rounded-full"
            style={{ background: "#D4AF6E", opacity: 0.5 }}
          />
          <div
            className="h-px w-10 sm:w-16"
            style={{
              background:
                "linear-gradient(to left, transparent, rgba(212,175,110,0.5))",
            }}
          />
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          style={{
            color: "#D4AF6E",
            letterSpacing: "0.45em",
            fontSize: "0.68rem",
            fontFamily: "'Lato', system-ui, sans-serif",
            fontWeight: 400,
            textTransform: "uppercase",
            marginBottom: "2.5rem",
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
        >
          {t.cordiallyInvited}
        </motion.p>

        {/* Partner 1 name */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(3.2rem, 11vw, 6.5rem)",
              fontWeight: 400,
              lineHeight: 1,
              marginBottom: "0.05em",
              color: "#D4AF6E",
              textShadow:
                "0 0 40px rgba(212,175,110,0.4), 0 0 80px rgba(212,175,110,0.15), 0 2px 20px rgba(0,0,0,0.5)",
              letterSpacing: "-0.01em",
            }}
          >
            {t.partner1}
          </h1>
        </motion.div>

        {/* Diamond divider + ampersand */}
        <DiamondDivider />

        {/* Partner 2 name */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(3.2rem, 11vw, 6.5rem)",
              fontWeight: 400,
              lineHeight: 1,
              marginBottom: "0",
              color: "#D4AF6E",
              textShadow:
                "0 0 40px rgba(212,175,110,0.4), 0 0 80px rgba(212,175,110,0.15), 0 2px 20px rgba(0,0,0,0.5)",
              letterSpacing: "-0.01em",
            }}
          >
            {t.partner2}
          </h1>
        </motion.div>

        {/* Bottom ornament line */}
        <motion.div
          className="flex items-center gap-3 my-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          <div
            className="h-px w-16 sm:w-24"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(212,175,110,0.45))",
            }}
          />
          <div
            className="w-1.5 h-1.5 rotate-45 border"
            style={{ borderColor: "rgba(212,175,110,0.45)" }}
          />
          <div
            className="h-px w-16 sm:w-24"
            style={{
              background:
                "linear-gradient(to left, transparent, rgba(212,175,110,0.45))",
            }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          style={{
            color: "rgba(212,175,110,0.65)",
            letterSpacing: "0.38em",
            fontSize: "0.65rem",
            fontFamily: "'Lato', system-ui, sans-serif",
            textTransform: "uppercase",
            marginBottom: "0.6rem",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.45, duration: 0.8 }}
        >
          {t.tagline}
        </motion.p>

        {/* Date */}
        <motion.p
          style={{
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.3em",
            fontSize: "0.6rem",
            fontFamily: "'Lato', system-ui, sans-serif",
            textTransform: "uppercase",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.65, duration: 0.8 }}
        >
          {t.displayDate}
        </motion.p>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 0.7 }}
      >
        <span
          style={{
            color: "rgba(212,175,110,0.35)",
            fontSize: "0.6rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontFamily: "'Lato', system-ui, sans-serif",
          }}
        >
          {t.scrollDown}
        </span>
        <motion.div
          style={{
            width: 1,
            height: 40,
            background:
              "linear-gradient(to bottom, rgba(212,175,110,0.5), transparent)",
          }}
          animate={{ scaleY: [1, 1.5, 1], opacity: [0.4, 0.9, 0.4] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </motion.div>
    </section>
  );
}
