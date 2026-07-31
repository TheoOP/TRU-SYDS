import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp, RevealLine } from "./Reveal";
import { SYMBOLS } from "./Adinkra";

export default function AdinkraSection() {
  const [active, setActive] = useState(0);
  const sym = SYMBOLS[active];
  return (
    <section id="adinkra" className="relative py-24 md:py-40 px-5 sm:px-8 overflow-hidden">
      {/* faint background symbol */}
      <div className="absolute -left-40 top-10 w-[60vw] h-[60vw] text-[#D4AF37]/[0.03] pointer-events-none">
        <sym.Comp className="w-full h-full" />
      </div>

      <div className="max-w-[1400px] mx-auto relative">
        <FadeUp>
          <p className="flex items-center gap-3 text-xs tracking-[0.4em] uppercase text-[#D4AF37] mb-6">
            <span className="w-10 h-px bg-[#D4AF37]" /> Symbols of Power &amp; Authority
          </p>
        </FadeUp>
        <h2 className="font-display font-bold text-[#F5F2EB] text-4xl sm:text-5xl lg:text-6xl tracking-tight max-w-4xl leading-[1.05]">
          <RevealLine>Adinkra \u2014 the ancient</RevealLine>
          <RevealLine delay={0.08} className="italic text-[#D4AF37]">language of leadership.</RevealLine>
        </h2>
        <FadeUp delay={0.1}>
          <p className="mt-6 text-[#A09C95] text-lg max-w-2xl leading-relaxed">
            Woven through Akan culture, Adinkra symbols carry proverbs of strength, sovereignty and the divine. We carry them into every production.
          </p>
        </FadeUp>

        <div className="mt-16 grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-20 items-center">
          {/* symbol selector list */}
          <div className="space-y-px">
            {SYMBOLS.map((s, i) => (
              <button
                key={s.key}
                data-testid={`adinkra-${s.key}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`w-full text-left grid grid-cols-[64px_1fr] items-center gap-5 py-6 border-t border-[rgba(212,175,55,0.15)] transition-colors ${
                  active === i ? "text-[#F5F2EB]" : "text-[#7c776f] hover:text-[#C9C4BB]"
                }`}
              >
                <span className={`w-14 h-14 transition-colors ${active === i ? "text-[#D4AF37]" : "text-[#5a564f]"}`}>
                  <s.Comp className="w-full h-full" />
                </span>
                <span>
                  <span className="font-display text-2xl md:text-3xl font-bold block">{s.name}</span>
                  <span className="text-sm text-[#A09C95]">{s.meaning}</span>
                </span>
              </button>
            ))}
          </div>

          {/* active detail */}
          <div className="relative min-h-[380px] flex items-center justify-center border border-[rgba(212,175,55,0.18)] bg-[#0C0B0A] p-10 md:p-14 gold-glow">
            <AnimatePresence mode="wait">
              <motion.div
                key={sym.key}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-center flex flex-col items-center"
              >
                <motion.div
                  animate={{ rotate: [0, 4, 0, -4, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="w-32 h-32 md:w-44 md:h-44 text-[#D4AF37] mb-8 drop-shadow-[0_0_25px_rgba(212,175,55,0.35)]"
                >
                  <sym.Comp className="w-full h-full" />
                </motion.div>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-[#F5F2EB]">{sym.name}</h3>
                <p className="text-[#D4AF37] text-sm tracking-[0.2em] uppercase mt-2 mb-5">{sym.meaning}</p>
                <p className="text-[#A09C95] leading-relaxed max-w-md">{sym.desc}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
