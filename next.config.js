/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "logos-world.net" },
      { protocol: "https", hostname: "1000logos.net" },
      { protocol: "https", hostname: "cdn.iconscout.com" },
      { protocol: "https", hostname: "cdn-images-1.medium.com" },
    ],
  },
};

module.exports = nextConfig;
