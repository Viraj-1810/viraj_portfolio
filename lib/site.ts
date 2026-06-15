/**
 * Global site configuration — single source of truth for identity,
 * social links, and SEO defaults. Edit values here; nothing is hard-coded
 * in components.
 */
export const site = {
  name: "Viraj Gupta",
  // Update once deployed (used for absolute OG/canonical URLs).
  url: "https://virajgupta.dev",
  role: "AI/ML & Full-Stack Developer",
  tagline:
    "I build voice assistants, LLM apps, and custom AI automation — shipped to real, paying clients.",
  shortBio:
    "Developer focused on production AI: retrieval-augmented LLM apps, real-time voice assistants, and deep-learning systems. I turn research-grade ideas into packaged products people pay for.",
  email: "viraj1810@gmail.com",
  location: "India · Remote-friendly",
  socials: {
    github: "https://github.com/Viraj-1810",
    // TODO: add your real profiles, or remove the lines you don't use.
    linkedin: "https://www.linkedin.com/in/viraj-gupta",
    fiverr: "",
  },
  // Headline numbers shown in the results band. Edit to taste.
  stats: [
    { label: "Paid product shipped", value: "1" },
    { label: "AI/ML projects built", value: "10+" },
    { label: "LLMs in production", value: "Groq · Llama 3" },
    { label: "First token latency", value: "0.3–1s" },
  ],
} as const;

/** Skills grouped for the skills section. */
export const skillGroups: { title: string; items: string[] }[] = [
  {
    title: "AI / ML",
    items: [
      "LLM apps (Groq, Llama 3)",
      "LangChain",
      "RAG / FAISS",
      "HuggingFace embeddings",
      "spaCy NLP",
      "TensorFlow / Keras",
      "ResNet50 · CV",
      "Edge / ElevenLabs TTS",
    ],
  },
  {
    title: "Backend",
    items: ["Python", "FastAPI", "Flask", "SSE streaming", "MongoDB", "SQLite", "REST APIs"],
  },
  {
    title: "Frontend",
    items: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Streamlit", "WebGL / GLSL"],
  },
  {
    title: "Tooling & delivery",
    items: ["VS Code extensions", "PyInstaller packaging", "n8n automation", "Git", "Vercel"],
  },
];
