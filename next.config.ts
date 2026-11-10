import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages.
 * The Pages workflow sets NEXT_PUBLIC_BASE_PATH to "/<repo>" so links and
 * assets resolve under https://<user>.github.io/<repo>/. Locally it is empty,
 * so `npm run dev` still serves the site at the root.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // /privacy -> /privacy/index.html, which every static host serves without rewrites.
  trailingSlash: true,
  images: {
    // GitHub Pages has no server to resize images, so they load as authored.
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
