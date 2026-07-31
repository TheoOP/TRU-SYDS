import React from "react";
import { FadeUp, RevealLine } from "./Reveal";
import { Users, Handshake, Shield, Sparkles, Award, Heart } from "lucide-react";

const CHAPTERS = [
  {
    no: "01",
    title: "Our Mission",
    body: "TRU SYDS is a mission-driven African theatre arts organization committed to promoting and celebrating African and African American history, culture, and storytelling \u2014 telling authentic stories rooted in the Black experience, and creating safe, empowering spaces for artists of color to express themselves freely and fully.",
  },
  {
    no: "02",
    title: "Our Vision",
    body: "To be a premier professional theatre that produces socially impactful works while offering innovative, culturally responsive arts education programs for learners of all ages.",
  },
  {
    no: "03",
    title: "Our Craft",
    body: "We produce original, culturally relevant theatre; preserve traditional African arts inspired by Ghanaian folklore, history and oral tradition; and foster cross-cultural dialogue that deepens awareness of our shared \u2014 and unshared \u2014 histories.",
  },
];

const VALUES = [
  { icon: Users, name: "Inclusion", desc: "We celebrate and respect diversity within our organization and the communities we serve." },
  { icon: Handshake, name: "Collaboration", desc: "We build strong partnerships to create shared success." },
  { icon: Shield, name: "Integrity", desc: "We uphold high moral standards in all aspects of our work." },
  { icon: Sparkles, name: "Joy", desc: "We bring delight and connection to our community through the arts." },
  { icon: Award, name: "Excellence", desc: "We strive for the highest quality in every performance and partnership." },
  { icon: Heart, name: "Impact", desc: "We make meaningful contributions to the lives and communities we uplift." },
];

export default function Manifesto() {
  return (
    <section id="about" className="relative py-24 md:py-40 px-5 sm:px-8">
      <div className="max-w-[1400px] mx-auto">
        <FadeUp>
          <p className="flex items-center gap-3 text-xs tracking-[0.4em] uppercase text-[#D4AF37] mb-6">
            <span className="w-10 h-px bg-[#D4AF37]" /> About TRU SYDS
          </p>
        </FadeUp>
        <h2 className="font-display font-bold text-[#F5F2EB] text-4xl sm:text-5xl lg:text-6xl tracking-tight max-w-4xl leading-[1.05]">
          <RevealLine>The legacy of Black theatre,</RevealLine>
          <RevealLine delay={0.08} className="italic text-[#A09C95]">told with reverence &amp; fire.</RevealLine>
        </h2>

        <div className="mt-20 space-y-px">
          {CHAPTERS.map((c) => (
            <FadeUp key={c.no}>
              <div className="group grid md:grid-cols-[140px_1fr] gap-6 md:gap-12 py-10 md:py-14 border-t border-[rgba(212,175,55,0.15)] hover:border-[#D4AF37]/60 transition-colors">
                <span className="font-display text-6xl md:text-7xl font-black text-transparent [-webkit-text-stroke:1px_rgba(212,175,55,0.5)] group-hover:[-webkit-text-stroke:1px_#D4AF37] transition-all">
                  {c.no}
                </span>
                <div>
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-[#F5F2EB] mb-4">{c.title}</h3>
                  <p className="text-base sm:text-lg text-[#A09C95] leading-relaxed max-w-2xl">{c.body}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Core Values */}
        <div className="mt-28">
          <FadeUp>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-[#F5F2EB] mb-3">Core Values</h3>
            <p className="text-[#A09C95] mb-12 max-w-xl">The six principles that ground every performance, program and partnership.</p>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[rgba(212,175,55,0.15)] border border-[rgba(212,175,55,0.15)]">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <FadeUp key={v.name} delay={i * 0.05} className="h-full">
                  <div className="h-full bg-[#0A0A0A] p-8 md:p-10 hover:bg-[#121010] transition-colors group" data-testid={`value-${v.name.toLowerCase()}`}>
                    <Icon className="text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform origin-left" size={30} strokeWidth={1.4} />
                    <h4 className="font-display text-2xl font-bold text-[#F5F2EB] mb-3">{v.name}</h4>
                    <p className="text-[#A09C95] leading-relaxed">{v.desc}</p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
