'use client';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { generateUsernameInitials } from '@/lib/generateUsernameInitials';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

interface Props {
	userId: string;
	image: string | null | undefined;
	name: string | null | undefined;
	conversationId: string | null;
}

export const SearchConversationsTabAccount = ({ conversationId, image, name, userId }: Props) => {
	const router = useRouter();
	const { toast } = useToast();

	console.log(userId);

	const createNewConversation = async () => {
		try {
			const res = await fetch('/api/messages/create-conversation', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					connectToUserId: userId,
				}),
			});
			if (!res.ok) {
				toast({
					variant: 'destructive',
					title: 'Oh no! Something went wrong.',
					description: res.statusText,
				});
			} else {
				const conversationId = (await res.json()) as string;
				router.push(`/messages/m/${conversationId}`);
				router.refresh();
			}
		} catch (err) {
			toast({
				variant: 'destructive',
				title: 'Oh no! Something went wrong. Please try again',
			});
		}
	};

	const onGoToConversationHandler = () => {
		if (conversationId) {
			router.push(`/messages/m/${conversationId}`);
			router.refresh();
		} else createNewConversation();
	};

	return (
		<div
			onClick={onGoToConversationHandler}
			className='flex justify-between items-center gap-4 w-full transition-colors duration-200 hover:bg-muted p-2 cursor-pointer rounded-md relative'>
			<div className='flex items-center gap-4 w-[90%]'>
				<Avatar className='w-10 lg:w-12 h-10 lg:h-12 bg-accent'>
					{image && <AvatarImage src={image} alt={`profile image of ${name} user`} />}
					{name && (
						<AvatarFallback className='bg-accent'>{generateUsernameInitials(name)}</AvatarFallback>
					)}
				</Avatar>
				<p>{name}</p>
			</div>
		</div>
	);
};
