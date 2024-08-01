/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'www.google.com',
        pathname: '**',
      },
    ],
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;
