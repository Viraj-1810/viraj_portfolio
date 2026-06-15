type Props = {
  /** Used for the aria-labelledby link from the parent <section>. */
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
}: Props) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-crimson">
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-base text-muted sm:text-lg">{description}</p>}
    </div>
  );
}
