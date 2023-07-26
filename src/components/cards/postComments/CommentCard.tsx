import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CommentCardActions } from './CommentCardActions';
import Link from 'next/link';
import { generateUsernameInitials } from '@/lib/generateUsernameInitials';
import { formatTimeToNow } from '@/lib/foramtTimeToKnow';
import { VoteType } from '@prisma/client';

interface Props {
	postId: string;
	commentId: string;
	authorName: string | undefined | null;
	authorImage: string | null;
	commentText: string;
	added: Date;
	likes: number;
	dislikes: number;
	initialVote?: VoteType | null;
}

export const CommentCard = ({
	commentId,
	postId,
	authorImage,
	authorName,
	commentText,
	added,
	dislikes,
	likes,
	initialVote,
}: Props) => {
	return (
		<div className='w-full p-4 rounded-md border'>
			<div className='flex items-center gap-2'>
				<Avatar className='w-8 h-8'>
					{authorImage && <AvatarImage src={authorImage} alt='@shadcn' />}
					{authorName && <AvatarFallback>{generateUsernameInitials(authorName)}</AvatarFallback>}
				</Avatar>
				<div className='flex items-center gap-2'>
					<h4 className='text-sm'>
						<Link href={`/profile/${authorName}`}>{authorName}</Link>
					</h4>
					<p className='text-xs text-muted-foreground'>
						&#x2022; <span>{formatTimeToNow(new Date(added))}</span>
					</p>
				</div>
			</div>
			<p className='my-3 text-sm sm:text-base'>{commentText}</p>
			<CommentCardActions
				commentId={commentId}
				likes={likes}
				dislikes={dislikes}
				initialVote={initialVote}
				postId={postId}
			/>
		</div>
	);
};
