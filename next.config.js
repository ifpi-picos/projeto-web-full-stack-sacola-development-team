/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.igdb.com'],
  },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                  {
                    key: "Cross-Origin-Opener-Policy",
                    value: "same-origin allow-popups",
                  }
                ]
            },
        ]
    }
}

module.exports = nextConfig
