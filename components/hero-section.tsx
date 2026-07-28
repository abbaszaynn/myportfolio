"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cormorant, spaceGrotesk } from "@/data/constants/fonts";

/* ═══════════════════════════════════════════════════════════════
   DATA & CONFIG
   Smaller uniform sizes, tight rigid elliptical formation
═══════════════════════════════════════════════════════════════ */

const PLANET_W = 150;
const PLANET_H = 100;
const RX = 320; // Elliptical radius X (tighter)
const RY = 200; // Elliptical radius Y (tighter)

const planets = [
  { id: 1, src: "/portfolio-optimized/1.jpg", radiusX: RX, radiusY: RY, angle: 0, width: PLANET_W, height: PLANET_H, zIndex: 1 },
  { id: 2, src: "/portfolio-optimized/2.jpg", radiusX: RX, radiusY: RY, angle: 22.5, width: PLANET_W, height: PLANET_H, zIndex: 1 },
  { id: 3, src: "/portfolio-optimized/3.jpg", radiusX: RX, radiusY: RY, angle: 45, width: PLANET_W, height: PLANET_H, zIndex: 1 },
  { id: 4, src: "/portfolio-optimized/4.jpg", radiusX: RX, radiusY: RY, angle: 67.5, width: PLANET_W, height: PLANET_H, zIndex: 1 },
  { id: 5, src: "/portfolio-optimized/5.jpg", radiusX: RX, radiusY: RY, angle: 90, width: PLANET_W, height: PLANET_H, zIndex: 1 },
  { id: 6, src: "/portfolio-optimized/6.jpg", radiusX: RX, radiusY: RY, angle: 112.5, width: PLANET_W, height: PLANET_H, zIndex: 1 },
  { id: 7, src: "/portfolio-optimized/7.jpg", radiusX: RX, radiusY: RY, angle: 135, width: PLANET_W, height: PLANET_H, zIndex: 1 },
  { id: 8, src: "/portfolio-optimized/8.jpg", radiusX: RX, radiusY: RY, angle: 157.5, width: PLANET_W, height: PLANET_H, zIndex: 1 },
  { id: 9, src: "/portfolio-optimized/9.jpg", radiusX: RX, radiusY: RY, angle: 180, width: PLANET_W, height: PLANET_H, zIndex: 1 },
  { id: 10, src: "/portfolio-optimized/10.jpg", radiusX: RX, radiusY: RY, angle: 202.5, width: PLANET_W, height: PLANET_H, zIndex: 1 },
  { id: 11, src: "/portfolio-optimized/IMG_0186.jpg", radiusX: RX, radiusY: RY, angle: 225, width: PLANET_W, height: PLANET_H, zIndex: 1 },
  { id: 12, src: "/portfolio-optimized/IMG_0294.jpg", radiusX: RX, radiusY: RY, angle: 247.5, width: PLANET_W, height: PLANET_H, zIndex: 1 },
  { id: 13, src: "/portfolio-optimized/photo1.jpg", radiusX: RX, radiusY: RY, angle: 270, width: PLANET_W, height: PLANET_H, zIndex: 1 },
  { id: 14, src: "/portfolio-optimized/photo2.jpg", radiusX: RX, radiusY: RY, angle: 292.5, width: PLANET_W, height: PLANET_H, zIndex: 1 },
  { id: 15, src: "/portfolio-optimized/photo3.jpg", radiusX: RX, radiusY: RY, angle: 315, width: PLANET_W, height: PLANET_H, zIndex: 1 },
  { id: 16, src: "/portfolio-optimized/DSC_0177.jpg", radiusX: RX, radiusY: RY, angle: 337.5, width: PLANET_W, height: PLANET_H, zIndex: 1 },
];

/* ═══════════════════════════════════════════════════════════════
   ORBITING IMAGE COMPONENT
═══════════════════════════════════════════════════════════════ */

function OrbitingImage({
  planet,
  hoveredId,
  setHoveredId
}: {
  planet: typeof planets[0];
  hoveredId: number | null;
  setHoveredId: (id: number | null) => void;
}) {
  const isHovered = hoveredId === planet.id;
  const isAnyHovered = hoveredId !== null;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scaleDepth = useMotionValue(1);
  const zIndexDepth = useMotionValue(planet.zIndex);

  const accumulatedTime = useRef(0);
  const lastTime = useRef<number | null>(null);

  useAnimationFrame((time) => {
    if (lastTime.current === null) {
      lastTime.current = time;
    }
    const deltaTime = time - lastTime.current;
    lastTime.current = time;

    // The movement of layout should continue in its particular direction even when hovered
    accumulatedTime.current += deltaTime;

    const t = accumulatedTime.current;

    // Slow, elegant 3D orbit
    const currentAngle = (planet.angle * Math.PI) / 180 + t * 0.00004;

    // Calculate 2D position (Rigid layout - no organic bobbing to maintain ladder formation)
    const posX = Math.cos(currentAngle) * planet.radiusX;
    const posY = Math.sin(currentAngle) * planet.radiusY;

    x.set(posX);
    y.set(posY);

    // 3D Depth illusion: Scale down when moving "back", scale up when "front"
    const depth = Math.sin(currentAngle); // -1 (top/back) to 1 (bottom/front)
    scaleDepth.set(1 + depth * 0.15); // Scale varies from 0.85 to 1.15
    zIndexDepth.set(Math.round(20 + depth * 10)); // Z-index varies to create realistic overlapping
  });

  const currentOpacity = isHovered ? 1 : (isAnyHovered ? 0.05 : 0.4);
  const currentFilter = isHovered ? "grayscale(0%) brightness(1)" : "grayscale(100%) brightness(0.6)";

  return (
    <motion.div
      style={{ x, y, scale: scaleDepth, zIndex: zIndexDepth }}
      className="absolute top-0 left-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: planet.id * 0.1 }}
      onMouseEnter={() => setHoveredId(planet.id)}
      onMouseLeave={() => setHoveredId(null)}
    >
      <motion.div
        className="relative overflow-hidden cursor-crosshair -translate-x-1/2 -translate-y-1/2 shadow-2xl group"
        style={{ width: planet.width, height: planet.height }}
        animate={{
          scale: isHovered ? 1.15 : 1, // Increase size of the hovered image wrapper
          opacity: currentOpacity,
          filter: currentFilter,
          zIndex: isHovered ? 100 : "auto"
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Image
          src={planet.src}
          alt={`Gallery image ${planet.id}`}
          fill
          sizes={`${planet.width}px`}
          quality={85}
          priority
          className="object-cover transition-transform duration-700 ease-out"
          style={{ transform: isHovered ? "scale(1.15)" : "scale(1)" }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STATIC CENTER LOGO
═══════════════════════════════════════════════════════════════ */

function StaticCenter() {
  return (
    <div className="flex flex-col items-center justify-center pointer-events-auto cursor-default">
      <h1 className="font-sans text-xl md:text-3xl font-light tracking-[0.6em] text-[#D4AF37] select-none whitespace-nowrap">
        ZIRCON
      </h1>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO SECTION (Main Export)
═══════════════════════════════════════════════════════════════ */

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative w-full h-[100vh] min-h-[800px] flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Left Vertical Branding & Nav - Spaced evenly across full height */}
      <div className="absolute py-8 md:py-12 left-8 md:left-12 top-0 bottom-0 z-50 flex flex-col justify-between items-start pointer-events-auto">
        <Link href="/">
          {/* Using clean sans-serif and lowercase */}
          <h2 className="font-sans text-sm md:text-base font-semibold tracking-widest text-white lowercase">
            abbas zayn
          </h2>
        </Link>
        <Link href="#works" className="font-sans pl-1 text-[9px] md:text-[10px] uppercase font-semibold tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-300">
          Works
        </Link>
        <Link href="#consultation" className="font-sans pl-1 text-[9px] md:text-[10px] uppercase font-semibold tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-300">
          Consultation
        </Link>
        {/* Placeholder element to maintain flex-between spacing since About moved */}
        <div className="h-4 text-[9px] md:text-[10px]"></div>
      </div>

      {/* Right Vertical Branding & Nav - Spaced evenly across full height to align perfectly with left side */}
      <div className="absolute py-8 md:py-12 right-8 md:right-12 top-0 bottom-0 z-50 flex flex-col justify-between items-end pointer-events-auto text-right">
        <Link href="#connect" className="font-sans pr-1 text-[9px] md:text-[10px] uppercase font-semibold tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-300">
          Connect
        </Link>
        {/* Placeholder aligns with Works */}
        <div className="h-4 text-[9px] md:text-[10px]"></div>
        {/* About aligns with Consultation */}
        <Link href="/about" className="font-sans pr-1 text-[9px] md:text-[10px] uppercase font-semibold tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-300">
          About
        </Link>
        {/* Placeholder aligns with left bottom placeholder */}
        <div className="h-4 text-[9px] md:text-[10px]"></div>
      </div>

      {/* Background overlay that dims everything down when hovered */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        animate={{
          background: hoveredId
            ? "radial-gradient(circle 800px at 50% 50%, rgba(10,10,10,0.9), rgba(10,10,10,1))"
            : "radial-gradient(circle 800px at 50% 50%, rgba(10,10,10,0), rgba(10,10,10,0))"
        }}
        transition={{ duration: 0.6 }}
      />

      {/* Container to shift both text and constellation upwards by moving their center */}
      <div className="relative w-full h-full -mt-24 md:-mt-32">
        {/* Center Logo - Visually nudged right and down */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] mt-6 ml-14">
          <StaticCenter />
        </div>

        {/* Orbiting Constellation - Absolutely positioned to guarantee perfect center alignment */}
        {mounted && (
          <div className="absolute top-1/2 left-1/2 w-0 h-0 z-10">
            {planets.map((planet) => (
              <OrbitingImage
                key={planet.id}
                planet={planet}
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
