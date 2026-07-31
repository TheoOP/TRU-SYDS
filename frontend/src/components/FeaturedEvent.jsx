import React, { useState } from "react";
import { motion } from "framer-motion";
import { FadeUp, RevealLine } from "./Reveal";
import { startCheckout } from "../lib/api";
import { Calendar, MapPin, Clock, Ticket, Minus, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

const EVENT_IMG = "https://images.unsplash.com/photo-1674056982817-4f69b8352103?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MDV8MHwxfHNlYXJjaHwyfHxjaW5lbWF0aWMlMjBnbG93aW5nJTIwY3Jvc3MlMjBzdGFnZXxlbnwwfHx8fDE3ODU0NjIxNzV8MA&ixlib=rb-4.1.0&q=85";

export default function FeaturedEvent() {
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);

  const buy = async () => {
    setLoading(true);
    try {
      const { checkout_url } = await startCheckout("ticket_hotc", qty);
      window.location.href = checkout_url;
    } catch (e) {
      toast.error("Could not start checkout. Please try again.");
      setLoading(false);
    }
  };

  return (
    <section id="event" className="relative py-24 md:py-36 px-5 sm:px-8 bg-[#7E121D] overflow-hidden">
      {/* dark cinematic overlay */}
      <div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(circle at 70% 20%, rgba(212,175,55,0.35), transparent 55%), linear-gradient(to bottom, rgba(10,10,10,0.5), rgba(10,10,10,0.85))" }} />
      <div className="max-w-[1400px] mx-auto relative grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* image */}
        <FadeUp>
          <div className="relative clip-frame overflow-hidden border border-[#D4AF37]/40 crimson-glow">
            <img src={EVENT_IMG} alt="In the Heart of the Cross" className="w-full h-[420px] md:h-[560px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#F5F2EB]/80">A Stage Play</span>
              <p className="font-display italic text-[#D4AF37] text-lg">Faith. Sacrifice. Redemption. Love.</p>
            </div>
          </div>
        </FadeUp>

        {/* details */}
        <div>
          <FadeUp>
            <p className="flex items-center gap-3 text-xs tracking-[0.4em] uppercase text-[#F5D98A] mb-5">
              <span className="w-10 h-px bg-[#F5D98A]" /> Upcoming Event
            </p>
          </FadeUp>
          <h2 className="font-display font-black text-[#F5F2EB] text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-tight">
            <RevealLine>In the Heart</RevealLine>
            <RevealLine delay={0.08} className="italic font-medium">of the</RevealLine>
            <RevealLine delay={0.16} className="text-[#D4AF37]">Cross</RevealLine>
          </h2>
          <FadeUp delay={0.1}>
            <p className="mt-6 text-[#F5F2EB]/85 text-lg leading-relaxed max-w-lg">
              A powerful story of Jesus Christ &mdash; His journey to the cross and our hope through His resurrection. The greatest love ever told. Written &amp; directed by Stampley Asamoah Ampofo.
            </p>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="mt-8 grid sm:grid-cols-3 gap-5 text-[#F5F2EB]">
              <div className="flex items-start gap-3">
                <Calendar className="text-[#D4AF37] mt-0.5" size={20} />
                <div><p className="text-sm font-semibold">Nov 6 &ndash; 7, 2026</p><p className="text-xs text-[#F5F2EB]/60">Two nights</p></div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="text-[#D4AF37] mt-0.5" size={20} />
                <div><p className="text-sm font-semibold">7:00 PM EST</p><p className="text-xs text-[#F5F2EB]/60">Doors 6:15</p></div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="text-[#D4AF37] mt-0.5" size={20} />
                <div><p className="text-sm font-semibold">New Hope Theatre</p><p className="text-xs text-[#F5F2EB]/60">Westerville, OH</p></div>
              </div>
            </div>
          </FadeUp>

          {/* ticket purchase */}
          <FadeUp delay={0.2}>
            <div className="mt-10 p-6 md:p-7 bg-black/40 backdrop-blur-xl border border-[#D4AF37]/30 rounded-2xl">
              <div className="flex items-center justify-between flex-wrap gap-5">
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-[#D4AF37] mb-1">General Admission</p>
                  <p className="font-display text-4xl font-black text-[#F5F2EB]">$30<span className="text-lg text-[#F5F2EB]/60 font-body font-normal"> / ticket</span></p>
                </div>
                <div className="flex items-center gap-4 bg-black/50 rounded-full border border-[#D4AF37]/30 px-2 py-1.5">
                  <button data-testid="qty-minus" onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-9 h-9 rounded-full flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/10" aria-label="decrease">
                    <Minus size={16} />
                  </button>
                  <span data-testid="qty-value" className="font-display text-2xl font-bold text-[#F5F2EB] w-6 text-center">{qty}</span>
                  <button data-testid="qty-plus" onClick={() => setQty((q) => Math.min(20, q + 1))} className="w-9 h-9 rounded-full flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/10" aria-label="increase">
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={buy}
                disabled={loading}
                data-testid="buy-tickets-btn"
                className="mt-6 w-full flex items-center justify-center gap-2 bg-[#D4AF37] text-black font-bold text-lg py-4 rounded-full hover:bg-[#E5B94E] transition-colors disabled:opacity-60"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <Ticket size={20} />}
                {loading ? "Redirecting to secure checkout\u2026" : `Buy ${qty} Ticket${qty > 1 ? "s" : ""} \u2014 $${qty * 30}`}
              </motion.button>
              <p className="text-center text-xs text-[#F5F2EB]/55 mt-3">Secure payment via Stripe &middot; Card &amp; wallets accepted</p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
