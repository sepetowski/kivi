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

export const BookmarksHeader = () => {
	const { toast } = useToast();
	const router = useRouter();
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
		<header className='w-full    flex justify-between items-center p-6 bg-black bg-opacity-60 mb-6 border rounded-md'>
			<h3 className='md:text-xl font-bold'>Saved</h3>

			<DropdownMenu>
				<DropdownMenuTrigger>
					<MoreVertical size={22} />
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem
						disabled={isSending}
						onClick={deleteAllSavedPosts}
						className='cursor-pointer text-destructive'>
						Delete all
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	);
};
