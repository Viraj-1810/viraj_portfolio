import type { Metadata } from "next";
import ProjectGrid from "@/components/ProjectGrid";
import SectionHeading from "@/components/SectionHeading";
import ContactCTA from "@/components/ContactCTA";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "AI/ML and full-stack projects: a shipped voice assistant product, deep-learning systems, RAG copilots, and NLP tools.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <>
      <section
        aria-labelledby="projects-heading"
        className="mx-auto max-w-6xl px-4 pb-10 pt-28 sm:px-6 sm:pt-28"
      >
        <SectionHeading
          id="projects-heading"
          eyebrow="Portfolio"
          title="Projects & case studies"
          description="Selected AI/ML and full-stack work. Each links to a detailed case study covering the problem, architecture, and results."
        />
      </section>
      <div className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
        <ProjectGrid projects={projects} />
      </div>
      <ContactCTA />
    </>
  );
}
