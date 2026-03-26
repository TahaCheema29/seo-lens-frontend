import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/analyze-site-seo",
        permanent: false
      },
      {
        source: "/admin",
        destination: "/admin/dashboard",
        permanent: false
      },
    ];
  },
};

export default nextConfig;
