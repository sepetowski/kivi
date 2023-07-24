import { Comment, Post, User, Vote } from '@prisma/client';

interface CommentId {
	id: string;
}
interface CommunityName {
	name: string;
}
export interface ExtednedPost extends Post {
	votes: Vote[];
	author: User;
	comments: CommentId[];
	community: CommunityName;
}

