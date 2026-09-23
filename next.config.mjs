/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    // ponytail: Unsplash's CDN already resizes and converts (auto=format, w=), so let the browser fetch it directly
    // instead of proxying through /_next/image, which 500s whenever the server cannot reach Unsplash.
    unoptimized: true,
  },
};

export default nextConfig;
