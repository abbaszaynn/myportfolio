"use client";

import * as React from "react";
import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { cormorant, spaceGrotesk } from "@/data/constants/fonts";

// ─── Tech Stack SVG Icons (for floating background) ─────────────────

const IconReact = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="2.5" fill="#61DAFB"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" fill="none"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(120 12 12)"/></svg>
);
const IconNextJS = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10.5" fill="white"/><path d="M18.5 18.5L9.5 7H8v10h1.2V8.8l7.8 10.2" fill="black"/><circle cx="15.5" cy="8.5" r="1" fill="black"/></svg>
);
const IconTypeScript = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="2" fill="#3178C6"/><path d="M13.5 15.5c0 1.5 1.2 2.5 2.8 2.5 1.6 0 2.7-1 2.7-2.3 0-1.2-.7-1.9-2.3-2.4l-.6-.2c-.9-.3-1.2-.5-1.2-1 0-.4.3-.7 1-.7s1 .3 1.1.9h1.5c-.1-1.4-1.1-2.3-2.6-2.3-1.4 0-2.5.9-2.5 2.2 0 1.1.7 1.8 2.1 2.3l.7.2c1 .3 1.3.6 1.3 1.1 0 .5-.4.9-1.2.9-.8 0-1.3-.4-1.3-1.1H13.5z" fill="white"/><path d="M6 10.5h6v1.3H10.2V18h-1.5v-6.2H6v-1.3z" fill="white"/></svg>
);
const IconTailwind = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none"><path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35.98 1 2.1 2.15 4.6 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C15.62 7.15 14.5 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C8.38 16.85 9.5 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C10.62 13.15 9.5 12 7 12z" fill="#06B6D4"/></svg>
);
const IconPython = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none"><path d="M11.9 2C7.3 2 7.7 4 7.7 4l.01 2.1H12v.6H5.3S2 6.3 2 11.9s2.9.2 2.9.2h1.7v-2.2s-.1-2.9 2.8-2.9h4.9s2.7 0 2.7-2.7V5.2S17.5 2 11.9 2zm-2.7 1.9c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z" fill="#3776AB"/><path d="M12.1 22c4.6 0 4.2-2 4.2-2l-.01-2.1H12v-.6h6.7s3.3.4 3.3-5.2-2.9-.2-2.9-.2h-1.7v2.2s.1 2.9-2.8 2.9H9.7s-2.7 0-2.7 2.7v3.1S6.5 22 12.1 22zm2.7-1.9c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z" fill="#FFD43B"/></svg>
);
const IconNodeJS = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none"><path d="M12 2l9 5.2v10.4L12 22l-9-5.2V7.2L12 2z" fill="#339933"/><text x="12" y="14" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold" fontFamily="Arial">N</text></svg>
);
const IconPostgres = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none"><path d="M17.5 3C15 3 14 4.5 12 4.5S9 3 6.5 3C4 3 2 5.5 2 9c0 5 3.5 12 6.5 12 1.5 0 2-1 3.5-1s2 1 3.5 1c3 0 6.5-7 6.5-12 0-3.5-2-6-4.5-6z" fill="#336791"/><ellipse cx="9" cy="9" rx="1.5" ry="2" fill="white" opacity="0.6"/><ellipse cx="15" cy="9" rx="1.5" ry="2" fill="white" opacity="0.6"/></svg>
);
const IconSupabase = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none"><path d="M13.5 21.5c-.4.5-1.2.1-1.2-.5V14h8.2c.9 0 1.4 1.1.8 1.8l-7.8 5.7z" fill="#3ECF8E"/><path d="M10.5 2.5c.4-.5 1.2-.1 1.2.5V10H3.5c-.9 0-1.4-1.1-.8-1.8l7.8-5.7z" fill="#3ECF8E" opacity="0.7"/></svg>
);
const IconFastAPI = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#009688"/><path d="M12 5l1 7h-2l1 7-4-8h3l-2-6h3z" fill="white" transform="translate(0.5,0)"/></svg>
);
const IconGit = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none"><path d="M23.3 10.6L13.4.7c-.9-.9-2.4-.9-3.3 0l-2 2 2.5 2.5c.6-.2 1.3-.1 1.8.4.5.5.6 1.2.4 1.8l2.4 2.4c.6-.2 1.3-.1 1.8.4.7.7.7 1.8 0 2.5s-1.8.7-2.5 0c-.5-.5-.6-1.3-.3-1.9l-2.2-2.2v5.8c.2.1.3.2.4.3.7.7.7 1.8 0 2.5s-1.8.7-2.5 0-0.7-1.8 0-2.5c.2-.2.4-.3.6-.4V9.1c-.2-.1-.4-.2-.6-.4-.5-.5-.6-1.3-.4-1.9L7.3 4.7.7 11.3c-.9.9-.9 2.4 0 3.3l9.9 9.9c.9.9 2.4.9 3.3 0l9.4-9.4c.9-1 .9-2.5 0-3.5z" fill="#F05032"/></svg>
);
const IconVercel = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none"><path d="M12 2L2 20h20L12 2z" fill="white"/></svg>
);
const IconGitHub = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="white" opacity="0.8"/></svg>
);
const IconHuggingFace = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#FFD21E"/><circle cx="9" cy="10" r="1.5" fill="#1A1A1A"/><circle cx="15" cy="10" r="1.5" fill="#1A1A1A"/><path d="M8 14c0 0 1.5 3 4 3s4-3 4-3" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>
);
const IconPyTorch = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none"><path d="M12 2L6 8v4c0 5.5 4.5 10 6 10s6-4.5 6-10V8l-6-6z" fill="#EE4C2C"/><circle cx="13.5" cy="10.5" r="1.5" fill="white"/></svg>
);
const IconOpenCV = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none"><circle cx="8" cy="16" r="4" fill="#FF0000" opacity="0.9"/><circle cx="16" cy="16" r="4" fill="#00FF00" opacity="0.9"/><circle cx="12" cy="9" r="4" fill="#0000FF" opacity="0.9"/></svg>
);
const IconDocker = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none"><path d="M13 3h2v2h-2V3zm-3 0h2v2h-2V3zM7 3h2v2H7V3zm6 3h2v2h-2V6zm-3 0h2v2h-2V6zM7 6h2v2H7V6zM4 6h2v2H4V6zm6 3h2v2h-2V9zM7 9h2v2H7V9zM4 9h2v2H4V9z" fill="#2496ED"/><path d="M22.5 10.5c-.7-.4-1.6-.5-2.3-.3-.2-1.3-1.2-2.5-2.3-3.1l-.5-.3-.3.5c-.4.7-.5 1.6-.5 2.4.1.7.3 1.3.7 1.9-.5.3-1 .4-1.5.5H1.1c-.3 1.8 0 4 1.2 5.6 1.3 1.7 3.2 2.5 5.8 2.5 4.7 0 8.6-2 10.7-6.4 1 0 2.1.1 2.9-.7.5-.5.7-1.2.8-1.9l.1-.4-.5-.3z" fill="#2496ED"/></svg>
);
const IconN8N = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="4" fill="#EA4B71"/><text x="12" y="15.5" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="Arial">n8n</text></svg>
);
const IconNestJS = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none"><path d="M14.1 1.5c-.4 0-.7.2-.9.5.8.4 1.3 1.2 1.3 2.1 0 1.3-1 2.3-2.3 2.3-.2 0-.4 0-.5-.1 0 .1 0 .3 0 .4 0 1.5.9 2.9 2.3 3.5.4-.7 1.2-1.2 2.1-1.2 1.3 0 2.3 1 2.3 2.3s-1 2.3-2.3 2.3c-.5 0-.9-.1-1.3-.4-.3 1.1-.4 2.2-.4 3.4 0 2.6 1.1 4.9 2.9 6.6.2-.7.7-1.3 1.4-1.7 1.1-.6 2.5-.2 3.2.9.6 1.1.2 2.5-.9 3.2-.5.3-1.1.4-1.7.3C21.3 21.5 23 17 23 12c0-5.5-4.5-10-10-10h-1c.4.3.7.8.7 1.3 0 .1 0 .2 0 .2h1.4z" fill="#E0234E"/><path d="M9.9 1.5c.4 0 .7.2.9.5-.8.4-1.3 1.2-1.3 2.1 0 1.3 1 2.3 2.3 2.3.2 0 .4 0 .5-.1 0 .1 0 .3 0 .4 0 1.5-.9 2.9-2.3 3.5-.4-.7-1.2-1.2-2.1-1.2-1.3 0-2.3 1-2.3 2.3s1 2.3 2.3 2.3c.5 0 .9-.1 1.3-.4.3 1.1.4 2.2.4 3.4 0 2.6-1.1 4.9-2.9 6.6-.2-.7-.7-1.3-1.4-1.7-1.1-.6-2.5-.2-3.2.9-.6 1.1-.2 2.5.9 3.2.5.3 1.1.4 1.7.3C2.7 21.5 1 17 1 12 1 6.5 5.5 2 11 2h1c-.4.3-.7.8-.7 1.3 0 .1 0 .2 0 .2H9.9z" fill="#E0234E"/></svg>
);
const IconCloudinary = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none"><path d="M6 17.5C3.2 17.5 1 15.3 1 12.5c0-2.3 1.6-4.3 3.8-4.9C5.4 5 7.8 3 10.6 3c2.4 0 4.5 1.4 5.5 3.4.5-.2 1-.3 1.5-.3 2.5 0 4.5 2 4.5 4.5 0 .5-.1 1-.2 1.4 1.3.7 2.1 2 2.1 3.5 0 2.2-1.8 4-4 4H6z" fill="#3448C5"/></svg>
);
const IconReactNative = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none"><rect x="6" y="2" width="12" height="20" rx="2" stroke="#61DAFB" strokeWidth="1.2" fill="none"/><circle cx="12" cy="12" r="2" fill="#61DAFB"/><ellipse cx="12" cy="12" rx="7" ry="3" stroke="#61DAFB" strokeWidth="0.8" fill="none"/><ellipse cx="12" cy="12" rx="7" ry="3" stroke="#61DAFB" strokeWidth="0.8" fill="none" transform="rotate(60 12 12)"/></svg>
);
const IconKubernetes = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none"><path d="M12 2l9 5.2v10.4L12 22l-9-5.2V7.2L12 2z" fill="#326CE5"/><circle cx="12" cy="12" r="3.5" stroke="white" strokeWidth="1" fill="none"/></svg>
);
const IconClaude = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#D97757"/><circle cx="9" cy="10" r="1.2" fill="white"/><circle cx="15" cy="10" r="1.2" fill="white"/><path d="M9 14.5c1 1.5 5 1.5 6 0" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none"/></svg>
);
const IconMySQL = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none"><path d="M12 2C6.5 2 2 3.8 2 6v12c0 2.2 4.5 4 10 4s10-1.8 10-4V6c0-2.2-4.5-4-10-4z" fill="#00618A"/><ellipse cx="12" cy="6" rx="10" ry="4" fill="#00758F"/></svg>
);

// ─── Floating icon data with random scattered positions ─────────────

type FloatingIconDef = {
  id: number;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  top: string;
  left: string;
  size: number;
  delay: number;
  duration: number;
};

const floatingIcons: FloatingIconDef[] = [
  // ── LEFT FLANK (strictly packed on the left side: 0-20%)
  { id: 1, Icon: IconReact, top: "10%", left: "5%", size: 48, delay: 0, duration: 7 },
  { id: 32, Icon: IconReact, top: "22%", left: "8%", size: 44, delay: 0.3, duration: 7.5 },
  { id: 2, Icon: IconTypeScript, top: "18%", left: "15%", size: 42, delay: 1, duration: 6 },
  { id: 3, Icon: IconDocker, top: "25%", left: "2%", size: 42, delay: 1.4, duration: 6.5 },
  { id: 4, Icon: IconTailwind, top: "32%", left: "18%", size: 46, delay: 0.3, duration: 9 },
  { id: 35, Icon: IconSupabase, top: "36%", left: "6%", size: 42, delay: 1.3, duration: 6 },
  { id: 5, Icon: IconNextJS, top: "40%", left: "5%", size: 44, delay: 0.5, duration: 8 },
  { id: 6, Icon: IconPython, top: "48%", left: "12%", size: 52, delay: 0.7, duration: 7.5 },
  { id: 7, Icon: IconNodeJS, top: "55%", left: "1%", size: 44, delay: 1.2, duration: 8.5 },
  { id: 8, Icon: IconGitHub, top: "62%", left: "16%", size: 46, delay: 0.6, duration: 8.5 },
  { id: 33, Icon: IconTypeScript, top: "68%", left: "18%", size: 40, delay: 0.4, duration: 9 },
  { id: 9, Icon: IconHuggingFace, top: "70%", left: "4%", size: 44, delay: 0.6, duration: 8.5 },
  { id: 10, Icon: IconSupabase, top: "78%", left: "15%", size: 42, delay: 0.9, duration: 7 },
  { id: 11, Icon: IconPostgres, top: "85%", left: "2%", size: 46, delay: 0.4, duration: 6.5 },
  { id: 12, Icon: IconCloudinary, top: "90%", left: "10%", size: 42, delay: 1.6, duration: 8.5 },

  // ── RIGHT FLANK (strictly packed on the right side: 80-100%)
  { id: 13, Icon: IconPyTorch, top: "12%", left: "85%", size: 42, delay: 1.1, duration: 7 },
  { id: 34, Icon: IconNodeJS, top: "16%", left: "90%", size: 42, delay: 1.0, duration: 8 },
  { id: 14, Icon: IconVercel, top: "20%", left: "95%", size: 40, delay: 0.8, duration: 6 },
  { id: 15, Icon: IconGit, top: "28%", left: "82%", size: 48, delay: 0.2, duration: 9 },
  { id: 16, Icon: IconNestJS, top: "35%", left: "98%", size: 44, delay: 0.7, duration: 7 },
  { id: 20, Icon: IconReactNative, top: "42%", left: "88%", size: 40, delay: 0.5, duration: 6 },
  { id: 22, Icon: IconClaude, top: "50%", left: "92%", size: 42, delay: 0.8, duration: 9 },
  { id: 37, Icon: IconDocker, top: "54%", left: "96%", size: 42, delay: 1.4, duration: 7 },
  { id: 24, Icon: IconGit, top: "58%", left: "80%", size: 44, delay: 0.9, duration: 7 },
  { id: 25, Icon: IconKubernetes, top: "65%", left: "96%", size: 44, delay: 1, duration: 7.5 },
  { id: 36, Icon: IconHuggingFace, top: "70%", left: "90%", size: 44, delay: 0.6, duration: 7 },
  { id: 26, Icon: IconFastAPI, top: "75%", left: "85%", size: 44, delay: 1.5, duration: 8 },
  { id: 27, Icon: IconOpenCV, top: "82%", left: "95%", size: 40, delay: 0.4, duration: 9 },
  { id: 38, Icon: IconPython, top: "85%", left: "88%", size: 44, delay: 0.7, duration: 8 },
  { id: 28, Icon: IconN8N, top: "88%", left: "82%", size: 40, delay: 0.3, duration: 8 },
  { id: 29, Icon: IconMySQL, top: "92%", left: "98%", size: 40, delay: 1.2, duration: 6.5 },
];

// ─── Floating Background Icon with mouse repulsion ──────────────────

function FloatingIcon({ icon: IconDef }: { icon: FloatingIconDef }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(e.clientX - cx, 2) + Math.pow(e.clientY - cy, 2)
        );

        if (distance < 160) {
          const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
          const force = (1 - distance / 160) * 60;
          x.set(-Math.cos(angle) * force);
          y.set(-Math.sin(angle) * force);
        } else {
          x.set(0);
          y.set(0);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      className="absolute"
      style={{ top: IconDef.top, left: IconDef.left, x: springX, y: springY }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 0.08, scale: 1 }}
      transition={{ delay: IconDef.delay, duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        animate={{
          y: [0, -12, 0, 12, 0],
          x: [0, 8, 0, -8, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: IconDef.duration,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      >
        <IconDef.Icon
          width={IconDef.size * 0.65}
          height={IconDef.size * 0.65}
        />
      </motion.div>
    </motion.div>
  );
}

// ─── Logo Cloud Grid — Tech Stack Categories ────────────────────────

type TechCategory = {
  title: string;
  items: string;
  accent: string;
};

const categories: TechCategory[] = [
  {
    title: "Frontend & Data",
    items: "React · Next.js · Supabase · TypeScript · Tailwind · React Native",
    accent: "#61DAFB",
  },
  {
    title: "Backend",
    items: "Python · Node.js · NestJS · FastAPI · REST APIs · RBAC · Postgres RLS",
    accent: "#339933",
  },
  {
    title: "Data & Reporting",
    items: "PostgreSQL · Schema Design · Migrations · SQL Dashboards · MySQL",
    accent: "#336791",
  },
  {
    title: "AI & ML",
    items: "HuggingFace · PyTorch · XLM-RoBERTa · mBERT · LIME · SHAP · OpenCV",
    accent: "#FFD21E",
  },
  {
    title: "AI Tooling",
    items: "Claude · Antigravity · Architecture Review · Security Audit · Debugging",
    accent: "#D97757",
  },
  {
    title: "Cloud & DevOps",
    items: "Vercel · Supabase Edge · Git · GitHub · CI/CD · Cloudinary · n8n · Docker · K8s",
    accent: "#2496ED",
  },
];

function TechCard({
  category,
  index,
  bgHighlight,
}: {
  category: TechCategory;
  index: number;
  bgHighlight?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "relative flex flex-col items-center justify-center px-6 py-8 md:px-8 md:py-10 h-full w-full",
        bgHighlight
          ? "bg-white/[0.04]"
          : "bg-transparent"
      )}
    >
      {/* Category title */}
      <h3
        className={`${spaceGrotesk.className} text-base md:text-xl font-bold tracking-tight mb-3 text-center text-white`}
      >
        {category.title}
      </h3>

      {/* Tech items */}
      <p
        className={`${spaceGrotesk.className} text-xs md:text-[13px] leading-relaxed text-white/90 font-medium text-center`}
      >
        {category.items}
      </p>
    </motion.div>
  );
}

function TechLogoCloud() {
  return (
    <div className="relative grid grid-cols-2 md:grid-cols-3 border border-white/[0.08]">
      {categories.map((category, index) => (
        <div
          key={index}
          className={cn(
            "relative", // For absolute plus icons
            index % 2 === 0 ? "border-r border-white/[0.08]" : "", // Mobile: vertical
            index < 4 ? "border-b border-white/[0.08]" : "", // Mobile: horizontal
            "md:border-r-0 md:border-b-0", // Reset mobile
            index % 3 !== 2 ? "md:border-r md:border-white/[0.08]" : "", // Desktop: vertical
            index < 3 ? "md:border-b md:border-white/[0.08]" : "" // Desktop: horizontal
          )}
        >
          <TechCard category={category} index={index} bgHighlight={index % 2 === 0} />
          
          {/* Mobile Plus: bottom-right of index 0 and 2 */}
          {(index === 0 || index === 2) && (
            <PlusIcon
              className="absolute -right-[11px] -bottom-[11px] z-10 size-[22px] text-white/20 md:hidden"
              strokeWidth={1}
            />
          )}
          {/* Desktop Plus: bottom-right of index 0 and 1 */}
          {(index === 0 || index === 1) && (
            <PlusIcon
              className="absolute -right-[11px] -bottom-[11px] z-10 hidden size-[22px] text-white/20 md:block"
              strokeWidth={1}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Main Tech Stack Section ────────────────────────────────────────

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      id="techstack"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* ── Floating background icons (faded) ── */}
      <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none">
        {floatingIcons.map((icon) => (
          <FloatingIcon key={icon.id} icon={icon} />
        ))}
      </div>

      {/* ── Foreground content ── */}
      <div className="relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span
            className={`${spaceGrotesk.className} text-[11px] tracking-[0.4em] uppercase text-[#c9a55a]/60 block mb-4`}
          >
            Technology
          </span>
          <h2
            className={`${cormorant.className} text-3xl md:text-5xl lg:text-6xl font-light text-white/90`}
          >
            Tech{" "}
            <span className="text-gradient-gold">Stack</span>
          </h2>
          <p
            className={`${spaceGrotesk.className} mt-4 max-w-md mx-auto text-sm text-white/35 leading-relaxed`}
          >
            The tools and technologies I wield to build intelligent,
            scalable solutions.
          </p>
        </motion.div>

        {/* Logo cloud grid */}
        <div className="max-w-3xl mx-auto px-4">
          <TechLogoCloud />
        </div>

        {/* Bottom accent */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <span
            className={`${spaceGrotesk.className} text-[10px] tracking-[0.3em] uppercase text-white/15`}
          >
            Constantly expanding · Always shipping
          </span>
        </motion.div>
      </div>
    </section>
  );
}
