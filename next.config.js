/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Optimize for production builds
  swcMinify: true,
  // Increase static page generation timeout
  staticPageGenerationTimeout: 120,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.mapsrankchecker.com' }],
        destination: 'https://mapsrankchecker.com/:path*',
        permanent: true,
      },
    ]
  },
  // Expose environment variables to browser
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API_KEY,
  },
  // Reduce build memory usage
  experimental: {
    // This helps with build performance
  },
}

module.exports = nextConfig
