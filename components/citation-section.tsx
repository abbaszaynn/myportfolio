"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cormorant, spaceGrotesk } from "@/data/constants/fonts";

export default function Citation() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const part1 = "I don't just write code — ";
  const part2 = "I architect systems";
  const part3 = " that scale.";

  // Container handles the scale-up and triggers children stagger
  const containerVariants = {
    hidden: { scale: 0.85, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.04, // Typewriter typing speed
        delayChildren: 0.3
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0 } } // Instant pop-in for true typewriter feel
  };

  return (
    <div ref={ref} className="py-16 md:py-24 flex flex-col items-center justify-center relative">
      {/* Top divider */}
      <div className="section-divider mb-12" />

      <motion.div
        className="max-w-3xl mx-auto text-center px-6"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Opening quote mark */}
        <motion.span
          className={`${cormorant.className} text-6xl md:text-8xl text-[#D4AF37]/30 leading-none block mb-4`}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.8 }}
        >
          &ldquo;
        </motion.span>

        {/* Quote text — Typewriter Effect */}
        <motion.p className={`${cormorant.className} font-light text-2xl md:text-4xl lg:text-5xl leading-snug text-white/90 inline-block whitespace-pre-wrap`}>
          {part1.split("").map((char, index) => (
            <motion.span key={`p1-${index}`} variants={letterVariants}>
              {char}
            </motion.span>
          ))}
          <span className="text-[#D4AF37]">
            {part2.split("").map((char, index) => (
              <motion.span key={`p2-${index}`} variants={letterVariants}>
                {char}
              </motion.span>
            ))}
          </span>
          {part3.split("").map((char, index) => (
            <motion.span key={`p3-${index}`} variants={letterVariants}>
              {char}
            </motion.span>
          ))}
        </motion.p>

        {/* Attribution line */}
        <motion.div
          className="mt-8 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 2.8, duration: 0.8 }} // Delayed to appear after typewriter finishes
        >
          <div className="w-8 h-px bg-[#D4AF37]/30" />
          <span className={`${spaceGrotesk.className} text-[11px] tracking-[0.3em] uppercase text-[#555]`}>
            Philosophy
          </span>
          <div className="w-8 h-px bg-[#D4AF37]/30" />
        </motion.div>
      </motion.div>

      {/* Bottom divider */}
      <div className="section-divider mt-16" />
    </div>
  );
}
