'use client';

import React from 'react';
import { DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { removeBucket } from '@/lib/removeBucket';
import { useQueryClient } from '@tanstack/react-query';
interface Props {
	postId: string;
	communityName: string;
	onEdit: () => void;
}

export const PostOptions = ({ postId, communityName, onEdit }: Props) => {
	const { toast } = useToast();
	const router = useRouter();
	const params = useParams();
	const path = usePathname();
	const queryClient = useQueryClient();

	const deletePostHandler = async () => {
		toast({
			title: 'Deleting your post. Please wait.',
		});

		try {
			const res = await fetch('/api/post/delete', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					postId,
					communityName,
				}),
			});
			if (!res.ok) {
				toast({
					variant: 'destructive',
					title: 'Oh no! Something went wrong.',
					description: res.statusText,
				});
			} else {
				const data: { imageName: string | null; bucketName: string | null } = await res.json();
				if (data.bucketName) await removeBucket(data.bucketName);

				queryClient.invalidateQueries();

				if (params.profile_name || path === '/saved' || params.community_name) router.refresh();
				else router.push('/');

				toast({
					title: 'Your post was deleted',
				});
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
			<DropdownMenuItem onClick={deletePostHandler} className='cursor-pointer text-destructive'>
				Delete
			</DropdownMenuItem>
		</DropdownMenuContent>
	);
};
