const webpack = require('webpack');
/** @type {import('next').NextConfig} */
const nextConfig = {
  targert : "serverless",
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mysql2"],
  },
  images: {
    domains: ['images.clerk.dev', "loremflickr.com"],
  },
}

module.exports = nextConfig
