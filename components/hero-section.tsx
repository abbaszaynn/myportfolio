"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ubuntu, playfair } from "@/data/constants/fonts";
import { FlipWords } from "./ui/flip-words";
import ContactModal from "./contact-modal";
import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

/* ─── Typewriter for ZIRCON ─────────────────────────────────── */
function ZirconTypewriter() {
  const word = "ZIRCON";
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const idx = useRef(0);

  useEffect(() => {
    const delay = setTimeout(() => {
      const timer = setInterval(() => {
        idx.current += 1;
        setDisplayed(word.slice(0, idx.current));
        if (idx.current >= word.length) {
          clearInterval(timer);
          setDone(true);
        }
      }, 90);
      return () => clearInterval(timer);
    }, 400);
    return () => clearTimeout(delay);
  }, []);

  return (
    <span
      className={`${playfair.className} relative inline-block`}
      style={{
        background:
          "linear-gradient(180deg, #f5f0e6 0%, #c9a55a 50%, #8b7355 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {displayed}
      {!done && (
        <span
          className="inline-block w-[3px] ml-[2px] align-middle"
          style={{
            height: "0.85em",
            background: "#c9a55a",
            animation: "blink 0.7s steps(1) infinite",
            display: "inline-block",
            verticalAlign: "middle",
          }}
        />
      )}
    </span>
  );
}

/* ─── Particle sparkles component ───────────────────────────── */
const sparkleOptions = {
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" as const },
      resize: { enable: true },
    },
    modes: {
      repulse: { distance: 80, duration: 0.4 },
    },
  },
  particles: {
    color: {
      value: ["#c9a55a", "#f5f0e6", "#e8d5a3", "#8b7355", "#ffffff"],
    },
    links: { enable: false },
    move: {
      direction: "none" as const,
      enable: true,
      outModes: { default: "out" as const },
      random: true,
      speed: { min: 0.3, max: 1.2 },
      straight: false,
    },
    number: {
      density: { enable: true, area: 900 },
      value: 130,
    },
    opacity: {
      value: { min: 0.08, max: 0.65 },
      animation: {
        enable: true,
        speed: 0.6,
        minimumValue: 0.05,
      },
    },
    shape: { type: ["circle", "star"] as const },
    size: {
      value: { min: 0.8, max: 2.8 },
      animation: {
        enable: true,
        speed: 1.5,
        minimumValue: 0.4,
      },
    },
    twinkle: {
      particles: { enable: true, frequency: 0.05, opacity: 1 },
    },
  },
  detectRetina: true,
};

/* ─── Hero Section ───────────────────────────────────────────── */
export default function HeroSection() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const initParticles = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <>
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>

      <ParticlesProvider init={initParticles}>
        <section className="w-screen relative left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] flex flex-col items-center justify-center min-h-screen py-28 bg-[#0f0f0f] overflow-hidden">

          {/* ── Sparkle particles ── */}
          <Particles
            id="hero-sparkles"
            className="absolute inset-0 z-0 pointer-events-none"
            options={sparkleOptions}
          />

          {/* ── ZIRCON + tagline + primary CTA ── */}
          <div className="relative z-20 flex flex-col items-center justify-center text-center mb-4 px-4">

            {/* Arc above */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="mb-3"
            >
              <svg width="70" height="14" viewBox="0 0 70 14" fill="none" className="opacity-60">
                <path d="M5 12 Q35 -4 65 12" stroke="#c9a55a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
            </motion.div>

            {/* ZIRCON typewriter */}
            <div className="text-[5rem] sm:text-[7rem] md:text-[9rem] font-normal tracking-[0.08em] leading-none select-none">
              <ZirconTypewriter />
            </div>

            {/* Arc below */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
              className="mt-2"
            >
              <svg width="50" height="12" viewBox="0 0 50 12" fill="none" className="opacity-50">
                <path d="M5 2 Q25 14 45 2" stroke="#c9a55a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.7 }}
              className={`${ubuntu.className} mt-5 text-sm md:text-base tracking-[0.22em] uppercase font-light text-[#c9a55a]/80`}
            >
              Crafting Intelligence · Engineering Impact
            </motion.p>

            {/* Let's Connect — directly beneath ZIRCON */}
            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              onClick={() => setIsContactOpen(true)}
              className="mt-8 uppercase font-semibold text-xs bg-transparent text-white
                border-2 border-[#c9a55a] rounded-full px-8 py-4 flex items-center justify-center
                transition-all duration-300 ease-in-out
                hover:scale-105 hover:bg-[#c9a55a]/15 hover:border-[#f5e6a8]
                active:scale-95 shadow-[0_0_14px_rgba(201,165,90,0.25)] hover:shadow-[0_0_30px_rgba(201,165,90,0.45)]"
            >
              <span>Let&apos;s Connect 🚀</span>
            </motion.button>
          </div>

          {/* ── Rest of hero (untouched) ── */}
          <div className="text-center flex flex-col items-center gap-6 mt-14 px-4 max-w-3xl z-20">
            <h1
              className={`${ubuntu.className} font-bold text-3xl md:text-5xl flex flex-col leading-tight gap-0`}
            >
              <span>
                From Ideas to <span className="text-red-700">Logics</span>,
              </span>
              <span className="mt-1">
                <span className="text-base md:text-lg font-medium text-black dark:text-[rgb(206,206,206)]">
                  I Develop
                </span>
                <div className="mt-4">
                  <FlipWords
                    words={[
                      "Intelligent Systems",
                      "Scalable Architectures",
                      "AI-Driven Solutions",
                      "Enterprise Platforms",
                      "Digital Experiences",
                    ]}
                    className="text-[rgb(139,94,41)] dark:text-[#f1b773cb] text-center h-[72px] sm:h-auto transition-all duration-700"
                  />
                </div>
              </span>
            </h1>

            <p className="text-gray-800 dark:text-slate-400 text-sm md:text-base mt-2">
              I <b>design, develop, and deploy</b> intelligent digital solutions
              that bridge creativity and technology. From AI-driven systems to
              responsive web experiences, I craft ideas into impact — leveraging
              expertise in <span className="text-red-700">AI</span> and{" "}
              <span className="text-red-700">Web Development</span>.
            </p>

            <button
              onClick={() => setIsContactOpen(true)}
              className="uppercase font-semibold text-xs bg-black dark:bg-white dark:text-black text-white
               border-2 border-red-500 rounded-full px-8 py-4 flex items-center justify-center
               transition-all duration-300 ease-in-out
               hover:scale-110 hover:bg-red-600 hover:text-white hover:border-white
               active:scale-95 shadow-[0_0_10px_rgba(255,0,0,0.3)] hover:shadow-[0_0_25px_rgba(255,0,0,0.7)]"
            >
              <span>Let&apos;s Connect 🚀</span>
            </button>
          </div>
        </section>
      </ParticlesProvider>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
