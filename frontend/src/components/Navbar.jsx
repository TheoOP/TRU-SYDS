import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "About", id: "about" },
  { label: "What We Do", id: "work" },
  { label: "Power & Authority", id: "adinkra" },
  { label: "The Event", id: "event" },
  { label: "Get Involved", id: "involved" },
  { label: "Contact", id: "contact" },
];

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        data-testid="navbar"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled ? "bg-black/70 backdrop-blur-xl border-b border-[rgba(212,175,55,0.12)]" : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between">
          <button
            onClick={() => scrollTo("top")}
            data-testid="logo-btn"
            className="flex flex-col items-start leading-none group"
          >
            <span className="font-display text-xl sm:text-2xl font-black tracking-tight text-[#F5F2EB]">
              TRU <span className="text-[#D4AF37]">SYDS</span>
            </span>
            <span className="text-[9px] tracking-[0.4em] text-[#A09C95] uppercase mt-0.5">Theatre Arts</span>
          </button>

          <nav className="hidden lg:flex items-center gap-9">
            {LINKS.map((l) => (
              <button
                key={l.id}
                data-testid={`nav-${l.id}`}
                onClick={() => scrollTo(l.id)}
                className="link-underline text-sm tracking-wide text-[#C9C4BB] hover:text-[#F5F2EB] transition-colors"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo("event")}
              data-testid="nav-tickets-btn"
              className="hidden sm:inline-flex items-center bg-[#D4AF37] text-black text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#E5B94E] transition-colors"
            >
              Get Tickets
            </button>
            <button
              onClick={() => setOpen(true)}
              data-testid="menu-open-btn"
              className="lg:hidden text-[#F5F2EB] p-2"
              aria-label="Open menu"
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-[#0A0A0A] flex flex-col overflow-hidden"
            data-testid="mobile-menu"
          >
            {/* Mobile gets its brand moment here rather than in the 72px bar, where
                the film-strip detail would alias away. `screen` on #0A0A0A drops the
                black, leaving the mask faces ghosted behind the links. */}
            <img
              src={`${process.env.PUBLIC_URL}/logo.png`}
              alt=""
              aria-hidden="true"
              draggable={false}
              className="pointer-events-none select-none absolute -bottom-12 -right-16 w-[85vw] max-w-[420px] opacity-[0.16] saturate-[0.5] mix-blend-screen"
            />
            <div className="relative h-[72px] flex items-center justify-between px-5">
              <span className="font-display text-2xl font-black text-[#F5F2EB]">TRU <span className="text-[#D4AF37]">SYDS</span></span>
              <button onClick={() => setOpen(false)} data-testid="menu-close-btn" className="text-[#F5F2EB] p-2" aria-label="Close menu">
                <X size={28} />
              </button>
            </div>
            <nav className="relative flex-1 flex flex-col justify-center gap-2 px-8">
              {LINKS.map((l, i) => (
                <motion.button
                  key={l.id}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.08 * i }}
                  onClick={() => { scrollTo(l.id); setOpen(false); }}
                  data-testid={`mnav-${l.id}`}
                  className="font-display text-4xl font-bold text-left text-[#F5F2EB] hover:text-[#D4AF37] transition-colors py-2"
                >
                  {l.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
