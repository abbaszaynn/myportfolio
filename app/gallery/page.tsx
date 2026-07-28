"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { cormorant, spaceGrotesk } from "@/data/constants/fonts";
import { allPhotos } from "@/components/PhotographySection";

function GalleryItem({ src, index }: { src: string; index: number }) {
  const ref = useRef(null);
  
  // Cinematic vertical parallax for the entire block
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Alternate parallax speeds for a deeply organic, disconnected scroll feel
  const y = useTransform(scrollYProgress, [0, 1], index % 2 === 0 ? [80, -80] : [40, -40]);
  
  const number = (index + 1).toString().padStart(3, "0");

  // Grid-based irregular layout engine!
  // Using a 12-column grid. Items placed in col-start 1 and col-start 8 will naturally sit side-by-side on the same screen.
  const patterns = [
    { cols: "col-span-12 md:col-span-10 md:col-start-2 mb-32", align: "items-center" }, // 0: Large Center
    { cols: "col-span-12 md:col-span-6 md:col-start-1 mb-16", align: "items-start" }, // 1: Left 
    { cols: "col-span-12 md:col-span-5 md:col-start-8 md:mt-48 mb-32", align: "items-end" }, // 2: Right (shares row with 1, making 2 images per screen!)
    { cols: "col-span-12 md:col-span-8 md:col-start-3 mb-32", align: "items-center" }, // 3: Medium Center
    { cols: "col-span-12 md:col-span-5 md:col-start-2 md:mt-32 mb-16", align: "items-start" }, // 4: Small Left
    { cols: "col-span-12 md:col-span-5 md:col-start-8 mb-32", align: "items-end" }, // 5: Medium Right (shares row with 4, making 2 images per screen!)
    { cols: "col-span-12 md:col-span-6 md:col-start-4 mb-32", align: "items-center" }, // 6: Center Medium
    { cols: "col-span-12 md:col-span-6 md:col-start-1 mb-16", align: "items-start" }, // 7: Left
    { cols: "col-span-12 md:col-span-5 md:col-start-8 md:mt-24 mb-32", align: "items-end" }, // 8: Right (shares row with 7, making 2 images per screen!)
    { cols: "col-span-12 md:col-span-12 mb-32", align: "items-center" }, // 9: Full Bleed Width
  ];
  const layout = patterns[index % patterns.length];

  return (
    <div ref={ref} className={`w-full flex flex-col ${layout.cols} ${layout.align}`}>
      <motion.div 
        style={{ y }} 
        initial={{ opacity: 0, filter: "blur(8px)", y: 40 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="inline-flex flex-col max-w-full"
      >
        {/* max-h-[85vh] guarantees it ALWAYS fits vertically on one screen! */}
        <img
          src={src}
          alt={`Gallery piece ${number}`}
          className="w-auto h-auto max-h-[85vh] max-w-full shadow-2xl"
          loading={index < 4 ? "eager" : "lazy"}
        />

        {/* Caption perfectly hugs the exact width of the image */}
        <div className="mt-5 flex justify-between items-center text-[#111] px-1 w-full">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-[#333] rounded-sm" />
            <span className={`${spaceGrotesk.className} text-[10px] md:text-xs tracking-[0.2em] font-medium`}>
              {number}
            </span>
          </div>
          <span className={`${cormorant.className} text-base md:text-2xl uppercase tracking-widest text-[#111]`}>
            PORTFOLIO
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export default function GalleryPage() {
  // Smooth scroll behavior
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#E6E5E0] text-[#111] selection:bg-[#111] selection:text-[#E6E5E0] overflow-x-hidden">
      {/* Sticky Header - mix-blend-difference allows it to invert perfectly over dark images */}
      <header className="fixed top-0 left-0 w-full z-50 p-6 md:p-12 flex justify-between items-center mix-blend-difference pointer-events-none text-white">
        <div className="pointer-events-auto">
          <Link href="/">
            <h2 className="font-sans text-xl md:text-3xl font-bold tracking-widest lowercase hover:opacity-70 transition-opacity">
              abbas zayn
            </h2>
          </Link>
        </div>
        
        {/* Navigation link matching cipher.tv style */}
        <div className="pointer-events-auto">
          <Link 
            href="/"
            className="font-sans text-[10px] md:text-[11px] uppercase font-semibold tracking-[0.2em] hover:opacity-70 transition-opacity flex items-center gap-2"
          >
            <span>Back</span>
            <div className="w-4 h-4 border border-white flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white" />
            </div>
          </Link>
        </div>
      </header>

      {/* Gallery Content - 12 Column Grid Engine */}
      <div className="pt-40 md:pt-64 pb-20 px-4 md:px-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8">
          {allPhotos.map((src, index) => (
            <GalleryItem key={src} src={src} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
