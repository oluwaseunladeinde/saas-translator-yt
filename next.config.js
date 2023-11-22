/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        //domains: ["github.com", "lh3.googleusercontent.com", "st2.depositphotos.com"],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'github.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'st2.depositphotos.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'i.pravatar.cc',
                pathname: '**',
            },
        ],
    },
}

module.exports = nextConfig
