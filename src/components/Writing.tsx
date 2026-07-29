"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import { videos, articles } from "@/data/site";
import YouTubeEmbed from "@/components/YouTubeEmbed";

const ease = [0.22, 1, 0.36, 1] as const;

const reveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease },
  }),
};

export default function Writing() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const wordY = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);

  return (
    <section
      id="writing"
      ref={ref}
      className="relative py-40 px-6 sm:px-16 overflow-hidden"
    >
      <motion.div
        style={{ y: wordY }}
        className="absolute right-0 top-0 text-[14rem] sm:text-[20rem] font-bold text-white/[0.025] select-none pointer-events-none whitespace-nowrap"
        aria-hidden
      >
        WRITING
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
          04 — Writing &amp; Videos
        </motion.p>
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
          custom={1}
          variants={reveal}
          className="text-4xl sm:text-6xl md:text-7xl font-semibold leading-[1.05] mb-20 max-w-3xl"
        >
          I build in public —{" "}
          <span className="italic font-light text-white/60">
            and explain how.
          </span>
        </motion.h2>

        {/* Videos — play inline, nobody leaves the page */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-24">
          {videos.map((video, i) => (
            <motion.div
              key={video.id}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-10% 0px" }}
              custom={i}
              variants={reveal}
            >
              <YouTubeEmbed videoId={video.id} title={video.title} />
              <h3 className="mt-4 text-lg font-medium">{video.title}</h3>
              {video.note && (
                <p className="mt-1 text-sm text-white/50">{video.note}</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Articles */}
        <div className="border-b border-white/10">
          {articles.map((article, i) => (
            <motion.a
              key={article.href}
              href={article.href}
              target="_blank"
              rel="noopener noreferrer"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-10% 0px" }}
              custom={i}
              variants={reveal}
              className="group flex items-baseline justify-between gap-6 border-t border-white/10 py-6 hover:bg-white/[0.02] transition-colors"
            >
              <span className="text-lg sm:text-xl group-hover:translate-x-1 transition-transform">
                {article.title}
                <span className="inline-block ml-3 text-white/30 group-hover:text-white/70 transition-colors">
                  ↗
                </span>
              </span>
              <span className="font-mono text-xs text-white/40 tracking-widest shrink-0">
                {article.source.toUpperCase()}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
