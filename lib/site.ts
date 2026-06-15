/**
 * Global site configuration — single source of truth for identity,
 * social links, and SEO defaults. Edit values here; nothing is hard-coded
 * in components.
 */
export const site = {
  name: "Viraj Gupta",
  // Production URL — drives absolute OG/canonical URLs + sitemap (metadataBase).
  url: "https://virajportfolio1.vercel.app",
  role: "AI/ML & Full-Stack Developer",
  tagline:
    "I build voice assistants, LLM apps, and custom AI automation, shipped to real, paying clients across the world.",
  shortBio:
    "I build production AI: retrieval augmented LLM apps, real-time voice assistants, and deep-learning systems. I turn research grade ideas into packaged products people pay for, with a 100% completion rate and 5-star reviews from international clients.",
  heroBio:
    "Computer Science graduate and freelance AI developer. I ship voice assistants, LLM apps and custom automation for real clients: fast, reliable, and built to last.",
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
    { label: "In client sales", value: "$250+" },
    { label: "Order completion", value: "100%" },
    { label: "International reviews", value: "5★" },
    { label: "Certified Developer", value: "AWS" },
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
      "Build and ship custom AI assistants and automation for international clients, earning 5-star reviews for delivery speed and code quality.",
      "$250+ in freelance sales at a 100% order completion rate across global clients.",
      "Productized a tactical voice assistant into Achilles, a rebrandable, one-click desktop app.",
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
    quote: "Mannnnn! these guys are good and fast delivery.",
    author: "Marcus G.",
    location: "United States",
    rating: 5,
    service: "Voice-controlled AI desktop assistant with RAG and AI agents",
    tags: ["Code expertise", "Delivery time", "Exceeded expectations"],
  },
  {
    quote: "Great developer, easy to work with and quick responses.",
    author: "razzalgul",
    location: "United Kingdom",
    rating: 5,
    service: "Fully functional Jarvis AI assistant for PC",
    tags: ["Proactive communication", "Quick responsiveness", "Politeness"],
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
