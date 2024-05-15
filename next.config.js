/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "kr.object.ncloudstorage.com",
        pathname: "**",
      },
    ],
  },
  rewrites: [
    {
      source: "api/:path*",
      destination: "http://3.89.26.128/:path*",
    },
  ],
};

module.exports = nextConfig;
