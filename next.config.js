/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
			},
			{
				protocol: "https",
				hostname: "digitalmarketplace-production-08eb.up.railway.app",
			},
		],
	},
};

module.exports = nextConfig;
