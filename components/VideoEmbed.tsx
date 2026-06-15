/**
 * Renders the Achilles demo video. Accepts either:
 *  - a local file path (e.g. /videos/achilles-demo.mp4) → native <video>
 *  - a YouTube, Loom, or Google Drive share URL → responsive <iframe>
 * Falls back to a friendly placeholder when no source is set yet.
 */
function toEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url, "https://placeholder.local");
    const host = u.hostname.replace("www.", "");
    if (host === "youtu.be") return `https://www.youtube.com/embed${u.pathname}`;
    if (host.endsWith("youtube.com")) {
      const id = u.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (host.endsWith("loom.com")) {
      return url.replace("/share/", "/embed/");
    }
    if (host.endsWith("drive.google.com")) {
      // .../file/d/<ID>/view  or  ...?id=<ID>
      const id = url.match(/\/file\/d\/([^/]+)/)?.[1] ?? u.searchParams.get("id");
      return id ? `https://drive.google.com/file/d/${id}/preview` : null;
    }
    return null;
  } catch {
    return null;
  }
}

export default function VideoEmbed({ src, title }: { src?: string; title: string }) {
  const isFile = !!src && /\.(mp4|webm|mov)$/i.test(src);
  const embed = src && !isFile ? toEmbedUrl(src) : null;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface-2">
      <div className="relative aspect-video">
        {isFile ? (
          <video
            controls
            preload="metadata"
            className="h-full w-full"
            aria-label={title}
          >
            <source src={src} />
            Your browser does not support the video tag.
          </video>
        ) : embed ? (
          <iframe
            src={embed}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center">
            <span
              aria-hidden="true"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-crimson-dim text-crimson"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <p className="text-sm text-muted">
              Demo video coming soon. Drop a file at <code>/public{src ?? "/videos/achilles-demo.mp4"}</code>{" "}
              or set a YouTube/Loom URL.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
