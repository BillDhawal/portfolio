import type { Metadata } from "next";
import Link from "next/link";
import AutoPlayVideo from "@/components/AutoPlayVideo";
import { ClientBadge, LogoChip } from "@/components/CompanyMark";
import Reveal from "@/components/Reveal";
import ScreenshotMarquee from "@/components/ScreenshotMarquee";
import ScrollProgress from "@/components/ScrollProgress";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { articles, contact, experience, projects, videos } from "@/data/site";

export const metadata: Metadata = {
  title: "Proof of Work — Dhawal Gajwe",
  description:
    "Shipped apps, production AI systems, and open code — problem, solution, role, and outcome for each. Dhawal Gajwe, AI/ML engineer.",
};

// Dense, reviewer-facing page. Deliberately plain: no music, no scroll
// theatrics — a hiring engineer should get the full picture in ~3 minutes.
export default function ProofOfWork() {
  return (
    <main className="min-h-screen bg-black text-white px-6 sm:px-12 lg:px-20 py-20 sm:py-24">
      <ScrollProgress />
      <div className="max-w-[1240px] mx-auto">
        {/* Header */}
        <header className="mb-28">
          <Link
            href="/"
            className="font-mono text-xs text-white/40 hover:text-white transition-colors"
          >
            ← thewallcodes.com
          </Link>
          <h1 className="mt-8 text-4xl sm:text-6xl font-semibold tracking-tight">
            Dhawal Gajwe
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl leading-relaxed">
            AI/ML engineer — 6+ years shipping production systems, from endpoint
            security at McAfee to LLM platforms and two live iOS apps. This page
            is the proof: what I built, why, and what came of it.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
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
                className="px-3 py-1.5 text-xs font-mono border border-white/15 rounded-full text-white/70 hover:text-white hover:border-white/40 transition-colors"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        </header>

        {/* Projects */}
        <section aria-labelledby="projects-heading" className="mb-32">
          <h2
            id="projects-heading"
            className="font-mono text-xs tracking-[0.3em] text-white/50 uppercase mb-10"
          >
            Projects
          </h2>

          <div className="space-y-24">
            {projects.map((project, i) => (
              <Reveal key={project.title}>
                <article className="border-t border-white/10 pt-12">
                <div className="flex flex-wrap items-baseline justify-between gap-3 mb-1">
                  <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                    <span className="font-mono text-sm text-white/40 mr-3">
                      0{i + 1}
                    </span>
                    {project.title}
                  </h3>
                  <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/50">
                    {project.status}
                  </span>
                </div>
                <p className="font-mono text-xs text-white/40 mb-6">
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
                    <dl className="space-y-5 text-white/80 leading-relaxed">
                      <div>
                        <dt className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/40 mb-1">
                          Problem
                        </dt>
                        <dd>{project.problem}</dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/40 mb-2">
                          What I built
                        </dt>
                        <dd>
                          <ul className="space-y-2">
                            {project.built.map((item, j) => (
                              <li
                                key={j}
                                className="pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-white/30"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/40 mb-1">
                          My role
                        </dt>
                        <dd>{project.role}</dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/40 mb-1">
                          Outcome
                        </dt>
                        <dd>{project.outcome}</dd>
                      </div>
                      {project.credit && (
                        <div>
                          <dt className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/40 mb-1">
                            Credit
                          </dt>
                          <dd className="text-white/60">{project.credit}</dd>
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
                          className="px-3 py-1.5 text-xs font-mono border border-white/15 rounded-full text-white/70 hover:text-white hover:border-white/40 transition-colors"
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
            ))}
          </div>
        </section>

        {/* Experience */}
        <section aria-labelledby="experience-heading" className="mb-32">
          <h2
            id="experience-heading"
            className="font-mono text-xs tracking-[0.3em] text-white/50 uppercase mb-10"
          >
            Experience
          </h2>
          <div className="space-y-12">
            {experience.map((role) => (
              <Reveal key={role.company}>
                <article className="border-t border-white/10 pt-8">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <LogoChip logo={role.logo} name={role.company} />
                    <h3 className="text-xl sm:text-2xl font-semibold">
                      {role.company}{" "}
                      <span className="font-normal text-white/60">
                        — {role.title}
                      </span>
                    </h3>
                    {role.client && <ClientBadge client={role.client} />}
                  </div>
                  <span className="font-mono text-xs text-white/40 tracking-widest">
                    {role.period}
                  </span>
                </div>
                <ul className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-3">
                  {role.bullets.map((bullet, j) => (
                    <li
                      key={j}
                      className="text-white/75 leading-relaxed pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-white/30"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Videos */}
        <section aria-labelledby="videos-heading" className="mb-32">
          <h2
            id="videos-heading"
            className="font-mono text-xs tracking-[0.3em] text-white/50 uppercase mb-10"
          >
            Videos — watch the work
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {videos.map((video, i) => (
              <Reveal key={video.id} delay={(i % 3) * 0.08}>
                <YouTubeEmbed videoId={video.id} title={video.title} />
                <h3 className="mt-3 font-medium">{video.title}</h3>
                {video.note && (
                  <p className="mt-1 text-sm text-white/50">{video.note}</p>
                )}
              </Reveal>
            ))}
          </div>
        </section>

        {/* Writing */}
        <section aria-labelledby="writing-heading" className="mb-32">
          <h2
            id="writing-heading"
            className="font-mono text-xs tracking-[0.3em] text-white/50 uppercase mb-10"
          >
            Writing
          </h2>
          <Reveal>
          <ul className="border-b border-white/10 max-w-5xl">
            {articles.map((article) => (
              <li key={article.href} className="border-t border-white/10">
                <a
                  href={article.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between gap-6 py-4 hover:bg-white/[0.02] transition-colors"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    {article.title}
                    <span className="inline-block ml-2 text-white/30 group-hover:text-white/70 transition-colors">
                      ↗
                    </span>
                  </span>
                  <span className="font-mono text-xs text-white/40 tracking-widest shrink-0">
                    {article.source.toUpperCase()}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          </Reveal>
        </section>

        {/* Footer CTA */}
        <footer className="border-t border-white/10 pt-10 pb-8">
          <p className="text-white/70">
            Happy to walk through any of this live —{" "}
            <a
              href={`mailto:${contact.email}`}
              className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors"
            >
              {contact.email}
            </a>
          </p>
          <p className="mt-6 font-mono text-xs text-white/30 tracking-widest">
            © 2026 DHAWAL GAJWE
          </p>
        </footer>
      </div>
    </main>
  );
}
