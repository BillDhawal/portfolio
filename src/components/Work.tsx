"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";

type Project = {
  title: string;
  blurb: string;
  stack: string;
  year: string;
  href: string;
  tint: string;
};

const projects: Project[] = [
  {
    title: "ColdConnect",
    blurb: "An AI tool that helps you connect with the right job recruiters — drafts the cold email, finds the contact, sends it for you.",
    stack: "TypeScript · LLMs",
    year: "2025",
    href: "https://github.com/BillDhawal/coldconnect",
    tint: "from-indigo-500/20 to-transparent",
  },
  {
    title: "Conversational AI for Enterprises",
    blurb: "A framework for grounding LLM conversations in enterprise knowledge with retrieval and tool use.",
    stack: "Python · LLMs · RAG",
    year: "2026",
    href: "https://github.com/BillDhawal/Conversational_AI_For_Enterprises",
    tint: "from-emerald-500/20 to-transparent",
  },
  {
    title: "Job Matching Engine",
    blurb: "Semantic matching between candidate profiles and roles, ranked with embeddings and structured signals.",
    stack: "Python · Embeddings",
    year: "2026",
    href: "https://github.com/BillDhawal/job-matching-engine",
    tint: "from-rose-500/20 to-transparent",
  },
  {
    title: "LangGraph Code Agent",
    blurb: "An autonomous coding agent built on LangGraph — plans, edits, and verifies changes across a repository.",
    stack: "Python · LangGraph",
    year: "2025",
    href: "https://github.com/BillDhawal/langgraph_codeagent",
    tint: "from-amber-500/20 to-transparent",
  },
  {
    title: "Fine-tuning Tutorials",
    blurb: "Hands-on notebooks for adapting open-weight LLMs to specific tasks and domains.",
    stack: "Python · PyTorch",
    year: "2026",
    href: "https://github.com/BillDhawal/finetuning_tutorials",
    tint: "from-sky-500/20 to-transparent",
  },
  {
    title: "Calorie Estimation",
    blurb: "Deep-learning image classifier estimating calorie content from food photos.",
    stack: "Python · CNNs",
    year: "2020",
    href: "https://github.com/BillDhawal/Calorie-Estimation---Deep-Learning-Image-Classification",
    tint: "from-fuchsia-500/20 to-transparent",
  },
];

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
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const numberY = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);

  return (
    <motion.a
      ref={ref}
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15% 0px" }}
      custom={0}
      variants={reveal}
      className="group relative block border-t border-white/10 py-14 overflow-hidden"
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
        <motion.h3
          style={{ y: titleY }}
          className="col-span-11 sm:col-span-5 text-3xl sm:text-5xl font-semibold tracking-tight"
        >
          {project.title}
          <span className="inline-block ml-3 text-white/30 text-2xl group-hover:text-white/70 group-hover:translate-x-1 transition-all">
            ↗
          </span>
        </motion.h3>
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
          custom={1}
          variants={reveal}
          className="col-span-12 sm:col-span-4 text-white/70 leading-relaxed"
        >
          {project.blurb}
        </motion.p>
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
    </motion.a>
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
          href="https://github.com/BillDhawal"
          target="_blank"
          rel="noopener noreferrer"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
          custom={2}
          variants={reveal}
          className="inline-flex items-center gap-2 mt-12 text-sm font-mono text-white/60 hover:text-white transition-colors"
        >
          See all 42 repos on GitHub →
        </motion.a>
      </div>
    </section>
  );
}
