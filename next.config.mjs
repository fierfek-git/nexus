/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    const securityHeaders = [
      // Don't let browsers guess MIME types.
      { key: "X-Content-Type-Options", value: "nosniff" },
      // Disallow embedding the site in frames (clickjacking defense).
      { key: "X-Frame-Options", value: "DENY" },
      // Never leak the URL to third parties via the Referer header.
      { key: "Referrer-Policy", value: "no-referrer" },
      // Drop powerful browser features we never use.
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
      },
    ]

    return [
      { source: "/:path*", headers: securityHeaders },
      // The price API may be cached by a CDN for ~30s, matching our TTL.
      {
        source: "/api/monero-price",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=30, stale-while-revalidate=60",
          },
        ],
      },
    ]
  },
}

export default nextConfig
