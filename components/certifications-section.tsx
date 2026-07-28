"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cormorant, spaceGrotesk } from "@/data/constants/fonts";
import { certifications } from "@/data/index";

export default function CertificationsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section ref={ref} id="certifications" className="py-24 md:py-32 relative border-t border-white/5">
      <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
        
        {/* Header matching the Core Strengths aesthetic */}
        <motion.div
          className="w-full flex flex-col items-center text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className={`${spaceGrotesk.className} text-[10px] tracking-[0.4em] uppercase text-[#D4AF37] mb-4 font-medium`}>
            Continuous Learning
          </p>
          <h2 className={`${cormorant.className} text-4xl md:text-5xl lg:text-6xl text-white font-normal tracking-wide`}>
            Professional <span className="text-[#D4AF37]">Certifications</span>
          </h2>
        </motion.div>

        {/* Minimalist List Layout */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-6 md:gap-y-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {certifications.map((cert, idx) => (
            <motion.a
              key={idx}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              className="group flex flex-col py-2 relative cursor-pointer"
            >
              <div className="flex justify-between items-end mb-2 md:mb-3">
                <h4 className={`${spaceGrotesk.className} text-xs md:text-sm text-white/80 group-hover:text-white transition-colors pr-4 font-light`}>
                  {cert.title}
                </h4>
                <span className={`${spaceGrotesk.className} text-[8px] md:text-[10px] text-[#D4AF37] uppercase tracking-widest opacity-80 flex-shrink-0`}>
                  {cert.issuer}
                </span>
              </div>
              
              {/* Thin underline with animated gold progress bar on hover */}
              <div className="w-full h-[1px] bg-white/[0.15] relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-full bg-[#D4AF37] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              </div>
            </motion.a>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
