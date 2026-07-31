import React from "react";

export default function Marquee({ items = [], className = "" }) {
  const doubled = [...items, ...items];
  return (
    <div className={`relative w-full overflow-hidden py-10 border-y border-[rgba(212,175,55,0.14)] ${className}`} data-testid="marquee">
      <div className="marquee-track">
        {doubled.map((t, i) => (
          <span key={i} className="font-display italic text-5xl sm:text-6xl md:text-7xl px-8 flex items-center">
            <span className={i % 2 === 0 ? "text-[#F5F2EB]" : "text-outline"}>{t}</span>
            <span className="text-[#D4AF37] mx-8 text-3xl not-italic">&#10022;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
