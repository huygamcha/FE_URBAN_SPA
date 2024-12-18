/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    largePageDataBytes: 128 * 100000
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**' // Cho phép tất cả domain
      }
    ]
  }
}

export default nextConfig
