/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'unizktftkzjgqqotzhie.supabase.co',
			},
		],
	},
};

module.exports = nextConfig;
