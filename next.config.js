/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    rewrites: () => {
        return [
            {
                source: "/api/:path*",
                destination: "http://localhost:8096/:path*",
            }
        ]
    },
    webpack: (config, {isServer}) => {
        return config
    }
}

module.exports = nextConfig
