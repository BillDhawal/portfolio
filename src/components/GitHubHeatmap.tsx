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
      <div className="h-[140px] w-full animate-pulse rounded-md bg-black/[0.03]" />
    ),
  }
);

const calendarTheme = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
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
      <div className="flex items-center gap-4 mb-6">
        <span className="text-5xl sm:text-6xl font-semibold tracking-tight tabular-nums">
          {total !== null ? total : "—"}
        </span>
        <span className="flex items-center gap-2 font-mono text-xs text-black/60 tracking-widest uppercase">
          {/* GitHub mark */}
          <svg
            viewBox="0 0 16 16"
            className="h-5 w-5 fill-black shrink-0"
            aria-hidden
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
          </svg>
          GitHub contributions this year
        </span>
      </div>

      <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-5 sm:p-6 overflow-x-auto [&_.react-activity-calendar__count]:hidden">
        <GitHubCalendar
          username={username}
          theme={calendarTheme}
          colorScheme="light"
          blockSize={12}
          blockMargin={4}
          blockRadius={2}
          fontSize={12}
          style={{ color: "rgba(0,0,0,0.65)" }}
        />
      </div>
    </div>
  );
}
