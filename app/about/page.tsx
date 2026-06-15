import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import SkillsSection from "@/components/SkillsSection";
import ContactCTA from "@/components/ContactCTA";
import { site, experience, certifications, education } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: site.shortBio,
};

const highlights = [
  "Shipped a paid, white-label voice-assistant product as a one-click desktop app.",
  "5-star reviews and a 100% completion rate across international freelance clients.",
  "Built RAG systems with FAISS and local HuggingFace embeddings — private and cost-free to run.",
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

      {/* Experience */}
      <section
        aria-labelledby="experience-heading"
        className="mx-auto max-w-3xl px-4 py-16 sm:px-6"
      >
        <h2 id="experience-heading" className="text-2xl font-bold tracking-tight">
          Experience
        </h2>
        <ol className="mt-8 space-y-8">
          {experience.map((job) => (
            <li
              key={`${job.org}-${job.role}`}
              className="border-l border-border pl-5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-semibold">
                  {job.role} ·{" "}
                  <span className="text-crimson">{job.org}</span>
                </h3>
                <span className="text-sm text-muted">{job.period}</span>
              </div>
              <ul className="mt-3 space-y-2">
                {job.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm text-muted">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-crimson"
                    />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      {/* Certifications + Education */}
      <section
        aria-labelledby="creds-heading"
        className="mx-auto max-w-3xl px-4 pb-8 sm:px-6"
      >
        <h2 id="creds-heading" className="text-2xl font-bold tracking-tight">
          Certifications &amp; education
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <ul className="space-y-4">
            {certifications.map((c) => (
              <li
                key={c.name}
                className="rounded-xl border border-border bg-surface p-4"
              >
                <p className="font-medium">{c.name}</p>
                <p className="mt-1 text-sm text-muted">
                  {c.issuer} · {c.date}
                </p>
              </li>
            ))}
          </ul>
          <div className="rounded-xl border border-border bg-surface p-4">
            <p className="font-medium">{education.degree}</p>
            <p className="mt-1 text-sm text-muted">{education.school}</p>
            <p className="text-sm text-muted">{education.location}</p>
            <p className="mt-2 text-sm text-crimson">{education.period}</p>
          </div>
        </div>
      </section>

      <SkillsSection />
      <ContactCTA />
    </>
  );
}
