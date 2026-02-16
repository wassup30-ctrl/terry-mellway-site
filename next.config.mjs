/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

if (process.env.STATIC_EXPORT === '1') {
  nextConfig.output = 'export';
}

export default nextConfig;
