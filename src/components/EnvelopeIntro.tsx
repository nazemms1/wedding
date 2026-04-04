import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "../config";
import { theme } from "../theme";
import { useLanguage } from "../context/LanguageContext";
import indilaSound from "../assets/sound/Indila.m4a";

interface EnvelopeIntroProps {
  onOpen: () => void;
}

function Particle({ i }: { i: number }) {
  const size = 1.2 + (i % 5) * 0.6;
  const isStar = i % 7 === 0;
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${(i * 2.8 + 3) % 100}%`,
        top: `${(i * 5.7 + 2) % 100}%`,
        width: isStar ? size * 2.2 : size,
        height: isStar ? size * 2.2 : size,
        borderRadius: isStar ? 0 : "50%",
        background: theme.dust[i % 4],
        clipPath: isStar
          ? "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)"
          : undefined,
      }}
      animate={{ opacity: [0, 0.9, 0], scale: [0, 1.8, 0], y: [0, -20] }}
      transition={{
        duration: 3 + (i % 6) * 0.7,
        repeat: Infinity,
        delay: (i * 0.27) % 6,
        ease: "easeInOut",
      }}
    />
  );
}

export function EnvelopeIntro({ onOpen }: EnvelopeIntroProps) {
  const { t } = useLanguage();
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
    const audio = new Audio(indilaSound);
    audio.volume = 0.7;
    audio.play().catch(() => {/* autoplay blocked, silently skip */});
    setStage("splitting");
    setTimeout(() => setStage("reveal"), 700);
    setTimeout(() => setStage("exiting"), 3200);
    setTimeout(onOpen, 3900);
  }

  const splitting =
    stage === "splitting" || stage === "reveal" || stage === "exiting";
  const revealed = stage === "reveal" || stage === "exiting";
  const exiting = stage === "exiting";

   const cardSurface =
    "linear-gradient(160deg, #0A1A3A 0%, #0D1E45 50%, #081530 100%)";

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center"
      style={{
        background: theme.bg.section,
        cursor: stage === "idle" ? "pointer" : "default",
      }}
      animate={exiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      
      <img
        src={config.sectionImages.envelope}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />
    
      <div
        className="absolute inset-0"
        style={{ background: theme.bg.section, opacity: 0.88 }}
      />

    
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: theme.bg.vignette }}
      />
 
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: "80vmin",
          height: "80vmin",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(212,175,110,0.07) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      
      <AnimatePresence>
        {splitting && (
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: "100vw",
              height: "100vh",
              background:
                "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(212,175,110,0.1) 0%, transparent 70%)",
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

       
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 36 }).map((_, i) => (
          <Particle key={i} i={i} />
        ))}
      </div>

      
      <div
        className="relative"
        style={{
          width: "min(90vw, 650px)",
          height: "min(130vw, 680px)",
          perspective: 1600,
        }}
      >
    
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
          <div
            className="absolute inset-0"
            style={{
              background: cardSurface,
              borderRadius: "6px 0 0 6px",
              boxShadow: splitting ? "-8px 0 40px rgba(0,0,0,0.6)" : "none",
            }}
          />
       
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 22px, rgba(212,175,110,0.015) 22px, rgba(212,175,110,0.015) 23px)`,
            }}
          />
           
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
                  background: `linear-gradient(to bottom, transparent, ${theme.ornament.half})`,
                }}
              />
              <p
                style={{
                  fontFamily: theme.font.display,
                  fontSize: "clamp(28px, 7vw, 48px)",
                  color: theme.color.goldLight,
                  lineHeight: 1,
                  letterSpacing: "0.02em",
                }}
              >
                {t.partner1}
              </p>
              <p
                style={{
                  fontFamily: theme.font.body,
                  // fontSize: "clamp(7px, 1.5vw, 9px)",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  color: theme.color.goldLight,
                  marginTop: 6,
                }}
              >
                &amp; {t.partner2}
              </p>
              <div
                style={{
                  width: 1,
                  height: 40,
                  background: `linear-gradient(to bottom, ${theme.ornament.half}, transparent)`,
                }}
              />
            </div>
          </div>
        
          <div
            className="absolute top-0 right-0 bottom-0"
            style={{
              width: 18,
              background:
                "linear-gradient(to left, rgba(0,0,0,0.2), transparent)",
            }}
          />
        </motion.div>

      
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
          <div
            className="absolute inset-0"
            style={{ background: cardSurface, borderRadius: "0 6px 6px 0" }}
          />
           <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 22px, rgba(212,175,110,0.015) 22px, rgba(212,175,110,0.015) 23px)`,
            }}
          />
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
                  background: `linear-gradient(to bottom, transparent, ${theme.ornament.half})`,
                }}
              />
              <p
                style={{
                  fontFamily: theme.font.display,
                  fontSize: "clamp(11px, 2.5vw, 16px)",
                  color: theme.color.gold,
                  fontStyle: "italic",
                  letterSpacing: "0.08em",
                }}
              >
                {t.displayDate}
              </p>
              <div
                style={{
                  width: 40,
                  height: 1,
                  background: `linear-gradient(to right, transparent, ${theme.ornament.mid}, transparent)`,
                  margin: "4px 0",
                }}
              />
              <p
                style={{
                  fontFamily: theme.font.body,
                  fontSize: "clamp(7px, 1.5vw, 9px)",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  color: theme.color.tagline,
                }}
              >
                {t.venueName}
              </p>
              <div
                style={{
                  width: 1,
                  height: 40,
                  background: `linear-gradient(to bottom, ${theme.ornament.half}, transparent)`,
                  marginTop: 6,
                }}
              />
            </div>
          </div>
           <div
            className="absolute top-0 left-0 bottom-0"
            style={{
              width: 18,
              background:
                "linear-gradient(to right, rgba(0,0,0,0.2), transparent)",
            }}
          />
        </motion.div>

         <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ borderRadius: 6, zIndex: 11 }}
          animate={
            splitting
              ? { boxShadow: "none", border: "none" }
              : hovered
                ? {
                    boxShadow: `0 0 0 1.5px ${theme.ornament.half}, 0 0 50px rgba(212,175,110,0.15), 0 40px 100px rgba(0,0,0,0.7)`,
                  }
                : {
                    boxShadow: `0 0 0 1px rgba(212,175,110,0.3), 0 40px 80px rgba(0,0,0,0.65)`,
                  }
          }
          transition={{ duration: 0.35 }}
        />

         
        <div
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{
            left: "calc(50% - 1px)",
            width: 2,
            zIndex: 12,
            background:
              "linear-gradient(to bottom, transparent 5%, rgba(212,175,110,0.06) 20%, rgba(212,175,110,0.1) 50%, rgba(212,175,110,0.06) 80%, transparent 95%)",
          }}
        />

         <AnimatePresence>
          {stage === "idle" && (
            <motion.div
              className="absolute"
              style={{
                left: "45%",
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
               <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: `radial-gradient(circle at 36% 30%, #E8C97A, ${theme.color.gold} 55%, ${theme.color.goldDark} 100%)`,
                  boxShadow: [
                    "0 6px 20px rgba(0,0,0,0.65)",
                    "0 1px 0 rgba(255,255,255,0.2) inset",
                    "0 -3px 8px rgba(0,0,0,0.4) inset",
                  ].join(", "),
                }}
              />
               <div
                style={{
                  position: "absolute",
                  inset: 5,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              />
               <div
                style={{
                  position: "absolute",
                  inset: 10,
                  borderRadius: "50%",
                  background: `radial-gradient(circle at 40% 35%, #E8C97A, ${theme.color.goldDark})`,
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              />
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
                    fontFamily: theme.font.display,
                    color: "#0A1A3A",
                    fontSize: 15,
                    fontStyle: "italic",
                    letterSpacing: "0.04em",
                    fontWeight: 600,
                  }}
                >
                  {t.partner1.charAt(0)}&amp;{t.partner2.charAt(0)}
                </span>
              </div>
               <div
                style={{
                  position: "absolute",
                  top: 8,
                  left: 12,
                  width: 20,
                  height: 10,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.25)",
                  transform: "rotate(-20deg)",
                }}
              />
               <motion.div
                style={{
                  position: "absolute",
                  inset: -5,
                  borderRadius: "50%",
                  border: `1.5px solid ${theme.ornament.half}`,
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

         <AnimatePresence>
          {revealed && (
            <motion.div
              className="absolute inset-0"
              style={{
                background: cardSurface,
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
               <div
                style={{
                  position: "absolute",
                  inset: 14,
                  border: `1px solid ${theme.ornament.soft}`,
                  borderRadius: 3,
                  pointerEvents: "none",
                }}
              />

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
                    border: `1px solid ${theme.ornament.soft}`,
                    borderRadius: 1,
                    transform: "rotate(45deg)",
                    pointerEvents: "none",
                  }}
                />
              ))}

               <div
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  opacity: 0.03,
                  backgroundImage: `radial-gradient(circle, ${theme.ornament.solid} 1px, transparent 1px)`,
                  backgroundSize: "24px 24px",
                }}
              />

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
                    fontFamily: theme.font.body,
                    fontSize: "clamp(7px, 1.6vw, 10px)",
                    letterSpacing: "0.5em",
                    textTransform: "uppercase",
                    color: theme.color.gold,
                    marginBottom: 14,
                  }}
                >
                  {t.cordiallyInvited}
                </motion.p>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                  style={{
                    width: 120,
                    height: 1,
                    background: `linear-gradient(to right, transparent, ${theme.ornament.solid}, transparent)`,
                    marginBottom: 20,
                  }}
                />

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                  style={{
                    fontFamily: theme.font.display,
                    fontSize: "clamp(30px, 8vw, 58px)",
                    color: theme.color.goldLight,
                    lineHeight: 1.05,
                    textAlign: "center",
                    letterSpacing: "0.02em",
                  }}
                >
                  {t.partner1}
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
                    fontFamily: theme.font.display,
                    fontSize: "clamp(20px, 5vw, 34px)",
                    color: theme.color.goldLight,
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
                    fontFamily: theme.font.display,
                    fontSize: "clamp(30px, 8vw, 58px)",
                    color: theme.color.goldDark,
                    lineHeight: 1.05,
                    textAlign: "center",
                    letterSpacing: "0.02em",
                  }}
                >
                  {t.partner2}
                </motion.p>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.65, duration: 0.5 }}
                  style={{
                    width: 120,
                    height: 1,
                    background: `linear-gradient(to right, transparent, ${theme.ornament.solid}, transparent)`,
                    margin: "20px 0 16px",
                  }}
                />

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.75, duration: 0.5 }}
                  style={{
                    fontFamily: theme.font.display,
                    fontSize: "clamp(12px, 2.5vw, 17px)",
                    color: theme.color.tagline,
                    fontStyle: "italic",
                    letterSpacing: "0.04em",
                    marginBottom: 8,
                  }}
                >
                  {t.displayDate}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.85, duration: 0.5 }}
                  style={{
                    fontFamily: theme.font.body,
                    fontSize: "clamp(7px, 1.4vw, 9px)",
                    letterSpacing: "0.4em",
                    textTransform: "uppercase",
                    color: theme.color.subtle,
                    marginBottom: 28,
                  }}
                >
                  {t.displayTime} · {t.venueName}
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
                  fontFamily: theme.font.body,
                  fontSize: "clamp(7px, 1.5vw, 9px)",
                  letterSpacing: "0.5em",
                  textTransform: "uppercase",
                  color: theme.color.subtle,
                }}
              >
                {t.partner1} &amp; {t.partner2}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

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
                  fontFamily: theme.font.body,
                  fontSize: "clamp(7px, 1.4vw, 9px)",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  color: theme.color.subtle,
                }}
              >
                {t.displayDate}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
                stroke={theme.ornament.half}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
            <motion.p
              style={{
                fontFamily: theme.font.body,
                fontSize: "clamp(8px, 1.5vw, 10px)",
                letterSpacing: "0.45em",
                textTransform: "uppercase",
                color: theme.ornament.half,
              }}
              animate={{ opacity: [0.4, 0.85, 0.4] }}
              transition={{ duration: 2.4, repeat: Infinity }}
            >
              {t.tapToOpen}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

       <AnimatePresence>
        {stage === "idle" && (
          <motion.p
            className="absolute"
            style={{
              top: "6%",
              fontFamily: theme.font.display,
              fontSize: "clamp(11px, 2vw, 14px)",
              letterSpacing: "0.4em",
              color: theme.color.tagline,
              fontStyle: "italic",
            }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            {t.cordiallyInvited}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
