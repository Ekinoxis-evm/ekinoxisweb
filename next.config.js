/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  reactStrictMode: true,
  // PostHog is served from our own origin under /ingest so ad blockers, which
  // block *.posthog.com, do not erase the funnel. The SDK is told api_host=/ingest.
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      { source: '/ingest/static/:path*', destination: 'https://us-assets.i.posthog.com/static/:path*' },
      { source: '/ingest/:path*', destination: 'https://us.i.posthog.com/:path*' },
    ]
  },
  async redirects() {
    return [
      // /products was the single page holding products, client work and
      // experiments; it is now four divisions under /portfolio. Declared here
      // rather than as a page calling permanentRedirect(), because a
      // prerendered page emits a 308 with no Location header — only a JS
      // browser follows it, and crawlers hit a dead end.
      { source: '/products', destination: '/portfolio', permanent: true },
      // /certifications and /research were three pages saying closely related
      // things. They are now sections of /education — land on the anchor so the
      // visitor sees the part they asked for.
      { source: '/certifications', destination: '/education#certifications', permanent: true },
      { source: '/research', destination: '/education#research', permanent: true },
      // /culture merged into /about — land on its culture section.
      { source: '/culture', destination: '/about#culture', permanent: true },
      // /hackers is now the team band on /about.
      { source: '/hackers', destination: '/about#team', permanent: true },
      // The same legacy addresses under the Spanish prefix.
      { source: '/es/products', destination: '/es/portfolio', permanent: true },
      { source: '/es/certifications', destination: '/es/education#certifications', permanent: true },
      { source: '/es/research', destination: '/es/education#research', permanent: true },
      { source: '/es/culture', destination: '/es/about#culture', permanent: true },
      { source: '/es/hackers', destination: '/es/about#team', permanent: true },
    ]
  },
}

module.exports = nextConfig

