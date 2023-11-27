/**  @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.igdb.com', 'res.cloudinary.com', 'lh3.googleusercontent.com', 'steamcdn-a.akamaihd.net', 'cdn.akamai.steamstatic.com', 'cdn.cloudflare.steamstatic.com'],
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
