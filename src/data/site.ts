// Single source of truth for site content. Both the homepage sections and
// /proof-of-work render from this module.

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectImage = {
  src: string;
  alt: string;
};

export type Project = {
  title: string;
  status: string; // short badge line, e.g. "Shipped · iOS App Store"
  blurb: string; // one-liner for homepage cards
  stack: string;
  year: string;
  tint: string;
  links: ProjectLink[];
  // Proof-of-work framing — short sentences; built is rendered as bullets
  problem: string;
  built: string[];
  role: string;
  outcome: string;
  videoId?: string; // YouTube id of a demo, embedded inline where present
  video?: string; // self-hosted demo video (path under /public)
  videoCaption?: string; // context line under the player
  images?: ProjectImage[]; // screenshots, shown in a hover-scroll gallery
  imageLayout?: "phone" | "wide"; // phone = 2-col grid of tall shots
};

export const projects: Project[] = [
  {
    title: "PubMed RAG",
    status: "MS Capstone · Team project",
    blurb:
      "A RAG system answering biomedical queries over 18,000 PubMed articles with cited PubMed IDs — LangChain ReAct + Weaviate.",
    stack: "Python · LangChain · Weaviate",
    year: "2025",
    tint: "from-sky-500/20 to-transparent",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/BillDhawal/RAG_PubMedCentral",
      },
      {
        label: "My 13 commits",
        href: "https://github.com/BillDhawal/RAG_PubMedCentral/commits?author=BillDhawal",
      },
    ],
    problem:
      "Biomedical answers must be grounded in the literature. A vanilla LLM hallucinates citations — disqualifying in this domain.",
    built: [
      "Ingested 18,015 PubMed Central papers — 239,161 chunks, ~13 per document — embedded into Weaviate.",
      "LangChain ReAct agent reasons over PubMed and Wikipedia retrievers.",
      "Every answer grounded with cited PubMed IDs.",
      "Streamlit UI for querying the literature in real time.",
    ],
    role: "MS capstone (University of Arizona), team of four — I built the RAG chain and the Streamlit UI. My 13 commits are linked above: agent context windows, LLM model switching, Weaviate configuration, and prompt engineering.",
    outcome:
      "Citation-backed answers over the full corpus, presented at the capstone showcase. The repo lives under the team fork — hence GitHub's fork banner.",
    images: [
      { src: "/pow/pubmed/ui-1.jpg", alt: "System architecture — Streamlit UI, LangChain ReAct agent, PubMed and Wikipedia retrievers over Weaviate" },
      { src: "/pow/pubmed/ui-2.jpg", alt: "The app answering a cardiovascular-risk query with findings cited by PubMed ID" },
      {
        src: "/pow/pubmed/ui-3.jpg",
        alt: "Presenting the PubMed Agentic RAG poster at the University of Arizona capstone showcase",
      },
    ],
    imageLayout: "wide",
  },
  {
    title: "Voice AI Order Agent — Digirestro",
    status: "Client work · Built from scratch",
    blurb:
      "Voice agents that take restaurant orders and reservations by phone, integrated with the client's kitchen POS. The AI was the easy part — real-time audio, barge-in, and accents are where the engineering lives.",
    stack: "Vapi · Azure AI Foundry · Azure · Real-time audio",
    year: "2026",
    tint: "from-violet-500/20 to-transparent",
    links: [],
    problem:
      "Digirestro, a startup building POS and payment systems for restaurants, wanted voice AI agents to take orders and reservations over the phone — restaurants lose revenue every time nobody can pick up at peak hours. Getting an LLM to hold the conversation is straightforward; making it feel human on a real phone line is not.",
    built: [
      "Built the system from scratch and integrated it with Digirestro's kitchen POS, so a phone order reaches the kitchen the same way a counter order does.",
      "Evaluated three platforms end to end — Azure Voice Live (full pipeline control, but you build the telephony bridge yourself), Infobip (solid telephony, not designed for AI agents), and Vapi (managed STT + LLM + TTS).",
      "Shipped the first version on Infobip, then hit a wall: it buffers up to 1024 audio frames (~20 seconds) with no way to flush mid-stream, so the agent physically could not be interrupted.",
      "Solved barge-in with real-time audio frame pacing that keeps the buffer nearly empty. A 3ms difference in frame timing — 17ms versus 20ms — was the line between responsive and broken.",
      "Migrated to Vapi for agent orchestration: dynamic per-restaurant agent creation, plus tool integrations for date/time handling and a menu refresh service.",
      "Built a restaurant onboarding flow so a new venue is provisioned with its own agent and menu.",
      "Deployed on Azure using Azure AI Foundry resources, with a database for orders and history, and analytics tracking per-model cost.",
    ],
    role: "Solo — built the product end to end for the client: platform evaluation, the real-time audio pipeline and barge-in fix, POS integration, Azure deployment, agent orchestration, and the cost-analytics layer.",
    outcome:
      "Interruption latency went from 1–3 seconds to under 100ms, and orders flow from a phone call straight into the kitchen POS. The honest finding: speech models still mishear regional accents — 'biryani' comes back as 'burrito' — a model-level limitation no amount of prompting fixes. For a product serving Indian restaurants that is the primary failure mode, not an edge case. Vapi ships fastest, but per-minute pricing scales poorly at hundreds of calls a day.",
    video: "/pow/voiceai/demo.mp4",
    videoCaption:
      "Early demo — the Infobip build. The product has since moved to Vapi, with restaurant onboarding, dynamic agent creation, and tool integrations.",
  },
  {
    title: "ProdShoot — AI Product Photography",
    status: "MVP · Demo below",
    blurb:
      "Turn a simple product photo into professional product photography by chatting with AI — new backgrounds, props, and compositions, with selectable image-generation models.",
    stack: "TypeScript · Image generation",
    year: "2026",
    tint: "from-cyan-500/20 to-transparent",
    links: [
      {
        label: "LinkedIn post",
        href: "https://www.linkedin.com/posts/dhawalgajwe_pomelli-productphotography-googlelabs-activity-7430504187987353600-3GSv",
      },
    ],
    problem:
      "Studio product photography is expensive. Small sellers have a phone photo and no budget.",
    built: [
      "Upload a product photo, describe the shot in chat, get studio-style images back.",
      "New backgrounds, props, and compositions from a single source photo.",
      "Switch between multiple image-generation models to compare results on the same brief.",
    ],
    role: "Solo — a curiosity project, built as an MVP.",
    outcome: "Working demo below. Shared publicly on LinkedIn.",
    video: "/pow/prodshoot/demo.mp4",
  },
  {
    title: "Dhammapada Comics",
    status: "Shipped · iOS App Store",
    blurb:
      "All 423 verses of the Dhammapada as AI-illustrated comics — translations and the story behind each verse. Fully offline, no accounts, no ads.",
    stack: "Python · OpenAI · Diffusion · React Native · AWS",
    year: "2026",
    tint: "from-amber-500/20 to-transparent",
    links: [
      {
        label: "App Store",
        href: "https://apps.apple.com/us/app/dhammapada-comics-app/id6765621799",
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/dhammapada_comic/",
      },
    ],
    problem:
      "A 2,300-year-old Buddhist text of 423 verses — still published as plain text. Nothing visual. Nothing a modern reader reaches for.",
    built: [
      "Multimodal pipeline (async Python · OpenAI · KIE.ai · Higgsfield · edge-TTS · MoviePy) that turns all 423 verses into comic panels and Video reels.",
      "Character-bible system keeps characters visually consistent across stateless diffusion models.",
      "React Native (Expo, TypeScript) iOS app on AWS Lambda + API Gateway + S3, with offline fallback on device.",
      "Marketing loop automated with the Claude Agent SDK + Playwright: each verse becomes an Instagram Reel — frames, animation, voiceover, captions — published daily to @dhammapada_comic.",
    ],
    role: "Solo — concept, pipeline, app, infra, automation.",
    outcome: "Live on the App Store. Daily Reels publish with minimal manual work.",
    images: [
      { src: "/pow/dhammapada/ss-4.jpg", alt: "Comic reading view — Verse 1 as a four-panel illustrated comic" },
      { src: "/pow/dhammapada/ss-2.jpg", alt: "Dhammapada Comics app screenshot" },
      { src: "/pow/dhammapada/ss-3.jpg", alt: "Dhammapada Comics app screenshot" },
      { src: "/pow/dhammapada/ss-5.jpg", alt: "Dhammapada Comics app screenshot" },
      { src: "/pow/dhammapada/ss-6.jpg", alt: "Dhammapada Comics app screenshot" },
      { src: "/pow/dhammapada/ss-1.jpg", alt: "App splash screen — Ancient verses, illustrated" },
    ],
    imageLayout: "phone",
  },
  {
    title: "LockedIn — Focus Timer",
    status: "Shipped · iOS App Store",
    blurb:
      "A minimalist focus timer with a retro LCD interface — block and Pomodoro sessions, plus a Strict Mode that blocks distracting apps. 100% private, on-device.",
    stack: "Swift · SwiftUI · Family Controls",
    year: "2026",
    tint: "from-emerald-500/20 to-transparent",
    links: [
      {
        label: "App Store",
        href: "https://apps.apple.com/us/app/lockedin-focus-timer/id6772834368",
      },
    ],
    problem:
      "Focus apps ship with accounts, subscriptions, and analytics. I wanted one that does one thing well and never phones home.",
    built: [
      "Native SwiftUI app with a retro-LCD interface.",
      "Block and Pomodoro sessions, stats, and streak tracking.",
      "Strict Mode blocks distracting apps via Apple Family Controls.",
      "AI coding assistants used to accelerate SwiftUI development.",
    ],
    role: "Solo — design, build, App Store release.",
    outcome: "Live on the App Store. All data stays on device.",
    images: [
      { src: "/pow/lockedin/ss-1.jpg", alt: "LockedIn — two finishes, one focus: retro LCD timer in dark and light" },
      { src: "/pow/lockedin/ss-2.jpg", alt: "LockedIn promotional screenshot" },
      { src: "/pow/lockedin/ss-3.jpg", alt: "LockedIn promotional screenshot" },
      { src: "/pow/lockedin/ss-4.jpg", alt: "LockedIn promotional screenshot" },
      { src: "/pow/lockedin/ss-5.jpg", alt: "LockedIn promotional screenshot" },
    ],
    imageLayout: "phone",
  },
  {
    title: "ColdConnect",
    status: "Live · coldconnect.vercel.app",
    blurb:
      "An AI tool that connects you with the right job recruiters — finds the contact, drafts the cold email, sends it for you.",
    stack: "TypeScript · LLMs",
    year: "2025",
    tint: "from-indigo-500/20 to-transparent",
    links: [
      { label: "GitHub", href: "https://github.com/BillDhawal/coldconnect" },
      { label: "Live", href: "https://coldconnect.vercel.app" },
      {
        label: "Demo video",
        href: "https://www.youtube.com/watch?v=OnezGbdCDy0",
      },
    ],
    problem:
      "Cold outreach works — but finding the right recruiter and writing each email takes hours per application.",
    built: [
      "Finds the right recruiter for a role.",
      "Drafts a personalized cold email with an LLM.",
      "Sends it — one click end to end.",
    ],
    role: "Solo — product, engineering, deployment.",
    outcome: "Live on the web, with a public demo video.",
    videoId: "OnezGbdCDy0",
  },
  {
    title: "Transformers from Scratch",
    status: "Code + 4-part article series",
    blurb:
      "A Transformer implemented from scratch in PyTorch for English→Italian translation — custom multi-head attention, positional encodings, training loop.",
    stack: "Python · PyTorch",
    year: "2025",
    tint: "from-rose-500/20 to-transparent",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/BillDhawal/transformers_from_scratch",
      },
      {
        label: "Article series",
        href: "https://www.linkedin.com/pulse/implementing-transformers-from-scratch-part-1-input-dhawal-gajwe-0bnwf/",
      },
    ],
    problem:
      "Using transformers is easy. Understanding them is not. I wanted to build one from a blank file — and explain every component.",
    built: [
      "Full encoder-decoder Transformer in PyTorch — no prebuilt model code.",
      "Custom multi-head attention, positional encodings, layer norm, training loop.",
      "Trained on opus_books for English→Italian translation.",
      "4-part article series explaining each component.",
    ],
    role: "Solo — implementation and writing.",
    outcome: "A working translation model and a published 4-part series.",
  },
];

export type Role = {
  company: string;
  title: string;
  period: string;
  location: string;
  bullets: string[];
  logo?: string; // path under /public; falls back to initials when absent
  client?: { name: string; logo?: string }; // consulting client, shown beside the company
};

export const experience: Role[] = [
  {
    company: "AVSI Systems",
    title: "AI Engineer",
    period: "Jun 2026 — Present",
    location: "Portsmouth, NH",
    logo: "/logos/avsi.png",
    client: { name: "FedPoint", logo: "/logos/fedpoint.png" },
    bullets: [
      "Authored a Terraform IaC stack of 80+ resources (VPC, IAM, KMS, Lambda, ECS, SQS, API Gateway, WAF, CloudWatch, Secrets Manager) that standardizes environment parity and cuts deployment time.",
      "Built a serverless RAG chatbot admin platform on AWS (API Gateway, Lambda, ECS Fargate, SQS, S3, OpenSearch) with a JWT-secured CloudFront + S3 admin UI — administrators deploy and update chatbots across environments in minutes.",
      "Designed a TypeScript/Fastify admin API with 60+ endpoints for multi-tenant management of applications, chatbots, environments, RBAC, and knowledge bases, on pluggable Postgres/SQLite adapters.",
    ],
  },
  {
    company: "WEX",
    title: "AI/ML/NLP Engineer",
    period: "Aug 2025 — Feb 2026",
    location: "Chicago, IL",
    logo: "/logos/wex.png",
    bullets: [
      "Designed and scaled an AI-driven claims auto-adjudication system (LangChain, OpenAI LLMs, OCR pipelines) — 40% of insurance claims reimbursed automatically with no manual intervention, served by FastAPI inference endpoints for real-time decisioning.",
      "Built end-to-end NLP pipelines extracting, normalizing, and validating structured data from unstructured claim documents, with MLOps practices for automated testing and monitoring.",
      "Clustered historical claims to find high-confidence adjudication patterns, expanding automated coverage by a further 2%; deployed models on AzureML.",
    ],
  },
  {
    company: "McAfee",
    title: "Software Engineer",
    period: "Aug 2019 — Aug 2024",
    location: "India",
    logo: "/logos/mcafee.png",
    bullets: [
      "Led design of App Control plugin features using OSQuery and Auditd, improving endpoint threat detection across Linux/Unix environments.",
      "Implemented CI/CD pipelines with Jenkins and Groovy, cutting manual testing effort by 40%; standardized Kubernetes/Docker deployments, reducing operational errors by 30%.",
      "Strengthened CIS security hardening in Python, Lua, and C++, improving compliance scores by 25%.",
    ],
  },
  {
    company: "IBM",
    title: "Software Engineering Intern",
    period: "Jun 2018 — Jul 2018",
    location: "India",
    logo: "/logos/ibm.png",
    bullets: [
      "Built a web-based CMDB interface (Node.js, Python, MongoDB) to visualize dynamic configuration data for enterprise IT operations.",
      "Boosted data retrieval speeds by 25% through schema optimization and efficient indexing in MongoDB.",
    ],
  },
];

export type Video = {
  id: string; // YouTube video id
  title: string;
  note?: string;
};

export const videos: Video[] = [
  {
    id: "caahGCCqNfc",
    title: "Build a 24/7 AI Dev Team: How to Deploy Autonomous Agents",
    note: "Agents that write code and open PRs, running around the clock.",
  },
  {
    id: "JTX08F6Dw2c",
    title: "Understanding ReAct LLM Agents using LangGraph",
    note: "How ReAct agents reason and act, built step by step in LangGraph.",
  },
  {
    id: "XgMH_qT_dug",
    title: "I Used Claude Skills to Transform My Landing Page Design",
    note: "Step-by-step redesign driven by Claude Skills.",
  },
  {
    id: "OnezGbdCDy0",
    title: "ColdConnect — an AI tool that sends cold emails for you",
    note: "Automating job outreach in one click.",
  },
  // Product-photography MVP: add { id: "<youtube-id>", title: "AI Product
  // Photography MVP", note: "Chat with AI to turn a product photo into studio
  // shots." } once the LinkedIn video is uploaded to YouTube.
];

export type Article = {
  title: string;
  source: string;
  href: string;
};

export const articles: Article[] = [
  {
    title: "The Four Families of Post-Training, Part 1 — Supervised Fine-Tuning",
    source: "Medium",
    href: "https://medium.com/@dgajwe/the-four-families-of-post-training-part-1-supervised-fine-tuning-7d842875425d",
  },
  {
    title: "Transformers from Scratch, Part 1 — Input Embeddings",
    source: "LinkedIn",
    href: "https://www.linkedin.com/pulse/implementing-transformers-from-scratch-part-1-input-dhawal-gajwe-0bnwf/",
  },
  {
    title: "Transformers from Scratch, Part 2 — Positional Embeddings",
    source: "LinkedIn",
    href: "https://www.linkedin.com/pulse/transformers-from-scratch-step-2-positional-embeddings-dhawal-gajwe-12bbf/",
  },
  {
    title: "Transformers from Scratch, Part 3 — Layer Normalization & Feed-Forward",
    source: "LinkedIn",
    href: "https://www.linkedin.com/pulse/step-3-layer-normalization-feed-forward-transformers-dhawal-gajwe-chfgf/",
  },
  {
    title: "Transformers from Scratch, Part 4 — Multi-Head Attention",
    source: "LinkedIn",
    href: "https://www.linkedin.com/pulse/step-4-implementing-transformers-from-scratch-multihead-dhawal-gajwe-slpef/",
  },
];

export const contact = {
  email: "dhawalcodes@gmail.com",
  github: "https://github.com/BillDhawal",
  linkedin: "https://www.linkedin.com/in/dhawalgajwe/",
  site: "https://www.thewallcodes.com",
};
