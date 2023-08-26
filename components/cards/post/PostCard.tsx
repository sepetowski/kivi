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
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
	ThumbsUp,
	ThumbsDown,
	MessageSquare,
	BookmarkPlus,
	MoreVertical,
	BookmarkMinus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateUsernameInitials } from '@/lib/generateUsernameInitials';
import { formatTimeToNow } from '@/lib/foramtTimeToKnow';
import { useToast } from '@/components/ui/use-toast';
import { VoteType } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { ExtenedComment } from '@/types/comment';
import { CommentsCardsContener } from '@/components/conteners/posts/CommentsCardsContener';
import { PostOptions } from './PostOptions';
import { EditPostForm } from '@/components/forms/post/EditPostForm';
import { Badge } from '@/components/ui/badge';

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
	userId: string;
	creatorId: string;
	bucektName: string | null;
	fileName: string | null;
	wasEdited: boolean;
	imageUrl: string | null;
	profilePage?: boolean;
	isSavedByUser: boolean;
	savedPage?: boolean;
}

export const PostCard = ({
	creatorId,
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
	userId,
	bucektName,
	fileName,
	wasEdited,
	imageUrl,
	isSavedByUser,
	profilePage,
	savedPage,
}: Props) => {
	const [currentVote, setCurrentVote] = useState(initialVote);
	const [postLieks, setPostLieks] = useState(likes);
	const [isMounted, setIsMounted] = useState(false);
	const [isEditting, setIsEditting] = useState(false);
	const [postDislikes, setPostDislikes] = useState(dislikes);
	const [isPostSaved, setisPostSaved] = useState(isSavedByUser);
	const router = useRouter();

	const { toast } = useToast();

	const onEdittHandler = () => {
		setIsEditting((prev) => !prev);
	};
	const onCancelEdit = () => {
		setIsEditting(false);
	};

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
				return;
			}
		} catch (err) {
			toast({
				variant: 'destructive',
				title: 'Could not save your vote in server. Please try again.',
			});
		}
	};

	const tooglePostSaveHandler = async () => {
		setisPostSaved((prev) => !prev);
		try {
			const res = await fetch('/api/post/handle-post-save', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					postId,
				}),
			});
			if (!res.ok) {
				toast({
					variant: 'destructive',
					title: 'Could not save post. Please try again.',
				});
				setisPostSaved((prev) => !prev);
			} else {
				if (savedPage) router.refresh();
			}
		} catch (err) {
			toast({
				variant: 'destructive',
				title: 'Could not save post. Please try again.',
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
		<Card className={`${profilePage && 'w-full max-w-4xl'}`}>
			<CardHeader>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-3'>
						{userName && (
							<Avatar className='w-8 h-8 sm:w-14 sm:h-14'>
								{userImage && <AvatarImage src={userImage} alt={userName} />}
								<AvatarFallback>{generateUsernameInitials(userName)}</AvatarFallback>
							</Avatar>
						)}
						<div>
							<div className='flex items-center gap-2'>
								<CardTitle className='text-sm sm:text-base lg:text-lg'>
									<Link href={`/profile/${userName}`}>{userName}</Link>
								</CardTitle>
								{wasEdited && <Badge variant={'secondary'}>Edited</Badge>}
							</div>
							<CardDescription className='text-xs sm:text-sm lg:text-base'>
								<span>{formatTimeToNow(new Date(added))} </span>
								<Link className='' href={`/communities/community/${communityName}`}>
									in {communityName}
								</Link>
							</CardDescription>
						</div>
					</div>

					{!isEditting && userId === creatorId && (
						<DropdownMenu>
							<DropdownMenuTrigger>
								<MoreVertical size={22} />
							</DropdownMenuTrigger>
							<PostOptions postId={postId} onEdit={onEdittHandler} communityName={communityName} />
						</DropdownMenu>
					)}
				</div>
			</CardHeader>
			<CardContent className='flex flex-col gap-4'>
				{!isEditting && (
					<>
						<p className='text-sm sm:text-base'>{content}</p>
						{postImage && (
							<div className='relative w-full pt-[50%]'>
								<Image
									fill
									className='w-full h-full top-0 left-0 object-contain '
									src={postImage}
									alt='image of post'
								/>
							</div>
						)}
					</>
				)}
				{isEditting && (
					<EditPostForm
						postId={postId}
						initalContent={content}
						initalImg={postImage}
						bucketName={bucektName}
						fileName={fileName}
						imageUrl={imageUrl}
						onCanelEdit={onCancelEdit}
					/>
				)}
			</CardContent>
			<CardFooter className='flex flex-col w-full  '>
				{!isEditting && (
					<>
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

							<Button
								onClick={tooglePostSaveHandler}
								className={`hover:bg-transparent hover:text-muted-foreground ${
									isPostSaved ? 'text-pink-600 dark:text-purple-600' : ''
								}`}
								variant={'ghost'}
								size={'icon'}>
								{!isPostSaved && <BookmarkPlus size={22} />}
								{isPostSaved && <BookmarkMinus size={22} />}
							</Button>
						</div>
						{detailsPage && (
							<CommentsCardsContener postId={postId} comments={comments!} userId={userId} />
						)}
					</>
				)}
			</CardFooter>
		</Card>
	);
};
