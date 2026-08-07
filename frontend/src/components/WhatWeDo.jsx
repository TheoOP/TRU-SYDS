import React, { useState } from "react";
import { motion } from "framer-motion";
import { FadeUp, RevealLine } from "./Reveal";
import { Play, Clapperboard, Theater } from "lucide-react";

const IMG = {
  stage1: "https://images.unsplash.com/photo-1503095396549-807759245b35?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjB0aGVhdHJlJTIwcGxheSUyMGFjdG9ycyUyMHN0YWdlJTIwZGFya3xlbnwwfHx8fDE3ODU0NjIxODV8MA&ixlib=rb-4.1.0&q=85",
  stage2: "https://images.unsplash.com/photo-1630050525402-06c617847d27?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHw0fHxjaW5lbWF0aWMlMjB0aGVhdHJlJTIwcGxheSUyMGFjdG9ycyUyMHN0YWdlJTIwZGFya3xlbnwwfHx8fDE3ODU0NjIxODV8MA&ixlib=rb-4.1.0&q=85",
  arts: "https://images.unsplash.com/photo-1722481744477-d0b0bb2bbba2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjh8MHwxfHNlYXJjaHwzfHxhZnJpY2FuJTIwdGhlYXRlciUyMHBlcmZvcm1hbmNlfGVufDB8fHx8MTc4NTQ2MjE3NHww&ixlib=rb-4.1.0&q=85",
  video: "https://images.unsplash.com/photo-1588928781379-c355ab3edc9b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwyfHxjaW5lbWF0aWMlMjB0aGVhdHJlJTIwcGxheSUyMGFjdG9ycyUyMHN0YWdlJTIwZGFya3xlbnwwfHx8fDE3ODU0NjIxODV8MA&ixlib=rb-4.1.0&q=85",
};

const STAGE = [
  { title: "In the Heart of the Cross", tag: "Now Booking", img: IMG.stage1, desc: "A powerful story of faith, sacrifice and redemption \u2014 our flagship 2026 stage play." },
  { title: "Roots & Oral Tradition", tag: "Repertory", img: IMG.arts, desc: "Original works inspired by Ghanaian folklore, history and the griot storytelling lineage." },
  { title: "Voices of the Diaspora", tag: "In Development", img: IMG.stage2, desc: "New writing from local, racially and culturally diverse playwrights of color." },
];

const EPISODES = [
  { title: "The First Light", ep: "EP 01", len: "12 min" },
  { title: "Ancestral Ground", ep: "EP 02", len: "09 min" },
  { title: "The Drum Speaks", ep: "EP 03", len: "14 min" },
  { title: "Crossroads", ep: "EP 04", len: "11 min" },
];

export default function WhatWeDo() {
  const [tab, setTab] = useState("stage");
  return (
    <section id="work" className="relative py-24 md:py-36 px-5 sm:px-8 bg-[#0C0B0A] overflow-hidden">
      {/* Logo as section watermark. On #0C0B0A, `screen` blending drops every black
          pixel — strips, drop shadow, and the baked "TRU SYDS LLC" — leaving only
          the two mask faces and the sprocket perforations. Mirrors the Hero's
          rotating Adinkrahene. Desktop only: at 360px there is no free column. */}
      <motion.img
        src={`${process.env.PUBLIC_URL}/logo.png`}
        alt=""
        aria-hidden="true"
        draggable={false}
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none select-none absolute z-0 hidden md:block -right-24 lg:-right-32 top-28 lg:top-36 w-[46vw] max-w-[620px] opacity-[0.13] saturate-[0.55] mix-blend-screen"
      />
      <div className="max-w-[1400px] mx-auto relative">
        <FadeUp>
          <p className="flex items-center gap-3 text-xs tracking-[0.4em] uppercase text-[#D4AF37] mb-6">
            <span className="w-10 h-px bg-[#D4AF37]" /> What We Do
          </p>
        </FadeUp>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <h2 className="font-display font-bold text-[#F5F2EB] text-4xl sm:text-5xl lg:text-6xl tracking-tight max-w-3xl leading-[1.05]">
            <RevealLine>Two stages.</RevealLine>
            <RevealLine delay={0.08} className="italic text-[#D4AF37]">One living tradition.</RevealLine>
          </h2>
          {/* tab switch */}
          <div className="inline-flex p-1 rounded-full border border-[rgba(212,175,55,0.25)] bg-black/40 self-start">
            {[
              { k: "stage", label: "Stage", Icon: Theater },
              { k: "video", label: "Short Episodes", Icon: Clapperboard },
            ].map(({ k, label, Icon }) => (
              <button
                key={k}
                data-testid={`tab-${k}`}
                onClick={() => setTab(k)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  tab === k ? "bg-[#D4AF37] text-black" : "text-[#C9C4BB] hover:text-white"
                }`}
              >
                <Icon size={16} /> {label}
              </button>
            ))}
          </div>
        </div>

        {/* STAGE */}
        {tab === "stage" && (
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {STAGE.map((s, i) => (
              <FadeUp key={s.title} delay={i * 0.08} className={i === 0 ? "lg:col-span-1 md:col-span-2" : ""}>
                <div className="group relative overflow-hidden clip-frame border border-[rgba(212,175,55,0.18)] h-full" data-testid={`stage-card-${i}`}>
                  <div className="relative h-72 overflow-hidden">
                    <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    <span className="absolute top-4 left-4 text-[10px] tracking-[0.25em] uppercase bg-[#7E121D] text-[#F5F2EB] px-3 py-1.5">{s.tag}</span>
                  </div>
                  <div className="p-7 bg-[#0A0A0A]">
                    <h3 className="font-display text-2xl font-bold text-[#F5F2EB] mb-2">{s.title}</h3>
                    <p className="text-[#A09C95] leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        )}

        {/* VIDEO */}
        {tab === "video" && (
          <div className="mt-16">
            <FadeUp>
              <p className="text-[#A09C95] max-w-2xl mb-10">Bite-sized cinematic drama for the screen. Our short-episode series carries the theatre online — new drops coming soon.</p>
            </FadeUp>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {EPISODES.map((e, i) => (
                <FadeUp key={e.ep} delay={i * 0.06}>
                  <div className="group relative overflow-hidden border border-[rgba(212,175,55,0.18)] aspect-[3/4]" data-testid={`episode-card-${i}`}>
                    <img src={IMG.video} alt={e.title} className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-all duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <motion.div
                      whileHover={{ scale: 1.12 }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-[#D4AF37] bg-black/40 backdrop-blur flex items-center justify-center text-[#D4AF37]"
                    >
                      <Play size={20} fill="currentColor" />
                    </motion.div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="flex items-center justify-between text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] mb-1">
                        <span>{e.ep}</span><span>{e.len}</span>
                      </div>
                      <h4 className="font-display text-xl font-bold text-[#F5F2EB]">{e.title}</h4>
                    </div>
                    <span className="absolute top-4 right-4 text-[9px] tracking-[0.2em] uppercase bg-black/60 border border-[rgba(212,175,55,0.3)] text-[#D4AF37] px-2.5 py-1">Coming Soon</span>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
