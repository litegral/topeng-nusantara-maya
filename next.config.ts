import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "asset.museum-digital.org" },
      { protocol: "https", hostname: "storage.litegral.com" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "litegral.com" },
      { protocol: "https", hostname: "koropak.co.id" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "cdn.antaranews.com" },
      { protocol: "https", hostname: "s3.us-east-1.wasabisys.com" },
      { protocol: "https", hostname: "malangpagi.com" },
      { protocol: "https", hostname: "kecweleri.kendalkab.go.id" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "kabarbaik.co" },
      { protocol: "https", hostname: "img.antarafoto.com" },
      { protocol: "https", hostname: "cdn.antaranews.com" },
    ],
  },
};

export default nextConfig;
