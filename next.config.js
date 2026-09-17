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
    ]
  },
}

module.exports = nextConfig

