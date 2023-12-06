/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["supabase"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
      },
      {
        hostname: "localhost",
      },
      {
        hostname: "media.tenor.com",
      },
    ],
  },
};

module.exports = nextConfig;
