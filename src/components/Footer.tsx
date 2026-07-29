"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const reveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease },
  }),
};

const links = [
  { label: "Email", value: "dhawalcodes@gmail.com", href: "mailto:dhawalcodes@gmail.com" },
  { label: "GitHub", value: "@BillDhawal", href: "https://github.com/BillDhawal" },
  { label: "LinkedIn", value: "@dhawalgajwe", href: "https://www.linkedin.com/in/dhawalgajwe/" },
  { label: "Instagram", value: "@thewallcodes", href: "https://www.instagram.com/thewallcodes/" },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const wordY = useTransform(scrollYProgress, [0, 1], ["20%", "-15%"]);

  return (
    <footer
      id="contact"
      ref={ref}
      className="relative py-40 px-6 sm:px-16 overflow-hidden border-t border-white/10"
    >
      <motion.div
        style={{ y: wordY }}
        className="absolute -left-10 bottom-10 text-[16rem] sm:text-[24rem] font-bold text-white/[0.025] select-none pointer-events-none whitespace-nowrap"
        aria-hidden
      >
        SAY HI
      </motion.div>

      <div className="max-w-6xl mx-auto relative">
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
          custom={0}
          variants={reveal}
          className="font-mono text-xs tracking-[0.3em] text-white/50 uppercase mb-12"
        >
          05 — Get in touch
        </motion.p>
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
          custom={1}
          variants={reveal}
          className="text-5xl sm:text-7xl md:text-9xl font-semibold tracking-tight leading-[0.95] mb-16"
        >
          Let&apos;s build
          <br />
          <span className="italic font-light text-white/60">
            something good.
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-15% 0px" }}
              custom={i + 2}
              variants={reveal}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex flex-col p-8 border border-white/10 rounded-2xl hover:border-white/30 hover:bg-white/[0.02] transition-all"
            >
              <span className="font-mono text-xs text-white/50 tracking-widest mb-3">
                {link.label.toUpperCase()}
              </span>
              <span className="text-2xl group-hover:translate-x-1 transition-transform">
                {link.value} →
              </span>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
          custom={6}
          variants={reveal}
          className="mt-32 flex justify-between items-center text-xs font-mono text-white/40 tracking-widest"
        >
          <span>© 2026 DHAWAL GAJWE</span>
          <span>BUILT WITH NEXT.JS</span>
        </motion.div>
      </div>
    </footer>
  );
}
