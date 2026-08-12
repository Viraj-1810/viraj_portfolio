/**
 * Global site configuration — single source of truth for identity,
 * social links, and SEO defaults. Edit values here; nothing is hard-coded
 * in components.
 */
export const site = {
  name: "Viraj Gupta",
  // Production URL (live on Vercel) — drives absolute OG/canonical URLs +
  // sitemap via metadataBase in app/layout.tsx.
  url: "https://virajportfolio1.vercel.app",
  role: "AI/ML & Full-Stack Developer",
  tagline:
    "I build AI assistants, LLM apps, and automated trading systems, shipped to real, paying clients across the world.",
  shortBio:
    "I build production software: retrieval augmented LLM apps, real-time voice assistants, deep-learning systems, and live automated-trading bots. I turn research grade ideas into reliable products people pay for, with 9 delivered orders and a 4.9-star average from international clients.",
  heroBio:
    "Computer Science graduate and freelance developer. I ship AI assistants, LLM apps, and live automated-trading systems for real clients: fast, reliable, and built to last.",
  email: "viraj1810@gmail.com",
  location: "India · Remote",
  availability: "Open to freelance projects and full-time AI/ML roles",
  // Hero portrait.
  photo: "/images/viraj.jpg",
  socials: {
    github: "https://github.com/Viraj-1810",
    linkedin: "https://www.linkedin.com/in/viraj-gupta-825824253",
    fiverr: "",
  },
  // Headline numbers shown in the results band.
  stats: [
    { label: "In client sales", value: "$2,100+" },
    { label: "Orders delivered", value: "9" },
    { label: "Average rating", value: "4.9★" },
    { label: "On-time completion", value: "100%" },
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
      "Whisper STT",
      "TensorFlow / Keras",
      "ResNet50 · CV",
      "Edge / ElevenLabs TTS",
      "Prompt engineering",
    ],
  },
  {
    title: "Backend & data",
    items: ["Python", "FastAPI", "Flask", "REST APIs", "SSE streaming", "MongoDB", "SQL", "pandas", "NumPy"],
  },
  {
    title: "Frontend",
    items: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Streamlit", "WebGL / GLSL"],
  },
  {
    title: "Trading & systems",
    items: ["TradingView webhooks", "REST broker APIs", "Backtesting", "Risk management", "Recharts", "pytest", "Linux / systemd", "VPS deploy"],
  },
  {
    title: "Languages & tooling",
    items: ["C / C++", "Java", "Git", "Docker", "AWS", "GCP", "PyInstaller", "n8n", "Vercel"],
  },
];

/** Work experience, newest first. Shown on the About page. */
export const experience: {
  role: string;
  org: string;
  period: string;
  points: string[];
}[] = [
  {
    role: "Freelance AI Developer",
    org: "Fiverr",
    period: "Jan 2026 to Present",
    points: [
      "Design, build, and maintain custom AI assistants, automations, and live trading systems for international clients, with a 4.9-star average across 9 delivered orders.",
      "$2,100+ in freelance sales at a 100% on-time completion rate, with repeat, ongoing-collaboration clients.",
      "Shipped Achilles: a live automated stock-trading system (execution bot, real-time control dashboard, and backtesting engine) plus a rebrandable white-label voice assistant.",
    ],
  },
  {
    role: "AI Research Intern",
    org: "Coding Jr",
    period: "May 2025 to Aug 2025",
    points: [
      "Built AI-powered chatbots and coding assistants with Streamlit, the Groq API, and LangChain.",
      "Shipped an AI coding assistant, a RAG based PDF chatbot, and an AI traffic prediction system.",
      "Applied ML and prompt engineering to deploy real-time solutions for varied business use cases.",
    ],
  },
];

/** Certifications relevant to AI/ML & development. */
export const certifications: { name: string; issuer: string; date: string }[] = [
  {
    name: "AWS Certified Developer Associate",
    issuer: "Infosys Springboard",
    date: "Mar 2026",
  },
  {
    name: "Natural Language Processing for Developers",
    issuer: "Infosys Springboard",
    date: "Nov 2025",
  },
  {
    name: "Software Engineering Job Simulation",
    issuer: "Electronic Arts / Forage",
    date: "Apr 2025",
  },
];

/** Real client testimonials (verbatim from Fiverr 5-star reviews). */
export const testimonials: {
  quote: string;
  author: string;
  location: string;
  rating: number;
  service: string;
  tags: string[];
}[] = [
  {
    quote: "as always Viraj gives great work. autotrade connect is right here.",
    author: "Marcus G.",
    location: "United States",
    rating: 5,
    service: "Automated trading bot (TradingView to live broker)",
    tags: ["Repeat client", "Reliable delivery", "Ongoing collaboration"],
  },
  {
    quote: "This guy is very good at what he does.",
    author: "Marcus G.",
    location: "United States",
    rating: 5,
    service: "Trading bot and automation development",
    tags: ["Deep expertise", "Fast delivery", "Repeat client"],
  },
  {
    quote: "Great developer, easy to work with and quick responses.",
    author: "razzalgul",
    location: "United Kingdom",
    rating: 5,
    service: "Fully functional Jarvis AI assistant for PC",
    tags: ["Proactive communication", "Quick responsiveness", "Politeness"],
  },
  {
    quote: "Mannnnn! these guys are good and fast delivery.",
    author: "Marcus G.",
    location: "United States",
    rating: 5,
    service: "Voice-controlled AI desktop assistant with RAG and AI agents",
    tags: ["Code expertise", "Delivery time", "Exceeded expectations"],
  },
];

/** Education, newest first. College first, then schooling. */
export const education: {
  degree: string;
  school: string;
  location: string;
  period: string;
}[] = [
  {
    degree: "B.Tech, Computer Science",
    school: "Jaypee University of Engineering and Technology",
    location: "Guna, Madhya Pradesh",
    period: "Aug 2022 to May 2026",
  },
  {
    degree: "Schooling (CBSE)",
    school: "Amity International School, Pushp Vihar",
    location: "New Delhi",
    period: "Completed 2022",
  },
];
