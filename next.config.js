/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Optimize for production builds
  swcMinify: true,
  // Increase static page generation timeout
  staticPageGenerationTimeout: 120,
  // Expose environment variables to browser
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  },
  // Reduce build memory usage
  experimental: {
    // This helps with build performance
  },
}

module.exports = nextConfig
