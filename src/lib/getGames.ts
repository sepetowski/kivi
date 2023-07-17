import { Games } from '@/types/games';

export const getGames = async (page = 1, page_size = 30) => {
	const res = await fetch(
		`https://api.rawg.io/api/games?key=${process.env.GAMES_API_KEY}&page=${page}&page_size=${page_size}`,
		{
			method: 'GET',
			cache: 'no-store',
		}
	);

	if (!res.ok) {
		return {
			count: 0,
			next: null,
			previous: null,
			results: [],
		};
	}

	return res.json() as Promise<Games>;
};
