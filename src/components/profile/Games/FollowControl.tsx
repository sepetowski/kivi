'use client';
import React, { useState } from 'react';
import { UserPlus2, UserMinus2, Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';

interface Props {
	isAlreadyFollowing: boolean;
	userId: string;
	userName: string;
	sessionUserId: string;
	sessionUserPage: boolean;
}

export const FollowControl = ({
	isAlreadyFollowing,
	sessionUserId,
	sessionUserPage,
	userId,
	userName,
}: Props) => {
	const router = useRouter();
	const { toast } = useToast();
	const [isSending, setIsSending] = useState(false);
	const startFollowHandler = async () => {
		setIsSending(true);
		try {
			const res = await fetch('/api/follow', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					followingUserId: userId,
					followerUserId: sessionUserId,
				}),
			});
			if (!res.ok) {
				toast({
					variant: 'destructive',
					title: 'Oh no! Something went wrong.',
					action: (
						<ToastAction onClick={() => startFollowHandler} altText='Try again'>
							Try again
						</ToastAction>
					),
				});
				return;
			}
			if (res.ok && res.status == 400)
				toast({
					variant: 'destructive',
					title: 'Could not pefom this action',
					description: 'You are already following this user',
				});
			if (res.ok && res.status === 200)
				toast({
					title: `You are now following ${userName}`,
				});

			router.refresh();
		} catch (err) {}
		setIsSending(false);
	};
	const unfollowHandler = async () => {
		setIsSending(true);
		try {
			const res = await fetch('/api/unfollow', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					followingUserId: userId,
					followerUserId: sessionUserId,
				}),
			});
			if (!res.ok) {
				toast({
					variant: 'destructive',
					title: 'Oh no! Something went wrong.',
					action: (
						<ToastAction onClick={() => unfollowHandler} altText='Try again'>
							Try again
						</ToastAction>
					),
				});
				return;
			}
			if (res.ok && res.status == 400)
				toast({
					variant: 'destructive',
					title: 'Could not pefom this action',
					description: 'You are not following this user yet',
				});
			if (res.ok && res.status === 200)
				toast({
					title: `You are no longer following ${userName}`,
				});

			router.refresh();
		} catch (err) {}
		setIsSending(false);
	};

	return (
		<>
			{!sessionUserPage && !isAlreadyFollowing && (
				<Button
					onClick={startFollowHandler}
					className='w-full flex gap-2 mt-6 sm:mt-8 sm:text-lg max-w-sm sm:p-5'>
					{!isSending && (
						<>
							Follow <UserPlus2 />
						</>
					)}

					{isSending && (
						<>
							Following..
							<Loader2Icon className='animate-spin' />
						</>
					)}
				</Button>
			)}
			{!sessionUserPage && isAlreadyFollowing && (
				<Button
					onClick={unfollowHandler}
					className='w-full flex gap-2 mt-6 sm:mt-8 sm:text-lg max-w-sm sm:p-5'>
					{!isSending && (
						<>
							Unfollow <UserMinus2 />
						</>
					)}

					{isSending && (
						<>
							Unfollowing..
							<Loader2Icon className='animate-spin' />
						</>
					)}
				</Button>
			)}
		</>
	);
};
