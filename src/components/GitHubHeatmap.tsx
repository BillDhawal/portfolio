"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamic-import the calendar with SSR disabled. The library fetches
// contribution data on the client, so SSRing it produces empty markup that
// then mismatches on hydration. Skipping SSR avoids the warning entirely.
const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((m) => m.GitHubCalendar),
  {
    ssr: false,
    loading: () => (
      <div className="h-[140px] w-full animate-pulse rounded-md bg-white/[0.03]" />
    ),
  }
);

const calendarTheme = {
  light: ["#1a1a1a", "#0e4429", "#006d32", "#26a641", "#39d353"],
  dark: ["#171717", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

type ApiResponse = {
  total: Record<string, number> & { lastYear?: number };
  contributions: { date: string; count: number; level: number }[];
};

export default function GitHubHeatmap({ username }: { username: string }) {
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then((r) => r.json() as Promise<ApiResponse>)
      .then((data) => {
        if (cancelled) return;
        const sum = data.contributions.reduce((acc, d) => acc + d.count, 0);
        setTotal(sum);
      })
      .catch(() => {
        // API hiccup — total stays null and the count quietly hides
      });
    return () => {
      cancelled = true;
    };
  }, [username]);

  return (
    <div>
      <div className="flex items-baseline gap-4 mb-6">
        <span className="text-5xl sm:text-6xl font-semibold tracking-tight tabular-nums">
          {total !== null ? total : "—"}
        </span>
        <span className="font-mono text-xs text-white/60 tracking-widest uppercase">
          contributions this year
        </span>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 overflow-x-auto [&_.react-activity-calendar__count]:hidden">
        <GitHubCalendar
          username={username}
          theme={calendarTheme}
          colorScheme="dark"
          blockSize={12}
          blockMargin={4}
          blockRadius={2}
          fontSize={12}
          style={{ color: "rgba(255,255,255,0.7)" }}
        />
      </div>
    </div>
  );
}
