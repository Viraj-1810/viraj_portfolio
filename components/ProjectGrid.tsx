import type { Project } from "@/content/projects";
import ProjectCard from "./ProjectCard";

/** Responsive, mobile-first grid: 1 → 2 → 3 columns. */
export default function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, i) => (
        <li key={project.slug} className="h-full">
          <ProjectCard project={project} priority={i < 3} />
        </li>
      ))}
    </ul>
  );
}
