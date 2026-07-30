"use client";

import { useEffect, useRef } from "react";

// Self-hosted video in the shared media-card chrome. Plays muted when it
// scrolls into view, pauses when it leaves. Controls stay available for
// sound and scrubbing.
export default function AutoPlayVideo({
  src,
  caption,
}: {
  src: string;
  caption?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.45 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <figure>
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
        <video
          ref={videoRef}
          controls
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full rounded-lg bg-black"
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>
      <figcaption className="mt-3 text-sm text-white/45 leading-relaxed">
        {caption ?? "Plays on scroll — unmute in the player."}
      </figcaption>
    </figure>
  );
}
