"use client";

import {
  useState,
  useEffect,
  useRef,
  useMemo,
  Suspense,
} from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { Effects } from "@react-three/drei";
import { UnrealBloomPass } from "three-stdlib";
import { useTheme } from "next-themes";

extend({ UnrealBloomPass });
import { motion } from "framer-motion";
import * as THREE from "three";
import { ubuntu, playfair } from "@/data/constants/fonts";
import { FlipWords } from "./ui/flip-words";
import ContactModal from "./contact-modal";
import gsap from "gsap";

/* ═══════════════════════════════════════════════════════════════
   SECTION 1 — NEON TECH LOGO (3D Glowing Wireframe)
   ─────────────────────────────────────────────────────────────
   A high-tech, dev-focused geometric logo that glows and rotates.
═══════════════════════════════════════════════════════════════ */

function NeonTechLogo({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  // A highly mathematical, dev-looking shape (finer lines)
  const geometry = useMemo(() => new THREE.TorusKnotGeometry(2.2, 0.12, 200, 32), []);
  const innerGeometry = useMemo(() => new THREE.TorusKnotGeometry(2.18, 0.11, 200, 32), []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smooth continuous tech rotation
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x += delta * 0.1;
      
      // Gentle floating
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
      
      // Cursor interaction: slightly tilt towards mouse
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        (state.pointer.x * Math.PI) / 8,
        0.05
      );
    }

    // Dynamic color transition based on theme
    if (materialRef.current) {
      // Use subtle slate/gray for dark mode (standard look), dark slate for light mode
      const targetEmissive = isDark ? new THREE.Color("#475569") : new THREE.Color("#000000"); 
      const targetColor = isDark ? new THREE.Color("#334155") : new THREE.Color("#0f172a"); 
      
      materialRef.current.emissive.lerp(targetEmissive, 0.05);
      materialRef.current.color.lerp(targetColor, 0.05);
    }
  });

  return (
    <group ref={groupRef} position={[2.8, -0.5, -3.5]}>
      {/* Outer Wireframe (Glowing) */}
      <mesh geometry={geometry}>
        <meshStandardMaterial
          ref={materialRef}
          wireframe={true}
          emissiveIntensity={isDark ? 0.5 : 0}
          toneMapped={false}
          transparent
          opacity={isDark ? 0.4 : 0.8}
        />
      </mesh>

      {/* Inner Solid core to block background lines for a cleaner 3D look */}
      <mesh geometry={innerGeometry}>
        <meshBasicMaterial color={isDark ? "#0f0f0f" : "#ffffff"} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 2 — SCENE ROOT
═══════════════════════════════════════════════════════════════ */

function SceneRoot({ isDark }: { isDark: boolean }) {
  const { scene } = useThree();
  useEffect(() => {
    scene.background = new THREE.Color(isDark ? "#0f0f0f" : "#ffffff");
  }, [isDark, scene]);
  return null;
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 3 — R3F CANVAS WRAPPER
═══════════════════════════════════════════════════════════════ */

function HeroCanvas({ isDark }: { isDark: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.5], fov: 45 }}
      dpr={[1, 1.5]}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <SceneRoot isDark={isDark} />
      <Suspense fallback={null}>
        <NeonTechLogo isDark={isDark} />
        {/* Safe, stable Bloom via three-stdlib and drei Effects */}
        <Effects disableGamma>
          {/* @ts-ignore */}
          <unrealBloomPass threshold={0.2} strength={isDark ? 0.3 : 0} radius={0.5} />
        </Effects>
      </Suspense>
    </Canvas>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 4 — GSAP TYPEWRITER for "ZIRCON"
═══════════════════════════════════════════════════════════════ */

function ZirconHeadline({ isDark }: { isDark: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chars = "ZIRCON".split("");

  useEffect(() => {
    if (!containerRef.current) return;
    const els = containerRef.current.querySelectorAll<HTMLSpanElement>(".char");
    gsap.set(els, { opacity: 0, y: 32, rotateX: -45 });
    gsap.to(els, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.6,
      ease: "power4.out",
      stagger: 0.075,
      delay: 0.25,
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${playfair.className} inline-flex tracking-[0.06em] select-none`}
      style={{ perspective: "600px" }}
      aria-label="ZIRCON"
    >
      {chars.map((ch, i) => (
        <span
          key={i}
          className="char inline-block bg-clip-text text-transparent"
          style={{
            opacity: 0,
            backgroundImage: isDark
              ? "linear-gradient(175deg, #f5f0e6 0%, #c9a55a 50%, #7a5c2e 100%)"
              : "linear-gradient(175deg, #c9a55a 0%, #9c7b38 50%, #4a371c 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {ch}
        </span>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 5 — FRAMER MOTION VARIANTS
═══════════════════════════════════════════════════════════════ */

const slideUp = {
  hidden:  { opacity: 0, y: 18 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: d },
  }),
};

/* ═══════════════════════════════════════════════════════════════
   SECTION 6 — HERO SECTION (main export)
═══════════════════════════════════════════════════════════════ */

export default function HeroSection() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  /* Avoid hydration flash — default to dark before mount */
  const isDark = mounted ? resolvedTheme === "dark" : true;

  /* Text colors fully bound to theme */
  const textColor     = isDark ? "#ffffff" : "#000000";
  const subTextColor  = isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)";
  const bgColor       = isDark ? "#0f0f0f" : "#ffffff";

  return (
    <>
      <section
        className="w-screen relative left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] flex flex-col items-center pt-32 pb-20 min-h-screen overflow-hidden"
        style={{ backgroundColor: bgColor, transition: "background-color 0.4s ease" }}
      >
        {/* ── R3F Canvas with Neon Tech Logo — z-0 ── */}
        {mounted && <HeroCanvas isDark={isDark} />}

        {/* ── UI TEXT OVERLAY — z-10 ── */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-4xl mx-auto mt-16">

          {/* Decorative arc */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.55 }}
            transition={{ delay: 0.15, duration: 1, ease: "easeOut" }}
            className="mb-5"
          >
            <svg width="72" height="13" viewBox="0 0 72 13" fill="none">
              <path d="M4 11 Q36 -3 68 11" stroke="#c9a55a" strokeWidth="1.4" fill="none" strokeLinecap="round" />
            </svg>
          </motion.div>

          {/* ── ZIRCON — GSAP per-character reveal ── */}
          <h1 className="text-[5rem] sm:text-[7rem] md:text-[9.5rem] font-normal leading-none">
            <ZirconHeadline isDark={isDark} />
          </h1>

          {/* Arc below */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.4 }}
            transition={{ delay: 0.85, duration: 1, ease: "easeOut" }}
            className="mt-3"
          >
            <svg width="50" height="11" viewBox="0 0 50 11" fill="none">
              <path d="M4 2 Q25 12 46 2" stroke="#c9a55a" strokeWidth="1.4" fill="none" strokeLinecap="round" />
            </svg>
          </motion.div>

          {/* ── Sub-headline ── */}
          <motion.p
            className={`${ubuntu.className} mt-6 text-sm md:text-[0.8rem] tracking-[0.25em] uppercase font-light`}
            style={{ color: subTextColor, transition: "color 0.4s ease" }}
            variants={slideUp}
            initial="hidden"
            animate="visible"
            custom={1.0}
          >
            Engineering intelligent software &amp; AI automation
          </motion.p>

          {/* ── Gold CTA (primary, beneath ZIRCON) ── */}
          <motion.button
            variants={slideUp}
            initial="hidden"
            animate="visible"
            custom={1.3}
            onClick={() => setIsContactOpen(true)}
            className="mt-9 uppercase font-semibold text-xs tracking-[0.18em]
              border-2 border-[#c9a55a] rounded-full px-9 py-[14px]
              bg-transparent backdrop-blur-sm
              transition-all duration-300 ease-in-out
              hover:bg-[#c9a55a]/12 hover:border-[#f5e6a8] hover:scale-105
              active:scale-95
              shadow-[0_0_20px_rgba(201,165,90,0.18)]
              hover:shadow-[0_0_36px_rgba(201,165,90,0.42)]"
            style={{ color: textColor, transition: "color 0.4s ease" }}
          >
            Let&apos;s Connect 🚀
          </motion.button>

          {/* ── Divider ── */}
          <motion.div
            className="w-px h-14 bg-gradient-to-b from-[#c9a55a]/35 to-transparent mt-14"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ delay: 1.7, duration: 0.9, ease: "easeOut" }}
          />

          {/* ── FlipWords heading ── */}
          <motion.div
            variants={slideUp}
            initial="hidden"
            animate="visible"
            custom={1.85}
            className="mt-8 flex flex-col items-center gap-2 w-full"
          >
            <h2
              className={`${ubuntu.className} font-bold text-3xl md:text-5xl leading-tight`}
              style={{ color: textColor, transition: "color 0.4s ease" }}
            >
              From Ideas to{" "}
              <span className="text-red-600">Logics</span>,
            </h2>

            <p
              className={`${ubuntu.className} text-base md:text-lg font-medium mt-1`}
              style={{ color: isDark ? "rgb(206,206,206)" : "rgb(60,60,60)", transition: "color 0.4s ease" }}
            >
              I Develop
            </p>

            <div className="mt-2">
              <FlipWords
                words={[
                  "Intelligent Systems",
                  "Scalable Architectures",
                  "AI-Driven Solutions",
                  "Enterprise Platforms",
                  "Digital Experiences",
                ]}
                className="text-[rgb(139,94,41)] dark:text-[#f1b773cb] text-center h-[72px] sm:h-auto text-3xl md:text-5xl font-bold"
              />
            </div>
          </motion.div>

          {/* ── Description ── */}
          <motion.p
            variants={slideUp}
            initial="hidden"
            animate="visible"
            custom={2.05}
            className="text-sm md:text-base mt-7 max-w-2xl leading-relaxed"
            style={{
              color: isDark ? "rgb(148,163,184)" : "rgb(75,85,99)",
              transition: "color 0.4s ease",
            }}
          >
            I <strong>design, develop, and deploy</strong> intelligent digital solutions
            that bridge creativity and technology. From AI-driven systems to responsive
            web experiences, I craft ideas into impact — leveraging expertise in{" "}
            <span className="text-red-600">AI</span> and{" "}
            <span className="text-red-600">Web Development</span>.
          </motion.p>

          {/* ── Red CTA (bottom) ── */}
          <motion.button
            variants={slideUp}
            initial="hidden"
            animate="visible"
            custom={2.25}
            onClick={() => setIsContactOpen(true)}
            className="mt-8 uppercase font-semibold text-xs tracking-[0.15em]
              border-2 border-red-500 rounded-full px-8 py-4
              transition-all duration-300 ease-in-out
              hover:scale-110 hover:bg-red-600 hover:text-white hover:border-white
              active:scale-95
              shadow-[0_0_10px_rgba(255,0,0,0.2)]
              hover:shadow-[0_0_28px_rgba(255,0,0,0.55)]"
            style={{
              backgroundColor: isDark ? "#ffffff" : "#000000",
              color: isDark ? "#000000" : "#ffffff",
              transition: "background-color 0.4s ease, color 0.4s ease",
            }}
          >
            Let&apos;s Connect 🚀
          </motion.button>
        </div>
      </section>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
