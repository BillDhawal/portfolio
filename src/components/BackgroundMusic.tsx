"use client";

import { useEffect, useRef, useState } from "react";

// Plays /idoberg-cinematic-loop-2-356029.mp3 only while the user is actively scrolling.
// - Defaults to muted (browser policy + good manners).
// - First click on the toggle is the user-gesture that unlocks autoplay.
// - On scroll, fades audio in; after a short idle, fades out and pauses.
export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeRafRef = useRef<number | null>(null);
  const idleTimerRef = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);

  // Probe whether /idoberg-cinematic-loop-2-356029.mp3 actually exists. If not, we hide the toggle.
  useEffect(() => {
    let cancelled = false;
    fetch("/idoberg-cinematic-loop-2-356029.mp3", { method: "HEAD" })
      .then((r) => {
        if (!cancelled) setAvailable(r.ok);
      })
      .catch(() => {
        if (!cancelled) setAvailable(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !enabled) return;

    const TARGET_VOLUME = 0.35;
    const INTRO_FADE_IN_MS = 1800;
    const SCROLL_FADE_IN_MS = 400;
    const FADE_OUT_MS = 2200;
    const IDLE_MS = 800;

    const cancelFade = () => {
      if (fadeRafRef.current !== null) {
        cancelAnimationFrame(fadeRafRef.current);
        fadeRafRef.current = null;
      }
    };

    // Time-based fade: linearly interpolate volume from current → target
    // over `durationMs`, regardless of frame rate.
    const fadeTo = (
      target: number,
      durationMs: number,
      onDone?: () => void
    ) => {
      cancelFade();
      const startVolume = audio.volume;
      const startTime = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - startTime) / durationMs);
        audio.volume = Math.max(
          0,
          Math.min(1, startVolume + (target - startVolume) * t)
        );
        if (t >= 1) {
          fadeRafRef.current = null;
          onDone?.();
          return;
        }
        fadeRafRef.current = requestAnimationFrame(tick);
      };
      fadeRafRef.current = requestAnimationFrame(tick);
    };

    const scheduleFadeOut = (afterMs: number) => {
      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current);
      }
      idleTimerRef.current = window.setTimeout(() => {
        fadeTo(0, FADE_OUT_MS, () => {
          audio.pause();
        });
      }, afterMs);
    };

    // Intro fade-in when SOUND is turned on: start playing silently and ramp
    // up. If the user doesn't scroll, fade out gracefully after the intro.
    audio.volume = 0;
    audio.play().catch(() => {
      // autoplay blocked — should not happen since toggle click is a gesture
    });
    fadeTo(TARGET_VOLUME, INTRO_FADE_IN_MS);
    scheduleFadeOut(INTRO_FADE_IN_MS + IDLE_MS);

    const onScroll = () => {
      if (audio.paused) {
        audio.play().catch(() => {});
      }
      fadeTo(TARGET_VOLUME, SCROLL_FADE_IN_MS);
      scheduleFadeOut(IDLE_MS);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelFade();
      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
      audio.pause();
      audio.volume = 0;
    };
  }, [enabled]);

  const handleToggle = () => {
    // The enable effect handles play() + fade-in on its own. The toggle
    // click itself counts as the user gesture that unlocks autoplay.
    setEnabled((v) => !v);
  };

  if (available === false) return null;

  return (
    <>
      <audio ref={audioRef} src="/idoberg-cinematic-loop-2-356029.mp3" loop preload="auto" />
      <button
        type="button"
        onClick={handleToggle}
        aria-label={enabled ? "Mute background music" : "Play background music"}
        aria-pressed={enabled}
        className="fixed bottom-6 right-6 z-50 group flex items-center gap-2 rounded-full border border-white/15 bg-black/60 backdrop-blur-md px-4 py-3 text-xs font-mono tracking-widest text-white/80 hover:text-white hover:border-white/40 transition-colors"
      >
        <span
          className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
            enabled ? "bg-emerald-400" : "bg-white/40"
          }`}
        >
          {enabled && (
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
          )}
        </span>
        <span>{enabled ? "SOUND ON" : "SOUND OFF"}</span>
      </button>
    </>
  );
}
