// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;
import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  // 기존 Next.js 설정
};

export default withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development', // 개발 환경에서는 PWA 비활성화
  skipWaiting: true,
  clientsClaim: true,
})(nextConfig);
