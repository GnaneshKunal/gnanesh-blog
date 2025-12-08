import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/logs',
        permanent: true,
      },
      {
        source: '/blog/:slug',
        destination: '/logs/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
