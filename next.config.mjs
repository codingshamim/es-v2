/** @type {import('next').NextConfig} */
const nextConfig = {
   webpack(config) {
    config.ignoreWarnings = [
      { message: /Failed to parse source map/ },
    ];
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
        port: "",
        pathname: "/**/image.png",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
        port: "",
        pathname: "/**/**.png",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
        port: "",
        pathname: "/**/**.jpg",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
        port: "",
        pathname: "/**/**.webp",
      },
    ],
  },
 
};

export default nextConfig;
