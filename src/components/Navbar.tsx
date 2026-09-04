"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-white/70 border-b border-black/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#top" className="font-mono text-sm tracking-wider">
          DG.
        </a>
        <div className="flex items-center gap-6 sm:gap-8 text-sm text-black/70">
          <a
            href="#about"
            className="hidden sm:inline hover:text-black transition-colors"
          >
            About
          </a>
          <a
            href="#work"
            className="hidden sm:inline hover:text-black transition-colors"
          >
            Work
          </a>
          <a
            href="#experience"
            className="hidden sm:inline hover:text-black transition-colors"
          >
            Experience
          </a>
          <a
            href="#writing"
            className="hidden sm:inline hover:text-black transition-colors"
          >
            Writing
          </a>
          <a
            href="#contact"
            className="hidden sm:inline hover:text-black transition-colors"
          >
            Contact
          </a>
          <a
            href="/proof-of-work"
            className="relative overflow-hidden px-3 py-1.5 font-mono text-xs rounded-full text-white transition-transform duration-300 hover:scale-105"
          >
            {/* swirl clip fills the pill — same family as the About headline */}
            <video
              src="/text-bg.mp4"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover scale-250"
            />
            <span className="absolute inset-0 bg-black/10" aria-hidden />
            <span className="relative font-semibold tracking-wide [text-shadow:0_1px_3px_rgba(0,0,0,0.45)]">
              Proof of Work
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
}
