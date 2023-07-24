import { Comment, User, Vote } from '@prisma/client';

export interface ExtenedComment extends Comment {
	author: User;
	votes: Vote[];
	replies: Comment[];
	post: Post;
}

interface Post {
	createdAt: Date;
}
