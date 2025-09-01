/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! 警告 !!
    // 在生产环境中忽略TypeScript错误
    // 这是临时解决方案，应该尽快修复类型错误
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
