import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getPaymentStatus } from "../lib/api";
import { CheckCircle2, XCircle, Loader2, ArrowLeft, Ticket } from "lucide-react";
import { GyeNyame } from "../components/Adinkra";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const [state, setState] = useState("checking"); // checking | paid | failed
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (!sessionId) { setState("failed"); return; }
    let attempts = 0;
    const poll = async () => {
      attempts += 1;
      try {
        const data = await getPaymentStatus(sessionId);
        setDetails(data);
        if (data.payment_status === "paid") { setState("paid"); return; }
        if (["expired", "failed"].includes(data.payment_status)) { setState("failed"); return; }
      } catch { /* keep trying */ }
      if (attempts >= 8) { setState("failed"); return; }
      setTimeout(poll, 1800);
    };
    poll();
  }, [sessionId]);

  const isDonation = details?.lookup_key?.startsWith("donate");

  return (
    <div className="min-h-screen bg-[#0A0A0A] grain flex items-center justify-center px-5">
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-20 h-20 text-[#D4AF37]/20"><GyeNyame className="w-full h-full" /></div>
      <motion.div
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
        className="max-w-lg w-full text-center border border-[rgba(212,175,55,0.2)] bg-[#0C0B0A] rounded-3xl p-10 md:p-14 gold-glow"
        data-testid="payment-success-page"
      >
        {state === "checking" && (
          <>
            <Loader2 className="animate-spin text-[#D4AF37] mx-auto mb-6" size={54} />
            <h1 className="font-display text-3xl font-bold text-[#F5F2EB] mb-2">Confirming your payment</h1>
            <p className="text-[#A09C95]">One moment while we verify with Stripe&hellip;</p>
          </>
        )}
        {state === "paid" && (
          <>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.1 }}>
              <CheckCircle2 className="text-[#D4AF37] mx-auto mb-6" size={64} />
            </motion.div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-3">{isDonation ? "Gift Received" : "You're Going!"}</p>
            <h1 className="font-display text-4xl font-black text-[#F5F2EB] mb-4">{isDonation ? "Thank you for your generosity" : "Tickets Confirmed"}</h1>
            <p className="text-[#A09C95] mb-8">
              {isDonation
                ? "Your donation directly sustains Black theatre and the artists who bring it to life."
                : "Your seats for In the Heart of the Cross are reserved. A receipt has been sent to your email."}
            </p>
            <Link to="/" data-testid="back-home-btn" className="inline-flex items-center gap-2 bg-[#D4AF37] text-black font-semibold px-7 py-3.5 rounded-full hover:bg-[#E5B94E] transition-colors">
              <ArrowLeft size={18} /> Back to Home
            </Link>
          </>
        )}
        {state === "failed" && (
          <>
            <XCircle className="text-[#7E121D] mx-auto mb-6" size={60} />
            <h1 className="font-display text-3xl font-bold text-[#F5F2EB] mb-3">We couldn&rsquo;t confirm this</h1>
            <p className="text-[#A09C95] mb-8">If you were charged, please contact us at 703-475-5322 and we&rsquo;ll sort it out right away.</p>
            <Link to="/" className="inline-flex items-center gap-2 border border-[#D4AF37]/60 text-[#D4AF37] px-7 py-3.5 rounded-full hover:bg-[#D4AF37]/10 transition-colors">
              <ArrowLeft size={18} /> Back to Home
            </Link>
          </>
        )}
      </motion.div>
    </div>
  );
}

export function PaymentCancel() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] grain flex items-center justify-center px-5">
      <motion.div
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
        className="max-w-lg w-full text-center border border-[rgba(212,175,55,0.2)] bg-[#0C0B0A] rounded-3xl p-10 md:p-14"
        data-testid="payment-cancel-page"
      >
        <Ticket className="text-[#A09C95] mx-auto mb-6" size={56} />
        <h1 className="font-display text-3xl font-bold text-[#F5F2EB] mb-3">Checkout cancelled</h1>
        <p className="text-[#A09C95] mb-8">No charge was made. Your seats are still available whenever you&rsquo;re ready.</p>
        <Link to="/" data-testid="cancel-back-home" className="inline-flex items-center gap-2 bg-[#D4AF37] text-black font-semibold px-7 py-3.5 rounded-full hover:bg-[#E5B94E] transition-colors">
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
