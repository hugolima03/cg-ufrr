/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [{ hostname: "vestibulares2022.com.br" }],
  },
};

module.exports = nextConfig;
