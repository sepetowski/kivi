import React from 'react';

import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { removeFromBucket } from '@/lib/removeFromBucket';
import { COMMUNITY_AVATARS } from '@/lib/bucektsNames';

interface Props {
	isCreatorOfCommunity: boolean;
	userJoined: boolean;
	id: string;
}

export const DeleteCommunity = ({ isCreatorOfCommunity, userJoined, id }: Props) => {
	const { toast } = useToast();
	const router = useRouter();

	const deleteCommunityHandler = async () => {
		try {
			const res = await fetch('/api/community/delete', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					communityId: id,
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
				const data: { fileName: string } = await res.json();
				await removeFromBucket(COMMUNITY_AVATARS, data.fileName);

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
		<>
			{isCreatorOfCommunity && userJoined && (
				<Button onClick={deleteCommunityHandler} size={'sm'}>
					Delete
				</Button>
			)}
		</>
	);
};
