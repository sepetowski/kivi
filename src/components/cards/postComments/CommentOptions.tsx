'use client';

import React, { useState } from 'react';
import { DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

interface Props {
	commentId: string;
	onEdit: () => void;
}

export const CommentOptions = ({ commentId, onEdit }: Props) => {
	const { toast } = useToast();
	const router = useRouter();

	const deleteCommentHandler = async () => {
		toast({
			title: 'Deleting comment. Please wait.',
		});
		try {
			const res = await fetch('/api/comments/delete', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					commentId,
				}),
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
	};

	return (
		<DropdownMenuContent>
			<DropdownMenuItem
				onClick={() => {
					onEdit();
				}}
				className='cursor-pointer'>
				Edit
			</DropdownMenuItem>
			<DropdownMenuItem onClick={deleteCommentHandler} className='cursor-pointer text-destructive'>
				Delete
			</DropdownMenuItem>
		</DropdownMenuContent>
	);
};
