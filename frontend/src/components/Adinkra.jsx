import React from "react";

/* Authentic Adinkra vector data sourced from Wikimedia Commons SVG Adinkra symbols.
   Rendered with currentColor so parent text color drives fill/stroke. */

const DWENNIMMEN_PATH =
  "M310,260a70,70,0,0,1,0,140,90,90,0,0,1,0-180H420V200H310a90,90,0,0,1,0-180,70,70,0,0,1,0,140,50,50,0,0,1,0-100,30,30,0,0,1,0,60,10,10,0,0,1,0-20,10,10,0,0,0,0-20,30,30,0,0,0,0,60,50,50,0,0,0,0-100,70,70,0,0,0,0,140A90,90,0,0,0,310,0,110.14715,110.14715,0,0,0,210,64.19983,110.14715,110.14715,0,0,0,110,0a90,90,0,0,0,0,180,70,70,0,0,0,0-140,50,50,0,0,0,0,100,30,30,0,0,0,0-60,10,10,0,0,0,0,20,10,10,0,0,1,0,20,30,30,0,0,1,0-60,50,50,0,0,1,0,100,70,70,0,0,1,0-140,90,90,0,0,1,0,180H0v20H110a90,90,0,0,1,0,180,70,70,0,0,1,0-140,50,50,0,0,1,0,100,30,30,0,0,1,0-60,10,10,0,0,1,0,20,10,10,0,0,0,0,20,30,30,0,0,0,0-60,50,50,0,0,0,0,100,70,70,0,0,0,0-140,90,90,0,0,0,0,180,110.14715,110.14715,0,0,0,100-64.19983A110.14715,110.14715,0,0,0,310,420a90,90,0,0,0,0-180,70,70,0,0,0,0,140,50,50,0,0,0,0-100,30,30,0,0,0,0,60,10,10,0,0,0,0-20,10,10,0,0,1,0-20,30,30,0,0,1,0,60,50,50,0,0,1,0-100ZM187.7818,232.2182a31.42132,31.42132,0,1,1,44.43646,0A31.42129,31.42129,0,0,1,187.7818,232.2182Z";

const GYE_NYAME_PATH =
  "M180.475,11.245c11.609,15.968,7.794,46.741,26.767,55.644 26.062-0.674,25.307-27.081,40.147-38.522c37.423-25.598,80.812-4.661,84.757,21.401c8.344,55.104-94.203,80.456-84.757,136.968 c9.536,33.494,46.84-40.814,80.296-4.281c29.544,65.467-102.894,51.963-95.405,99.257c8.479,69.408,83.598-43.18,99.866,7.75 c7.444,61.115-90.009,39.543-71.376,85.605c31.053,43.338,93.146-42.834,84.878-31.873c43.16-57.209,85.813-159.123,29.777-256.006 c99.626,91.095,71.729,313.357-69.21,350.594c14.787,9.459,18.504,36.646,8.087,48.568c-10.346,11.842-36.933,22.807-57.991,4.281 c-10.31-14.361,2.403-39.824-26.765-47.08c-18.745-4.664-32.433,39.398-55.647,52.135c-15.555,8.533-43.473,1.455-59.915-15.34 c-14.078-14.379-14.788-47.295,0.466-56.301c26.519-15.656,80.032-33.082,83.868-87.5c-5.471-40.646-59.689,35.025-84.756,8.559 c-34.083-68.123,83.784-46.83,89.217-102.725c-0.074-36.338-67.55,32.542-89.217-8.562c-38.333-69.896,114.667-36.896,93.68-94.165 c-24.013-47.731-112.56,5.376-147.334,72.364c-19.86,38.258-46.917,121.406-34.647,187.93 C-22.375,289.606-9.89,111.731,125.831,70.548c-16.777-6.39-21.382-28.988-8.3-51.689C125.911,4.318,159.07-11.08,180.475,11.245z";

const SVG = {
  adinkrahene: `<svg viewBox="0 0 120 120" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" fill="none" stroke="currentColor" stroke-width="9" stroke-miterlimit="10" style="display:block"><circle cx="60" cy="60" r="15"/><circle cx="60" cy="60" r="35"/><circle cx="60" cy="60" r="55"/></svg>`,
  dwennimmen: `<svg viewBox="0 0 420 420" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" fill="currentColor" style="display:block"><path d="${DWENNIMMEN_PATH}"/></svg>`,
  gyenyame: `<svg viewBox="-37.654 -4.726 510 510" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" fill="currentColor" style="display:block"><path fill-rule="evenodd" clip-rule="evenodd" d="${GYE_NYAME_PATH}"/></svg>`,
  oheneaniwa: `<svg viewBox="0 0 744 744" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" stroke="currentColor" fill="currentColor" style="display:block"><path fill="none" stroke-width="80" d="m512,371a140,140 0 1,0 0,2z"/><g id="oa-c"><g id="oa-b"><path id="oa-a" stroke="none" d="M546,336q30,10 60,0a72,72 0 1,1 0,72q-30-10-60,0"/><use href="#oa-a" transform="rotate(36 372,372)"/></g><use href="#oa-b" transform="rotate(72 372,372)"/></g><use href="#oa-c" transform="rotate(144 372,372)"/><use href="#oa-c" transform="rotate(216 372,372)"/><path fill="none" stroke-width="58" d="m471,372H270m99-99v198"/></svg>`,
};

const make = (html) =>
  function AdinkraGlyph({ className = "" }) {
    return (
      <span
        className={className}
        style={{ display: "inline-block", lineHeight: 0 }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  };

export const Adinkrahene = make(SVG.adinkrahene);
export const Dwennimmen = make(SVG.dwennimmen);
export const GyeNyame = make(SVG.gyenyame);
export const OheneAniwa = make(SVG.oheneaniwa);

export const SYMBOLS = [
  { key: "adinkrahene", name: "Adinkrahene", meaning: "Greatness, leadership & charisma", desc: "The chief of all Adinkra symbols \u2014 concentric rings radiating from a single centre, the seat of authority from which every voice draws its power.", Comp: Adinkrahene },
  { key: "dwennimmen", name: "Dwennimmen", meaning: "Strength with humility", desc: "The ram\u2019s horns. The ram fights fiercely, yet submits with grace \u2014 power tempered by humility, the mark of a true leader.", Comp: Dwennimmen },
  { key: "gyenyame", name: "Gye Nyame", meaning: "Supremacy of the divine", desc: "\u201cExcept for God.\u201d An emblem of omnipotence and the higher authority that governs all things and all people.", Comp: GyeNyame },
  { key: "oheneaniwa", name: "Ohene Aniwa", meaning: "The vigilance of a ruler", desc: "\u201cThe king\u2019s eyes.\u201d A symbol of watchfulness and discernment \u2014 the alertness and vision demanded of those who lead.", Comp: OheneAniwa },
];
