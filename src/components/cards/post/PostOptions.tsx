'use client';

import React, { useState } from 'react';
import { DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { useParams, useRouter } from 'next/navigation';
import { da } from 'date-fns/locale';
import { removeFromBucket } from '@/lib/removeFromBucket';
import { removeBucket } from '@/lib/removeBucket';
import { checkIfBucketExist } from '@/lib/checkIfBucketExist';

interface Props {
	postId: string;
	communityName: string;
	onEdit: () => void;
}

export const PostOptions = ({ postId, communityName, onEdit }: Props) => {
	const { toast } = useToast();
	const router = useRouter();
	const params = useParams();

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
				if (params.community_name || params.post_id)
					router.push(`/communities/community/${communityName}`);
				else router.push('/');

				toast({
					title: res.statusText,
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
