import React from "react";
import { motion } from "framer-motion";
import { FadeUp, RevealLine } from "./Reveal";
import { MapPin, Phone, ArrowUpRight } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-36 px-5 sm:px-8">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
        {/* left */}
        <div>
          <FadeUp>
            <p className="flex items-center gap-3 text-xs tracking-[0.4em] uppercase text-[#D4AF37] mb-6">
              <span className="w-10 h-px bg-[#D4AF37]" /> Contact
            </p>
          </FadeUp>
          <h2 className="font-display font-bold text-[#F5F2EB] text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.02]">
            <RevealLine>Let&rsquo;s make</RevealLine>
            <RevealLine delay={0.08} className="italic text-[#D4AF37]">something timeless.</RevealLine>
          </h2>
          <FadeUp delay={0.1}>
            <p className="mt-6 text-[#A09C95] text-lg max-w-md leading-relaxed">
              Booking, partnerships, press or a story to tell &mdash; give us a call or stop by the studio. We&rsquo;d love to hear from you.
            </p>
          </FadeUp>
        </div>

        {/* contact cards */}
        <div className="space-y-5">
          <FadeUp delay={0.1}>
            <a
              href="tel:7034755322"
              data-testid="contact-phone"
              className="group flex items-center justify-between gap-4 border border-[rgba(212,175,55,0.22)] bg-[#0C0B0A] rounded-2xl p-7 md:p-8 hover:border-[#D4AF37]/60 transition-colors"
            >
              <div className="flex items-start gap-5">
                <span className="w-14 h-14 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0 group-hover:bg-[#D4AF37]/10 transition-colors"><Phone size={22} /></span>
                <span>
                  <span className="block text-xs tracking-[0.2em] uppercase text-[#A09C95] mb-1">Tickets &amp; Enquiries</span>
                  <span className="font-display text-2xl md:text-3xl text-[#F5F2EB] group-hover:text-[#D4AF37] transition-colors">703-475-5322</span>
                </span>
              </div>
              <ArrowUpRight className="text-[#A09C95] group-hover:text-[#D4AF37] transition-colors" size={24} />
            </a>
          </FadeUp>

          <FadeUp delay={0.18}>
            <a
              href="https://maps.google.com/?q=1196+Deansway+Dr+Pataskala+OH+43062"
              target="_blank" rel="noreferrer"
              data-testid="contact-address"
              className="group flex items-center justify-between gap-4 border border-[rgba(212,175,55,0.22)] bg-[#0C0B0A] rounded-2xl p-7 md:p-8 hover:border-[#D4AF37]/60 transition-colors"
            >
              <div className="flex items-start gap-5">
                <span className="w-14 h-14 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0 group-hover:bg-[#D4AF37]/10 transition-colors"><MapPin size={22} /></span>
                <span>
                  <span className="block text-xs tracking-[0.2em] uppercase text-[#A09C95] mb-1">Studio</span>
                  <span className="font-display text-2xl md:text-3xl text-[#F5F2EB] group-hover:text-[#D4AF37] transition-colors leading-tight">1196 Deansway Dr,<br />Pataskala, OH 43062</span>
                </span>
              </div>
              <ArrowUpRight className="text-[#A09C95] group-hover:text-[#D4AF37] transition-colors" size={24} />
            </a>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
