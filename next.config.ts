import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this folder (a stray lockfile exists higher up
  // in the user's home dir, which Next would otherwise infer as the root).
  turbopack: { root: import.meta.dirname },
  images: {
    // Cover/hero art is locally generated SVG in /public/images. These are
    // first-party, trusted files (no remote/user SVG is ever loaded), so it's
    // safe to let next/image serve them. The CSP sandboxes them regardless.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ["image/avif", "image/webp"],
    // Allow the ?v= cache-busting query on local cover images.
    localPatterns: [
      { pathname: "/images/**", search: "" },
      { pathname: "/images/**", search: "?v=2" },
    ],
  },
};

export default nextConfig;
