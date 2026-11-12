import type { NextConfig } from "next";

const NEW_SITE = "https://www.truegetherth.com";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async redirects() {
    // This domain has moved to www.truegetherth.com (owner's decision, 2026-11-12).
    return [
      { source: "/home", destination: NEW_SITE, permanent: true },
      { source: "/boardband", destination: `${NEW_SITE}/broadband`, permanent: true },
      { source: "/monthly", destination: `${NEW_SITE}/monthy`, permanent: true },
      { source: "/about", destination: `${NEW_SITE}/service`, permanent: true },
      { source: "/login", destination: NEW_SITE, permanent: true },
      { source: "/dashboard/:path*", destination: NEW_SITE, permanent: true },
      // Everything else keeps its path. Google's ownership file stays here so
      // Search Console can still verify this domain for the change of address.
      { source: "/", destination: NEW_SITE, permanent: true },
      { source: "/:path((?!google[0-9a-z]+\.html$).+)", destination: `${NEW_SITE}/:path`, permanent: true },
    ];
  },
};


export default nextConfig;
