import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import { Toaster } from "sonner";
import Home from "@/pages/Home";
import PaymentSuccess, { PaymentCancel } from "@/pages/PaymentSuccess";

function App() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="App">
      <Toaster
        position="bottom-right"
        theme="dark"
        toastOptions={{
          style: {
            background: "#121010",
            border: "1px solid rgba(212,175,55,0.3)",
            color: "#F5F2EB",
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/cancel" element={<PaymentCancel />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
