/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' to enable API routes on Vercel
  // API routes require server-side rendering
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'wp.hostlin.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@stripe/stripe-js', '@stripe/react-stripe-js'],
  },
  webpack: (config, { isServer }) => {
    // Ensure proper module resolution
    config.resolve = config.resolve || {}
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    }
    
    // Optimize bundle size
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          maxSize: 244000, // ~250KB chunks
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 5,
            },
          },
        },
        minimize: true,
      }
    }
    
    // Reduce bundle size by excluding unnecessary modules
    config.externals = config.externals || []
    
    return config
  },
  // Reduce build output size
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  // Disable source maps for production to reduce size
  productionBrowserSourceMaps: false,
  async headers() {
    return [
      {
        // Self-hosted images: the CDN they replaced served ~7-day cache headers,
        // whereas Next serves public/ as max-age=0 by default. Restores parity
        // with stale-while-revalidate so replacements still propagate quickly.
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/logoair2.png',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }],
      },
      {
        source: '/logoair2-white.png',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  // Permanent redirects for retired homepage service-card URLs that were
  // previously linked (and so may be indexed or backlinked) but never had
  // a real page behind them. Each maps to its replacement in
  // src/lib/serviceRoutes.ts. Sources use the trailing slash because
  // trailingSlash: true normalizes the bare path to this form first.
  async redirects() {
    return [
      { source: '/services/corporate-travel/', destination: '/services/chauffeur-services', permanent: true },
      { source: '/services/special-events/', destination: '/services/events-chauffeur-service', permanent: true },
      { source: '/services/wedding-chauffeurs/', destination: '/services/events-chauffeur-service', permanent: true },
      { source: '/services/executive-chauffeur/', destination: '/services/chauffeur-services', permanent: true },
      // /contact-us duplicated /contact (same purpose, no metadata of its own,
      // inheriting the generic root title/description) while still being the
      // target of ~25 internal "Contact Us" CTAs. Consolidated onto /contact,
      // which already has proper metadata, canonical and structured data.
      { source: '/contact-us/', destination: '/contact', permanent: true },
    ]
  },
}

module.exports = nextConfig 