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
}

module.exports = nextConfig 