import { Community } from '@prisma/client';

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
