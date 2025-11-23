import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "asset.museum-digital.org" },
      { protocol: "https", hostname: "storage.litegral.com" },
    ],
  },
};

export default nextConfig;
