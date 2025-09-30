import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@app': './app',
      '@components': './components',
    };
    return config;
  },
};

export default nextConfig;
