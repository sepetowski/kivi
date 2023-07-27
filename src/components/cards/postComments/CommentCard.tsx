'use client';

import React, { useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CommentCardActions } from './CommentCardActions';
import Link from 'next/link';
import { generateUsernameInitials } from '@/lib/generateUsernameInitials';
import { formatTimeToNow } from '@/lib/foramtTimeToKnow';
import { VoteType } from '@prisma/client';
import { ExtenedComment } from '@/types/comment';
import { AddNewCommentForm } from '@/components/forms/post/AddNewCommentForm';
import { useOnClickOutside } from '@/hooks/useClickOutside';
import { getUserReplayName } from '@/lib/getUserReplayName';

interface Props {
	comment: ExtenedComment;
	likes: number;
	dislikes: number;
	initialVote?: VoteType | null;
	postId: string;
}

export const CommentCard = ({ comment, postId, dislikes, likes, initialVote }: Props) => {
	const [isReplaying, setIsReplaying] = useState(false);
	const commentRef = useRef<HTMLDivElement>(null);
	const replayName = getUserReplayName(comment.text);

	const commentText = replayName ? comment.text.replace(replayName, '') : comment.text;
	const linkReaply = replayName ? replayName.replace(replayName[0], '') : '';

	useOnClickOutside(commentRef, () => {
		setIsReplaying(false);
	});
	const onReplayHandler = () => {
		setIsReplaying((prev) => !prev);
	};
	const onCancelReplayHandler = () => {
		setIsReplaying(false);
	};

	return (
		<div ref={commentRef} className='w-full p-3 sm:p-4 rounded-md border'>
			<div className='flex items-center gap-2'>
				<Avatar className='w-8 h-8'>
					{comment.author.image && <AvatarImage src={comment.author.image} alt='@shadcn' />}
					{comment.author.name && (
						<AvatarFallback>{generateUsernameInitials(comment.author.name)}</AvatarFallback>
					)}
				</Avatar>
				<div className='flex items-center gap-2'>
					<h4 className='text-sm'>
						<Link href={`/profile/${comment.author.name}`}>{comment.author.name}</Link>
					</h4>
					<p className='text-xs text-muted-foreground'>
						&#x2022; <span>{formatTimeToNow(new Date(comment.createdAt))}</span>
					</p>
				</div>
			</div>
			<p className='my-3 text-sm sm:text-base'>
				{replayName && (
					<Link
						href={`/profile/${linkReaply}`}
						className='text-pink-600 dark:text-purple-500 font-medium '>
						{replayName}
					</Link>
				)}
				<span>{commentText}</span>
			</p>
			<CommentCardActions
				commentId={comment.id}
				likes={likes}
				dislikes={dislikes}
				initialVote={initialVote}
				postId={postId}
				onReplay={onReplayHandler}
			/>
			{isReplaying && (
				<AddNewCommentForm
					isCommentReaply={true}
					postId={postId}
					author={comment.author}
					replyToId={comment.replyToId ?? comment.id}
					onCloseReaply={onCancelReplayHandler}
				/>
			)}
		</div>
	);
};
