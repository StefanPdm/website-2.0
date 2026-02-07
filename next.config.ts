import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'neon.com',
        pathname: '/brand/**',
      },
    ],
  },
};

export default nextConfig;
