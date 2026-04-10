import { motion } from "framer-motion";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";
import { config } from "../config";
import { theme } from "../theme";
import { useLanguage } from "../context";

export function EngagementTimeline() {
  const { t, dir } = useLanguage();
  const [ref, inView] = useScrollAnimation();

  const events = t.timelineEvents;

  return (
    <motion.section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-32 md:py-44 px-6 overflow-hidden"
      dir={dir}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9 }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${config.sectionImages.engagment})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="absolute inset-0" style={{ background: theme.bg.section, opacity: 0.92 }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: theme.bg.vignette }} />
      <motion.div
        className="absolute pointer-events-none"
        style={{ inset: 0, background: theme.bg.glow }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 1.2 + (i % 5) * 0.6,
              height: 1.2 + (i % 5) * 0.6,
              left: `${(i * 3.7 + 4) % 100}%`,
              top: `${(i * 5.5 + 2) % 100}%`,
              background: theme.dust[i % 4],
            }}
            animate={{ opacity: [0, 0.9, 0], scale: [0, 1.8, 0] }}
            transition={{ duration: 3 + (i % 6) * 0.7, repeat: Infinity, delay: (i * 0.3) % 5, ease: "easeInOut" }}
          />
        ))}
      </div>

      {[
        { cls: "absolute top-5 left-5", d1: "M2 30 L2 2 L30 2", d2: "M8 30 L8 8 L30 8", cx: 2, cy: 2, delay: 0.2 },
        { cls: "absolute top-5 right-5", d1: "M62 30 L62 2 L34 2", d2: "M56 30 L56 8 L34 8", cx: 62, cy: 2, delay: 0.3 },
        { cls: "absolute bottom-5 left-5", d1: "M2 34 L2 62 L30 62", d2: "M8 34 L8 56 L30 56", cx: 2, cy: 62, delay: 0.4 },
        { cls: "absolute bottom-5 right-5", d1: "M62 34 L62 62 L34 62", d2: "M56 34 L56 56 L34 56", cx: 62, cy: 62, delay: 0.5 },
      ].map((c, i) => (
        <motion.div key={i} className={c.cls} initial={{ opacity: 0, scale: 0 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: c.delay, duration: 0.7 }}>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <path d={c.d1} stroke={theme.ornament.solid} strokeWidth="1.5" opacity={theme.corner.strokeOpacity} />
            <path d={c.d2} stroke={theme.ornament.solid} strokeWidth="0.8" opacity={theme.corner.innerStrokeOpacity} />
            <circle cx={c.cx} cy={c.cy} r="2" fill={theme.ornament.solid} opacity={theme.corner.dotOpacity} />
          </svg>
        </motion.div>
      ))}

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="text-center mb-20">
          <motion.div className="flex items-center justify-center gap-3 mb-8"
            initial={{ opacity: 0, y: -10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.8 }}>
            <div className="h-px w-10 sm:w-16" style={{ background: `linear-gradient(to right, transparent, ${theme.ornament.half})` }} />
            <div className="w-1 h-1 rounded-full" style={{ background: theme.ornament.solid, opacity: 0.5 }} />
            <div className="h-px w-10 sm:w-16" style={{ background: `linear-gradient(to left, transparent, ${theme.ornament.half})` }} />
          </motion.div>

          <motion.p className="text-xs tracking-[0.45em] uppercase mb-6" style={{ color: theme.color.gold, fontFamily: theme.font.body }}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2, duration: 0.7 }}>
            {t.timelineEyebrow}
          </motion.p>

          <motion.h3 className="font-normal mb-4"
            style={{ fontFamily: theme.font.display, fontSize: "clamp(1.8rem, 5vw, 3rem)", color: theme.color.goldLight }}
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3, duration: 0.8 }}>
            {t.timelineTitle}
          </motion.h3>

          <motion.p className="text-sm leading-relaxed"
            style={{ color: theme.color.textMuted, fontWeight: 300, fontFamily: theme.font.body }}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4, duration: 0.7 }}>
            {t.timelineSubtitle}
          </motion.p>
        </div>

        <div className="relative">
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
            style={{ background: `linear-gradient(to bottom, transparent, ${theme.ornament.half} 10%, ${theme.ornament.half} 90%, transparent)` }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
          />

          <div className="flex flex-col gap-0">
            {events.map((event, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  className="relative flex items-center"
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.15, duration: 0.7, ease: "easeOut" }}
                >
                  <div className={`w-1/2 ${isLeft ? "pr-10 text-end" : "pl-10"}`}>
                    {isLeft && <EventCard event={event} align="end" />}
                  </div>

                  <div className="absolute left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
                    <motion.div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-base"
                      style={{
                        background: `linear-gradient(135deg, ${theme.color.goldDark}, ${theme.color.gold})`,
                        boxShadow: `0 0 20px rgba(212,175,110,0.4), 0 0 0 4px rgba(212,175,110,0.1)`,
                        color: "#0A1A3A",
                        fontFamily: theme.font.display,
                      }}
                      animate={{ boxShadow: ["0 0 15px rgba(212,175,110,0.3)", "0 0 30px rgba(212,175,110,0.6)", "0 0 15px rgba(212,175,110,0.3)"] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                    >
                      {event.icon}
                    </motion.div>
                  </div>

                  <div className={`w-1/2 ${isLeft ? "pl-10" : "pr-10 text-end"}`}>
                    {!isLeft && <EventCard event={event} align="end" />}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div className="flex items-center justify-center gap-3 mt-20"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.2, duration: 0.8 }}>
          <div className="h-px w-16 sm:w-24" style={{ background: `linear-gradient(to right, transparent, ${theme.ornament.soft})` }} />
          <div className="w-1.5 h-1.5 rotate-45 border" style={{ borderColor: theme.ornament.soft }} />
          <div className="h-px w-16 sm:w-24" style={{ background: `linear-gradient(to left, transparent, ${theme.ornament.soft})` }} />
        </motion.div>
      </div>
    </motion.section>
  );
}

interface EventCardProps {
  event: { date: string; title: string; description: string };
  align: "start" | "end";
}

function EventCard({ event, align }: EventCardProps) {
  return (
    <div className="py-8 px-1" style={{ textAlign: align === "end" ? "right" : "left" }}>
      <p className="text-xs tracking-[0.3em] uppercase mb-2"
        style={{ color: theme.color.gold, fontFamily: theme.font.body, opacity: 0.75 }}>
        {event.date}
      </p>
      <h4 className="font-normal mb-2"
        style={{ fontFamily: theme.font.display, fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", color: theme.color.goldLight }}>
        {event.title}
      </h4>
      <p className="text-sm leading-relaxed"
        style={{ color: theme.color.textOnDark, fontWeight: 300, fontFamily: theme.font.body, opacity: 0.8 }}>
        {event.description}
      </p>
    </div>
  );
}
