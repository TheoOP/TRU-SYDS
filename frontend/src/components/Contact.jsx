import React, { useState } from "react";
import { motion } from "framer-motion";
import { FadeUp, RevealLine } from "./Reveal";
import { submitContact } from "../lib/api";
import { MapPin, Phone, Send, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const initial = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitContact(form);
      setSent(true);
      setForm(initial);
      toast.success("Message received \u2014 we'll be in touch soon.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-36 px-5 sm:px-8">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-14 lg:gap-24">
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
              Booking, partnerships, press or a story to tell &mdash; we would love to hear from you.
            </p>
          </FadeUp>

          <div className="mt-12 space-y-6">
            <FadeUp delay={0.15}>
              <a href="https://maps.google.com/?q=1196+Deansway+Dr+Pataskala+OH+43062" target="_blank" rel="noreferrer"
                data-testid="contact-address" className="flex items-start gap-4 group">
                <span className="w-12 h-12 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0 group-hover:bg-[#D4AF37]/10 transition-colors"><MapPin size={20} /></span>
                <span>
                  <span className="block text-xs tracking-[0.2em] uppercase text-[#A09C95] mb-1">Studio</span>
                  <span className="font-display text-xl text-[#F5F2EB] group-hover:text-[#D4AF37] transition-colors">1196 Deansway Dr, Pataskala, OH 43062</span>
                </span>
              </a>
            </FadeUp>
            <FadeUp delay={0.2}>
              <a href="tel:7034755322" data-testid="contact-phone" className="flex items-start gap-4 group">
                <span className="w-12 h-12 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0 group-hover:bg-[#D4AF37]/10 transition-colors"><Phone size={20} /></span>
                <span>
                  <span className="block text-xs tracking-[0.2em] uppercase text-[#A09C95] mb-1">Tickets &amp; Enquiries</span>
                  <span className="font-display text-xl text-[#F5F2EB] group-hover:text-[#D4AF37] transition-colors">703-475-5322</span>
                </span>
              </a>
            </FadeUp>
          </div>
        </div>

        {/* form */}
        <FadeUp delay={0.1}>
          <form onSubmit={submit} className="border border-[rgba(212,175,55,0.2)] bg-[#0C0B0A] p-7 md:p-10 rounded-2xl" data-testid="contact-form">
            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-16 text-center flex flex-col items-center">
                <CheckCircle2 className="text-[#D4AF37] mb-5" size={54} />
                <h3 className="font-display text-3xl font-bold text-[#F5F2EB] mb-3">Thank you</h3>
                <p className="text-[#A09C95] max-w-sm">Your message is in our hands. Expect a reply from the TRU SYDS team shortly.</p>
                <button type="button" onClick={() => setSent(false)} data-testid="send-another-btn" className="mt-8 text-[#D4AF37] link-underline">Send another message</button>
              </motion.div>
            ) : (
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Name" name="name" value={form.name} onChange={change} required testid="contact-name" />
                  <Field label="Email" name="email" type="email" value={form.email} onChange={change} required testid="contact-email" />
                </div>
                <Field label="Subject" name="subject" value={form.subject} onChange={change} testid="contact-subject" />
                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-[#A09C95] mb-2">Message</label>
                  <textarea
                    name="message" required rows={5} value={form.message} onChange={change}
                    data-testid="contact-message"
                    className="w-full bg-[#0A0A0A] border border-[rgba(212,175,55,0.22)] rounded-xl px-4 py-3 text-[#F5F2EB] placeholder:text-[#6b665e] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors resize-none"
                    placeholder="Tell us what's on your heart…"
                  />
                </div>
                <button
                  type="submit" disabled={loading} data-testid="contact-submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#D4AF37] text-black font-semibold py-4 rounded-full hover:bg-[#E5B94E] transition-colors disabled:opacity-60"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                  Send Message
                </button>
              </div>
            )}
          </form>
        </FadeUp>
      </div>
    </section>
  );
}

const Field = ({ label, name, type = "text", value, onChange, required, testid }) => (
  <div>
    <label className="block text-xs tracking-[0.2em] uppercase text-[#A09C95] mb-2">{label}{required && <span className="text-[#D4AF37]"> *</span>}</label>
    <input
      type={type} name={name} value={value} onChange={onChange} required={required} data-testid={testid}
      className="w-full bg-[#0A0A0A] border border-[rgba(212,175,55,0.22)] rounded-xl px-4 py-3 text-[#F5F2EB] placeholder:text-[#6b665e] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors"
    />
  </div>
);
