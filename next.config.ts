import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // Ensure base path resolution in export (optional)
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
