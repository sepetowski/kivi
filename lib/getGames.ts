import { Games } from '@/types/games';

export const PAGE_SIZE = 30;

export const getGames = async (page = 1, search = '') => {
	
	const res = await fetch(
		`https://api.rawg.io/api/games?key=${process.env.GAMES_API_KEY}&page=${page}&page_size=${PAGE_SIZE}&search=${search}`,
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
