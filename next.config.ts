import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so Next.js ignores lockfiles in parent directories.
  turbopack: {
    root: __dirname,
  },
  experimental: {
    // The app has two root layouts ((template) and [locale]), so unmatched URLs
    // need a 404 page that renders its own <html>: src/app/global-not-found.tsx.
    globalNotFound: true,
  },
};

export default nextConfig;
