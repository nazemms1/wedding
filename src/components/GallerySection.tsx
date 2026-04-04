import { motion } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { config } from "../config";

export function GallerySection() {
  const [ref, inView] = useScrollAnimation();

  return (
    <motion.section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-28 md:py-36 px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #EFF6FF 0%, #DBEAFE 40%, #BAE6FD 70%, #C7D9F5 100%)",
      }}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.9 }}
    >
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <motion.div
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.p
          className="text-xs tracking-[0.45em] uppercase mb-4 text-center"
          style={{ color: "#D4AF6E" }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.7 }}
        >
          Our Story
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-4 mb-14"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div
            className="h-px w-16"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(212,175,110,0.5))",
            }}
          />
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#D4AF6E" }}
          />
          <div
            className="h-px w-16"
            style={{
              background:
                "linear-gradient(to left, transparent, rgba(212,175,110,0.5))",
            }}
          />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {config.gallery.images.map((image, i) => (
            <motion.div
              key={i}
              className="relative overflow-hidden"
              style={{ aspectRatio: i % 3 === 0 ? "4/5" : "1/1" }}
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.2 + i * 0.13, duration: 0.75 }}
              whileHover={{ scale: 1.04, zIndex: 10 }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                loading="lazy"
              />
              <div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-400"
                style={{
                  background:
                    "linear-gradient(to top, rgba(15,37,87,0.65) 0%, transparent 60%)",
                }}
              />
              <div
                className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2"
                style={{ borderColor: "rgba(56,189,248,0.8)" }}
              />
              <div
                className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2"
                style={{ borderColor: "rgba(212,175,110,0.7)" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
