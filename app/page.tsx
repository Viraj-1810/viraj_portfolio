import Link from "next/link";
import Hero from "@/components/Hero";
import ResultsStats from "@/components/ResultsStats";
import ProjectGrid from "@/components/ProjectGrid";
import SkillsSection from "@/components/SkillsSection";
import Testimonials from "@/components/Testimonials";
import ContactCTA from "@/components/ContactCTA";
import SectionHeading from "@/components/SectionHeading";
import { getFeaturedProjects } from "@/lib/projects";

export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <>
      <Hero />

      <div className="mt-16">
        <ResultsStats />
      </div>

      <section
        aria-labelledby="featured-heading"
        className="mx-auto max-w-6xl px-4 py-20 sm:px-6"
      >
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            id="featured-heading"
            eyebrow="Selected work"
            title="Featured projects"
            description="A paid, shipped product and a deep-learning system, plus more on the projects page."
          />
          <Link
            href="/projects"
            className="hidden shrink-0 text-sm font-semibold text-crimson hover:text-crimson-bright sm:inline"
          >
            All projects →
          </Link>
        </div>
        <div className="mt-10">
          <ProjectGrid projects={featured} columns={2} />
        </div>
        <div className="mt-8 sm:hidden">
          <Link href="/projects" className="text-sm font-semibold text-crimson">
            All projects →
          </Link>
        </div>
      </section>

      <SkillsSection />

      <Testimonials />

      <ContactCTA />
    </>
  );
}
