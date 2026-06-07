import type { NextConfig } from "next";

const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isProjectSite =
  Boolean(process.env.GITHUB_ACTIONS) &&
  repo != null &&
  !repo.endsWith(".github.io");
const basePath = isProjectSite ? `/${repo}` : "";

const nextConfig: NextConfig = {
  output: "export",
  ...(basePath ? { basePath } : {}),
  // Exposed to the client so non-Next asset loaders (e.g. Howler audio) can
  // resolve files in /public against the GitHub Pages project base path.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
