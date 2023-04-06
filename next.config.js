/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    esmExternals: true
  },
  images: {
    domains: ['images.clerk.dev', "api.dicebear.com", "picsum.photos"],
  },
}

module.exports = nextConfig
