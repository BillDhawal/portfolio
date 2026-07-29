"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import { projects, contact, type Project } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

const reveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease },
  }),
};

function Card({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const numberY = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15% 0px" }}
      custom={0}
      variants={reveal}
      className="group relative border-t border-white/10 py-14 overflow-hidden"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-r ${project.tint} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
        aria-hidden
      />
      <div className="relative grid grid-cols-12 gap-6 items-baseline">
        <motion.span
          style={{ y: numberY }}
          className="col-span-1 font-mono text-xs text-white/40"
        >
          0{index + 1}
        </motion.span>
        <motion.div style={{ y: titleY }} className="col-span-11 sm:col-span-5">
          <h3 className="text-3xl sm:text-5xl font-semibold tracking-tight">
            {project.title}
          </h3>
          <p className="mt-3 font-mono text-[11px] tracking-[0.2em] uppercase text-white/50">
            {project.status}
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
          custom={1}
          variants={reveal}
          className="col-span-12 sm:col-span-4"
        >
          <p className="text-white/70 leading-relaxed">{project.blurb}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 text-xs font-mono border border-white/15 rounded-full text-white/70 hover:text-white hover:border-white/40 hover:bg-white/[0.05] transition-colors"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
          custom={2}
          variants={reveal}
          className="col-span-12 sm:col-span-2 flex flex-col text-right text-sm font-mono text-white/50"
        >
          <span>{project.stack}</span>
          <span>{project.year}</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Work() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const wordY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section id="work" ref={ref} className="relative py-40 px-6 sm:px-16 overflow-hidden">
      <motion.div
        style={{ y: wordY }}
        className="absolute right-0 -top-10 text-[16rem] sm:text-[22rem] font-bold text-white/[0.025] select-none pointer-events-none whitespace-nowrap"
        aria-hidden
      >
        WORK
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
          02 — Selected Work
        </motion.p>
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
          custom={1}
          variants={reveal}
          className="text-4xl sm:text-6xl md:text-7xl font-semibold leading-[1.05] mb-20 max-w-3xl"
        >
          A few things I&apos;ve had the{" "}
          <span className="italic font-light text-white/60">privilege</span>{" "}
          of building.
        </motion.h2>

        <div className="border-b border-white/10">
          {projects.map((p, i) => (
            <Card key={p.title} project={p} index={i} />
          ))}
        </div>

        <motion.a
          href={contact.github}
          target="_blank"
          rel="noopener noreferrer"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
          custom={2}
          variants={reveal}
          className="inline-flex items-center gap-2 mt-12 text-sm font-mono text-white/60 hover:text-white transition-colors"
        >
          See more on GitHub →
        </motion.a>
      </div>
    </section>
  );
}
