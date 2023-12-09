/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  output: 'standalone',
  exportPathMap: async function (defaultPathMap) {
    return defaultPathMap;
  },
  images: {
    unoptimized: true,
  },
};