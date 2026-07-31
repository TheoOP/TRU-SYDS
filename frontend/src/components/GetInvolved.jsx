import React, { useState } from "react";
import { motion } from "framer-motion";
import { FadeUp, RevealLine } from "./Reveal";
import { startCheckout, subscribeNewsletter } from "../lib/api";
import { Heart, HandCoins, Users2, PenTool, Loader2, Mail, GraduationCap, Handshake } from "lucide-react";
import { toast } from "sonner";

const TIERS = [
  { key: "donate_25", amount: 25 },
  { key: "donate_50", amount: 50 },
  { key: "donate_100", amount: 100, popular: true },
  { key: "donate_250", amount: 250 },
];

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
  const [donating, setDonating] = useState(null);
  const [email, setEmail] = useState("");
  const [subLoading, setSubLoading] = useState(false);

  const donate = async (tier) => {
    setDonating(tier.key);
    try {
      const { checkout_url } = await startCheckout(tier.key, 1);
      window.location.href = checkout_url;
    } catch {
      toast.error("Could not start donation checkout.");
      setDonating(null);
    }
  };

  const subscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubLoading(true);
    try {
      const { data } = await subscribeNewsletter(email);
      toast.success(data.already_subscribed ? "You're already on the list \u2014 thank you!" : "Welcome to the TRU SYDS circle.");
      setEmail("");
    } catch {
      toast.error("Please enter a valid email.");
    } finally {
      setSubLoading(false);
    }
  };

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

        {/* donation + newsletter */}
        <div className="mt-8 grid lg:grid-cols-[1.3fr_1fr] gap-6">
          {/* donate */}
          <FadeUp className="h-full">
            <div className="h-full border border-[rgba(212,175,55,0.2)] bg-gradient-to-br from-[#121010] to-[#0A0A0A] p-8 md:p-10 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <Heart className="text-[#D4AF37]" size={22} fill="currentColor" />
                <h3 className="font-display text-2xl md:text-3xl font-bold text-[#F5F2EB]">Make a Donation</h3>
              </div>
              <p className="text-[#A09C95] mb-8 max-w-md">Every gift keeps Black theatre living, breathing and reaching the next generation.</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {TIERS.map((t) => (
                  <button
                    key={t.key}
                    data-testid={`donate-${t.amount}`}
                    onClick={() => donate(t)}
                    disabled={donating !== null}
                    className={`relative py-6 rounded-xl border font-display text-2xl font-bold transition-all disabled:opacity-60 ${
                      t.popular ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]" : "border-[rgba(212,175,55,0.25)] text-[#F5F2EB] hover:border-[#D4AF37] hover:text-[#D4AF37]"
                    }`}
                  >
                    {donating === t.key ? <Loader2 className="animate-spin mx-auto" size={22} /> : <>${t.amount}</>}
                    {t.popular && <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[9px] tracking-widest uppercase bg-[#D4AF37] text-black px-2 py-0.5 rounded-full">Popular</span>}
                  </button>
                ))}
              </div>
              <p className="text-xs text-[#A09C95] mt-4">Secure one-time donation via Stripe.</p>
            </div>
          </FadeUp>

          {/* newsletter */}
          <FadeUp delay={0.1} className="h-full">
            <div className="h-full border border-[rgba(212,175,55,0.2)] bg-[#121010] p-8 md:p-10 rounded-2xl flex flex-col justify-center">
              <Mail className="text-[#D4AF37] mb-5" size={26} strokeWidth={1.5} />
              <h3 className="font-display text-2xl md:text-3xl font-bold text-[#F5F2EB] mb-2">Join the Circle</h3>
              <p className="text-[#A09C95] mb-6">Show announcements, episode drops & behind-the-curtain stories.</p>
              <form onSubmit={subscribe} className="space-y-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  data-testid="newsletter-email"
                  className="w-full bg-[#0A0A0A] border border-[rgba(212,175,55,0.25)] rounded-full px-5 py-3.5 text-[#F5F2EB] placeholder:text-[#6b665e] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors"
                />
                <button
                  type="submit"
                  disabled={subLoading}
                  data-testid="newsletter-submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#D4AF37] text-black font-semibold py-3.5 rounded-full hover:bg-[#E5B94E] transition-colors disabled:opacity-60"
                >
                  {subLoading ? <Loader2 className="animate-spin" size={18} /> : null}
                  Subscribe
                </button>
              </form>
            </div>
          </FadeUp>
        </div>

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
