import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import SkillsSection from "@/components/SkillsSection";
import ContactCTA from "@/components/ContactCTA";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: site.shortBio,
};

const highlights = [
  "Shipped a paid, white-label voice-assistant product as a one-click desktop app.",
  "Built RAG systems with FAISS and local HuggingFace embeddings — private and cost-free to run.",
  "Comfortable across the stack: FastAPI/Flask back-ends, React/Next.js front-ends, and VS Code extensions.",
  "Deep-learning experience in medical imaging (ResNet50 + autoencoder hybrids).",
];

export default function AboutPage() {
  return (
    <>
      <section
        aria-labelledby="about-heading"
        className="mx-auto max-w-3xl px-4 pt-16 sm:px-6 sm:pt-24"
      >
        <SectionHeading
          id="about-heading"
          eyebrow="About"
          title={`Hi, I'm ${site.name}`}
          description={site.role}
        />
        <div className="mt-8 space-y-5 text-muted">
          <p>{site.shortBio}</p>
          <p>
            Most of my work lives at the intersection of LLMs and real products:
            streaming chat with inline text-to-speech, retrieval-augmented
            assistants grounded in a user&apos;s own files, and NLP services that
            turn messy human language into structured actions. I care about
            latency, reliability, and shipping things people actually pay for —
            not just demos.
          </p>
        </div>

        <ul className="mt-10 space-y-3">
          {highlights.map((h) => (
            <li key={h} className="flex gap-3 text-muted">
              <span
                aria-hidden="true"
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson"
              />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </section>

      <SkillsSection />
      <ContactCTA />
    </>
  );
}
