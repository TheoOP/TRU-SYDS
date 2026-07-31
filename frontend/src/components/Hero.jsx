import React from "react";
import { motion } from "framer-motion";
import { MaskLines } from "./Reveal";
import { Adinkrahene } from "./Adinkra";
import { ArrowDown } from "lucide-react";

const Hero3D = React.lazy(() => import("./Hero3D"));

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Hero() {
  return (
    <section id="top" className="relative h-[100svh] w-full overflow-hidden grain">
      {/* 3D stage */}
      <div className="absolute inset-0 z-0">
        <React.Suspense fallback={<div className="absolute inset-0 bg-[#0A0A0A]" />}>
          <Hero3D />
        </React.Suspense>
      </div>

      {/* vignette + gradient for legibility */}
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 32%, transparent 22%, rgba(10,10,10,0.45) 72%), linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, transparent 20%, rgba(10,10,10,0.4) 42%, rgba(10,10,10,0.86) 64%, #0A0A0A 90%)" }} />

      {/* rotating adinkra watermark */}
      <motion.div
        className="absolute z-10 -right-24 top-1/2 -translate-y-1/2 text-[#D4AF37]/[0.06] w-[70vh] h-[70vh] pointer-events-none hidden md:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        <Adinkrahene className="w-full h-full" />
      </motion.div>

      {/* content */}
      <div className="relative z-20 h-full max-w-[1400px] mx-auto px-5 sm:px-8 flex flex-col justify-end pb-20 md:pb-28">
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 1 }}
          className="flex items-center gap-3 text-[11px] sm:text-xs tracking-[0.45em] uppercase text-[#D4AF37] mb-5"
        >
          <span className="w-10 h-px bg-[#D4AF37]" /> African Theatre Arts
        </motion.p>

        <h1 className="font-display font-black text-[#F5F2EB] tracking-tighter leading-[0.86] text-6xl sm:text-7xl md:text-8xl lg:text-[8.5vw] [text-shadow:0_2px_40px_rgba(0,0,0,0.65)]">
          <MaskLines lines={["Empowering Voices."]} delay={0.5} />
          <MaskLines lines={["Celebrating Culture."]} delay={0.68} className="text-[#D4AF37]" />
          <span className="italic font-medium">
            <MaskLines lines={["Inspiring Change."]} delay={0.86} />
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.9 }}
          className="mt-8 flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-10 max-w-4xl"
        >
          <p className="text-base sm:text-lg text-[#A09C95] leading-relaxed max-w-md">
            An African theatre arts organization uplifting African and African American stories through powerful stage &amp; screen performance.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => scrollTo("event")}
              data-testid="hero-tickets-btn"
              className="bg-[#D4AF37] text-black font-semibold px-7 py-3.5 rounded-full hover:bg-[#E5B94E] transition-colors"
            >
              Upcoming Show
            </button>
            <button
              onClick={() => scrollTo("about")}
              data-testid="hero-about-btn"
              className="border border-[#D4AF37]/60 text-[#D4AF37] px-7 py-3.5 rounded-full hover:bg-[#D4AF37]/10 transition-colors"
            >
              Learn About Us
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-[#A09C95] flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
