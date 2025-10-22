import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/site-crawler/",
        permanent: false
      },
    ];
  },
};

export default nextConfig;
