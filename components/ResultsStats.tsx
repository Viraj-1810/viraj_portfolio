import { site } from "@/lib/site";

/** Measurable-results band shown on the home page. */
export default function ResultsStats() {
  return (
    <section aria-labelledby="results-heading" className="mx-auto max-w-6xl px-4 sm:px-6">
      <h2 id="results-heading" className="sr-only">
        Results at a glance
      </h2>
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
        {site.stats.map((stat) => (
          <div key={stat.label} className="bg-surface p-6 text-center sm:p-8">
            <dt className="order-2 mt-1 text-sm text-muted">{stat.label}</dt>
            <dd className="order-1 text-2xl font-bold text-gradient sm:text-3xl">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
