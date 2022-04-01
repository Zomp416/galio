/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: "/reset-password",
                destination: "/forgot-password",
                permanent: false,
            },
            {
                source: "/reset-password/:slug",
                destination: "/forgot-password",
                permanent: false,
            },
            {
                source: "/verify",
                destination: "/",
                permanent: false,
            },
            {
                source: "/verify/:slug",
                destination: "/",
                permanent: false,
            },
        ];
    },
};

module.exports = nextConfig;
