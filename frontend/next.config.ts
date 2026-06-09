import type { NextConfig } from "next";

const isCloudflare = process.env.CLOUDFLARE_EXPORT === "1";

const nextConfig: NextConfig = {
  devIndicators: false,
  output: isCloudflare ? "export" : "standalone",
  images: isCloudflare ? { unoptimized: true } : undefined,
};

export default nextConfig;
