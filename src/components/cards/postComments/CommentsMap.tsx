import { ExtenedComment } from '@/types/comment';
import React from 'react';
import { CommentCard } from './CommentCard';

interface Props {
	promise: Promise<ExtenedComment[]>;
}

export const CommentsMap = async ({ promise }: Props) => {
	const comments = await promise;
	return (
		<div className='flex flex-col gap-4'>
			{comments.map((comment) => (
				<CommentCard key={comment.id} postId={comment.postId} />
			))}
		</div>
	);
};
