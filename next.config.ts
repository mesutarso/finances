import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "maj.finances.gouv.cd",
        protocol: "https",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  cacheComponents: true,
};

export default nextConfig;
