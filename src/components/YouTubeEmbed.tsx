"use client";

import { useEffect, useRef } from "react";

// Scroll-aware inline YouTube player, in the same card chrome as the
// screenshot galleries. The video starts playing (muted) when the section
// scrolls into view and pauses when it leaves — no clicks needed. Sound is one
// tap away in the player controls.
export default function YouTubeEmbed({
  videoId,
  title,
  caption = "Plays on scroll · unmute in player",
}: {
  videoId: string;
  title: string;
  caption?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const command = (func: "playVideo" | "pauseVideo") => {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func, args: "" }),
        "*"
      );
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // The player may still be booting the first time it scrolls in —
          // send play again shortly after so the command isn't dropped.
          command("playVideo");
          setTimeout(() => command("playVideo"), 800);
        } else {
          command("pauseVideo");
        }
      },
      { threshold: 0.45 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <figure ref={containerRef}>
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
          <iframe
            ref={iframeRef}
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1&mute=1&playsinline=1&rel=0&loop=1&playlist=${videoId}`}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
      <figcaption className="mt-2 text-center font-mono text-[10px] tracking-[0.25em] uppercase text-white/30">
        {caption}
      </figcaption>
    </figure>
  );
}
