/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: false, // this must be false for proper linting
    },
  };

export default nextConfig;
