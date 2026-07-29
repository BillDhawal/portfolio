"use client";

import { motion, useScroll, useSpring } from "framer-motion";

// Thin progress bar pinned to the top of the page — the same cue the homepage
// hero uses, so the two pages share one scrolling language.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-px bg-white/10 z-50">
      <motion.div
        style={{ scaleX, transformOrigin: "0% 50%" }}
        className="h-full bg-white/60"
      />
    </div>
  );
}
