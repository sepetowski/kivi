import React from 'react';
import { AddNewCommentForm } from '@/components/forms/post/AddNewCommentForm';
import { Separator } from '@/components/ui/separator';
import { ExtenedComment } from '@/types/comment';
import { CommentCard } from './CommentCard';

interface Props {
	postId: string;
	comments: ExtenedComment[];
}

export const CommentsCard = ({ postId, comments }: Props) => {
	return (
		<div className='w-full  flex flex-col gap-4 '>
			<AddNewCommentForm postId={postId} />
			<Separator className='my-6' />
			<div className='flex flex-col gap-4'>
				{comments.map((comment) => (
					<CommentCard key={comment.id} postId={comment.postId} />
				))}
			</div>
		</div>
	);
};
