import type { Project } from "@/content/projects";

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-muted">
          <span
            aria-hidden="true"
            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Renders the body sections of a case-study page. */
export default function CaseStudy({ project }: { project: Project }) {
  const { caseStudy } = project;
  return (
    <div className="space-y-12">
      <section aria-labelledby="cs-problem">
        <h2 id="cs-problem" className="text-2xl font-bold tracking-tight">
          The problem
        </h2>
        <p className="mt-4 text-muted">{caseStudy.problem}</p>
      </section>

      <section aria-labelledby="cs-approach">
        <h2 id="cs-approach" className="text-2xl font-bold tracking-tight">
          Approach
        </h2>
        <p className="mt-4 text-muted">{caseStudy.approach}</p>
      </section>

      <section aria-labelledby="cs-architecture">
        <h2 id="cs-architecture" className="text-2xl font-bold tracking-tight">
          Architecture
        </h2>
        <CheckList items={caseStudy.architecture} />
      </section>

      <div className="grid gap-12 lg:grid-cols-2">
        <section aria-labelledby="cs-challenges">
          <h2 id="cs-challenges" className="text-2xl font-bold tracking-tight">
            Challenges
          </h2>
          <CheckList items={caseStudy.challenges} />
        </section>

        <section aria-labelledby="cs-results">
          <h2 id="cs-results" className="text-2xl font-bold tracking-tight">
            Results
          </h2>
          <CheckList items={caseStudy.results} />
        </section>
      </div>
    </div>
  );
}
