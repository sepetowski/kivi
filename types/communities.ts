import { Community, Post } from '@prisma/client';
import { ExtednedPost } from './post';

export interface Communities {
	userId: string;
	communityId: string;
	community: {
		image: string;
		name: string;
	};
}

export interface BrowseCommunity extends Community {
	userJoined: boolean;
}

export interface ExtednedCommunities extends Community {
	posts: ExtednedPost[];
}
