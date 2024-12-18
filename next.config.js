/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Pending for the moment
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    SECRET_JWT: process.env.SECRET_JWT
  },
};

module.exports = nextConfig;
