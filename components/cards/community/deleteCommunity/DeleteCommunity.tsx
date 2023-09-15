import React, { useState } from 'react';

import { useToast } from '@/components/ui/use-toast';
import { useParams, useRouter } from 'next/navigation';
import { removeFromBucket } from '@/lib/removeFromBucket';
import { COMMUNITY_AVATARS } from '@/lib/bucektsNames';
import { Loader2Icon } from 'lucide-react';
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
			const res = await fetch('/api/communities/delete', {
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
					title: "Community was deleted",
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
		<AlertDialog>
			<AlertDialogTrigger asChild>
				{isCreatorOfCommunity && userJoined && (
					<Button size={'sm'}>
						{!isSending && <>Delete</>}
						{isSending && (
							<>
								Deleting
								<Loader2Icon className='animate-spin ml-2' />
							</>
						)}
					</Button>
				)}
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete community and remove all data
						from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={deleteCommunityHandler}>Delete</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
