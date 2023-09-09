/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { appDir: true },
  images: {
    domains: ['oaidalleapiprodscus.blob.core.windows.net'],
    remotePatterns: [
      {
        protocol: 'https',
        port: '',
        hostname: 'raw.githubusercontent.com',
        pathname: '/PokeAPI/sprites/**',
      },
      {
        protocol: 'https',
        port: '',
        hostname: 'images.axios.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        port: '',
        hostname: 'charlotte.axios.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        port: '',
        hostname: 'oaidalleapiprodscus.blob.core.windows.net',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
