import withPWA from "next-pwa";

const nextPWA = withPWA({
    dest: "public",
    disable: process.env.NODE_ENV === "development", // 개발 환경에서 비활성화
});

const nextConfig = {
<<<<<<< HEAD
    reactStrictMode: true,
    webpack: (config: { cache: boolean }) => {
        config.cache = false; // Webpack 캐시 비활성화
        return config;
    },
    images: {
        domains: ["tpmecxqlrdaafgwcnhkv.supabase.co"], // 외부 이미지 허용
    },
=======
  reactStrictMode: true,
  webpack: (config: { cache: boolean }) => {
    config.cache = false; // Webpack 캐시 비활성화
    return config;
  },
  compiler: {
    styledComponents: true,
  }
>>>>>>> main
};

export default nextPWA(nextConfig);