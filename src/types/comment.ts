import { Comment, User, Vote } from '@prisma/client';

export interface ExtenedComment extends Comment {
	author: User;
	votes: Vote[];
	replies: ExtenedComment[];
	post: Post;
}

interface Post {
	createdAt: Date;
}
