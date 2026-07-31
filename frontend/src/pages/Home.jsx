import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Manifesto from "../components/Manifesto";
import Marquee from "../components/Marquee";
import WhatWeDo from "../components/WhatWeDo";
import AdinkraSection from "../components/AdinkraSection";
import FeaturedEvent from "../components/FeaturedEvent";
import GetInvolved from "../components/GetInvolved";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="bg-[#0A0A0A] grain min-h-screen" data-testid="home-page">
      <Navbar />
      <Hero />
      <Marquee items={["Faith", "Culture", "Sacrifice", "Heritage", "Redemption", "Story", "Legacy"]} />
      <Manifesto />
      <WhatWeDo />
      <AdinkraSection />
      <FeaturedEvent />
      <GetInvolved />
      <Contact />
      <Footer />
    </div>
  );
}
