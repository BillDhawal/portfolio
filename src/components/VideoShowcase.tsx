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
    if (Math.abs(v.currentTime - target) > 0.03) {
      v.currentTime = target;
    }
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1.12]);

  // Two panes across 300vh: the name holds then eases away, and pane 2
  // cross-fades in underneath, holds through the middle of the scrub, and
  // clears before the video dives into the wireframe for the finish.
  //
  // Opacity ramps are computed in function form rather than framer's
  // multi-stop array form: with a section target, array transforms of 3+
  // stops were observed tracking *document* scroll instead of the section
  // (2-stop transforms and useMotionValueEvent tracked the section
  // correctly). Function form reads the raw section progress directly.
  const ramp =
    (stops: number[], outs: number[]) =>
    (v: number): number => {
      if (v <= stops[0]) return outs[0];
      for (let k = 1; k < stops.length; k++) {
        if (v <= stops[k]) {
          const t = (v - stops[k - 1]) / (stops[k] - stops[k - 1]);
          return outs[k - 1] + t * (outs[k] - outs[k - 1]);
        }
      }
      return outs[outs.length - 1];
    };

  const pane1Opacity = useTransform(
    scrollYProgress,
    ramp([0, 0.25, 0.32, 0.39, 0.45], [1, 1, 0.75, 0.35, 0])
  );
  const pane1Y = useTransform(scrollYProgress, [0, 0.45], ["0%", "-50%"]);
  const pane1LabelY = useTransform(
    scrollYProgress,
    [0, 0.45],
    ["0%", "-22%"]
  );

  const pane2Opacity = useTransform(
    scrollYProgress,
    ramp([0.4, 0.5, 0.85, 0.95], [0, 1, 1, 0])
  );
  const pane2Y = useTransform(scrollYProgress, [0.4, 0.95], ["35%", "-35%"]);
  const pane2LabelY = useTransform(
    scrollYProgress,
    [0.4, 0.95],
    ["18%", "-18%"]
  );

  const scrollHintOpacity = useTransform(
    scrollYProgress,
    ramp([0, 0.15, 0.3, 1], [1, 1, 0, 0])
  );

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[300vh] bg-white"
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
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Text overlays — mix-blend-difference inverts text against whatever
            pixels are behind it (light bg → dark text, dark bg → light). */}
        <div
          className="relative z-10 h-full w-full px-8 sm:px-16"
          style={{ mixBlendMode: "difference" }}
        >
          {/* Pane 1 — top-left brand */}
          <motion.div
            style={{ opacity: pane1Opacity, y: pane1Y }}
            className="absolute top-1/2 left-8 sm:left-16 -translate-y-1/2 max-w-3xl text-white"
          >
            <motion.p
              style={{ y: pane1LabelY }}
              className="font-mono text-xs tracking-[0.3em] uppercase mb-6"
            >
              Portfolio · 2026
            </motion.p>
            <h1 className="text-7xl sm:text-9xl md:text-[10rem] font-semibold tracking-tight leading-[0.95]">
              Dhawal
              <br />
              <span className="italic font-light">Gajwe</span>
            </h1>
            <p className="mt-10 text-lg max-w-md">
              AI Engineer. Building intelligent systems — one algorithm at a
              time.
            </p>
          </motion.div>

        </div>

        {/* Pane 2 — outside the blend layer: the video is a light close-up
            during its window, so solid ink beats difference blending here */}
        <motion.div
          style={{ opacity: pane2Opacity, y: pane2Y }}
          className="absolute top-1/2 -translate-y-1/2 right-8 sm:right-16 w-full sm:w-[48%] max-w-2xl text-right text-black z-10 px-8 sm:px-0"
        >
          <motion.p
            style={{ y: pane2LabelY }}
            className="font-mono text-xs tracking-[0.3em] uppercase mb-6 text-black/60"
          >
            Approach
          </motion.p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
            Ideas used to wait.
            <br />
            <span className="italic font-light">Now they ship.</span>
          </h2>
        </motion.div>

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

      </div>
    </section>
  );
}
