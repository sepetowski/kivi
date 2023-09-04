'use client';
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Notify } from '@/types/notify';
import { NotifyCard } from '../../cards/notify/NotifyCard';
import { useMutation } from '@tanstack/react-query';
import { Trash, MoreVertical, Check } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

interface Props {
	notifications: Notify[];
}

export const NotifyContener = ({ notifications }: Props) => {
	const [notificationsArray, setNotificationsArray] = useState(notifications);

	const [wasSetAllAsRead, setWasSetAllAsRead] = useState(false);
	const { toast } = useToast();
	const router = useRouter();
	const { mutate: handleUnseen } = useMutation({
		mutationFn: async () => {
			const res = await fetch('/api/notifications/update-unseen', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (res.ok) {
				const data = await res.json();
				return data as Notification[];
			}
		},
	});

	const resetAllAsRead = () => {
		setWasSetAllAsRead(false);
	};

	const { mutate: deleteAll } = useMutation({
		mutationFn: async () => {
			const res = await fetch('/api/notifications/delete-all', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (res.ok) {
				const data = await res.json();
				return data as Notification[];
			}
		},
	});
	const { mutate: changedClikedAll } = useMutation({
		mutationFn: async () => {
			const res = await fetch('/api/notifications/update-cliked-all', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (res.ok) {
				const data = await res.json();
				return data as Notification[];
			}
		},
	});

	/* eslint-disable */
	useEffect(() => {
		handleUnseen();
		router.refresh();
	}, []);

	useEffect(() => {
		setNotificationsArray(notifications);
	}, [notifications]);

	return (
		<Card>
			<CardHeader className='flex flex-row justify-between  items-center shadow-sm'>
				<div className='space-y-2'>
					<CardTitle>All notifications</CardTitle>
					<CardDescription>See Your latest notifications</CardDescription>
				</div>

				{notificationsArray.length !== 0 && (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button className='hover:bg-transparent' size={'xs'} variant='ghost'>
								<MoreVertical />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem
								onClick={() => {
									setWasSetAllAsRead(true);
									changedClikedAll();
									router.refresh();
								}}
								className='flex gap-2 items-center cursor-pointer'>
								<Check size={20} /> Mark all as read
							</DropdownMenuItem>

							<AlertDialog>
								<AlertDialogTrigger asChild className='flex justify-center items-center'>
									<Button
										className=' w-full text-left p-2 flex justify-start  gap-2'
										variant='ghost'
										size={'icon'}>
										<Trash size={20} /> Delete all notifications
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
										<AlertDialogDescription>
											This will delete your all notifications.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Cancel</AlertDialogCancel>
										<AlertDialogAction
											onClick={() => {
												toast({
													title: 'Deleting yout notifications, please wait',
												});
												deleteAll();
												router.refresh();
											}}>
											Continue
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</CardHeader>
			<CardContent className='space-y-2 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-thumb-rounded-md scrollbar-track-background '>
				{notificationsArray.length > 0 &&
					notificationsArray.map((notify) => (
						<NotifyCard
							key={notify.id}
							id={notify.id}
							name={notify.name}
							content={notify.content}
							image={notify.image}
							notifyType={notify.notifyType}
							unseen={notify.unseen}
							createdDate={notify.createdDate}
							cliked={notify.cliked}
							postId={notify.postsId}
							commentId={notify.commentId}
							wasSetAllAsRead={wasSetAllAsRead}
							resetAllAsRead={resetAllAsRead}
						/>
					))}
			</CardContent>
		</Card>
	);
};
