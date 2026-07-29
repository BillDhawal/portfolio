import type { Role } from "@/data/site";

// Company logo chip with initials fallback, plus an optional client badge
// ("Client: FedPoint" with the client's mark). Plain component — safe in both
// server and client trees.
export function LogoChip({
  logo,
  name,
  size = "md",
}: {
  logo?: string;
  name: string;
  size?: "sm" | "md";
}) {
  const box = size === "md" ? "h-10 w-10" : "h-5 w-5";
  if (!logo) {
    return (
      <span
        className={`${box} shrink-0 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center font-mono text-[10px] tracking-wider text-white/70`}
        aria-hidden
      >
        {name
          .split(/\s+/)
          .map((w) => w[0])
          .join("")
          .slice(0, 3)
          .toUpperCase()}
      </span>
    );
  }
  return (
    <span
      className={`${box} shrink-0 rounded-lg bg-white flex items-center justify-center overflow-hidden ${
        size === "md" ? "p-1.5" : "p-0.5"
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo}
        alt={`${name} logo`}
        className="h-full w-full object-contain"
      />
    </span>
  );
}

export function ClientBadge({ client }: { client: NonNullable<Role["client"]> }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/15 rounded-full">
      <LogoChip logo={client.logo} name={client.name} size="sm" />
      <span className="font-mono text-xs text-white/70">
        Client: {client.name}
      </span>
    </span>
  );
}
