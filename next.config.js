/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'media.licdn.com',
      'yt3.googleusercontent.com',
      'encrypted-tbn0.gstatic.com'
    ]
  },
  reactStrictMode: false
};

module.exports = nextConfig;
