import React from 'react';
import { AddNewCommentForm } from '@/components/forms/post/AddNewCommentForm';
import { Separator } from '@/components/ui/separator';
import { ExtenedComment } from '@/types/comment';
import { CommentCard } from '../../cards/postComments/CommentCard';
import { votesReduce } from '@/lib/votesReduce';

interface Props {
	postId: string;
	comments: ExtenedComment[];
	userId: string;
}

export const CommentsCardsContener = ({ postId, comments, userId }: Props) => {
	return (
		<div className='w-full  flex flex-col gap-4 '>
			<AddNewCommentForm postId={postId} />
			<Separator className='my-6' />
			<div className='flex flex-col gap-4'>
				{comments.length !== 0 &&
					comments.map((comment) => {
						const { UP, DOWN } = votesReduce(comment);

						const userVote = comment.votes.find((vote) => vote.userId === userId);
						return (
							<CommentCard
								key={comment.id}
								commentId={comment.id}
								postId={comment.postId}
								authorName={comment.author.name}
								authorImage={comment.author.image}
								commentText={comment.text}
								added={comment.createdAt}
								likes={UP}
								dislikes={DOWN}
								initialVote={userVote?.type}
							/>
						);
					})}
			</div>
		</div>
	);
};
