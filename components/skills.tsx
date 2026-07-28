"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cormorant, spaceGrotesk } from "@/data/constants/fonts";
import { skills, skillsIcons } from "@/data/index";
import IconCloud from "./magicui/icon-cloud";

const barVariant = {
  hidden: { width: "0%" },
  visible: (pct: number) => ({
    width: `${pct}%`,
    transition: {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function SkillBar({ name, percentage, index }: { name: string; percentage: number; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="group"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex justify-between items-baseline mb-3">
        <span className={`${spaceGrotesk.className} text-sm text-white/70 font-medium tracking-wide`}>
          {name}
        </span>
        <span className={`${spaceGrotesk.className} text-[11px] text-[#c9a55a]/50 tabular-nums`}>
          {percentage}%
        </span>
      </div>
      <div className="w-full h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, #c9a55a 0%, #8b6914 100%)",
          }}
          variants={barVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={percentage}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="skills" className="py-24 md:py-32 relative">
      {/* Section header */}
      <motion.div
        className="text-center mb-16 md:mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className={`${spaceGrotesk.className} text-[11px] tracking-[0.4em] uppercase text-[#c9a55a]/60 block mb-4`}>
          Capabilities
        </span>
        <h2 className={`${cormorant.className} text-3xl md:text-5xl lg:text-6xl font-light text-white/90`}>
          Core{" "}
          <span className="text-gradient-gold">Strengths</span>
        </h2>
      </motion.div>

      {/* Two-column layout: Skill bars + Icon Cloud */}
      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
        {/* Skill bars */}
        <div className="w-full lg:w-1/2 space-y-8">
          {skills.map((skill, index) => (
            <SkillBar
              key={skill.name}
              name={skill.name}
              percentage={skill.percentage}
              index={index}
            />
          ))}

          {/* Subtle decorative text */}
          <motion.p
            className="text-[11px] tracking-[0.2em] text-[#444] mt-8 uppercase"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            Constantly evolving &middot; Always learning
          </motion.p>
        </div>

        {/* Icon Cloud */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <motion.div
            className="max-w-[380px] w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          >
            <IconCloud iconSlugs={skillsIcons} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
