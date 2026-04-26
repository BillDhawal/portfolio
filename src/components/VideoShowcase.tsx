"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

export default function VideoShowcase() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Drive the video frame off scroll position. The video does not autoplay —
  // it only "moves" when the user scrolls.
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const v = videoRef.current;
    if (!v || !v.duration || Number.isNaN(v.duration)) return;
    const target = Math.max(0, Math.min(0.999, latest)) * v.duration;
    // Only assign when the delta is meaningful to avoid frame thrash.
    if (Math.abs(v.currentTime - target) > 0.03) {
      v.currentTime = target;
    }
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1.12]);

  // Pane reveals — non-overlapping windows with empty buffer between them.
  //   pane 1 (Name)    : visible 0 .. 0.22, fade out 0.22 .. 0.27
  //   pane 2 (Tagline) : fade in 0.34 .. 0.39, visible .. 0.58, fade .. 0.63
  //   pane 3 (Caption) : fade in 0.72 .. 0.77, visible .. 0.96, fade .. 1.0
  const pane1Opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.27],
    [1, 1, 0]
  );
  const pane1Y = useTransform(scrollYProgress, [0, 0.27], ["0%", "-12%"]);

  const pane2Opacity = useTransform(
    scrollYProgress,
    [0.34, 0.39, 0.58, 0.63],
    [0, 1, 1, 0]
  );
  const pane2Y = useTransform(scrollYProgress, [0.34, 0.63], ["8%", "-8%"]);

  const pane3Opacity = useTransform(
    scrollYProgress,
    [0.72, 0.77, 0.96, 1],
    [0, 1, 1, 0]
  );
  const pane3Y = useTransform(scrollYProgress, [0.72, 1], ["8%", "-8%"]);

  const scrollHintOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1],
    [1, 1, 0, 0]
  );

  const progressScaleX = scrollYProgress;

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[400vh] bg-white"
      aria-label="Hero showcase"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
        <motion.div style={{ scale }} className="absolute inset-0">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            muted
            playsInline
            preload="auto"
          >
            <source src="/video.mov" type="video/quicktime" />
            <source src="/video.mov" type="video/mp4" />
          </video>
        </motion.div>

        {/* Text overlays — mix-blend-difference makes white text invert
            against whatever pixels are behind it (light bg → dark text,
            dark bg → light text). No dark overlay needed. */}
        <div
          className="relative z-10 h-full w-full px-8 sm:px-16"
          style={{ mixBlendMode: "difference" }}
        >
          {/* Pane 1 — top-left brand */}
          <motion.div
            style={{ opacity: pane1Opacity, y: pane1Y }}
            className="absolute top-1/2 left-8 sm:left-16 -translate-y-1/2 max-w-3xl text-white"
          >
            <p className="font-mono text-xs tracking-[0.3em] uppercase mb-6">
              Portfolio · 2026
            </p>
            <h1 className="text-7xl sm:text-9xl md:text-[10rem] font-semibold tracking-tight leading-[0.95]">
              Dhawal
              <br />
              <span className="italic font-light">Gajwe</span>
            </h1>
            <p className="mt-10 text-lg max-w-md">
              AI Engineer · Machine Learning Specialist. Building intelligent
              systems — one algorithm at a time.
            </p>
          </motion.div>

          {/* Pane 2 — bottom-right tagline */}
          <motion.div
            style={{ opacity: pane2Opacity, y: pane2Y }}
            className="absolute bottom-24 right-8 sm:right-16 max-w-3xl text-right text-white"
          >
            <p className="font-mono text-xs tracking-[0.3em] uppercase mb-6">
              AI Engineer
            </p>
            <h2 className="text-6xl sm:text-8xl md:text-9xl font-semibold tracking-tight leading-[0.95]">
              Building
              <br />
              <span className="italic font-light">intelligent systems.</span>
            </h2>
          </motion.div>

          {/* Pane 3 — centered caption */}
          <motion.div
            style={{ opacity: pane3Opacity, y: pane3Y }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-3xl text-center text-white px-6"
          >
            <p className="font-mono text-xs tracking-[0.3em] uppercase mb-8">
              Craft
            </p>
            <p className="text-3xl sm:text-5xl font-light leading-snug">
              Every detail considered.
              <br />
              Every transition deliberate.
              <br />
              <span className="italic">
                Every frame earning its place on screen.
              </span>
            </p>
          </motion.div>
        </div>

        {/* HUD — also blended for adaptive contrast */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ mixBlendMode: "difference" }}
        >
          <motion.div
            style={{ opacity: scrollHintOpacity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white text-xs font-mono tracking-widest"
          >
            SCROLL ↓
          </motion.div>
          <div className="absolute top-6 left-8 sm:left-16 text-xs font-mono tracking-widest text-white">
            DG · 2026
          </div>
          <div className="absolute top-6 right-8 sm:right-16 text-xs font-mono tracking-widest text-white">
            SHOWCASE / 01
          </div>
        </div>

        {/* Scroll progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-black/10 z-10">
          <motion.div
            style={{ scaleX: progressScaleX, transformOrigin: "0% 50%" }}
            className="h-full bg-black/40"
          />
        </div>
      </div>
    </section>
  );
}
