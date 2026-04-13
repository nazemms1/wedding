import { motion } from "framer-motion";
import { useWedding } from "../context";

function DiamondDivider({
  skyBlue,
  ornament,
}: {
  skyBlue: string;
  ornament: string;
}) {
  return (
    <div className="flex items-center justify-center gap-3 my-4">
      <motion.div
        className="h-px flex-1 max-w-30"
        style={{
          background: `linear-gradient(to right, transparent, rgba(56,189,248,0.5))`,
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
            stroke={skyBlue}
            strokeWidth="1.2"
            fill="rgba(7,22,40,0.08)"
          />
          <path d="M14 7 L21 14 L14 21 L7 14 Z" fill={ornament} opacity="0.3" />
          <circle cx="14" cy="14" r="2" fill={skyBlue} />
        </svg>
      </motion.div>
      <motion.div
        className="h-px flex-1 max-w-30"
        style={{
          background: `linear-gradient(to left, transparent, rgba(56,189,248,0.5))`,
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.9, duration: 0.7 }}
      />
    </div>
  );
}

export function CoupleSection() {
  const { t, theme } = useWedding();

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1920&q=80"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center top" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, rgba(4,13,30,0.88) 0%, rgba(7,22,40,0.82) 30%, rgba(10,30,58,0.80) 60%, rgba(5,16,32,0.88) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: theme.bg.vignette }}
      />

      <motion.div
        className="absolute pointer-events-none"
        style={{
          inset: 0,
          background:
            "radial-gradient(ellipse 55% 40% at 50% 50%, rgba(56,189,248,0.07) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

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
              background: (theme.dust as unknown as string[])[i % 4],
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

      {[
        {
          cls: "absolute top-5 left-5",
          d1: "M2 30 L2 2 L30 2",
          d2: "M8 30 L8 8 L30 8",
          cx: 2,
          cy: 2,
          delay: 0.2,
        },
        {
          cls: "absolute top-5 right-5",
          d1: "M62 30 L62 2 L34 2",
          d2: "M56 30 L56 8 L34 8",
          cx: 62,
          cy: 2,
          delay: 0.3,
        },
        {
          cls: "absolute bottom-5 left-5",
          d1: "M2 34 L2 62 L30 62",
          d2: "M8 34 L8 56 L30 56",
          cx: 2,
          cy: 62,
          delay: 0.4,
        },
        {
          cls: "absolute bottom-5 right-5",
          d1: "M62 34 L62 62 L34 62",
          d2: "M56 34 L56 56 L34 56",
          cx: 62,
          cy: 62,
          delay: 0.5,
        },
      ].map((c, i) => (
        <motion.div
          key={i}
          className={c.cls}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: c.delay, duration: 0.7 }}
        >
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <path
              d={c.d1}
              stroke={theme.color.skyBlue}
              strokeWidth="1.5"
              opacity="0.5"
            />
            <path
              d={c.d2}
              stroke={theme.color.skyBlue}
              strokeWidth="0.8"
              opacity="0.25"
            />
            <circle
              cx={c.cx}
              cy={c.cy}
              r="2"
              fill={theme.color.skyBlue}
              opacity="0.6"
            />
          </svg>
        </motion.div>
      ))}

      <div className="relative z-10 text-center px-6 flex flex-col items-center">
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
                "linear-gradient(to right, transparent, rgba(56,189,248,0.4))",
            }}
          />
          <div
            className="w-1 h-1 rounded-full"
            style={{ background: theme.color.skyBlue, opacity: 0.5 }}
          />
          <div
            className="h-px w-10 sm:w-16"
            style={{
              background:
                "linear-gradient(to left, transparent, rgba(56,189,248,0.4))",
            }}
          />
        </motion.div>

        <motion.p
          style={{
            color: theme.color.skyBlue,
            letterSpacing: "0.45em",
            fontSize: "0.68rem",
            fontFamily: theme.font.body,
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

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1
            style={{
              fontFamily: theme.font.display,
              fontSize: "clamp(3.2rem, 11vw, 6.5rem)",
              fontWeight: 400,
              lineHeight: 1,
              marginBottom: "0.05em",
              color: theme.color.gold,
              textShadow: `0 0 40px rgba(56,189,248,0.3), 0 0 80px rgba(56,189,248,0.08), 0 2px 20px rgba(0,0,0,0.5)`,
              letterSpacing: "-0.01em",
            }}
          >
            {t.partner1}
          </h1>
        </motion.div>

        <DiamondDivider
          skyBlue={theme.color.skyBlue}
          ornament={theme.color.gold}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1
            style={{
              fontFamily: theme.font.display,
              fontSize: "clamp(3.2rem, 11vw, 6.5rem)",
              fontWeight: 400,
              lineHeight: 1,
              marginBottom: 0,
              color: theme.color.skyBlueLight,
              textShadow: `0 0 40px rgba(56,189,248,0.4), 0 0 80px rgba(125,211,252,0.15), 0 2px 20px rgba(0,0,0,0.5)`,
              letterSpacing: "-0.01em",
            }}
          >
            {t.partner2}
          </h1>
        </motion.div>

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
                "linear-gradient(to right, transparent, rgba(56,189,248,0.4))",
            }}
          />
          <div
            className="w-1.5 h-1.5 rotate-45 border"
            style={{ borderColor: "rgba(56,189,248,0.4)" }}
          />
          <div
            className="h-px w-16 sm:w-24"
            style={{
              background:
                "linear-gradient(to left, transparent, rgba(56,189,248,0.4))",
            }}
          />
        </motion.div>

        <motion.p
          style={{
            color: theme.color.tagline,
            letterSpacing: "0.38em",
            fontSize: "0.65rem",
            fontFamily: theme.font.body,
            textTransform: "uppercase",
            marginBottom: "0.6rem",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.45, duration: 0.8 }}
        >
          {t.tagline}
        </motion.p>

        <motion.p
          style={{
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.3em",
            fontSize: "0.6rem",
            fontFamily: theme.font.body,
            textTransform: "uppercase",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.65, duration: 0.8 }}
        >
          {t.displayDate}
        </motion.p>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 0.7 }}
      >
        <span
          style={{
            color: theme.scroll.label,
            fontSize: "0.6rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontFamily: theme.font.body,
          }}
        >
          {t.scrollDown}
        </span>
        <motion.div
          style={{ width: 1, height: 40, background: theme.scroll.line }}
          animate={{ scaleY: [1, 1.5, 1], opacity: [0.4, 0.9, 0.4] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </motion.div>
    </section>
  );
}
