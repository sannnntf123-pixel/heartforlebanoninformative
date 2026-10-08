import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so Next.js ignores lockfiles in parent directories.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
