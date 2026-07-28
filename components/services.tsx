"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cormorant, spaceGrotesk } from "@/data/constants/fonts";
import { services } from "@/data/index";

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="services" className="py-24 md:py-32 relative">
      {/* Section header */}
      <motion.div
        className="text-center mb-16 md:mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className={`${spaceGrotesk.className} text-[11px] tracking-[0.4em] uppercase text-[#c9a55a]/60 block mb-4`}>
          What I Do
        </span>
        <h2 className={`${cormorant.className} text-3xl md:text-5xl lg:text-6xl font-light text-white/90`}>
          Services &{" "}
          <span className="text-gradient-gold">Expertise</span>
        </h2>
      </motion.div>

      {/* Services grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/[0.04] rounded-2xl overflow-hidden">
        {services.map((service, i) => (
          <motion.div
            key={i}
            variants={cardVariant}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={i}
            className="group relative bg-[#0a0a0a] p-8 md:p-10 
              transition-all duration-500 ease-out cursor-default
              hover:bg-[#0f0e0b]"
          >
            {/* Hover glow line at top */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a55a]/0 to-transparent 
              group-hover:via-[#c9a55a]/40 transition-all duration-700" />

            {/* Number */}
            <span className={`${spaceGrotesk.className} text-[10px] tracking-[0.3em] text-[#c9a55a]/30 block mb-6`}>
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Icon */}
            <div className="text-[#c9a55a]/50 mb-5 group-hover:text-[#c9a55a] transition-colors duration-500 [&>svg]:w-5 [&>svg]:h-5">
              {service.ico}
            </div>

            {/* Title */}
            <h3 className={`${spaceGrotesk.className} text-base font-medium text-white/85 mb-3 group-hover:text-white transition-colors duration-300`}>
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-sm leading-relaxed text-[#666] group-hover:text-[#888] transition-colors duration-500">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
