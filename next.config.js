/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { appDir: true, enableUndici: false },
  images: {
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
    ],
  },
}

module.exports = nextConfig
