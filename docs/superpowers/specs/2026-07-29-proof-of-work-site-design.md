# Proof-of-Work Site Expansion — Design

**Date:** 2026-07-29
**Goal:** Turn the portfolio into a proof-of-work submission for ENFOS (and future
applications). Reviewer-facing link: `thewallcodes.com/proof-of-work`.

## Structure — two pages

### 1. Homepage `/` (updated, keeps cinematic style)

Sections renumbered 01–05:

1. **Hero** — unchanged (scroll-scrubbed video, 5 panes).
2. **01 — About** — unchanged except floating pane indicator `01 / 03` → `01 / 05`.
3. **02 — Selected Work** — replace the 6 project cards with the curated set:
   1. **Dhammapada Comics** — App Store (id6765621799). AI comic pipeline for all
      423 verses + daily Reels automation. Shipped · iOS.
   2. **LockedIn – Focus Timer** — App Store (id6772834368). Retro-LCD timer,
      Strict Mode app blocking, on-device. Shipped · iOS.
   3. **ColdConnect** — GitHub + live (coldconnect.vercel.app) + demo video.
   4. **PubMed RAG** — GitHub (RAG_PubMedCentral). Labeled "MS capstone · team".
   5. **Transformers from Scratch** — GitHub + 4-part article series.
   6. **Osho AI** — GitHub + live (osho-ai.vercel.app).

   Dropped: job-matching-engine, Conversational_AI_For_Enterprises,
   langgraph_codeagent, finetuning_tutorials, Calorie Estimation.
   "See all 42 repos" → count-free "See more on GitHub".
   Cards gain multiple link chips (App Store / GitHub / Live / Video) instead of a
   single card-wide href.
4. **03 — Experience** *(new)* — timeline: AVSI (AI Engineer, Jun 2026–),
   WEX (AI/ML/NLP Engineer, Aug 2025–Feb 2026), McAfee (Software Engineer,
   Aug 2019–Aug 2024), IBM (SWE Intern, 2018). 2–3 resume bullets each.
5. **04 — Writing & Videos** *(new)* —
   - Videos, inline YouTube embeds (youtube-nocookie iframes, click-to-load
     thumbnail for perf): 24/7 AI Dev Team (caahGCCqNfc), Claude Skills landing
     page (XgMH_qT_dug), ReAct Agents w/ LangGraph (JTX08F6Dw2c), ColdConnect
     demo (OnezGbdCDy0). Product-photography MVP video: added when user uploads
     to YouTube (slot in data array).
   - Articles: Medium "Four Families of Post-Training, Pt 1 — SFT" + 4-part
     LinkedIn Transformers-from-Scratch series.
6. **05 — Contact** — footer, renumber from 03.

Navbar: Showcase · About · Work · Experience · Writing · Contact + distinct
"Proof of Work" link to `/proof-of-work`.

### 2. `/proof-of-work` (new, the ENFOS email link)

Dense, static, no music, no scroll theatrics, fast. Server component page with
`metadata` export. Content:

- Header: name, one-liner, links (GitHub, LinkedIn, email, homepage).
- Six projects, each: **Problem → What I built → Stack → My role → Outcome**
  + link chips + inline video embed where one exists (ColdConnect demo,
  Dhammapada reel automation, product-photography when available).
- Experience timeline (same data as homepage, denser rendering).
- Writing list.
- Footer CTA: email.

Shared data module `src/data/site.ts` exports projects, experience, videos,
articles — both pages render from one source of truth.

## Components

- `src/data/site.ts` — all content data (typed).
- `src/components/Experience.tsx` — homepage section.
- `src/components/Writing.tsx` — homepage section w/ `YouTubeEmbed`.
- `src/components/YouTubeEmbed.tsx` — client component; thumbnail
  (i.ytimg.com) + play button → swaps to autoplaying youtube-nocookie iframe on
  click. Videos play in place; user never leaves the site.
- `src/app/proof-of-work/page.tsx` — dense page (server component + small
  client bits for embeds).
- `Work.tsx` — rewritten cards (title/blurb/stack/year/status + link chips).

## Error handling / edge cases

- Missing product-photography video: data slot absent until URL provided; UI
  renders nothing for it (no placeholder box on the public site).
- YouTube thumbnails: `hqdefault.jpg` always exists (maxres does not for all
  videos) — use hqdefault.
- PubMed RAG fork: card and proof-of-work entry explicitly say
  "MS capstone (team project) — University of Arizona" so the GitHub
  "forked from" banner is pre-explained.

## Testing

- `npm run build` must pass (typecheck + lint).
- Manual: `npm run dev`, verify homepage sections, nav anchors, /proof-of-work,
  video embeds play inline.

## Out of scope

- transformers_from_scratch README (separate deliverable, drafted for user to
  paste on GitHub).
- ENFOS email draft (after site is live).
- GitHub repo hygiene (descriptions, hiding repos) — user's side.
