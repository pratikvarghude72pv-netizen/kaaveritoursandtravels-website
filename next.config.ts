import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // English and Marathi use separate root layouts, so unmatched URLs need a global 404.
  experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;
