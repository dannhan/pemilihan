/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com"
      },
    ],
  },
  experimental: {
    taint: true,
  },
};

export default nextConfig;
