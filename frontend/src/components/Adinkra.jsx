import React from "react";

/* Simplified geometric Adinkra motifs (gold stroke) representing power & authority.
   Each is a decorative interpretation, not a strict facsimile. */

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const Adinkrahene = ({ className = "" }) => (
  // Chief of adinkra symbols — greatness, charisma, leadership
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
    <circle cx="50" cy="50" r="14" {...base} />
    <circle cx="50" cy="50" r="28" {...base} />
    <circle cx="50" cy="50" r="42" {...base} />
  </svg>
);

export const Dwennimmen = ({ className = "" }) => (
  // Ram's horns — strength (of mind, body, soul) with humility
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
    <path d="M30 22 C10 30 10 55 30 55 C42 55 42 40 32 40" {...base} />
    <path d="M70 22 C90 30 90 55 70 55 C58 55 58 40 68 40" {...base} />
    <path d="M30 78 C10 70 10 45 30 45 C42 45 42 60 32 60" {...base} />
    <path d="M70 78 C90 70 90 45 70 45 C58 45 58 60 68 60" {...base} />
  </svg>
);

export const GyeNyame = ({ className = "" }) => (
  // "Except God" — omnipotence, supremacy of the divine
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
    <path d="M50 20 C30 20 24 38 40 44 C24 50 30 68 50 68" {...base} />
    <path d="M50 32 C64 32 68 44 56 48 C68 52 64 64 50 64" {...base} strokeWidth="3.2" />
    <circle cx="50" cy="48" r="4.5" fill="currentColor" stroke="none" />
  </svg>
);

export const Akoben = ({ className = "" }) => (
  // War horn — vigilance, a call to action, readiness
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
    <path d="M24 68 C24 40 48 24 76 26 C60 34 58 46 62 58" {...base} />
    <path d="M62 58 L76 44" {...base} />
    <path d="M62 58 L78 62" {...base} />
    <circle cx="28" cy="66" r="6" {...base} strokeWidth="3.4" />
  </svg>
);

export const Mmusuyidee = ({ className = "" }) => (
  // Removal of evil — sanctity, good fortune, spiritual strength
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
    <path d="M50 18 L50 82 M18 50 L82 50" {...base} />
    <path d="M50 30 L38 42 L50 54 L62 42 Z" {...base} strokeWidth="3.2" />
    <path d="M50 46 L38 58 L50 70 L62 58 Z" {...base} strokeWidth="3.2" />
  </svg>
);

export const SYMBOLS = [
  { key: "adinkrahene", name: "Adinkrahene", meaning: "Greatness, leadership & charisma", desc: "The chief of all Adinkra symbols — the seat of authority and the source from which every voice draws its power.", Comp: Adinkrahene },
  { key: "dwennimmen", name: "Dwennimmen", meaning: "Strength with humility", desc: "The ram fights fiercely, yet submits with grace — power tempered by humility, the mark of a true leader.", Comp: Dwennimmen },
  { key: "gyenyame", name: "Gye Nyame", meaning: "Supremacy of the divine", desc: "\u201cExcept for God\u201d — an emblem of omnipotence and the higher authority that governs all things.", Comp: GyeNyame },
  { key: "akoben", name: "Akoben", meaning: "Vigilance & a call to action", desc: "The war horn that summons the people — readiness, unity, and the authority to rally a community.", Comp: Akoben },
];
