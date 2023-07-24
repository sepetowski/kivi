import React, { Suspense } from 'react';
import { AddNewCommentForm } from '@/components/forms/post/AddNewCommentForm';
import { Separator } from '@/components/ui/separator';
import { ExtenedComment } from '@/types/comment';
import { CommentsMap } from './CommentsMap';

interface Props {
	postId: string;
	promise: Promise<ExtenedComment[]>;
}

export const CommentsCard = ({ postId, promise }: Props) => {
	return (
		<div className='w-full  flex flex-col gap-4 '>
			<AddNewCommentForm postId={postId} />
			<Separator className='my-6' />
			<Suspense fallback={<p>Loading</p>}>
				<CommentsMap promise={promise} />
			</Suspense>
		</div>
	);
};
