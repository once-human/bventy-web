/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: { ignoreDuringBuilds: true }, typescript: { ignoreBuildErrors: true },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "media.bventy.in",
            },
            {
                protocol: "https",
                hostname: "va.vercel-scripts.com",
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "https://api.bventy.in/:path*",
            },
            {
                source: "/vercel-relay/s.js",
                destination: "https://va.vercel-scripts.com/v1/script.js",
            },
            // PostHog Obscure Relay
            {
                source: "/a/p/static/:path*",
                destination: "https://us-assets.i.posthog.com/static/:path*",
            },
            {
                source: "/a/p/s/:path*",
                destination: "https://us.i.posthog.com/s/:path*",
            },
            {
                source: "/a/p/e/:path*",
                destination: "https://us.i.posthog.com/e/:path*",
            },
            {
                source: "/a/p/decide",
                destination: "https://us.i.posthog.com/decide",
            },
            {
                source: "/a/p/:path*",
                destination: "https://us.i.posthog.com/:path*",
            },
            // Umami Obscure Relay
            {
                source: "/a/u/m.js",
                destination: "https://cloud.umami.is/script.js",
            },
            {
                source: "/a/u/api/send",
                destination: "https://cloud.umami.is/api/send",
            },
        ];
    },
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    {
                        key: "X-DNS-Prefetch-Control",
                        value: "on",
                    },
                    {
                        key: "Strict-Transport-Security",
                        value: "max-age=63072000; includeSubDomains; preload",
                    },
                    {
                        key: "X-Frame-Options",
                        value: "SAMEORIGIN",
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "Referrer-Policy",
                        value: "origin-when-cross-origin",
                    },
                    {
                        key: "Permissions-Policy",
                        value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
