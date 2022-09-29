/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    rewrites: () => {
        return [
            {
                source: "/api/:path*",
                destination: isProd ? "http://localhost:8096/:path*" : "121.37.197.186:8096/:path*",
            }
        ]
    },
    webpack: (config, {isServer}) => {
        return config
    },
}

module.exports = nextConfig
