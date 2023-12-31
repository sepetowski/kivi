export interface Game {
	id: number;
	slug: string;
	name: string;
	released: string;
	tba: boolean;
	background_image: string;
	rating: number;
	rating_top: number;
	ratings: any[];
	ratings_count: number;
	reviews_text_count: number;
	added: number;
	metacritic: number;
	playtime: number;
	suggestions_count: number;
	updated: string;
	reviews_count: number;
	saturated_color: string;
	dominant_color: string;
}
