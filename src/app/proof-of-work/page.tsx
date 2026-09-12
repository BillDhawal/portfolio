import type { Metadata } from "next";
import Link from "next/link";
import AutoPlayVideo from "@/components/AutoPlayVideo";
import { ClientBadge, LogoChip } from "@/components/CompanyMark";
import Reveal from "@/components/Reveal";
import Rich from "@/components/Rich";
import ScreenshotMarquee from "@/components/ScreenshotMarquee";
import ScrollProgress from "@/components/ScrollProgress";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { articles, contact, experience, projects, videos } from "@/data/site";

export const metadata: Metadata = {
  title: "Proof of Work — Dhawal Gajwe",
  description:
    "Shipped apps, production AI systems, and open code — problem, solution, role, and outcome for each. Dhawal Gajwe, AI/ML engineer.",
  openGraph: {
    title: "Proof of Work — Dhawal Gajwe",
    description:
      "Shipped apps, production AI systems, and open code — problem, solution, role, and outcome for each.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
  alternates: { canonical: "/proof-of-work" },
};

// Dense, reviewer-facing page. Deliberately plain: no music, no scroll
// theatrics — a hiring engineer should get the full picture in ~3 minutes.
export default function ProofOfWork() {
  const featured = projects.filter((project) => project.tier !== "also");
  return (
    <main className="min-h-screen bg-white text-black px-6 sm:px-12 lg:px-20 py-20 sm:py-24">
      <ScrollProgress />
      <div className="max-w-[1240px] mx-auto">
        {/* Header */}
        <header className="relative mb-28 overflow-x-clip">
          <div
            className="absolute -left-10 top-24 text-[13rem] sm:text-[19rem] font-bold text-black/[0.025] leading-none select-none pointer-events-none whitespace-nowrap"
            aria-hidden
          >
            thewallcodes
          </div>

          <div className="relative">
          <Link
            href="/"
            className="font-mono text-xs text-black/40 hover:text-black transition-colors"
          >
            ← thewallcodes.com
          </Link>
          <h1 className="mt-8 text-4xl sm:text-6xl font-semibold tracking-tight">
            Dhawal Gajwe
          </h1>
          <p className="mt-4 text-lg text-black/70 max-w-2xl leading-relaxed">
            AI/ML engineer — 6+ years shipping production systems, from endpoint
            security at McAfee to LLM platforms and two live iOS apps. This page
            is the proof: what I built, why, and what came of it.
          </p>

          {/* the five-second version — everything below is the evidence */}
          <ul className="mt-8 max-w-2xl space-y-2 text-black/80 leading-relaxed">
            {[
              "Built a **voice ordering agent solo, design to deploy** — barge-in latency **1–3s → under 100ms**; two restaurants onboarding.",
              "Automated **40% of insurance claim adjudication** at WEX with an LLM + OCR pipeline.",
              "**2 iOS apps shipped solo** to the App Store; **50+ real users** on an open-source outreach tool.",
            ].map((line) => (
              <li
                key={line}
                className="pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-black/30"
              >
                <Rich text={line} />
              </li>
            ))}
          </ul>

          <p className="mt-6 font-mono text-xs tracking-[0.15em] uppercase text-black/50">
            Open to roles in AI, ML, and security
          </p>
          {/* companies, straight after the intro line they describe */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-black/40">
              Worked at
            </span>
            {experience.map((role) => (
              <span
                key={role.company}
                className="flex items-center gap-2"
                title={role.company}
              >
                <LogoChip logo={role.logo} name={role.company} />
                <span className="font-mono text-xs text-black/60">
                  {role.company}
                </span>
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={contact.cal}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 text-xs font-mono rounded-full bg-black text-white hover:bg-black/80 transition-colors"
            >
              Book 15 min ↗
            </a>
            {[
              { label: "GitHub", href: contact.github },
              { label: "LinkedIn", href: contact.linkedin },
              { label: "Email", href: `mailto:${contact.email}` },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  l.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="px-3 py-1.5 text-xs font-mono border border-black/15 rounded-full text-black/70 hover:text-black hover:border-black/40 transition-colors"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
          </div>
        </header>

        {/* Experience */}
        <section aria-labelledby="experience-heading" className="relative mb-32 overflow-x-clip">
          <div
            className="absolute -left-10 top-0 text-[16rem] sm:text-[22rem] font-bold text-black/[0.025] leading-none select-none pointer-events-none whitespace-nowrap"
            aria-hidden
          >
            EXPERIENCE
          </div>
          <h2
            id="experience-heading"
            className="relative font-mono text-xs tracking-[0.3em] text-black/50 uppercase mb-10"
          >
            Experience
          </h2>
          <div className="space-y-12 relative">
            {experience.map((role) => (
              <Reveal key={role.company}>
                <article className="border-t border-black/10 pt-8">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <LogoChip logo={role.logo} name={role.company} />
                    <h3 className="text-xl sm:text-2xl font-semibold">
                      {role.company}{" "}
                      <span className="font-normal text-black/60">
                        — {role.title}
                      </span>
                    </h3>
                    {role.client && <ClientBadge client={role.client} />}
                  </div>
                  <span className="font-mono text-xs text-black/40 tracking-widest">
                    {role.period}
                  </span>
                </div>
                <ul className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-3">
                  {role.bullets.map((bullet, j) => (
                    <li
                      key={j}
                      className="text-black/75 leading-relaxed pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-black/30"
                    >
                      <Rich text={bullet} />
                    </li>
                  ))}
                </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section aria-labelledby="projects-heading" className="relative mb-32 overflow-x-clip">
          <div
            className="absolute right-0 top-0 text-[16rem] sm:text-[22rem] font-bold text-black/[0.025] leading-none select-none pointer-events-none whitespace-nowrap"
            aria-hidden
          >
            PROJECTS
          </div>
          <h2
            id="projects-heading"
            className="relative font-mono text-xs tracking-[0.3em] text-black/50 uppercase mb-10"
          >
            Projects
          </h2>

          {[
            { key: "product", label: "Product work — built for users" },
            { key: "research", label: "Research" },
          ].map((group) => (
          <div key={group.key} className="relative mb-24">
            <h3 className="font-mono text-[11px] tracking-[0.25em] uppercase text-black/40 mb-6">
              {group.label}
            </h3>
            <div className="space-y-24">
            {featured
              .filter((project) => project.tier === group.key)
              .map((project) => {
              const i = featured.indexOf(project);
              return (
              <Reveal key={project.title}>
                <article className="border-t border-black/10 pt-12">
                <div className="flex flex-wrap items-baseline justify-between gap-3 mb-1">
                  <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                    <span className="font-mono text-sm text-black/40 mr-3">
                      0{i + 1}
                    </span>
                    {project.title}
                  </h3>
                  <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-black/50">
                    {project.status}
                  </span>
                </div>
                <p className="font-mono text-xs text-black/40 mb-6">
                  {project.stack} · {project.year}
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  <div
                    className={
                      project.imageLayout === "phone"
                        ? "lg:col-span-8"
                        : "lg:col-span-6"
                    }
                  >
                    <dl className="space-y-5 text-black/80 leading-relaxed">
                      <div>
                        <dt className="font-mono text-sm tracking-[0.2em] uppercase text-black/50 mb-2">
                          Problem
                        </dt>
                        <dd><Rich text={project.problem} /></dd>
                      </div>
                      <div>
                        <dt className="font-mono text-sm tracking-[0.2em] uppercase text-black/50 mb-2">
                          What I built
                        </dt>
                        <dd>
                          <ul className="space-y-2">
                            {project.built.map((item, j) => (
                              <li
                                key={j}
                                className="pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-black/30"
                              >
                                <Rich text={item} />
                              </li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                      <div>
                        <dt className="font-mono text-sm tracking-[0.2em] uppercase text-black/50 mb-2">
                          My role
                        </dt>
                        <dd><Rich text={project.role} /></dd>
                      </div>
                      <div>
                        <dt className="font-mono text-sm tracking-[0.2em] uppercase text-black/50 mb-2">
                          Outcome
                        </dt>
                        <dd><Rich text={project.outcome} /></dd>
                      </div>
                      {project.learned && (
                        <div>
                          <dt className="font-mono text-sm tracking-[0.2em] uppercase text-black/50 mb-2">
                            What I learned
                          </dt>
                          <dd className="text-black/70"><Rich text={project.learned} /></dd>
                        </div>
                      )}
                      {project.credit && (
                        <div>
                          <dt className="font-mono text-sm tracking-[0.2em] uppercase text-black/50 mb-2">
                            Credit
                          </dt>
                          <dd className="text-black/60"><Rich text={project.credit} /></dd>
                        </div>
                      )}
                    </dl>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 text-xs font-mono border border-black/15 rounded-full text-black/70 hover:text-black hover:border-black/40 transition-colors"
                        >
                          {link.label} ↗
                        </a>
                      ))}
                    </div>

                  </div>

                  {(project.videoId || project.video) && (
                    <div className="lg:col-span-6 lg:sticky lg:top-12">
                      {project.videoId ? (
                        <YouTubeEmbed
                          videoId={project.videoId}
                          title={`${project.title} — demo`}
                        />
                      ) : (
                        <AutoPlayVideo
                          src={project.video!}
                          caption={project.videoCaption}
                        />
                      )}
                    </div>
                  )}

                  {project.images && project.imageLayout === "phone" && (
                    <div className="lg:col-span-4 lg:sticky lg:top-12">
                      <ScreenshotMarquee images={project.images} />
                    </div>
                  )}

                  {project.images && project.imageLayout !== "phone" && (
                    <div className="lg:col-span-6 lg:sticky lg:top-12">
                      <ScreenshotMarquee
                        images={project.images}
                        layout="wide"
                      />
                    </div>
                  )}
                </div>
                </article>
              </Reveal>
              );
            })}
            </div>
          </div>
          ))}

          {/* smaller pieces, one line each — kept for honesty, not for weight */}
          <div className="relative border-t border-black/10 pt-10">
            <h3 className="font-mono text-[11px] tracking-[0.25em] uppercase text-black/40 mb-6">
              Also built
            </h3>
            <ul className="space-y-4 max-w-3xl">
              {projects
                .filter((project) => project.tier === "also")
                .map((project) => (
                  <li key={project.title} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-semibold">{project.title}</span>
                    <span className="text-black/60">— {project.blurb}</span>
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-black/50 hover:text-black underline underline-offset-4 decoration-black/20"
                      >
                        {link.label} ↗
                      </a>
                    ))}
                  </li>
                ))}
            </ul>
          </div>
        </section>


        {/* Videos */}
        <section aria-labelledby="videos-heading" className="relative mb-32 overflow-x-clip">
          <div
            className="absolute right-0 top-0 text-[16rem] sm:text-[22rem] font-bold text-black/[0.025] leading-none select-none pointer-events-none whitespace-nowrap"
            aria-hidden
          >
            VIDEOS
          </div>
          <h2
            id="videos-heading"
            className="relative font-mono text-xs tracking-[0.3em] text-black/50 uppercase mb-10"
          >
            Videos — watch the work
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 relative">
            {videos.map((video, i) => (
              <Reveal key={video.id} delay={(i % 3) * 0.08}>
                <YouTubeEmbed videoId={video.id} title={video.title} />
                <h3 className="mt-3 font-medium">{video.title}</h3>
                {video.note && (
                  <p className="mt-1 text-sm text-black/50">{video.note}</p>
                )}
              </Reveal>
            ))}
          </div>
        </section>

        {/* Writing */}
        <section aria-labelledby="writing-heading" className="relative mb-32 overflow-x-clip">
          <div
            className="absolute -left-10 top-0 text-[16rem] sm:text-[22rem] font-bold text-black/[0.025] leading-none select-none pointer-events-none whitespace-nowrap"
            aria-hidden
          >
            WRITING
          </div>
          <h2
            id="writing-heading"
            className="relative font-mono text-xs tracking-[0.3em] text-black/50 uppercase mb-10"
          >
            Writing
          </h2>
          <Reveal>
          <ul className="border-b border-black/10 max-w-5xl relative">
            {articles.map((article) => (
              <li key={article.href} className="border-t border-black/10">
                <a
                  href={article.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between gap-6 py-4 hover:bg-black/[0.02] transition-colors"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    {article.title}
                    <span className="inline-block ml-2 text-black/30 group-hover:text-black/70 transition-colors">
                      ↗
                    </span>
                  </span>
                  <span className="font-mono text-xs text-black/40 tracking-widest shrink-0">
                    {article.source.toUpperCase()}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          </Reveal>
        </section>

        {/* Footer CTA */}
        <footer className="border-t border-black/10 pt-10 pb-8">
          <p className="text-black/70">
            Happy to walk through any of this live —{" "}
            <a
              href={contact.cal}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black underline underline-offset-4 decoration-black/30 hover:decoration-black transition-colors"
            >
              book 15 minutes
            </a>{" "}
            or{" "}
            <a
              href={`mailto:${contact.email}`}
              className="text-black underline underline-offset-4 decoration-black/30 hover:decoration-black transition-colors"
            >
              {contact.email}
            </a>
          </p>
          <p className="mt-6 font-mono text-xs text-black/30 tracking-widest">
            © 2026 DHAWAL GAJWE
          </p>
        </footer>
      </div>
    </main>
  );
}
