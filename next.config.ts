import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Pin the workspace root so Next.js ignores lockfiles in parent directories.
  // Don't generate an AGENTS.md file in the project root.
  agentRules: false,
  turbopack: {
    root: dirname,
  },
  experimental: {
    // Two root layouts ([locale] and (payload)), so unmatched URLs
    // need a 404 that renders its own <html>: src/app/global-not-found.tsx.
    globalNotFound: true,
  },
  images: {
    // Event photos uploaded through the CMS are served from Vercel Blob in production.
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
    localPatterns: [{ pathname: "/images/**" }, { pathname: "/api/media/file/**" }],
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
