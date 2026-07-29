"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import GitHubHeatmap from "@/components/GitHubHeatmap";

const ease = [0.22, 1, 0.36, 1] as const;

const reveal: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease },
  }),
};

const lines = [
  "I build intelligent",
  "systems that make",
  "a difference.",
];

type StackGroup = { label: string; items: string[] };

const stack: StackGroup[] = [
  {
    label: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "C++", "CUDA"],
  },
  {
    label: "AI / ML",
    items: ["PyTorch", "TensorFlow", "Transformers", "Scikit-learn", "Keras"],
  },
  {
    label: "LLMs / Agents",
    items: ["OpenAI", "Anthropic", "LangChain", "LangGraph", "RAG", "Embeddings"],
  },
  {
    label: "Web",
    items: ["React", "Next.js", "Node.js", "Flask", "FastAPI", "Tailwind"],
  },
  {
    label: "Data",
    items: ["Pandas", "NumPy", "Jupyter", "PostgreSQL", "Vector DBs"],
  },
  {
    label: "Infra",
    items: ["Docker", "Kubernetes", "Vercel", "GitHub Actions", "AWS"],
  },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const wordY = useTransform(scrollYProgress, [0, 1], ["25%", "-25%"]);
  const numberY = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);
  const photoY = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-48 px-6 sm:px-16 overflow-hidden"
    >
      <motion.div
        style={{ y: wordY }}
        className="absolute -left-10 top-1/2 -translate-y-1/2 text-[18rem] sm:text-[26rem] font-bold text-white/[0.025] select-none pointer-events-none whitespace-nowrap"
        aria-hidden
      >
        ABOUT
      </motion.div>

      <motion.div
        style={{ y: numberY }}
        className="absolute right-8 sm:right-16 top-32 font-mono text-xs tracking-[0.3em] text-white/30 pointer-events-none"
        aria-hidden
      >
        01 / 05
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
          01 — About
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
          <motion.div
            style={{ y: photoY }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10% 0px" }}
            custom={1}
            variants={reveal}
            className="md:col-span-4 relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/18635541.jpeg"
                alt="Dhawal Gajwe"
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover grayscale hover:grayscale-0 transition-[filter] duration-700"
                priority={false}
              />
            </div>
            <div className="mt-4 flex justify-between font-mono text-xs text-white/50 tracking-widest">
              <span>DG / 2026</span>
              <span>TUCSON · AZ</span>
            </div>
          </motion.div>

          <div className="md:col-span-8">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-semibold leading-[1.05] mb-12">
              {lines.map((line, i) => (
                <motion.span
                  key={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-10% 0px" }}
                  custom={i + 2}
                  variants={reveal}
                  className="block"
                >
                  {i === 1 ? (
                    <span className="italic font-light text-white/60">
                      {line}
                    </span>
                  ) : (
                    line
                  )}
                </motion.span>
              ))}
            </h2>

            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-10% 0px" }}
              custom={5}
              variants={reveal}
              className="text-lg text-white/70 leading-relaxed max-w-2xl mb-12"
            >
              I&apos;m an AI Engineer with an MS in Information Science
              (Machine Learning) from the University of Arizona. I work across
              transformers, generative AI, and context-aware systems —
              shipping production ML in Python and TypeScript and obsessing
              over the details that turn a model into a product.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 max-w-3xl">
              {stack.map((group, i) => (
                <motion.div
                  key={group.label}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-10% 0px" }}
                  custom={i + 6}
                  variants={reveal}
                  className="border-t border-white/10 pt-4"
                >
                  <p className="font-mono text-[10px] text-white/50 tracking-[0.25em] uppercase mb-4">
                    {group.label}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 text-xs font-mono border border-white/10 rounded-full text-white/80 hover:border-white/30 hover:bg-white/[0.04] transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
          custom={0}
          variants={reveal}
          className="mt-24 pt-12 border-t border-white/10"
        >
          <p className="font-mono text-[10px] text-white/50 tracking-[0.25em] uppercase mb-6">
            Activity
          </p>
          <GitHubHeatmap username="BillDhawal" />
        </motion.div>
      </div>
    </section>
  );
}
