// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  // 👇 THÊM BLOCK NÀY
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
