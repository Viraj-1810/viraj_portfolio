import { projects, type Project } from "@/content/projects";

/** All projects, featured first. */
export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) => Number(b.featured) - Number(a.featured));
}

/** Only the featured projects (shown on the home page). */
export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

/** Look up a single project by its slug. */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Every slug — used by generateStaticParams and the sitemap. */
export function getAllSlugs(): string[] {
  return projects.map((p) => p.slug);
}
