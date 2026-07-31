import React from "react";
import { motion } from "framer-motion";

/* Line-by-line masked reveal. Pass an array of strings (lines). */
export const MaskLines = ({ lines = [], className = "", delay = 0, stagger = 0.12, as: Tag = "span" }) => (
  <span className={className}>
    {lines.map((line, i) => (
      <span key={i} style={{ display: "block", overflow: "hidden" }}>
        <motion.span
          style={{ display: "block", willChange: "transform" }}
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 0.9, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
        >
          {line}
        </motion.span>
      </span>
    ))}
  </span>
);

/* Scroll-triggered fade + lift */
export const FadeUp = ({ children, className = "", delay = 0, y = 40 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export const RevealLine = ({ children, className = "", delay = 0 }) => (
  <span className="block overflow-hidden pb-[0.1em]">
    <motion.span
      className={`block ${className}`}
      initial={{ opacity: 0, y: 55 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  </span>
);
