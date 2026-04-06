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
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
