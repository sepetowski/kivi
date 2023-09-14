'use client';

import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
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
import { Button } from '@/components/ui/button';

export const BookmarksHeader = () => {
	const { toast } = useToast();
	const router = useRouter();
	const queryClient = useQueryClient();
	const [isSending, setIsSending] = useState(false);

	const deleteAllSavedPosts = async () => {
		setIsSending(true);
		toast({
			title: 'Deleting your saved posts. Please wait.',
		});

		try {
			const res = await fetch('/api/post/delete-all-saved', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (!res.ok) {
				toast({
					variant: 'destructive',
					title: 'Oh no! Something went wrong.',
					description: res.statusText,
				});
			} else {
				toast({
					title: res.statusText,
				});
				router.refresh();
				queryClient.invalidateQueries();
			}
		} catch (err) {
			toast({
				variant: 'destructive',
				title: 'Oh no! Something went wrong. Please try again',
			});
		}
		setIsSending(false);
	};

	return (
		<header className='w-full    flex justify-between items-center p-6 bg-background bg-opacity-60 mb-6 border rounded-md'>
			<h3 className='md:text-xl font-bold'>Saved</h3>

			<DropdownMenu>
				<DropdownMenuTrigger>
					<MoreVertical size={22} />
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<AlertDialog>
						<AlertDialogTrigger asChild className='flex justify-center items-center'>
							<Button
								className='text-destructive  w-full text-left p-2 flex justify-start'
								disabled={isSending}
								variant='ghost'
								size={'icon'}>
								Delete all
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
								<AlertDialogDescription>This will delete your saved posts.</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction onClick={deleteAllSavedPosts}>Continue</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	);
};
