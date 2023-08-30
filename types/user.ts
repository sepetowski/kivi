import { Community, Follows, Game,  Subscription } from '@prisma/client';





export interface User {
	id: string;
	name: string;
	createdAt: Date;
	image: string;
	sessionUserPage: boolean;
	profileDescription: string;
	createdCommunities: Community[];
	subscription: Subscription[];
	games: Game[];
	totalPostCount: number;
	followers: Follows[];
	following: Follows[];
	backgroundImage: string | null;
}
