import React from "react";
import { GyeNyame } from "./Adinkra";
import { Phone, MapPin } from "lucide-react";

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const LINKS = [
  { label: "About", id: "about" },
  { label: "What We Do", id: "work" },
  { label: "Power & Authority", id: "adinkra" },
  { label: "The Event", id: "event" },
  { label: "Get Involved", id: "involved" },
  { label: "Contact", id: "contact" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-[rgba(212,175,55,0.15)] bg-[#0A0A0A] px-5 sm:px-8 pt-20 pb-10" data-testid="footer">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-[1.5fr_1fr_1fr] gap-12">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <span className="w-12 h-12 text-[#D4AF37]"><GyeNyame className="w-full h-full" /></span>
              <span className="font-display text-3xl font-black text-[#F5F2EB]">TRU <span className="text-[#D4AF37]">SYDS</span></span>
            </div>
            <p className="text-[#A09C95] max-w-sm leading-relaxed">
              Promoting cultural literacy, storytelling, and artistic excellence through African theatre.
            </p>
          </div>

          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-[#D4AF37] mb-5">Explore</p>
            <ul className="space-y-3">
              {LINKS.map((l) => (
                <li key={l.id}>
                  <button onClick={() => scrollTo(l.id)} data-testid={`footer-${l.id}`} className="text-[#C9C4BB] hover:text-[#D4AF37] transition-colors">{l.label}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-[#D4AF37] mb-5">Reach Us</p>
            <ul className="space-y-4 text-[#C9C4BB]">
              <li className="flex items-start gap-3"><MapPin size={18} className="text-[#D4AF37] mt-0.5 shrink-0" /><span>1196 Deansway Dr,<br />Pataskala, OH 43062</span></li>
              <li className="flex items-center gap-3"><Phone size={18} className="text-[#D4AF37] shrink-0" /><a href="tel:7034755322" className="hover:text-[#D4AF37] transition-colors">703-475-5322</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[rgba(212,175,55,0.12)] flex flex-col sm:flex-row items-center justify-between gap-8 sm:gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
            {/* Company seal. The logo is drawn for white, so it sits on the site's
                own cream token — same treatment as public/og-image.png. */}
            <span
              data-testid="footer-seal"
              className="shrink-0 rounded-2xl bg-[#F5F2EB] ring-1 ring-[#D4AF37]/25 gold-glow p-4"
            >
              <img
                src={`${process.env.PUBLIC_URL}/logo.png`}
                alt=""
                aria-hidden="true"
                width={354}
                height={354}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="block h-16 w-16 sm:h-20 sm:w-20 select-none"
              />
            </span>
            <p className="text-sm text-[#6b665e] text-center sm:text-left">&copy; {new Date().getFullYear()} TRU SYDS LLC. All rights reserved.</p>
          </div>
          <p className="text-sm text-[#6b665e] font-display italic text-center sm:text-right">&ldquo;Empowering Voices. Celebrating Culture. Inspiring Change.&rdquo;</p>
        </div>
      </div>
    </footer>
  );
}
