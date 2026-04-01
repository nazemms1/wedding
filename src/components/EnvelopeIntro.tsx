import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "../config";

interface EnvelopeIntroProps {
  onOpen: () => void;
}

function Particle({ i }: { i: number }) {
  const size = 1.5 + (i % 4) * 0.8;
  const isGold = i % 5 === 0;
  const isStar = i % 7 === 0;
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${(i * 3.7 + 2) % 100}%`,
        top: `${(i * 6.3 + 1) % 100}%`,
        width: isStar ? size * 2.2 : size,
        height: isStar ? size * 2.2 : size,
        borderRadius: isStar ? 0 : "50%",
        background: isGold
          ? "radial-gradient(circle, #F5D78E, #C9922A)"
          : "radial-gradient(circle, #93C5FD, #3B82F6)",
        clipPath: isStar
          ? "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)"
          : undefined,
      }}
      animate={{ opacity: [0, 0.9, 0], scale: [0, 1.3, 0], y: [0, -24] }}
      transition={{
        duration: 3 + (i % 5) * 0.9,
        repeat: Infinity,
        delay: (i * 0.27) % 4,
        ease: "easeInOut",
      }}
    />
  );
}

export function EnvelopeIntro({ onOpen }: EnvelopeIntroProps) {
  const [stage, setStage] = useState<
    "idle" | "splitting" | "reveal" | "exiting"
  >("idle");
  const [hovered, setHovered] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowHint(true), 1800);
    return () => clearTimeout(t);
  }, []);

  function handleClick() {
    if (stage !== "idle") return;
    setStage("splitting");
    setTimeout(() => setStage("reveal"), 700);
    setTimeout(() => setStage("exiting"), 3200);
    setTimeout(onOpen, 3900);
  }

  const navy = "rgb(4, 40, 92)";
  const sky = "#0EA5E9";
  const splitting =
    stage === "splitting" || stage === "reveal" || stage === "exiting";
  const revealed = stage === "reveal" || stage === "exiting";
  const exiting = stage === "exiting";

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center"
      style={{
        background: `radial-gradient(ellipse 130% 100% at 50% 55%, ${sky} -20%, ${navy} 55%, rgb(2,18,48) 100%)`,
        cursor: stage === "idle" ? "pointer" : "default",
      }}
      animate={exiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Noise texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Ambient center glow */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: "80vmin",
          height: "80vmin",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(180,140,80,0.1) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Burst of light when splitting */}
      <AnimatePresence>
        {splitting && (
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: "100vw",
              height: "100vh",
              background:
                "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(255,240,200,0.18) 0%, transparent 70%)",
              top: 0,
              left: 0,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.5] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 36 }).map((_, i) => (
          <Particle key={i} i={i} />
        ))}
      </div>

      {/* ─── THE CARD ─── */}
      <div
        className="relative"
        style={{
          width: "min(90vw, 650px)",
          height: "min(130vw, 680px)",
          perspective: 1600,
        }}
      >
        {/* ── LEFT HALF ── */}
        <motion.div
          className="absolute top-0 left-0 overflow-hidden"
          style={{
            width: "50%",
            height: "100%",
            transformOrigin: "left center",
            zIndex: 10,
          }}
          animate={
            splitting ? { x: "-105%", rotateY: -25 } : { x: 0, rotateY: 0 }
          }
          transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Left half surface */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, #DBEAFE 0%, #BAE6FD 50%, #93C5FD 100%)",
              borderRadius: "6px 0 0 6px",
              boxShadow: splitting ? "-8px 0 40px rgba(0,0,0,0.4)" : "none",
            }}
          />
          {/* Paper grain */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 22px, rgba(0,0,0,0.013) 22px, rgba(0,0,0,0.013) 23px)`,
              mixBlendMode: "multiply",
            }}
          />
          {/* Left half content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
            {/* Vertical text ornament */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 1,
                  height: 60,
                  background:
                    "linear-gradient(to bottom, transparent, rgba(212,175,110,0.5))",
                }}
              />
              <p
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(28px, 7vw, 48px)",
                  color: "#7DD3FC",
                  lineHeight: 1,
                  letterSpacing: "0.02em",
                }}
              >
                {config.couple.partner1}
              </p>
              <p
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "clamp(7px, 1.5vw, 9px)",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  color: "#4A90D9",
                  marginTop: 6,
                }}
              >
                &amp; {config.couple.partner2}
              </p>
              <div
                style={{
                  width: 1,
                  height: 40,
                  background:
                    "linear-gradient(to bottom, rgba(212,175,110,0.5), transparent)",
                }}
              />
            </div>
          </div>
          {/* Center fold shadow (right edge of left half) */}
          <div
            className="absolute top-0 right-0 bottom-0"
            style={{
              width: 18,
              background:
                "linear-gradient(to left, rgba(0,0,0,0.12), transparent)",
            }}
          />
        </motion.div>

        {/* ── RIGHT HALF ── */}
        <motion.div
          className="absolute top-0 right-0 overflow-hidden"
          style={{
            width: "50%",
            height: "100%",
            transformOrigin: "right center",
            zIndex: 10,
          }}
          animate={
            splitting ? { x: "105%", rotateY: 25 } : { x: 0, rotateY: 0 }
          }
          transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Right half surface */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(200deg, #DBEAFE 0%, #BAE6FD 50%, #93C5FD 100%)",
              borderRadius: "0 6px 6px 0",
            }}
          />
          {/* Paper grain */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 22px, rgba(0,0,0,0.013) 22px, rgba(0,0,0,0.013) 23px)`,
              mixBlendMode: "multiply",
            }}
          />
          {/* Right half content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 1,
                  height: 60,
                  background:
                    "linear-gradient(to bottom, transparent, rgba(212,175,110,0.5))",
                }}
              />
              <p
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(11px, 2.5vw, 16px)",
                  color: "#9A7B4F",
                  fontStyle: "italic",
                  letterSpacing: "0.08em",
                }}
              >
                {config.event.displayDate}
              </p>
              <div
                style={{
                  width: 40,
                  height: 1,
                  background:
                    "linear-gradient(to right, transparent, rgba(212,175,110,0.6), transparent)",
                  margin: "4px 0",
                }}
              />
              <p
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "clamp(7px, 1.5vw, 9px)",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  color: "#9A7B4F",
                }}
              >
                {config.venue.name}
              </p>
              <div
                style={{
                  width: 1,
                  height: 40,
                  background:
                    "linear-gradient(to bottom, rgba(212,175,110,0.5), transparent)",
                  marginTop: 6,
                }}
              />
            </div>
          </div>
          {/* Center fold shadow (left edge of right half) */}
          <div
            className="absolute top-0 left-0 bottom-0"
            style={{
              width: 18,
              background:
                "linear-gradient(to right, rgba(0,0,0,0.12), transparent)",
            }}
          />
        </motion.div>

        {/* ── CARD OUTER BORDER ── */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ borderRadius: 6, zIndex: 11 }}
          animate={
            splitting
              ? { boxShadow: "none", border: "none" }
              : hovered
                ? {
                    boxShadow:
                      "0 0 0 1.5px rgba(212,175,110,0.7), 0 0 50px rgba(212,175,110,0.2), 0 40px 100px rgba(0,0,0,0.7)",
                  }
                : {
                    boxShadow:
                      "0 0 0 1px rgba(212,175,110,0.3), 0 40px 80px rgba(0,0,0,0.65)",
                  }
          }
          transition={{ duration: 0.35 }}
        />

        {/* ── CENTER FOLD LINE ── */}
        <div
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{
            left: "calc(50% - 1px)",
            width: 2,
            zIndex: 12,
            background:
              "linear-gradient(to bottom, transparent 5%, rgba(0,0,0,0.08) 20%, rgba(0,0,0,0.13) 50%, rgba(0,0,0,0.08) 80%, transparent 95%)",
          }}
        />

        {/* ── WAX SEAL (center of fold) ── */}
        <AnimatePresence>
          {stage === "idle" && (
            <motion.div
              className="absolute"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 20,
                width: 72,
                height: 72,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
              transition={{
                delay: 0.6,
                duration: 0.7,
                type: "spring",
                stiffness: 160,
                damping: 12,
              }}
            >
              {/* Outer wax body */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: `radial-gradient(circle at 36% 30%, rgb(10,70,160), ${navy} 60%, rgb(2,20,55) 100%)`,
                  boxShadow: [
                    "0 6px 20px rgba(0,0,0,0.65)",
                    "0 1px 0 rgba(255,255,255,0.18) inset",
                    "0 -3px 8px rgba(0,0,0,0.5) inset",
                  ].join(", "),
                }}
              />
              {/* Ring */}
              <div
                style={{
                  position: "absolute",
                  inset: 5,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.13)",
                }}
              />
              {/* Inner disc */}
              <div
                style={{
                  position: "absolute",
                  inset: 10,
                  borderRadius: "50%",
                  background: `radial-gradient(circle at 40% 35%, rgb(12,85,175), ${navy})`,
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              />
              {/* Initials */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: "rgba(255,255,255,0.9)",
                    fontSize: 15,
                    fontStyle: "italic",
                    letterSpacing: "0.04em",
                    textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  J&amp;B
                </span>
              </div>
              {/* Shine */}
              <div
                style={{
                  position: "absolute",
                  top: 8,
                  left: 12,
                  width: 20,
                  height: 10,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.14)",
                  transform: "rotate(-20deg)",
                }}
              />
              {/* Pulse ring */}
              <motion.div
                style={{
                  position: "absolute",
                  inset: -5,
                  borderRadius: "50%",
                  border: "1.5px solid rgba(212,175,110,0.4)",
                }}
                animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── INVITATION (revealed in the middle) ── */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(160deg, #DBEAFE 0%, #BAE6FD 50%, #93C5FD 100%)`,
                borderRadius: 6,
                zIndex: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Inner border */}
              <div
                style={{
                  position: "absolute",
                  inset: 14,
                  border: "1px solid rgba(212,175,110,0.45)",
                  borderRadius: 3,
                  pointerEvents: "none",
                }}
              />
              {/* Corner ornaments */}
              {[
                { top: 18, left: 18 },
                { top: 18, right: 18 },
                { bottom: 18, left: 18 },
                { bottom: 18, right: 18 },
              ].map((pos, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    ...pos,
                    width: 18,
                    height: 18,
                    border: "1px solid rgba(212,175,110,0.55)",
                    borderRadius: 1,
                    transform: "rotate(45deg)",
                    pointerEvents: "none",
                  }}
                />
              ))}
              {/* Background pattern */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  opacity: 0.04,
                  backgroundImage: `radial-gradient(circle, #8B6914 1px, transparent 1px)`,
                  backgroundSize: "24px 24px",
                }}
              />

              {/* Content */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 0,
                  padding: "0 32px",
                }}
              >
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "clamp(7px, 1.6vw, 10px)",
                    letterSpacing: "0.5em",
                    textTransform: "uppercase",
                    color: "#B8924A",
                    marginBottom: 14,
                  }}
                >
                  You are cordially invited
                </motion.p>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                  style={{
                    width: 120,
                    height: 1,
                    background:
                      "linear-gradient(to right, transparent, #D4AF6E, transparent)",
                    marginBottom: 20,
                  }}
                />

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "clamp(30px, 8vw, 58px)",
                    color: "#7DD3FC",
                    lineHeight: 1.05,
                    textAlign: "center",
                    letterSpacing: "0.02em",
                  }}
                >
                  {config.couple.partner1}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.45,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200,
                  }}
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "clamp(20px, 5vw, 34px)",
                    color: "#D4AF6E",
                    fontStyle: "italic",
                    margin: "8px 0",
                  }}
                >
                  &amp;
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.6, ease: "easeOut" }}
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "clamp(30px, 8vw, 58px)",
                    color: "#4A90D9",
                    lineHeight: 1.05,
                    textAlign: "center",
                    letterSpacing: "0.02em",
                  }}
                >
                  {config.couple.partner2}
                </motion.p>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.65, duration: 0.5 }}
                  style={{
                    width: 120,
                    height: 1,
                    background:
                      "linear-gradient(to right, transparent, #D4AF6E, transparent)",
                    margin: "20px 0 16px",
                  }}
                />

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.75, duration: 0.5 }}
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "clamp(12px, 2.5vw, 17px)",
                    color: "#9A7B4F",
                    fontStyle: "italic",
                    letterSpacing: "0.04em",
                    marginBottom: 8,
                  }}
                >
                  {config.event.displayDate}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.85, duration: 0.5 }}
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "clamp(7px, 1.4vw, 9px)",
                    letterSpacing: "0.4em",
                    textTransform: "uppercase",
                    color: "#B8924A",
                    marginBottom: 28,
                  }}
                >
                  {config.event.displayTime} · {config.venue.name}
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── TOP LABEL (idle only) ── */}
        <AnimatePresence>
          {stage === "idle" && (
            <motion.div
              className="absolute left-0 right-0 flex flex-col items-center"
              style={{ top: 28 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <p
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "clamp(7px, 1.5vw, 9px)",
                  letterSpacing: "0.5em",
                  textTransform: "uppercase",
                  color: "rgba(154,123,79,0.7)",
                }}
              >
                {config.couple.partner1} &amp; {config.couple.partner2}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── BOTTOM LABEL (idle only) ── */}
        <AnimatePresence>
          {stage === "idle" && (
            <motion.div
              className="absolute left-0 right-0 flex flex-col items-center"
              style={{ bottom: 28 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <p
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "clamp(7px, 1.4vw, 9px)",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  color: "rgba(154,123,79,0.6)",
                }}
              >
                {config.event.displayDate}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Tap hint (below card) ── */}
      <AnimatePresence>
        {stage === "idle" && showHint && (
          <motion.div
            className="absolute flex flex-col items-center gap-2"
            style={{ bottom: "6%" }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.svg
              width="18"
              height="10"
              viewBox="0 0 18 10"
              fill="none"
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <path
                d="M1 9L9 1L17 9"
                stroke="rgba(212,175,110,0.45)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
            <motion.p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "clamp(8px, 1.5vw, 10px)",
                letterSpacing: "0.45em",
                textTransform: "uppercase",
                color: "rgba(212,175,110,0.45)",
              }}
              animate={{ opacity: [0.4, 0.85, 0.4] }}
              transition={{ duration: 2.4, repeat: Infinity }}
            >
              tap to open
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Top "You are invited" label (above card) ── */}
      <AnimatePresence>
        {stage === "idle" && (
          <motion.p
            className="absolute"
            style={{
              top: "6%",
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(11px, 2vw, 14px)",
              letterSpacing: "0.4em",
              color: "rgba(212,175,110,0.6)",
              fontStyle: "italic",
            }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            You are cordially invited
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
