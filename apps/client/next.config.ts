import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["res.cloudinary.com"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "30mb", // Increased from 10mb to handle larger file uploads
    },
  },
};

export default nextConfig;
