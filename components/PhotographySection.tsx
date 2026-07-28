"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cormorant, spaceGrotesk } from "@/data/constants/fonts";

// All unique portfolio images (optimized, duplicates removed)
export const allPhotos = [
  "/portfolio-optimized/1.jpg",
  "/portfolio-optimized/2.jpg",
  "/portfolio-optimized/3.jpg",
  "/portfolio-optimized/4.jpg",
  "/portfolio-optimized/5.jpg",
  "/portfolio-optimized/6.jpg",
  "/portfolio-optimized/7.jpg",
  "/portfolio-optimized/8.jpg",
  "/portfolio-optimized/9.jpg",
  "/portfolio-optimized/10.jpg",
  "/portfolio-optimized/1735288476191-01-01.jpg",
  "/portfolio-optimized/1737107141160-01.jpg",
  "/portfolio-optimized/1738774133374-01.jpg",
  "/portfolio-optimized/1742237871284-01.jpg",
  "/portfolio-optimized/1752769352893.jpg",
  "/portfolio-optimized/188A5035 (1)-01.jpg",
  "/portfolio-optimized/20210123_105811-01.jpg",
  "/portfolio-optimized/20210123_161337-01.jpg",
  "/portfolio-optimized/20211205_105523-01.jpg",
  "/portfolio-optimized/AIRetouch_20250826_185503216-01.jpg",
  "/portfolio-optimized/DSC_0177.jpg",
  "/portfolio-optimized/DSC_0230.jpg",
  "/portfolio-optimized/DSC_0231.jpg",
  "/portfolio-optimized/DSC_0295.jpg",
  "/portfolio-optimized/IMG-20250406-WA0060-01.jpg",
  "/portfolio-optimized/IMG-20251123-WA0037 (2)-01.jpg",
  "/portfolio-optimized/IMG_0070.jpg",
  "/portfolio-optimized/IMG_0186.jpg",
  "/portfolio-optimized/IMG_0294.jpg",
  "/portfolio-optimized/IMG_0455-2.jpg",
  "/portfolio-optimized/IMG_0466.jpg",
  "/portfolio-optimized/IMG_0529.jpg",
  "/portfolio-optimized/IMG_0690-01.jpg",
  "/portfolio-optimized/IMG_20250101_001922-01.jpg",
  "/portfolio-optimized/IMG_20250401_131639.jpg",
  "/portfolio-optimized/IMG_20250405_180454 (1).jpg",
  "/portfolio-optimized/IMG_20250411_162758.jpg",
  "/portfolio-optimized/IMG_20250610_082502.jpg",
  "/portfolio-optimized/IMG_20250610_112239-01.jpg",
  "/portfolio-optimized/IMG_20250610_172607.jpg",
  "/portfolio-optimized/IMG_20250610_174244.jpg",
  "/portfolio-optimized/IMG_20250611_143415.jpg",
  "/portfolio-optimized/IMG_20250708_191752.jpg",
  "/portfolio-optimized/IMG_20250709_144811.jpg",
  "/portfolio-optimized/IMG_20250715_172821.jpg",
  "/portfolio-optimized/IMG_20250716_080244.jpg",
  "/portfolio-optimized/IMG_20250716_094207.jpg",
  "/portfolio-optimized/IMG_20251018_185139.jpg",
  "/portfolio-optimized/IMG_20251103_160208-01.jpg",
  "/portfolio-optimized/IMG_20251106_170109-01.jpg",
  "/portfolio-optimized/IMG_20251118_152011-01.jpg",
  "/portfolio-optimized/IMG_20251130_135211.jpg",
  "/portfolio-optimized/IMG_3994.jpg",
  "/portfolio-optimized/IMG_4858-01.jpg",
  "/portfolio-optimized/IMG_4933-01.jpg",
  "/portfolio-optimized/IMG_5377.jpg",
  "/portfolio-optimized/IMG_7020-01.jpg",
  "/portfolio-optimized/IMG_8546.jpg",
  "/portfolio-optimized/IMG_8547.jpg",
  "/portfolio-optimized/IMG_8550.jpg",
  "/portfolio-optimized/IMG_8560.jpg",
  "/portfolio-optimized/IMG_8800.jpg",
  "/portfolio-optimized/IMG_9087.jpg",
  "/portfolio-optimized/IMG_9096.jpg",
  "/portfolio-optimized/IMG_9207.jpg",
  "/portfolio-optimized/IMG_9213.jpg",
  "/portfolio-optimized/IMG_9310.jpg",
  "/portfolio-optimized/IMG_9321.jpg",
  "/portfolio-optimized/IMG_9335.jpg",
  "/portfolio-optimized/IMG_9496.jpg",
  "/portfolio-optimized/IMG_9536.jpg",
  "/portfolio-optimized/IMG_9819.jpg",
  "/portfolio-optimized/PicRetouch_20241225_033408965-01.jpg",
  "/portfolio-optimized/PicsArt_12-01-05.46.37.jpg",
  "/portfolio-optimized/Snapchat-1316420494.jpg",
  "/portfolio-optimized/Snapchat-1389634244.jpg",
  "/portfolio-optimized/_DSC45922.jpg",
  "/portfolio-optimized/f43c9a15-cf11-4199-901e-b8d0b534512c-01.jpg",
  "/portfolio-optimized/WhatsApp_Image_2026-02-25_at_1.55.58_PM.jpg",
  "/portfolio-optimized/WhatsApp_Image_2026-02-25_at_1.55.58_PM_1.jpg",
  "/portfolio-optimized/WhatsApp_Image_2026-02-25_at_1.55.58_PM_2.jpg",
  "/portfolio-optimized/WhatsApp_Image_2026-02-25_at_1.55.58_PM_3.jpg",
  "/portfolio-optimized/WhatsApp_Image_2026-02-25_at_1.55.59_PM.jpg",
  "/portfolio-optimized/WhatsApp_Image_2026-02-25_at_1.55.59_PM_1.jpg",
  "/portfolio-optimized/WhatsApp_Image_2026-02-25_at_1.55.59_PM_2.jpg",
  "/portfolio-optimized/WhatsApp_Image_2026-02-25_at_1.55.59_PM_3.jpg",
  "/portfolio-optimized/WhatsApp_Image_2026-02-25_at_1.55.59_PM_4.jpg",
  "/portfolio-optimized/WhatsApp_Image_2026-02-25_at_1.58.07_PM.jpg",
  "/portfolio-optimized/WhatsApp_Image_2026-02-25_at_1.58.08_PM.jpg",
  "/portfolio-optimized/WhatsApp_Image_2026-02-25_at_1.58.08_PM_1.jpg",
];

// Curated showcase — a pool of images for the mouse trail
const showcasePhotos = [
  "/portfolio-optimized/1.jpg",
  "/portfolio-optimized/2.jpg",
  "/portfolio-optimized/3.jpg",
  "/portfolio-optimized/4.jpg",
  "/portfolio-optimized/5.jpg",
  "/portfolio-optimized/6.jpg",
  "/portfolio-optimized/7.jpg",
  "/portfolio-optimized/8.jpg",
  "/portfolio-optimized/9.jpg",
  "/portfolio-optimized/10.jpg",
  "/portfolio-optimized/IMG_0186.jpg",
  "/portfolio-optimized/IMG_0294.jpg",
];

interface TrailImage {
  id: number;
  x: number;
  y: number;
  src: string;
  rotation: number;
}

export default function PhotographySection() {
  const [showGallery, setShowGallery] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);
  const activeSet = showGallery ? allPhotos : showcasePhotos;

  // Trail state
  const [trail, setTrail] = useState<TrailImage[]>([]);
  const [globalIndex, setGlobalIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dx = x - lastMousePos.current.x;
    const dy = y - lastMousePos.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Spawn a new image every 80px of movement
    if (distance > 80) {
      lastMousePos.current = { x, y };
      
      const newImage: TrailImage = {
        id: Date.now() + Math.random(),
        x,
        y,
        src: showcasePhotos[globalIndex % showcasePhotos.length],
        rotation: Math.random() * 30 - 15, // Random rotation between -15deg and +15deg
      };

      setGlobalIndex((prev) => prev + 1);

      setTrail((prev) => {
        const next = [...prev, newImage];
        // Keep only the last 8 images on screen for the trail effect
        if (next.length > 8) return next.slice(1);
        return next;
      });

      // Clear the trail if no movement after 1.5 seconds
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setTrail([]), 1500);
    }
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setTrail([]);
  };

  const openFullscreen = useCallback(
    (src: string) => {
      const idx = activeSet.indexOf(src);
      setFullscreenIndex(idx >= 0 ? idx : 0);
      setFullscreenImage(src);
    },
    [activeSet]
  );

  const navigateFullscreen = useCallback(
    (direction: "next" | "prev") => {
      const newIndex =
        direction === "next"
          ? (fullscreenIndex + 1) % activeSet.length
          : (fullscreenIndex - 1 + activeSet.length) % activeSet.length;
      setFullscreenIndex(newIndex);
      setFullscreenImage(activeSet[newIndex]);
    },
    [fullscreenIndex, activeSet]
  );

  // Keyboard navigation for fullscreen
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!fullscreenImage) return;
      if (e.key === "Escape") setFullscreenImage(null);
      if (e.key === "ArrowRight") navigateFullscreen("next");
      if (e.key === "ArrowLeft") navigateFullscreen("prev");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [fullscreenImage, navigateFullscreen]);

  // Prevent body scroll when fullscreen or gallery is open
  useEffect(() => {
    if (showGallery || fullscreenImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showGallery, fullscreenImage]);

  return (
    <>
      <section id="photography" className="relative w-full bg-[#060606]">
        {/* ── Interactive Cursor Trail Area ── */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={(e) => {
            if (e.touches.length > 0) {
              const touch = e.touches[0];
              handleMouseMove({
                clientX: touch.clientX,
                clientY: touch.clientY,
              } as React.MouseEvent);
            }
          }}
          onMouseLeave={handleMouseLeave}
          onTouchEnd={handleMouseLeave}
          className="relative w-full min-h-[85vh] flex flex-col items-center justify-center overflow-hidden cursor-crosshair group border-y border-white/[0.04]"
        >
          {/* Default Text behind the images */}
          <div className="z-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none transition-opacity duration-700 group-hover:opacity-20">
            <span className={`${spaceGrotesk.className} text-[11px] tracking-[0.4em] uppercase text-[#c9a55a]/60 block mb-6`}>
              Through My Lens
            </span>
            <h2 className={`${cormorant.className} text-5xl md:text-7xl lg:text-8xl font-light text-white/90`}>
              Follow the <span className="text-[#D4AF37]">Passion</span>
            </h2>
            <p className={`${spaceGrotesk.className} text-[#555] text-xs md:text-sm mt-8 uppercase tracking-[0.3em]`}>
              Move your cursor across this space
            </p>
          </div>

          {/* The trail images */}
          <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
            <AnimatePresence>
              {trail.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.2, rotate: item.rotation - 20 }}
                  animate={{ opacity: 1, scale: 1, rotate: item.rotation }}
                  exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.5, ease: "easeOut" } }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="absolute origin-center"
                  style={{
                    left: item.x - 140, // offset by half of width (280/2)
                    top: item.y - 180,  // offset by half of height (360/2)
                  }}
                >
                  <div className="relative w-[280px] h-[360px] md:w-[320px] md:h-[420px] rounded-lg shadow-2xl overflow-hidden border border-white/[0.08] bg-[#060606]">
                    <Image
                      src={item.src}
                      alt="Trail image"
                      fill
                      sizes="(max-width: 768px) 280px, 320px"
                      quality={60} // Lower quality for trail performance
                      className="object-cover"
                      priority
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* View full gallery link (moved outside the trail box) */}
        <div className="w-full flex justify-center py-16 bg-[#060606] relative z-20">
          <Link 
            href="/gallery"
            className="font-sans text-[10px] md:text-[11px] uppercase font-semibold tracking-[0.2em] text-white hover:text-[#D4AF37] transition-colors duration-300"
          >
            See Full Gallery
          </Link>
        </div>
      </section>

      {/* ══════════ Full Gallery Modal ══════════ */}
      {showGallery && (
        <div className="fixed inset-0 z-40 bg-[#060606]/98 backdrop-blur-sm overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-[#060606]/90 backdrop-blur-md border-b border-white/[0.04]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
              <div>
                <h3 className={`${cormorant.className} text-white/90 text-xl font-light`}>
                  Full Gallery
                </h3>
                <p className={`${spaceGrotesk.className} text-[#444] text-[10px] tracking-[0.15em] mt-1`}>
                  {allPhotos.length} photographs
                </p>
              </div>
              <button
                onClick={() => setShowGallery(false)}
                className="w-10 h-10 rounded-full border border-white/[0.06] hover:border-[#c9a55a]/30 
                  flex items-center justify-center text-white/30 hover:text-[#c9a55a] 
                  transition-all duration-300 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Masonry Gallery */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
              {allPhotos.map((photo, i) => (
                <div
                  key={photo}
                  className="break-inside-avoid rounded-lg overflow-hidden cursor-pointer group"
                  onClick={() => openFullscreen(photo)}
                >
                  <div
                    className={`relative ${
                      i % 5 === 0
                        ? "aspect-[3/4]"
                        : i % 5 === 1
                          ? "aspect-square"
                          : i % 5 === 2
                            ? "aspect-[4/5]"
                            : i % 5 === 3
                              ? "aspect-[3/2]"
                              : "aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={photo}
                      alt={`Gallery photo ${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      quality={75}
                      loading="lazy"
                      className="object-cover transition-all duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════ Fullscreen Image Viewer ══════════ */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center"
          onClick={() => setFullscreenImage(null)}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full 
              border border-white/[0.08] backdrop-blur-sm flex items-center justify-center 
              text-white/40 hover:text-[#c9a55a] hover:border-[#c9a55a]/30 
              transition-all duration-300 z-10 cursor-pointer"
            onClick={() => setFullscreenImage(null)}
          >
            <X className="w-4 h-4" />
          </button>

          {/* Prev */}
          <button
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full 
              border border-white/[0.08] backdrop-blur-sm flex items-center justify-center 
              text-white/40 hover:text-[#c9a55a] hover:border-[#c9a55a]/30 
              transition-all duration-300 z-10 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              navigateFullscreen("prev");
            }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next */}
          <button
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full 
              border border-white/[0.08] backdrop-blur-sm flex items-center justify-center 
              text-white/40 hover:text-[#c9a55a] hover:border-[#c9a55a]/30 
              transition-all duration-300 z-10 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              navigateFullscreen("next");
            }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Image */}
          <div
            className="relative w-full h-full max-w-5xl max-h-[85vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={fullscreenImage}
              alt="Full view"
              fill
              sizes="100vw"
              quality={85}
              className="object-contain"
              priority
            />
          </div>

          {/* Counter */}
          <p className={`${spaceGrotesk.className} absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-white/30 text-[11px] tracking-[0.2em]`}>
            {fullscreenIndex + 1}
            <span className="mx-2 text-white/15">/</span>
            {activeSet.length}
          </p>
        </div>
      )}
    </>
  );
}
