"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import { experience } from "@/data/site";
import { ClientBadge, LogoChip } from "@/components/CompanyMark";

const ease = [0.22, 1, 0.36, 1] as const;

const reveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease },
  }),
};

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const wordY = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);

  return (
    <section
      id="experience"
      ref={ref}
      className="relative py-40 px-6 sm:px-16 overflow-hidden"
    >
      <motion.div
        style={{ y: wordY }}
        className="absolute -left-10 top-0 text-[13rem] sm:text-[19rem] font-bold text-white/[0.025] select-none pointer-events-none whitespace-nowrap"
        aria-hidden
      >
        EXPERIENCE
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
          03 — Experience
        </motion.p>
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
          custom={1}
          variants={reveal}
          className="text-4xl sm:text-6xl md:text-7xl font-semibold leading-[1.05] mb-20 max-w-3xl"
        >
          Six years shipping{" "}
          <span className="italic font-light text-white/60">
            production systems.
          </span>
        </motion.h2>

        <div className="border-b border-white/10">
          {experience.map((role, i) => (
            <motion.div
              key={role.company}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-10% 0px" }}
              custom={i}
              variants={reveal}
              className="border-t border-white/10 py-12 grid grid-cols-1 sm:grid-cols-12 gap-6"
            >
              <div className="sm:col-span-4">
                <div className="flex items-center gap-4">
                  <LogoChip logo={role.logo} name={role.company} />
                  <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                    {role.company}
                  </h3>
                </div>
                <p className="mt-3 text-white/60">{role.title}</p>
                {role.client && (
                  <div className="mt-3">
                    <ClientBadge client={role.client} />
                  </div>
                )}
                <p className="mt-3 font-mono text-xs text-white/40 tracking-widest">
                  {role.period}
                </p>
                <p className="font-mono text-xs text-white/40 tracking-widest">
                  {role.location.toUpperCase()}
                </p>
              </div>
              <ul className="sm:col-span-8 space-y-4">
                {role.bullets.map((bullet, j) => (
                  <li
                    key={j}
                    className="text-white/70 leading-relaxed pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-white/30"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
