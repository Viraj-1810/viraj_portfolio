import { testimonials } from "@/lib/site";
import SectionHeading from "./SectionHeading";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={i < rating ? "#f5b301" : "none"}
          stroke={i < rating ? "#f5b301" : "currentColor"}
          aria-hidden="true"
        >
          <path
            d="M12 2l3 6.5 7 .9-5 4.8 1.3 7L12 17.8 5.4 21.2 6.7 14l-5-4.8 7-.9z"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="mx-auto max-w-6xl px-4 py-20 sm:px-6"
    >
      <SectionHeading
        id="testimonials-heading"
        eyebrow="Client reviews"
        title="What clients say"
        description="Verbatim 5-star reviews from completed Fiverr orders with international clients."
      />
      <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {testimonials.map((t) => (
          <li key={t.author}>
            <figure className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6">
              <Stars rating={t.rating} />
              <blockquote className="mt-4 text-lg font-medium text-foreground">
                “{t.quote}”
              </blockquote>
              <p className="mt-3 text-sm text-muted">{t.service}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {t.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md border border-border bg-surface-2 px-2 py-0.5 text-xs text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-crimson/15 font-bold text-crimson"
                >
                  {t.author.charAt(0).toUpperCase()}
                </span>
                <span className="text-sm">
                  <span className="font-semibold">{t.author}</span>
                  <span className="block text-muted">{t.location}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
