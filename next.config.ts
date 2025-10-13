import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove static export to enable API routes
  trailingSlash: true,
  images: { unoptimized: true },
  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
