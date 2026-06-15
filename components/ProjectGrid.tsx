import type { Project } from "@/content/projects";
import ProjectCard from "./ProjectCard";

/**
 * Responsive, mobile-first grid.
 * - columns=3 (default): 1 → 2 → 3 columns, standard cards.
 * - columns=2: 1 → 2 columns with larger, bolder cards (featured).
 */
export default function ProjectGrid({
  projects,
  columns = 3,
}: {
  projects: Project[];
  columns?: 2 | 3;
}) {
  const cols =
    columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";
  const size = columns === 2 ? "large" : "default";

  return (
    <ul className={`grid grid-cols-1 gap-6 ${cols}`}>
      {projects.map((project, i) => (
        <li key={project.slug} className="h-full">
          <ProjectCard project={project} priority={i < 3} size={size} />
        </li>
      ))}
    </ul>
  );
}
