import { Community, Follows, Game, Post, Subscription, Vote } from '@prisma/client';
import { ExtednedPost } from './post';





export interface User {
	id: string;
	name: string;
	createdAt: Date;
	image: string;
	sessionUserPage: boolean;
	posts: ExtednedPost[];
	profileDescription: string;
	createdCommunities: Community[];
	subscription: Subscription[];
	games: Game[];

	followers: Follows[];
	following: Follows[];
	backgroundImage: string | null;
}
