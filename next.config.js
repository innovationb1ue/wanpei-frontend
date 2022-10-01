/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    rewrites: () => {
        return [
            {
                source: "/api/:path*",
                destination: isProd ? "http://114.116.242.50:8096/:path*" : "http://localhost:8096/:path*",
            }
        ]
    },
    webpack: (config, {isServer}) => {
        return config
    },
    async headers() {
        return [{
            // matching all API routes
            source: "/api/:path*",
            headers: [
                {key: "Access-Control-Allow-Credentials", value: "true"},
                {key: "Access-Control-Allow-Origin", value: "*"},
                {key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT"},
                {
                    key: "Access-Control-Allow-Headers",
                    value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
                },
            ]
        },
        ]
    }
}

module.exports = nextConfig
