import { Community, Follows, Game, Post, Subscription } from '@prisma/client';

export interface User {
	id: string;
	name: string;
	createdAt: Date;
	image: string;
	sessionUserPage: boolean;
	posts: Post[];
	profileDescription: string;
	createdCommunities: Community[];
	subscription: Subscription[];
	games: Game[];

	followers: Follows[];
	following: Follows[];
	backgroundImage: string | null;
}
