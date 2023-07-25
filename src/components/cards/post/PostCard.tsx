'use client';

import React, { useEffect, useState } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import Image from 'next/image';
import { ThumbsUp, ThumbsDown, MessageSquare, BookmarkPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateUsernameInitials } from '@/lib/generateUsernameInitials';
import { formatTimeToNow } from '@/lib/foramtTimeToKnow';
import { useToast } from '@/components/ui/use-toast';
import { Comment, VoteType } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { CommentsCard } from '../postComments/CommentsCard';
import { ExtenedComment } from '@/types/comment';

interface Props {
	comments?: ExtenedComment[];
	detailsPage?: boolean;
	disableCommentBtn?: boolean;
	userName: string | null;
	userImage: string | null;
	added: Date;
	communityName: string;
	content: string;
	postImage: string | null;
	likes: number;
	dislikes: number;
	initialVote?: VoteType | null;
	commentsLength: number;
	postId: string;
}

export const PostCard = ({
	comments,
	detailsPage,
	disableCommentBtn,
	added,
	communityName,
	content,
	dislikes,
	likes,
	postImage,
	userImage,
	userName,
	commentsLength,
	initialVote,
	postId,
}: Props) => {
	const [currentVote, setCurrentVote] = useState(initialVote);
	const [postLieks, setPostLieks] = useState(likes);
	const [isMounted, setIsMounted] = useState(false);
	const [postDislikes, setPostDislikes] = useState(dislikes);
	const router = useRouter();
	const { toast } = useToast();

	useEffect(() => {
		setCurrentVote(initialVote);
		setIsMounted(true);
	}, [initialVote]);

	const chnageVoteInDbHnadler = async (voteType: VoteType) => {
		try {
			const res = await fetch('/api/post/vote', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					postId,
					voteType,
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
			if (voteType === 'UP') setPostLieks((prev) => prev + 1);
			else if (voteType === 'DOWN') setPostDislikes((prev) => prev + 1);
		}
		if (currentVote === voteType) {
			setCurrentVote(null);
			if (voteType === 'UP') setPostLieks((prev) => prev - 1);
			else if (voteType === 'DOWN') setPostDislikes((prev) => prev - 1);
		}
		if (currentVote && currentVote !== voteType) {
			setCurrentVote(voteType);
			if (voteType === 'UP') {
				setPostLieks((prev) => prev + 1);
				setPostDislikes((prev) => prev - 1);
			} else {
				setPostDislikes((prev) => prev + 1);
				setPostLieks((prev) => prev - 1);
			}
		}
		chnageVoteInDbHnadler(voteType);
	};

	if (!isMounted) return null;

	return (
		<Card>
			<CardHeader>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-3'>
						{userName && (
							<Avatar className='w-10 h-10 sm:w-14 sm:h-14'>
								{userImage && <AvatarImage src={userImage} alt={userName} />}
								<AvatarFallback>{generateUsernameInitials(userName)}</AvatarFallback>
							</Avatar>
						)}
						<div>
							<CardTitle className='text-base lg:text-lg'>{userName}</CardTitle>
							<CardDescription>
								Added <span>{formatTimeToNow(new Date(added))}</span>
							</CardDescription>
						</div>
					</div>
					<p>
						in{' '}
						<Link className='text-xs sm:text-sm md:text-base' href='/'>
							{communityName}
						</Link>
					</p>
				</div>
			</CardHeader>
			<CardContent className='flex flex-col gap-4'>
				<p>{content}</p>
				{postImage && (
					<div className='relative w-full pt-[100%]'>
						<Image
							fill
							objectFit='cover'
							className='w-full h-full top-0 left-0 object-cover '
							src={postImage}
							alt='image of post'
						/>
					</div>
				)}
			</CardContent>
			<CardFooter className='flex flex-col w-full '>
				<div className='flex justify-between items-center w-full'>
					<div className='flex gap-4 sm:gap-6 items-center'>
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
							<span>{postLieks}</span>
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
							<span>{postDislikes}</span>
						</div>
						<div className='flex items-center gap-2'>
							{!disableCommentBtn && (
								<Button
									onClick={() => {
										router.push(`/post/details/${postId}`);
									}}
									className='hover:bg-transparent'
									variant={'ghost'}
									size={'icon'}>
									<MessageSquare size={22} />
								</Button>
							)}
							{disableCommentBtn && <MessageSquare size={22} />}
							<span>{commentsLength}</span>
						</div>
					</div>

					<Button className='hover:bg-transparent' variant={'ghost'} size={'icon'}>
						<BookmarkPlus size={22} />
					</Button>
				</div>
				{detailsPage && <CommentsCard postId={postId} comments={comments!} />}
			</CardFooter>
		</Card>
	);
};