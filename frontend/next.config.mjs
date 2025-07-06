/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable static optimization
    output: 'standalone',

    // Enable compression
    compress: true,

    // Enable image optimization
    images: {
        formats: ['image/webp', 'image/avif'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },

    // Enable experimental features for better performance
    experimental: {
        optimizeCss: true,
        optimizePackageImports: ['lucide-react'],
    },

    // Headers for security and SEO
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on',
                    },
                ],
            },
            {
                source: '/api/(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=3600, s-maxage=3600',
                    },
                ],
            },
        ];
    },

    // Redirects for SEO
    async redirects() {
        return [
            {
                source: '/documentation',
                destination: '/docs',
                permanent: true,
            },
            {
                source: '/api-docs',
                destination: '/docs',
                permanent: true,
            },
        ];
    },

    // Rewrites for clean URLs
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://excuses.onrender.com/:path*',
            },
        ];
    },

    // Environment variables
    env: {
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://excuses.onrender.com',
    },

    // Webpack configuration for optimization
    webpack: (config, { dev, isServer }) => {
        // Optimize bundle size
        if (!dev && !isServer) {
            config.optimization.splitChunks = {
                chunks: 'all',
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            };
        }

        return config;
    },
};

export default nextConfig;
