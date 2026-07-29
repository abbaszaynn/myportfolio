"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { cormorant, spaceGrotesk } from "@/data/constants/fonts";
import { works } from "@/data/index";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";

function WorksCarousel({ projects }: { projects: typeof works }) {
  // activeIndex can now grow infinitely positive or negative
  const [activeIndex, setActiveIndex] = useState(0);
  const [radius, setRadius] = useState(300);

  useEffect(() => {
    const handleResize = () => {
      setRadius(window.innerWidth < 768 ? 180 : 320);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => setActiveIndex((prev) => prev + 1);
  const handlePrev = () => setActiveIndex((prev) => prev - 1);

  // We want a perfect circle. 36 degrees * 10 items = 360 degrees.
  const theta = 36;
  const numWheelItems = 10;

  // Create an array of 10 items by repeating the projects array
  const wheelItems = Array.from({ length: numWheelItems }, (_, i) => projects[i % projects.length]);

  // Derive the actual project data for the left column
  const activeProjectIndex = ((activeIndex % projects.length) + projects.length) % projects.length;
  const activeProject = projects[activeProjectIndex];

  // Derive which physical DOM item on the wheel is currently active
  const activeWheelIndex = ((activeIndex % numWheelItems) + numWheelItems) % numWheelItems;

  return (
    <div className="flex flex-col md:flex-row items-center w-full min-h-[500px] md:min-h-[600px] relative overflow-hidden py-12 md:py-0">

      {/* LEFT COLUMN: Text Content */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-4 md:px-12 z-20 h-[350px] md:h-auto">

        <div className="relative h-[280px] md:h-[250px] w-full mb-6 md:mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <span className={`${spaceGrotesk.className} text-[10px] text-[#D4AF37] tracking-[0.3em] mb-4 block font-semibold uppercase`}>
                {String(activeProjectIndex + 1).padStart(2, "0")} — PROJECT
              </span>
              <h3 className={`${cormorant.className} text-3xl md:text-4xl lg:text-5xl text-white/95 mb-4 leading-tight max-w-lg`}>
                {activeProject.title}
              </h3>
              <p className={`${spaceGrotesk.className} text-[#888] text-xs md:text-sm leading-relaxed max-w-md mb-6`}>
                {activeProject.description}
              </p>
              <a
                href={activeProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${spaceGrotesk.className} inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-white/60 hover:text-[#D4AF37] transition-colors`}
              >
                <span>Visit Project</span><ArrowUpRight className="w-3 h-3" />
              </a>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Arrows beneath text */}
        <div className="flex gap-8">
          <button onClick={handlePrev} className="p-2 hover:text-[#D4AF37] transition-colors group">
            <ArrowLeft className="w-6 h-6 text-white group-hover:text-[#D4AF37] transition-colors" strokeWidth={1.5} />
          </button>
          <button onClick={handleNext} className="p-2 hover:text-[#D4AF37] transition-colors group">
            <ArrowRight className="w-6 h-6 text-white group-hover:text-[#D4AF37] transition-colors" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN: Half-Circle Reel */}
      <div className="w-full md:w-1/2 relative h-[400px] md:h-[600px] mt-8 md:mt-0 flex items-center justify-end md:justify-center pointer-events-none overflow-hidden md:overflow-visible">

        <motion.div
          className="absolute right-[-200px] md:right-[-300px] w-[400px] h-[400px] md:w-[700px] md:h-[700px] rounded-full border border-white/[0.02]"
          animate={{ rotate: activeIndex * theta }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0.5, originY: 0.5 }}
        >
          {wheelItems.map((item, i) => {
            const angle = -i * theta;
            const isActive = activeWheelIndex === i;

            return (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 pointer-events-auto cursor-pointer"
                style={{
                  x: "-50%",
                  y: "-50%",
                  rotate: angle,
                  zIndex: isActive ? 50 : 10,
                }}
                onClick={() => {
                  // Calculate the shortest path to rotate to the clicked item
                  let diff = i - activeWheelIndex;
                  // Handle shortest path wrap around (e.g. clicking 9 when at 0 should subtract 1, not add 9)
                  if (diff > numWheelItems / 2) diff -= numWheelItems;
                  if (diff < -numWheelItems / 2) diff += numWheelItems;
                  setActiveIndex((prev) => prev + diff);
                }}
              >
                <motion.div
                  className="relative overflow-hidden rounded-xl shadow-2xl border border-white/10 origin-center"
                  style={{
                    x: -radius,
                    width: radius === 180 ? 200 : 300,
                    height: radius === 180 ? 120 : 170,
                  }}
                  animate={{
                    // Inverse rotation to stay perfectly upright
                    rotate: - (angle + activeIndex * theta),
                    scale: isActive ? 1.1 : 0.75,
                    opacity: isActive ? 1 : 0.6,
                    filter: isActive ? "grayscale(0%) brightness(1.1)" : "grayscale(100%) brightness(0.5)"
                  }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

export default function Works() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const topProjects = works.slice(0, 5); // Added 5th dummy project to the slice

  return (
    <section ref={ref} id="works" className="py-24 md:py-32 relative">
      <motion.div
        className="w-full max-w-5xl mx-auto px-4 md:px-8 mb-12 md:mb-16 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p className={`${spaceGrotesk.className} text-[10px] tracking-[0.4em] uppercase text-[#D4AF37] mb-6 font-semibold`}>
          Our Latest Projects
        </p>

        <h2 className={`flex flex-col items-center justify-center text-center leading-[1.1] tracking-tight`}>
          <span className={`${spaceGrotesk.className} uppercase text-2xl md:text-3xl lg:text-4xl font-bold text-white/95`}>
            ARCHITECTING <span className={`${cormorant.className} text-[#D4AF37] font-light italic lowercase text-3xl md:text-4xl lg:text-5xl`}>robust</span>
          </span>
          <span className={`${spaceGrotesk.className} uppercase text-2xl md:text-3xl lg:text-4xl font-bold text-white/70`}>
            SOFTWARE <span className={`${cormorant.className} text-white font-medium uppercase`}>SYSTEMS</span>
          </span>
        </h2>

        <p className={`${spaceGrotesk.className} mt-6 text-[#888] max-w-lg text-xs leading-relaxed uppercase tracking-widest`}>
          Delivering high-performance ML models, scalable architectures, and intelligent automation built to drive impact.
        </p>
      </motion.div>

      {/* Removed the extra box wrapper, letting it blend seamlessly into the background */}
      <div className="w-full max-w-[1400px] mx-auto overflow-visible">
        <WorksCarousel projects={topProjects} />
      </div>
    </section>
  );
}
