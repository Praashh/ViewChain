import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    SERVER_URL: process.env.SERVER_URL || "http://localhost:3001",
  },
  // This is required for Solana wallets to work
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "30mb", // Increased from 10mb to handle larger file uploads
    },
  },
};

export default config;
