'use client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { VoteType } from '@prisma/client';
import { MessageSquare, ThumbsDown, ThumbsUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';


interface Props {
	likes: number;
	dislikes: number;
	initialVote?: VoteType | null;
	postId: string;
	commentId: string;
	onReplay: () => void;
}

export const CommentCardActions = ({
	dislikes,
	likes,
	initialVote,
	postId,
	commentId,
	onReplay,
}: Props) => {
	const [currentVote, setCurrentVote] = useState(initialVote);
	const [commentLieks, setCommentLieks] = useState(likes);
	const [isMounted, setIsMounted] = useState(false);
	const [CommentDislikes, setCommentDislikes] = useState(dislikes);
	const { toast } = useToast();

	useEffect(() => {
		setCurrentVote(initialVote);
		setIsMounted(true);
	}, [initialVote]);

	const chnageVoteInDbHnadler = async (voteType: VoteType) => {
		try {
			const res = await fetch('/api/post/comment/vote', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					postId,
					voteType,
					commentId,
				}),
			});
			if (!res.ok) {
				toast({
					variant: 'destructive',
					title: 'Could not save your vote in server. Please try again.',
				});
			}
		} catch (err) {
			toast({
				variant: 'destructive',
				title: 'Could not save your vote in server. Please try again.',
			});
		}
	};

	const voteHandler = (voteType: VoteType) => {
		if (!currentVote) {
			setCurrentVote(voteType);
			if (voteType === 'UP') setCommentLieks((prev) => prev + 1);
			else if (voteType === 'DOWN') setCommentDislikes((prev) => prev + 1);
		}
		if (currentVote === voteType) {
			setCurrentVote(null);
			if (voteType === 'UP') setCommentLieks((prev) => prev - 1);
			else if (voteType === 'DOWN') setCommentDislikes((prev) => prev - 1);
		}
		if (currentVote && currentVote !== voteType) {
			setCurrentVote(voteType);
			if (voteType === 'UP') {
				setCommentLieks((prev) => prev + 1);
				setCommentDislikes((prev) => prev - 1);
			} else {
				setCommentDislikes((prev) => prev + 1);
				setCommentLieks((prev) => prev - 1);
			}
		}
		chnageVoteInDbHnadler(voteType);
	};

	if (!isMounted) return null;

	return (
		<div className='flex gap-4'>
			<div className='flex items-center gap-2'>
				<Button
					onClick={() => voteHandler('UP')}
					className={`hover:bg-transparent   ${
						currentVote === 'UP' ? 'text-green-600 hover:text-green-600 ' : ''
					}`}
					variant={'ghost'}
					size={'icon'}>
					<ThumbsUp size={22} />
				</Button>
				<span>{commentLieks}</span>
			</div>
			<div className='flex items-center gap-2'>
				<Button
					onClick={() => voteHandler('DOWN')}
					className={`hover:bg-transparent  ${
						currentVote === 'DOWN' ? 'text-red-700 hover:text-red-700 ' : ''
					}`}
					variant={'ghost'}
					size={'icon'}>
					<ThumbsDown size={22} />
				</Button>
				<span>{CommentDislikes}</span>
			</div>

			<Button onClick={onReplay} className='p-1' variant={'ghost'} size={'icon'}>
				<MessageSquare size={22} />
				<p className='hidden sm:inline ml-2'>Replay</p>
			</Button>
		</div>
	);
};
