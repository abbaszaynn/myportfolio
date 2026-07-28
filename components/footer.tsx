"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cormorant, spaceGrotesk } from "@/data/constants/fonts";
import { socialMedia } from "@/data/index";
import Link from "next/link";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      <footer ref={ref} className="relative" id="contact">
        {/* Divider */}
        <div className="section-divider" />

        {/* Main CTA area */}
        <div className="py-28 md:py-40 flex flex-col items-center text-center px-6">
          <motion.span
            className={`${spaceGrotesk.className} text-[11px] tracking-[0.4em] uppercase text-[#c9a55a]/60 block mb-6`}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Connect
          </motion.span>

          <motion.h2
            className={`${cormorant.className} text-4xl md:text-6xl lg:text-7xl font-light text-white/90 max-w-3xl leading-tight`}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Let&apos;s create something{" "}
            <span className="text-gradient-gold italic">extraordinary</span>{" "}
            together.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Link
              href="/contact"
              className="mt-12 group relative overflow-hidden uppercase text-[11px] tracking-[0.25em] font-medium
                border border-[#c9a55a]/30 rounded-full px-12 py-5
                text-[#c9a55a] bg-transparent
                transition-all duration-500 ease-out
                hover:border-[#c9a55a]/70 hover:bg-[#c9a55a]/5
                hover:shadow-[0_0_60px_rgba(201,165,90,0.12)]
                active:scale-95 cursor-pointer inline-block"
            >
              Start a Conversation
            </Link>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06]">
          <div className="container py-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.p
              className={`${spaceGrotesk.className} text-[11px] tracking-[0.15em] text-[#444]`}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              &copy; {new Date().getFullYear()} Zayn Abbas. All rights reserved.
            </motion.p>

            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {socialMedia.map((info) => (
                <a
                  key={info.id}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/[0.08] flex items-center justify-center
                    text-[#555] hover:text-[#c9a55a] hover:border-[#c9a55a]/30
                    transition-all duration-300 cursor-pointer
                    hover:shadow-[0_0_20px_rgba(201,165,90,0.08)]"
                >
                  <span className="text-sm">{info.img}</span>
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </footer>
    </>
  );
}
