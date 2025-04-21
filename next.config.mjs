/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/chat',
          destination: '/api/groq-ai',
        },
      ];
    },
  };
  
  export default nextConfig;
