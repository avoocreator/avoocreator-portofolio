import type { NextConfig } from "next";

// Akar proyek = folder tempat `next dev` dijalankan. Mencegah Turbopack "tersesat" ke
// package-lock.json di folder induk (mis. C:\\Users\\nama) — sumber peringatan
// "ignored package-lock.json" dan kadang ChunkLoadError saat dev.
const root = process.cwd();

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: { root },
  outputFileTracingRoot: root,
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        // Aset statis di /assets: cache sehari, boleh dipakai ulang sambil diperbarui di latar belakang
        source: "/assets/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
};

export default nextConfig;
