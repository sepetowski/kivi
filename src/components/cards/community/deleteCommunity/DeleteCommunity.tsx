import React, { useState } from 'react';

import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { removeFromBucket } from '@/lib/removeFromBucket';
import { COMMUNITY_AVATARS } from '@/lib/bucektsNames';
import { Loader2Icon } from 'lucide-react';

interface Props {
	isCreatorOfCommunity: boolean;
	userJoined: boolean;
	id: string;
}

export const DeleteCommunity = ({ isCreatorOfCommunity, userJoined, id }: Props) => {
	const { toast } = useToast();
	const router = useRouter();
	const [isSending, setIsSending] = useState(false);

	const deleteCommunityHandler = async () => {
		setIsSending(true);
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
		setIsSending(false);
	};

	return (
		<>
			{isCreatorOfCommunity && userJoined && (
				<Button onClick={deleteCommunityHandler} size={'sm'}>
					{!isSending && <>Delete</>}
					{isSending && (
						<>
							Deleting
							<Loader2Icon className='animate-spin ml-2' />
						</>
					)}
				</Button>
			)}
		</>
	);
};
