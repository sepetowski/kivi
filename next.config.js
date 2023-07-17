/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'unizktftkzjgqqotzhie.supabase.co',
			},
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
			},
			{
				protocol: 'https',
				hostname: '"media.rawg.io',
			},
		],
	},
};

module.exports = nextConfig;
