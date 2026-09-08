import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_ACTIONS === "true";
const basePath = isGithubPages ? "/akin-gayrimenkul" : "";

const nextConfig: NextConfig = {
  agentRules: false,
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_FIREBASE_API_KEY: "AIzaSyAVp1I3nJmez1RHra0HKcF4xk_qmaclh0A",
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "akin-gayrimenkul.firebaseapp.com",
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: "akin-gayrimenkul",
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: "akin-gayrimenkul.firebasestorage.app",
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "605033894169",
    NEXT_PUBLIC_FIREBASE_APP_ID: "1:605033894169:web:75b59435cc34ef2831f588",
  },
};

export default nextConfig;
