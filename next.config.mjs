/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	distDir: "build",
	env: {
		ENV: process.env.ENV,
	},
};

export default nextConfig;
