"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { cormorant, spaceGrotesk } from "@/data/constants/fonts";
import { socialMedia } from "@/data/index";

export default function AboutContent() {
  const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#EFEBE6] text-[#0a0a0a] pb-32">

      {/* Top Navigation */}
      <div className="w-full flex justify-between items-center p-8 md:p-12 sticky top-0 z-50 bg-[#EFEBE6]/90 backdrop-blur-md">
        <Link href="/">
          <h2 className="font-sans text-sm md:text-base font-bold tracking-widest lowercase">
            abbas zayn
          </h2>
        </Link>
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-sans text-[10px] md:text-xs font-bold tracking-widest uppercase group-hover:text-black/60 transition-colors">BACK</span>
          <div className="w-4 h-4 border-2 border-black flex items-center justify-center group-hover:border-black/60 transition-colors">
            <div className="w-1.5 h-1.5 bg-black group-hover:bg-black/60 transition-colors" />
          </div>
        </Link>
      </div>

      <div className="w-full max-w-5xl mx-auto px-6 md:px-12 flex flex-col gap-24 md:gap-32 mt-4 md:mt-8">

        {/* Intro Block with Photo 1 */}
        <FadeIn>
          <div className="w-full flex flex-col gap-12">
            <div className="w-full h-[50vh] md:h-[600px] relative overflow-hidden">
              <Image
                src="/images/about/cover.jpg"
                alt="Zain Abbas Intro"
                fill
                priority
                className="object-cover object-top md:object-[center_10%]"
              />
            </div>

            <div className="w-full md:w-3/4 lg:w-2/3 flex flex-col gap-6">
              <h1 className={`${cormorant.className} text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1]`}>
                Zain Abbas
              </h1>
              <p className={`${spaceGrotesk.className} text-[10px] uppercase tracking-[0.2em] font-bold text-black/40`}>
                Gilgit-Islamabad, Pakistan
              </p>
              <p className={`${spaceGrotesk.className} text-base md:text-lg lg:text-xl leading-relaxed text-black/80 mt-4`}>
                Engineer and founder-operator spanning AI/NLP research, full-stack and mobile development, automation engineering, and business leadership. Currently directing two SECP-registered mining companies and a government-approved civic-tech venture.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Publication Focus Block with Photo 2 */}
        <FadeIn>
          <div className="w-full flex flex-col-reverse md:flex-row gap-12 md:gap-24 items-center">
            <div className="w-full md:w-1/2 flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <p className={`${spaceGrotesk.className} text-[10px] uppercase tracking-[0.2em] font-bold text-black/40`}>
                  Featured Publication
                </p>
                <h2 className={`${cormorant.className} text-3xl md:text-4xl lg:text-5xl leading-tight`}>
                  MUST: An Explainable AI-Based Framework for Multilingual Hate Speech Detection
                </h2>
              </div>

              <p className={`${spaceGrotesk.className} text-sm md:text-base leading-relaxed text-black/70`}>
                Published in IEEE Access (2025). This paper explores fine-tuning XLM-RoBERTa for multilingual hate-speech classification (English, Urdu, Roman Urdu) integrating LIME and SHAP explainability for content-moderation transparency, achieving 95.7% accuracy.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <a href="https://doi.org/10.1109/ACCESS.2025.3629527" target="_blank" rel="noopener noreferrer" className="border border-black px-6 py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-black hover:text-[#EFEBE6] transition-all text-center">
                  Read Paper
                </a>
                <a href="https://www.researchgate.net/profile/Zain-Abbas-30" target="_blank" rel="noopener noreferrer" className="border border-black/20 px-6 py-3 text-[10px] uppercase tracking-widest font-bold hover:border-black transition-all text-center text-black/60 hover:text-black">
                  ResearchGate
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/2 h-[300px] md:h-[500px] relative overflow-hidden">
              <Image src="/images/about/1.jpeg" alt="Publication Context" fill className="object-cover" />
            </div>
          </div>
        </FadeIn>

        {/* Professional Experience Block with Photo 3 */}
        <FadeIn>
          <div className="w-full flex flex-col md:flex-row gap-12 md:gap-24 items-start">
            <div className="w-full md:w-5/12 h-[300px] md:h-[600px] relative overflow-hidden md:sticky md:top-32">
              <Image src="/images/about/photo3.jpg" alt="Professional Experience" fill className="object-cover" />
            </div>
            <div className="w-full md:w-7/12 flex flex-col gap-16">

              <div className="flex flex-col gap-4">
                <h3 className={`${cormorant.className} text-2xl md:text-3xl`}>Horizon Bee Tech</h3>
                <p className={`${spaceGrotesk.className} text-[10px] uppercase tracking-widest text-black/40 font-bold mb-2`}>AI Automation Engineer</p>
                <p className={`${spaceGrotesk.className} text-sm md:text-base leading-relaxed text-black/70`}>
                  Migrated platforms to Supabase PostgreSQL backends, consolidating records for 200+ operations. Built computer-vision football player-tracking systems in Python for real-time analytics, and integrated automated outreach pipelines cutting manual effort by 70%.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className={`${cormorant.className} text-2xl md:text-3xl`}>Zircon Logics</h3>
                <p className={`${spaceGrotesk.className} text-[10px] uppercase tracking-widest text-black/40 font-bold mb-2`}>Founder & Research Lead</p>
                <p className={`${spaceGrotesk.className} text-sm md:text-base leading-relaxed text-black/70`}>
                  Commercialized NLP research into a real-time, multilingual hate-speech monitoring dashboard for public-sector deployment. Pitched directly to senior Gilgit-Baltistan government officials, securing formal approval for deployment.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className={`${cormorant.className} text-2xl md:text-3xl`}>Zircon Mines & Durr Mines</h3>
                <p className={`${spaceGrotesk.className} text-[10px] uppercase tracking-widest text-black/40 font-bold mb-2`}>CEO & Director</p>
                <p className={`${spaceGrotesk.className} text-sm md:text-base leading-relaxed text-black/70`}>
                  Leading two SECP-registered mining enterprises across six sites in Gilgit-Baltistan spanning copper, gold, lithium, antimony, and nephrite. Owning regulatory compliance and driving investor/public relations across operating regions.
                </p>
              </div>

            </div>
          </div>
        </FadeIn>

        {/* Extracurriculars & Outro Block with Photo 4 */}
        <FadeIn>
          <div className="w-full flex flex-col-reverse md:flex-row gap-12 md:gap-24 items-center border-t border-black/10 pt-24">
            <div className="w-full md:w-1/2 flex flex-col gap-6">
              <h2 className={`${cormorant.className} text-3xl md:text-4xl`}>
                Beyond the screen
              </h2>
              <p className={`${spaceGrotesk.className} text-sm md:text-base leading-relaxed text-black/70`}>
                I&apos;ve spent years organizing and leading teams. I served as Media Director for TEDx PIEAS, Media Head for Google Developer Student Clubs, and Director of Media & Communications for the PIEAS Media Club, building outreach strategies for large events. I also captained my university&apos;s football and volleyball teams at national competitions.
              </p>
              <div className="mt-8 flex gap-6 flex-wrap">
                <a href="/Zain_Abbas_CV_Combined_Master.pdf" target="_blank" rel="noopener noreferrer" className={`${spaceGrotesk.className} text-[10px] uppercase tracking-widest font-bold hover:text-black/50 transition-colors`}>Download CV</a>
                <a href="https://linkedin.com/in/zain-abbas1" target="_blank" rel="noopener noreferrer" className={`${spaceGrotesk.className} text-[10px] uppercase tracking-widest font-bold hover:text-black/50 transition-colors`}>LinkedIn</a>
                <a href="https://github.com/abbaszaynn" target="_blank" rel="noopener noreferrer" className={`${spaceGrotesk.className} text-[10px] uppercase tracking-widest font-bold hover:text-black/50 transition-colors`}>GitHub</a>
              </div>
            </div>
            <div className="w-full md:w-1/2 h-[300px] md:h-[400px] relative overflow-hidden">
              <Image src="/images/about/photo4.jpg" alt="Zain Extras" fill className="object-cover" />
            </div>
          </div>
        </FadeIn>

        {/* Simple Footer Bar matching light theme */}
        <div className="w-full border-t border-black/10 mt-24 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className={`${spaceGrotesk.className} text-[11px] tracking-[0.15em] text-black/60 font-semibold`}>
            &copy; {new Date().getFullYear()} Zayn Abbas. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {socialMedia.map((info) => (
              <a
                key={info.id}
                href={info.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center
                  text-black/60 hover:text-[#c9a55a] hover:border-[#c9a55a]/50
                  transition-all duration-300 cursor-pointer"
              >
                <span className="text-sm">{info.img}</span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
