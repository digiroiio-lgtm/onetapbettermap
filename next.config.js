/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Optimize for production builds
  swcMinify: true,
  // Increase static page generation timeout
  staticPageGenerationTimeout: 120,
  // Reduce build memory usage
  experimental: {
    // This helps with build performance
  },
}

module.exports = nextConfig
