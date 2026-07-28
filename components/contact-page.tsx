"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cormorant, spaceGrotesk } from "@/data/constants/fonts";
import { socialMedia } from "@/data/index";
import { ArrowLeft } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    country: "",
    subject: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "d92b46d2-9ce5-4632-b3c5-abc5781bf34a",
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: `City: ${formData.city}\nCountry: ${formData.country}\nService: ${formData.service}\n\nMessage:\n${formData.message}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: "", email: "", city: "", country: "", subject: "", service: "", message: "" });
        }, 3000);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = `w-full py-4 bg-transparent border-b border-black/20 text-black placeholder-black/40 focus:outline-none focus:border-[#c9a55a] transition-all duration-300 font-sans text-sm rounded-none`;

  return (
    <div className="min-h-screen relative flex flex-col pt-10 pb-24 px-6 md:px-12 bg-[#EFEBE6] text-[#0a0a0a]">
      {/* Top Bar */}
      <div className="w-full flex justify-between items-center z-50">
        <Link href="/">
          <h2 className="font-sans text-sm md:text-base font-semibold tracking-widest text-black lowercase">
            abbas zayn
          </h2>
        </Link>
        <Link href="/" className="font-sans text-[10px] md:text-[11px] uppercase font-semibold tracking-[0.2em] text-black/70 hover:text-black transition-colors flex items-center gap-2">
          <span>BACK</span>
          <div className="w-4 h-4 border border-black flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-black" />
          </div>
        </Link>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 w-full max-w-3xl mx-auto flex flex-col items-center mt-12 md:mt-20">
        
        {/* Header Section */}
        <motion.div 
          className="text-center w-full mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={`${cormorant.className} text-5xl md:text-7xl font-light tracking-[0.1em] text-black mb-8`}>
            LET&apos;S CONNECT
          </h1>
          
          {/* Inline Social Icons */}
          <div className="flex items-center justify-center gap-8 md:gap-12 mt-6">
            {socialMedia.map((social, i) => (
              <motion.a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-14 h-14 rounded-full border border-black/10 bg-[#EFEBE6] shadow-sm text-2xl text-black/60 hover:text-[#c9a55a] hover:border-[#c9a55a]/50 hover:shadow-[0_0_20px_rgba(201,165,90,0.15)] transition-all"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: [0, -6, 0] }}
                transition={{ 
                  opacity: { duration: 0.8, delay: 0.2 + i * 0.1 },
                  y: { 
                    duration: 4, 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    ease: "easeInOut",
                    delay: i * 0.4
                  } 
                }}
              >
                {social.img}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Intro Text */}
        <motion.div 
          className="text-center w-full mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className={`${spaceGrotesk.className} text-sm md:text-base text-black/70 leading-relaxed max-w-2xl mx-auto`}>
            I&apos;m an AI Automation Engineer & Full-Stack Developer specializing in scalable AI systems, cutting-edge web development, and intelligent digital experiences. Reach out via any platform above, or use the form below to detail your project.
          </p>
        </motion.div>

        {/* The Form */}
        <motion.div 
          className="w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {submitted ? (
            <div className="text-center py-24">
              <h3 className={`${cormorant.className} text-4xl text-black mb-4`}>Message Sent.</h3>
              <p className={`${spaceGrotesk.className} text-black/60`}>I will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
              <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                <input type="text" name="name" placeholder="Your Name" required value={formData.name} onChange={handleChange} className={inputClasses} />
                <input type="email" name="email" placeholder="Your Email" required value={formData.email} onChange={handleChange} className={inputClasses} />
              </div>
              <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                <input type="text" name="city" placeholder="City" required value={formData.city} onChange={handleChange} className={inputClasses} />
                <input type="text" name="country" placeholder="Country" required value={formData.country} onChange={handleChange} className={inputClasses} />
              </div>
              
              <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                <select 
                  name="service" 
                  required 
                  value={formData.service} 
                  onChange={handleChange} 
                  className={`${inputClasses} appearance-none cursor-pointer`}
                >
                  <option value="" disabled className="text-black/40">Domain / Services</option>
                  <option value="Web App" className="text-black bg-[#EFEBE6]">Web App</option>
                  <option value="Mobile App" className="text-black bg-[#EFEBE6]">Mobile App</option>
                  <option value="Website" className="text-black bg-[#EFEBE6]">Website</option>
                  <option value="AI/ML/LLM" className="text-black bg-[#EFEBE6]">AI/ML/ LLM</option>
                  <option value="Automation" className="text-black bg-[#EFEBE6]">Automation</option>
                  <option value="Mines & minerals" className="text-black bg-[#EFEBE6]">Mines & minerals</option>
                </select>
                <input type="text" name="subject" placeholder="Subject" required value={formData.subject} onChange={handleChange} className={inputClasses} />
              </div>

              <textarea name="message" placeholder="Your Message" required rows={4} value={formData.message} onChange={handleChange} className={`${inputClasses} resize-none mt-4`} />
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-12 uppercase text-[11px] tracking-[0.3em] font-bold
                  border border-black/80 rounded-none py-5
                  text-black bg-transparent
                  transition-all duration-500 ease-out
                  hover:bg-black hover:text-white
                  active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
