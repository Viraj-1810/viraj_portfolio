/**
 * Single source of truth for every project shown on the site.
 * Cards, the projects grid, case-study pages, the sitemap and OG images all
 * read from this array. Add a project = add an object here.
 */

export type Metric = { label: string; value: string };

export type ProjectStatus =
  | "Paid product"
  | "Open source"
  | "Collaboration";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  year: string;
  role: string;
  status: ProjectStatus;
  /** Short blurb shown on the card. */
  summary: string;
  /** Cover art (16:9). Generated into /public/images. */
  cover: string;
  coverAlt: string;
  tech: string[];
  links: {
    github?: string;
    demo?: string;
    /** Achilles is a paid product — shown via demo video instead of code. */
    video?: string;
  };
  metrics: Metric[];
  featured: boolean;
  caseStudy: {
    problem: string;
    approach: string;
    architecture: string[];
    challenges: string[];
    results: string[];
  };
};

export const projects: Project[] = [
  {
    slug: "achilles",
    name: "Achilles",
    tagline: "White-label tactical AI assistant, shipped as a desktop app",
    year: "2025",
    role: "Solo developer · product owner",
    status: "Paid product",
    summary:
      "A premium, voice-driven AI assistant delivered to a paying client as a one-click Windows app — streaming chat, real-time web search, RAG memory, wake-word voice, and live n8n automation, fully rebrandable per buyer.",
    cover: "/images/cover-achilles.svg",
    coverAlt:
      "Crimson tactical heads-up display with a glowing orb, representing the Achilles AI assistant",
    tech: [
      "FastAPI",
      "Python",
      "Groq · Llama 3.3 70B",
      "LangChain",
      "FAISS RAG",
      "HuggingFace embeddings",
      "Tavily search",
      "edge-tts / ElevenLabs",
      "SSE streaming",
      "React + Tailwind",
      "WebGL / GLSL",
      "PyInstaller",
      "n8n",
    ],
    // Paid product: demo video instead of source / live link.
    // Google Drive video (must stay shared as "Anyone with the link – Viewer").
    links: {
      video:
        "https://drive.google.com/file/d/1R4GmY0C6kF3x6kmVcyM-N8fHuG4hVsOh/view?usp=sharing",
    },
    metrics: [
      { label: "First token", value: "0.3–1s" },
      { label: "Time to first TTS audio", value: "~1s" },
      { label: "Client review", value: "5★" },
      { label: "Rebranding", value: "Per-buyer" },
    ],
    featured: true,
    caseStudy: {
      problem:
        "A client wanted a personal, premium AI assistant they could run on their own PC and trigger by voice — not another browser tab. It had to feel like a product, install in one step, use their own API keys, carry their branding, and fire real automations into their existing tooling.",
      approach:
        "I built a single FastAPI server that hosts both the API and the UI, then packaged the whole thing into a signed-style Windows executable with PyInstaller. Responses stream token-by-token over Server-Sent Events while text-to-speech is generated in the background and streamed inline, so the assistant starts speaking on the first sentence instead of waiting for the full reply. Every buyer-facing string, name and voice is driven by a build-time config so the same codebase rebrands into a new product in minutes.",
      architecture: [
        "FastAPI app serving SSE chat endpoints + the static web UI on one port",
        "Groq (Llama 3.3 70B) for inference with primary-first multi-key failover",
        "General vs Realtime modes — Realtime extracts a clean query and runs Tavily web search before answering",
        "FAISS vector store over learning-data files and past chats with local HuggingFace embeddings (no embedding API cost)",
        "Inline TTS pipeline: sentences detected mid-stream, synthesized in a thread pool, streamed as base64 audio in order",
        "WebGL/GLSL orb that animates only while speaking; React + Tailwind front-end",
        "Per-buyer white-label config + persistent user-data dir; n8n webhook automation for real-world actions",
        "Packaged to a one-click Windows .exe with PyInstaller",
      ],
      challenges: [
        "Latency: speaking only after a full response felt dead — solved by speaking on the first clause and streaming audio inline.",
        "Reliability: free-tier rate limits — solved with multi-key primary-first failover so a dead key is invisible to the user.",
        "Data safety: an assistant that forgot everything on restart was unshippable — fixed with a persistent per-buyer user-data directory.",
        "Distribution: non-technical install — packaged to a single .exe and wrote a remote-install runbook (SmartScreen, keys, n8n demo).",
      ],
      results: [
        "Shipped to a paying US client as a finished, installable product — earned a 5-star review (“these guys are good and fast delivery”).",
        "First token in 0.3–1s; first spoken audio ~1s after the first sentence.",
        "Same codebase rebrands per buyer — the basis for a repeatable productized offer.",
        "Live n8n integration: a spoken command fires a real workflow event end-to-end.",
      ],
    },
  },
  {
    slug: "lung-care",
    name: "Pneumonia Detection",
    tagline: "ResNet50 + autoencoder hybrid for chest X-ray diagnosis",
    year: "2024",
    role: "ML engineer · team collaboration",
    status: "Collaboration",
    summary:
      "An end-to-end deep-learning pipeline that detects pneumonia from chest X-rays, combining an autoencoder for denoising and feature extraction with a transfer-learned ResNet50 classifier into a hybrid model.",
    cover: "/images/cover-lung-care.svg",
    coverAlt:
      "Chest X-ray overlaid with a neural-network motif in crimson, representing pneumonia detection",
    tech: [
      "Python",
      "TensorFlow / Keras",
      "ResNet50",
      "Autoencoder",
      "Transfer learning",
      "OpenCV",
      "NumPy",
    ],
    links: { github: "https://github.com/Viraj-1810/lung-care" },
    metrics: [
      { label: "Models", value: "3 (AE · ResNet50 · Hybrid)" },
      { label: "Approach", value: "Transfer learning" },
      { label: "Domain", value: "Medical imaging" },
      { label: "Pipeline", value: "End-to-end" },
    ],
    featured: true,
    caseStudy: {
      problem:
        "Chest X-rays are noisy and pneumonia cues are subtle, so a single off-the-shelf classifier tends to be brittle. The goal was a robust, reproducible pipeline — from data loading through training to inference — rather than a one-off notebook.",
      approach:
        "I structured the project into clean, swappable modules (data, models, training, utils) and implemented three approaches: an autoencoder for denoising and feature extraction, a ResNet50 classifier with a custom head via transfer learning, and a hybrid that fuses the autoencoder's features with ResNet50 for the strongest signal. Each model has its own training entry point and shared evaluation/visualization utilities.",
      architecture: [
        "Autoencoder for image denoising + compact feature extraction",
        "ResNet50 (ImageNet pre-trained) with a custom classification head",
        "Hybrid model fusing autoencoder features with ResNet50 representations",
        "Separate training pipelines per model + a unified main training entry point",
        "Reusable data loader/preprocessing and metrics/visualization utilities",
        "inference.py for running predictions on new chest X-rays",
      ],
      challenges: [
        "Noisy inputs degraded classification — addressed with autoencoder denoising upstream of the classifier.",
        "Limited labelled medical data — mitigated with ImageNet transfer learning instead of training from scratch.",
        "Comparability — kept three approaches behind a common interface so results could be measured against each other.",
      ],
      results: [
        "A reproducible, modular deep-learning pipeline rather than a throwaway notebook.",
        "Three comparable approaches, with the hybrid targeting the best accuracy.",
        "Clear separation of data / models / training / inference for easy extension.",
      ],
    },
  },
  {
    slug: "vscode-ai-copilot",
    name: "VS Code AI Copilot",
    tagline: "A privacy-friendly RAG coding copilot, as a VS Code extension",
    year: "2024",
    role: "Solo developer",
    status: "Open source",
    summary:
      "A VS Code extension that answers coding questions in a sidebar chat using Groq Llama 3, and grounds answers in your own files via RAG with local HuggingFace embeddings — no cloud embedding costs.",
    cover: "/images/cover-vscode-copilot.svg",
    coverAlt:
      "Code editor sidebar with a retrieval graph linking documents, in crimson and black",
    tech: [
      "TypeScript",
      "VS Code Extension API",
      "FastAPI",
      "sentence-transformers",
      "Groq · Llama 3",
      "RAG",
    ],
    links: { github: "https://github.com/Viraj-1810/VS-Code--AI-Copilot" },
    metrics: [
      { label: "Surface", value: "VS Code extension" },
      { label: "Embeddings", value: "Local / private" },
      { label: "Grounding", value: "RAG on your files" },
      { label: "LLM", value: "Groq Llama 3" },
    ],
    featured: false,
    caseStudy: {
      problem:
        "General AI copilots answer from the model's training data, not your codebase, and cloud embeddings add cost and send your code off-machine. I wanted a copilot that answers from your own files while keeping the embedding step local and private.",
      approach:
        "I built a VS Code extension with a chat sidebar wired to Groq's Llama 3 for fast responses, backed by a small local FastAPI server running HuggingFace sentence-transformers for embeddings. You upload files or paste snippets; those become the retrieval corpus, and for RAG questions the assistant answers only from that context.",
      architecture: [
        "VS Code extension (TypeScript) with a sidebar chat UI",
        "Local FastAPI sidecar running sentence-transformers for embeddings",
        "File upload + snippet paste populate the retrieval corpus",
        "Groq Llama 3 for generation; context-restricted answers for RAG queries",
        "Code completions and Q&A in one panel",
      ],
      challenges: [
        "Keeping code private — embeddings run locally instead of in the cloud.",
        "Relevance — answers for RAG questions are constrained to uploaded files/snippets to avoid hallucinated APIs.",
        "Latency — Groq inference keeps the chat responsive inside the editor.",
      ],
      results: [
        "A working, privacy-friendly copilot living inside the editor.",
        "Zero cloud-embedding cost via local sentence-transformers.",
        "Answers grounded in the developer's own files through RAG.",
      ],
    },
  },
  {
    slug: "codemate-ai",
    name: "CodeMate AI",
    tagline: "An LLM coding assistant with memory and explain/debug/refactor modes",
    year: "2024",
    role: "Solo developer",
    status: "Open source",
    summary:
      "A Streamlit coding assistant powered by Groq's Llama 3 and LangChain that explains, debugs and refactors code, remembers earlier messages in the session, and streams responses with syntax-highlighted output.",
    cover: "/images/cover-codemate.svg",
    coverAlt: "Terminal and chat bubbles merged into one interface, in crimson and black",
    tech: ["Python", "Streamlit", "LangChain", "Groq · Llama 3", "SQLite"],
    links: { github: "https://github.com/Viraj-1810/Codemate-AI-coding-assistant" },
    metrics: [
      { label: "Modes", value: "Explain · Debug · Refactor" },
      { label: "Memory", value: "Persistent session" },
      { label: "UX", value: "Streamed responses" },
      { label: "Stack", value: "Streamlit + LangChain" },
    ],
    featured: false,
    caseStudy: {
      problem:
        "Pasting code into a generic chatbot loses context between turns and gives one-size-fits-all answers. I wanted a focused coding assistant with task-specific modes that remembers the conversation.",
      approach:
        "I built a Streamlit app with mode tabs (Explain, Debug, Refactor) on top of LangChain for conversation and memory management, with Groq's Llama 3 doing the generation. The assistant keeps persistent session memory so it remembers earlier messages, streams responses for a fluid feel, and renders syntax-highlighted code with exportable history.",
      architecture: [
        "Streamlit web UI with Explain / Debug / Refactor mode tabs",
        "LangChain for conversation flow + memory management",
        "Groq Llama 3 for generation, with streamed output",
        "Persistent session memory (optionally backed by SQLite)",
        "Syntax-highlighted code blocks, markdown, light/dark toggle, export",
      ],
      challenges: [
        "Continuity — persistent memory so the assistant recalls earlier turns.",
        "Task fit — separate modes tune behaviour for explaining vs debugging vs refactoring.",
        "Feel — streamed responses keep the UI fluid instead of blocking on full replies.",
      ],
      results: [
        "A focused coding assistant that holds context across a session.",
        "Three purpose-built modes instead of a single generic prompt.",
        "Clean, exportable, syntax-highlighted developer UX.",
      ],
    },
  },
  {
    slug: "ai-meeting-scheduler",
    name: "AI Meeting Scheduler",
    tagline: "NLP-driven scheduling from group chat, as a REST API",
    year: "2024",
    role: "Backend / NLP developer",
    status: "Open source",
    summary:
      "A Flask REST API that reads multi-user group chats, detects meeting intent and extracts availability with spaCy NLP, then schedules meetings on participant consensus — backed by MongoDB Atlas.",
    cover: "/images/cover-meeting-scheduler.svg",
    coverAlt: "Calendar grid connected to NLP language nodes, in crimson and black",
    tech: ["Python", "Flask", "MongoDB Atlas", "spaCy", "NLP", "REST API"],
    links: { github: "https://github.com/Viraj-1810/AI-Meeting-Scheduler" },
    metrics: [
      { label: "Interface", value: "REST API" },
      { label: "NLP", value: "Intent + availability" },
      { label: "Store", value: "MongoDB Atlas" },
      { label: "Logic", value: "Consensus scheduling" },
    ],
    featured: false,
    caseStudy: {
      problem:
        "Scheduling inside a group chat is manual — someone reads the thread, figures out who's free, and proposes a time. I wanted to automate that by understanding the conversation directly.",
      approach:
        "I built a Flask REST API that stores group-chat messages and runs spaCy-powered NLP to detect when people are trying to schedule a meeting and to extract dates, times and availability from natural language. It then reconciles participant availability and schedules on consensus, persisting everything in MongoDB Atlas with proper indexing.",
      architecture: [
        "Flask REST API with endpoints for messages, users, and scheduling",
        "spaCy NLP for meeting-intent detection + availability/date-time extraction",
        "Consensus logic to schedule once participants align",
        "MongoDB Atlas persistence with indexing for chat + user data",
        "Health/stats endpoints for monitoring",
      ],
      challenges: [
        "Messy natural language — spaCy extraction turns conversational text into structured times.",
        "Group consensus — reconciling several people's availability into one slot.",
        "Clean API surface — REST endpoints for messages, users, and scheduling that other apps can call.",
      ],
      results: [
        "A working API that turns group-chat text into scheduled meetings.",
        "NLP intent detection + availability extraction over multi-user conversations.",
        "Persistent, indexed storage ready to plug into a chat front-end.",
      ],
    },
  },
];
