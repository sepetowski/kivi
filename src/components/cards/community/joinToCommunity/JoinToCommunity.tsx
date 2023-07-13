import React, { useState } from 'react';

import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';
interface Props {
	isCreatorOfCommunity: boolean;
	userJoined: boolean;
	id: string;
}

export const JoinToCommunity = ({ isCreatorOfCommunity, userJoined, id }: Props) => {
	const { toast } = useToast();
	const router = useRouter();
	const [isSending, setIsSending] = useState(false);

	const joinToCommunityHandler = async () => {
		setIsSending(true);
		try {
			const res = await fetch('/api/community/join', {
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
			{!isCreatorOfCommunity && !userJoined && (
				<Button disabled={isSending} onClick={joinToCommunityHandler} size={'sm'}>
					{!isSending && <>Join</>}
					{isSending && (
						<>
							Joining
							<Loader2Icon className='animate-spin ml-2' />
						</>
					)}
				</Button>
			)}
		</>
	);
};
