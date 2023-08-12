import { Game } from './game';

export interface Games {
	count: number;
	next: string | null;
	previous: string | null;
	results: Game[];
}
