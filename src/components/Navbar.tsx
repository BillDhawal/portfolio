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
          ? "backdrop-blur-md bg-black/40 border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#top" className="font-mono text-sm tracking-wider">
          DG.
        </a>
        <div className="flex items-center gap-6 sm:gap-8 text-sm text-white/70">
          <a
            href="#about"
            className="hidden sm:inline hover:text-white transition-colors"
          >
            About
          </a>
          <a
            href="#work"
            className="hidden sm:inline hover:text-white transition-colors"
          >
            Work
          </a>
          <a
            href="#experience"
            className="hidden sm:inline hover:text-white transition-colors"
          >
            Experience
          </a>
          <a
            href="#writing"
            className="hidden sm:inline hover:text-white transition-colors"
          >
            Writing
          </a>
          <a
            href="#contact"
            className="hidden sm:inline hover:text-white transition-colors"
          >
            Contact
          </a>
          <a
            href="/proof-of-work"
            className="px-3 py-1.5 font-mono text-xs border border-white/20 rounded-full hover:border-white/50 hover:text-white transition-colors"
          >
            Proof of Work
          </a>
        </div>
      </div>
    </nav>
  );
}
