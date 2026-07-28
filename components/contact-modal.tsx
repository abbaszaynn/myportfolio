"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cormorant, spaceGrotesk } from "@/data/constants/fonts";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        country: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
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
                    message: `Country: ${formData.country || 'Not provided'}\n\nMessage:\n${formData.message}`,
                }),
            });

            const result = await response.json();

            if (result.success) {
                setSubmitted(true);
                setTimeout(() => {
                    setSubmitted(false);
                    onClose();
                    setFormData({ name: "", email: "", country: "", subject: "", message: "" });
                }, 2000);
            } else {
                console.error("Form submission failed:", result);
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Something went wrong. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClasses = `w-full px-4 py-3.5 rounded-lg border border-white/[0.08] bg-white/[0.03] 
      text-white/90 placeholder:text-white/20
      focus:border-[#c9a55a]/40 focus:bg-white/[0.05] focus:ring-1 focus:ring-[#c9a55a]/20
      transition-all duration-300 outline-none text-sm`;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="relative w-full max-w-lg bg-[#111] border border-white/[0.06] rounded-2xl shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="px-8 pt-8 pb-4">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className={`${cormorant.className} text-2xl md:text-3xl font-light text-white/90`}>
                                        Get In <span className="text-gradient-gold">Touch</span>
                                    </h2>
                                    <p className={`${spaceGrotesk.className} text-[11px] tracking-[0.15em] text-white/30 mt-2`}>
                                        I&apos;d love to hear from you.
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full border border-white/[0.06] hover:border-[#c9a55a]/30 hover:bg-white/[0.03] transition-all duration-300 cursor-pointer"
                                >
                                    <X className="w-4 h-4 text-white/40" />
                                </button>
                            </div>
                        </div>

                        {/* Subtle divider */}
                        <div className="mx-8 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-8 space-y-4">
                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <div className="w-16 h-16 rounded-full border border-[#c9a55a]/30 flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-7 h-7 text-[#c9a55a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className={`${spaceGrotesk.className} text-sm text-[#c9a55a]`}>
                                        Message sent successfully
                                    </p>
                                </motion.div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className={`${spaceGrotesk.className} block text-[10px] tracking-[0.2em] uppercase text-white/30 mb-2`}>
                                                Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className={inputClasses}
                                                placeholder="Your name"
                                            />
                                        </div>
                                        <div>
                                            <label className={`${spaceGrotesk.className} block text-[10px] tracking-[0.2em] uppercase text-white/30 mb-2`}>
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className={inputClasses}
                                                placeholder="you@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className={`${spaceGrotesk.className} block text-[10px] tracking-[0.2em] uppercase text-white/30 mb-2`}>
                                                Country
                                            </label>
                                            <input
                                                type="text"
                                                name="country"
                                                value={formData.country}
                                                onChange={handleChange}
                                                className={inputClasses}
                                                placeholder="Your country"
                                            />
                                        </div>
                                        <div>
                                            <label className={`${spaceGrotesk.className} block text-[10px] tracking-[0.2em] uppercase text-white/30 mb-2`}>
                                                Subject *
                                            </label>
                                            <input
                                                type="text"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className={inputClasses}
                                                placeholder="Project inquiry"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className={`${spaceGrotesk.className} block text-[10px] tracking-[0.2em] uppercase text-white/30 mb-2`}>
                                            Message *
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={4}
                                            className={`${inputClasses} resize-none`}
                                            placeholder="Tell me about your project..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-4 mt-2 border border-[#c9a55a]/30 rounded-lg text-[#c9a55a] 
                                          text-[11px] tracking-[0.2em] uppercase font-medium
                                          hover:bg-[#c9a55a]/5 hover:border-[#c9a55a]/50
                                          transition-all duration-300
                                          disabled:opacity-50 disabled:cursor-not-allowed
                                          active:scale-[0.98] cursor-pointer"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Sending...
                                            </span>
                                        ) : (
                                            "Send Message"
                                        )}
                                    </button>
                                </>
                            )}
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
