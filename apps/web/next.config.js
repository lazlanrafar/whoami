/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["supabase"],
  images: {
    remotePatterns: [
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
