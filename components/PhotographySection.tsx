"use client";

import Image from "next/image";
import { Oswald } from "next/font/google";
import { useState, useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";

const oswald = Oswald({ subsets: ["latin"], weight: ["400", "500", "600"] });

// All unique portfolio images (optimized, duplicates removed)
const allPhotos = [
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

// Curated showcase images — 10 hand-picked favorites
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
];

// Lazy image with smooth fade-in on load
function LazyImage({
  src,
  alt,
  priority = false,
  className = "",
  onClick,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-zinc-800/40 group cursor-pointer ${className}`}
      onClick={onClick}
    >
      {/* Shimmer placeholder */}
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-800/60 via-zinc-700/40 to-zinc-800/60 animate-pulse" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        quality={75}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        className={`object-cover transition-all duration-700 ease-out group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"
          }`}
        onLoad={() => setLoaded(true)}
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
        <Expand className="w-5 h-5 text-white/80" />
      </div>
    </div>
  );
}

export default function PhotographySection() {
  const [showGallery, setShowGallery] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Which image set to use for fullscreen navigation
  const activeSet = showGallery ? allPhotos : showcasePhotos;

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

  // Prevent body scroll when gallery or fullscreen is open
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
      <section
        id="photography"
        className="w-screen relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] py-20 bg-[#fff8f5] dark:bg-[#0f0f0f]"
      >
        {/* Title */}
        <div className="text-center mb-14 px-4">
          <h2
            className={`${oswald.className} text-2xl md:text-4xl flex flex-col text-center gap-3`}
          >
            <span className="text-base font-light text-red-900 dark:text-red-400 tracking-widest uppercase">
              Photography
            </span>
            <span className="font-semibold">
              Capturing <span className="text-red-600">Moments & Stories</span>
            </span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-3 max-w-md mx-auto">
            A curated selection from my photography journey — landscapes,
            portraits, and everything in between.
          </p>
        </div>

        {/* Showcase Grid — 10 images, responsive bento layout */}
        <div className="px-4 sm:px-8 md:px-16 max-w-6xl mx-auto">
          {/* Desktop: bento grid */}
          <div className="hidden md:grid grid-cols-4 grid-rows-3 gap-3 h-[600px]">
            {/* Row 1 — large hero + 2 smaller */}
            <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden">
              <LazyImage
                src={showcasePhotos[0]}
                alt="Photography showcase"
                priority
                className="w-full h-full"
                onClick={() => openFullscreen(showcasePhotos[0])}
              />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <LazyImage
                src={showcasePhotos[1]}
                alt="Photography showcase"
                priority
                className="w-full h-full"
                onClick={() => openFullscreen(showcasePhotos[1])}
              />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <LazyImage
                src={showcasePhotos[2]}
                alt="Photography showcase"
                priority
                className="w-full h-full"
                onClick={() => openFullscreen(showcasePhotos[2])}
              />
            </div>
            {/* Row 2 — middle right */}
            <div className="rounded-2xl overflow-hidden">
              <LazyImage
                src={showcasePhotos[3]}
                alt="Photography showcase"
                className="w-full h-full"
                onClick={() => openFullscreen(showcasePhotos[3])}
              />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <LazyImage
                src={showcasePhotos[4]}
                alt="Photography showcase"
                className="w-full h-full"
                onClick={() => openFullscreen(showcasePhotos[4])}
              />
            </div>
            {/* Row 3 — bottom 4 */}
            <div className="rounded-2xl overflow-hidden">
              <LazyImage
                src={showcasePhotos[5]}
                alt="Photography showcase"
                className="w-full h-full"
                onClick={() => openFullscreen(showcasePhotos[5])}
              />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <LazyImage
                src={showcasePhotos[6]}
                alt="Photography showcase"
                className="w-full h-full"
                onClick={() => openFullscreen(showcasePhotos[6])}
              />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <LazyImage
                src={showcasePhotos[7]}
                alt="Photography showcase"
                className="w-full h-full"
                onClick={() => openFullscreen(showcasePhotos[7])}
              />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <LazyImage
                src={showcasePhotos[8]}
                alt="Photography showcase"
                className="w-full h-full"
                onClick={() => openFullscreen(showcasePhotos[8])}
              />
            </div>
          </div>

          {/* Mobile: 2-column grid with breathing room */}
          <div className="grid md:hidden grid-cols-2 gap-3">
            {showcasePhotos.slice(0, 8).map((photo, i) => (
              <div
                key={photo}
                className={`rounded-xl overflow-hidden ${i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"
                  }`}
              >
                <LazyImage
                  src={photo}
                  alt="Photography showcase"
                  priority={i < 2}
                  className="w-full h-full"
                  onClick={() => openFullscreen(photo)}
                />
              </div>
            ))}
          </div>

          {/* View Gallery button */}
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowGallery(true)}
              className="group relative inline-flex items-center gap-3 px-8 py-3.5 bg-transparent border border-red-600/30 text-red-600 dark:text-red-400 rounded-full font-medium text-sm tracking-wide hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-500 hover:shadow-[0_0_30px_rgba(220,38,38,0.2)]"
            >
              <span>View Full Gallery</span>
              <span className="text-xs opacity-60">
                {allPhotos.length} photos
              </span>
              <Expand className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>

          {/* Photo count */}
          <p className="text-center text-zinc-500 dark:text-zinc-600 text-xs mt-4">
            Showing {showcasePhotos.length} of {allPhotos.length} photos
          </p>
        </div>
      </section>

      {/* ══════════ Full Gallery Modal ══════════ */}
      {showGallery && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-sm overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
              <div>
                <h3
                  className={`${oswald.className} text-white text-lg md:text-xl font-semibold`}
                >
                  Full Gallery
                </h3>
                <p className="text-zinc-500 text-xs mt-0.5">
                  {allPhotos.length} photos
                </p>
              </div>
              <button
                onClick={() => setShowGallery(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-600 flex items-center justify-center text-white transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Gallery Grid */}
          <div
            ref={galleryRef}
            className="max-w-7xl mx-auto px-4 sm:px-6 py-8"
          >
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
              {allPhotos.map((photo, i) => (
                <div
                  key={photo}
                  className="break-inside-avoid rounded-xl overflow-hidden"
                  style={{
                    animationDelay: `${Math.min(i * 30, 600)}ms`,
                  }}
                >
                  <div className="relative aspect-[3/4] sm:aspect-auto sm:h-auto">
                    <LazyImage
                      src={photo}
                      alt={`Gallery photo ${i + 1}`}
                      className={`w-full ${i % 3 === 0
                        ? "aspect-[3/4]"
                        : i % 3 === 1
                          ? "aspect-square"
                          : "aspect-[4/3]"
                        }`}
                      onClick={() => openFullscreen(photo)}
                    />
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
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setFullscreenImage(null)}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-red-600 transition-all duration-300 z-10"
            onClick={() => setFullscreenImage(null)}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev */}
          <button
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-red-600 transition-all duration-300 z-10"
            onClick={(e) => {
              e.stopPropagation();
              navigateFullscreen("prev");
            }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next */}
          <button
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-red-600 transition-all duration-300 z-10"
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
          <p className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm font-light">
            {fullscreenIndex + 1}
            <span className="mx-1 text-white/30">/</span>
            {activeSet.length}
          </p>
        </div>
      )}
    </>
  );
}
