/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    esmExternals: true
  },
  images: {
    domains: ['images.clerk.dev'],
  },
}

module.exports = nextConfig
