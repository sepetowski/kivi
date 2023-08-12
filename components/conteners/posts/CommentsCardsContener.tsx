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
				{comments
					.filter((comment) => !comment.replyToId)
					.map((topLevelComment) => {
						const { UP: topLevelUp, DOWN: topLevelDown } = votesReduce(topLevelComment);
						const topLevelCommentVote = topLevelComment.votes.find(
							(vote) => vote.userId === userId
						);

						return (
							<div key={topLevelComment.id} className='flex flex-col'>
								<div className='mb-2'>
									<CommentCard
										userId={userId}
										comment={topLevelComment}
										likes={topLevelUp}
										dislikes={topLevelDown}
										initialVote={topLevelCommentVote?.type}
										postId={postId}
									/>
								</div>

								{topLevelComment.replies
									.sort((a, b) => b.votes.length - a.votes.length)
									.map((reply) => {
										const { UP: reaplyUp, DOWN: reaplyDown } = votesReduce(reply);

										const replyVote = reply.votes.find((vote) => vote.userId === userId);

										return (
											<div
												key={reply.id}
												className='ml-2 py-2 pl-4 border-l-2 border-secondary-foreground'>
												<CommentCard
													comment={reply}
													userId={userId}
													likes={reaplyUp}
													dislikes={reaplyDown}
													initialVote={replyVote?.type}
													postId={postId}
												/>
											</div>
										);
									})}
							</div>
						);
					})}
			</div>
		</div>
	);
};
