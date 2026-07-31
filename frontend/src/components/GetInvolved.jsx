import React from "react";
import { motion } from "framer-motion";
import { FadeUp, RevealLine } from "./Reveal";
import { HandCoins, Users2, PenTool, Phone, MapPin, GraduationCap, Handshake } from "lucide-react";

const WAYS = [
  { icon: HandCoins, title: "Donate", desc: "Fund productions, scholarships and youth programs." },
  { icon: Users2, title: "Volunteer", desc: "Lend your time backstage, front-of-house or in outreach." },
  { icon: Handshake, title: "Partner", desc: "Schools, businesses & organizations building culture together." },
  { icon: PenTool, title: "Submit Work", desc: "Playwrights & artists of color \u2014 share your voice." },
];

const OUTREACH = [
  { icon: GraduationCap, title: "Youth Storytelling", desc: "Theatre & storytelling programs that build confidence and heritage." },
  { icon: Users2, title: "Cultural Workshops", desc: "Hands-on African performance craft for all ages." },
  { icon: Handshake, title: "School Partnerships", desc: "Bringing culturally responsive arts into classrooms." },
];

export default function GetInvolved() {
  return (
    <section id="involved" className="relative py-24 md:py-36 px-5 sm:px-8 bg-[#0C0B0A]">
      <div className="max-w-[1400px] mx-auto">
        <FadeUp>
          <p className="flex items-center gap-3 text-xs tracking-[0.4em] uppercase text-[#D4AF37] mb-6">
            <span className="w-10 h-px bg-[#D4AF37]" /> Get Involved
          </p>
        </FadeUp>
        <h2 className="font-display font-bold text-[#F5F2EB] text-4xl sm:text-5xl lg:text-6xl tracking-tight max-w-4xl leading-[1.05]">
          <RevealLine>Stand with the story.</RevealLine>
          <RevealLine delay={0.08} className="italic text-[#D4AF37]">Shape the stage.</RevealLine>
        </h2>

        {/* ways grid */}
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(212,175,55,0.15)] border border-[rgba(212,175,55,0.15)]">
          {WAYS.map((w, i) => {
            const Icon = w.icon;
            return (
              <FadeUp key={w.title} delay={i * 0.05} className="h-full">
                <div className="h-full bg-[#0A0A0A] p-8 hover:bg-[#121010] transition-colors group">
                  <Icon className="text-[#D4AF37] mb-5 group-hover:scale-110 transition-transform origin-left" size={28} strokeWidth={1.4} />
                  <h3 className="font-display text-xl font-bold text-[#F5F2EB] mb-2">{w.title}</h3>
                  <p className="text-[#A09C95] text-sm leading-relaxed">{w.desc}</p>
                </div>
              </FadeUp>
            );
          })}
        </div>

        {/* support CTA */}
        <FadeUp>
          <div className="mt-8 border border-[rgba(212,175,55,0.2)] bg-gradient-to-br from-[#121010] to-[#0A0A0A] p-8 md:p-12 rounded-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-[#F5F2EB] mb-3">Want to support or collaborate?</h3>
              <p className="text-[#A09C95] leading-relaxed">
                Every gift, partnership and volunteer keeps Black theatre living and reaching the next generation. Reach out and let&rsquo;s talk about how you can be part of the story.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <motion.a
                whileTap={{ scale: 0.98 }}
                href="tel:7034755322"
                data-testid="involved-call-btn"
                className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-black font-semibold px-7 py-4 rounded-full hover:bg-[#E5B94E] transition-colors"
              >
                <Phone size={18} /> 703-475-5322
              </motion.a>
              <a
                href="https://maps.google.com/?q=1196+Deansway+Dr+Pataskala+OH+43062"
                target="_blank" rel="noreferrer"
                data-testid="involved-directions-btn"
                className="inline-flex items-center justify-center gap-2 border border-[#D4AF37]/60 text-[#D4AF37] px-7 py-4 rounded-full hover:bg-[#D4AF37]/10 transition-colors"
              >
                <MapPin size={18} /> Visit Us
              </a>
            </div>
          </div>
        </FadeUp>

        {/* Education & Outreach */}
        <div className="mt-24">
          <FadeUp>
            <p className="flex items-center gap-3 text-xs tracking-[0.4em] uppercase text-[#D4AF37] mb-6">
              <span className="w-10 h-px bg-[#D4AF37]" /> Education &amp; Outreach
            </p>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-[#F5F2EB] mb-12 max-w-2xl">Inspiring young people to embrace community, heritage &amp; nature.</h3>
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-6">
            {OUTREACH.map((o, i) => {
              const Icon = o.icon;
              return (
                <FadeUp key={o.title} delay={i * 0.06}>
                  <div className="border border-[rgba(212,175,55,0.18)] p-8 bg-[#0A0A0A] hover:border-[#D4AF37]/50 transition-colors h-full">
                    <Icon className="text-[#D4AF37] mb-5" size={30} strokeWidth={1.3} />
                    <h4 className="font-display text-xl font-bold text-[#F5F2EB] mb-2">{o.title}</h4>
                    <p className="text-[#A09C95] leading-relaxed">{o.desc}</p>
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
