import React, { useEffect, useState } from 'react';
import { generateUsernameInitials } from '@/lib/generateUsernameInitials';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { X, BellDot, Check, Trash, MoreHorizontal } from 'lucide-react';
import { NotfiyType } from '@prisma/client';
import { formatTimeToNow } from '@/lib/foramtTimeToKnow';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useMutation } from '@tanstack/react-query';

interface Props {
	id: string;
	postId: string | null;
	commentId: string | null;
	notifyType: NotfiyType;
	name: string | null | undefined;
	content: string | null | undefined;
	image: string | null | undefined;
	unseen: boolean;
	createdDate: Date;
	cliked: boolean;
	wasSetAllAsRead: boolean;
	resetAllAsRead: () => void;
}

export const NotifyCard = ({
	commentId,
	id,
	notifyType,
	name,
	content,
	image,
	createdDate,
	cliked,
	postId,
	wasSetAllAsRead,
	resetAllAsRead,
}: Props) => {
	const router = useRouter();
	const [isHoverd, setIsHoverd] = useState(false);
	const [isOpenMenu, setIsOpenMenu] = useState(false);
	const [isCliked, setIsCliked] = useState(cliked);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		if (wasSetAllAsRead) {
			setIsCliked(true);
			resetAllAsRead();
		}
	}, [wasSetAllAsRead, resetAllAsRead]);

	const { mutate: updateCliked } = useMutation({
		mutationFn: async () => {
			const res = await fetch('/api/notifications/update-cliked', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					notifyId: id,
				}),
			});

			if (res.ok) {
				const data = await res.json();
				return data as Notification[];
			}
		},
	});
	const { mutate: removeNotifay } = useMutation({
		mutationFn: async () => {
			const res = await fetch('/api/notifications/delete-one', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					notifyId: id,
				}),
			});

			if (res.ok) {
				const data = await res.json();
				return data as Notification[];
			}
		},
	});

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const removeOneNotifayHandler = async () => {
		removeNotifay();
		router.refresh();
	};

	let text = '';
	let route = '';
	switch (notifyType) {
		case NotfiyType.NEW_FOLLOW:
			text = 'follows you';
			route = `/profile/${name}`;
			break;
		case NotfiyType.NEW_POST_LIKE:
			text = 'liked your post ';
			route = `/post/details/${postId}`;
			break;
		case NotfiyType.NEW_POST_DISS_LIKE:
			text = 'dissliked your post ';
			route = `/post/details/${postId}`;
			break;
		case NotfiyType.NEW_COMMENT_LIKE:
			text = 'liked your comment ';
			route = `/post/details/${postId}?commentId=${commentId}`;
			break;
		case NotfiyType.NEW_COMMENT_DISS_LIKE:
			text = 'dissliked your comment ';
			route = `/post/details/${postId}?commentId=${commentId}`;
			break;
		case NotfiyType.NEW_COMMENT:
			text = 'added a new comment to the post ';
			route = `/post/details/${postId}?commentId=${commentId}`;
			break;
		case NotfiyType.NEW_REPALY:
			text = 'has replied to your comment ';
			route = `/post/details/${postId}?commentId=${commentId}`;
			break;
	}

	const notifyClickHnadler = () => {
		if (!isCliked) updateCliked();

		router.push(route);
		router.refresh();
	};

	if (!isMounted) return null;

	return (
		<div
			onMouseEnter={() => {
				setIsHoverd(true);
			}}
			onMouseLeave={() => {
				if (!isOpenMenu) setIsHoverd(false);
			}}
			onClick={notifyClickHnadler}
			className='w-full  p-1 md:p-2  rounded-md  hover:bg-muted transition-colors duration-200 cursor-pointer flex justify-between items-center relative'>
			<div className='flex gap-4 items-center w-11/12'>
				<Avatar className='w-10 h-10 md:w-14 md:h-14 bg-accent'>
					{image && <AvatarImage src={image} alt={`profile of ${name}`} />}
					<AvatarFallback className='bg-accent'>
						{generateUsernameInitials(name ? name : '')}
					</AvatarFallback>
				</Avatar>

				<div className='flex flex-col gap-0.5'>
					<p className='text-sm md:text-base '>
						<span className='font-bold'>
							<Link href={`/profile/${name}`}>{name}</Link>
						</span>{' '}
						{text}
						{content && (
							<>
								&quot;<span>{content}</span>&quot;
							</>
						)}
					</p>
					<p className='text-xs md:text-sm text-muted-foreground'>
						&#x2022; {formatTimeToNow(new Date(createdDate))}
					</p>
				</div>
			</div>
			{!isCliked && (
				<div className='w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary shadow-sm flex justify-center items-center'>
					<BellDot className='w-2/3 text-secondary' />
				</div>
			)}
			{isHoverd && (
				<DropdownMenu
					onOpenChange={(open) => {
						if (!open) setIsHoverd(false);
					}}>
					<DropdownMenuTrigger asChild>
						<Button
							onClick={(e) => {
								e.stopPropagation();
							}}
							onMouseEnter={() => {
								setIsOpenMenu(true);
							}}
							onMouseLeave={() => {
								setIsOpenMenu(false);
							}}
							className='rounded-full w-8 h-8 md:w-10 md:h-10  hover:bg-card/60 absolute top-1/2 right-20 translate-y-[-50%] shadow-md hover:shadow-md bg-card  transition-colors duration-200'
							size={'iconWithPadding'}
							variant='secondary'>
							<MoreHorizontal />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem
							onClick={(e) => {
								e.stopPropagation();
								setIsOpenMenu(false);
								setIsHoverd(false);
								setIsCliked((prev) => !prev);
								updateCliked();
								router.refresh();
							}}
							className='flex gap-2 items-center cursor-pointer'>
							{!isCliked && (
								<>
									<Check size={20} /> Mark as read
								</>
							)}
							{isCliked && (
								<>
									<X size={20} /> Mark as unread
								</>
							)}
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={(e) => {
								e.stopPropagation();
								setIsOpenMenu(false);
								setIsHoverd(false);
								removeOneNotifayHandler();
							}}
							className='flex gap-2 items-center cursor-pointer'>
							<Trash size={20} /> Remove notification
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</div>
	);
};
