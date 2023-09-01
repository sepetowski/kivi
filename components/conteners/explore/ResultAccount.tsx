'use client';
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { generateUsernameInitials } from '@/lib/generateUsernameInitials';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

interface Props {
	resultId?: string;
	serachdUserId?: string;
	imageUrl: string | null | undefined;
	name: string | null | undefined;
	desc: string | null | undefined;
}

export const ResultAccount = ({ desc, resultId, serachdUserId, imageUrl, name }: Props) => {
	const [isDeleting, setIsDeleting] = useState(false);
	const router = useRouter();
	const { toast } = useToast();

	const navigateAndSaveInHistory = async () => {
		try {
			const res = await fetch('/api/explore/add-to-history', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					serachdUserId,
					resultId,
				}),
			});
			if (!res.ok) {
				toast({
					variant: 'destructive',
					title: 'Oh no! Something went wrong.',
					description: res.statusText,
				});
			}
			router.push(`/profile/${name}`);
			router.refresh();
		} catch (err) {
			toast({
				variant: 'destructive',
				title: 'Oh no! Something went wrong. Please try again',
			});
		}
	};

	const deleteFromHistory = async () => {
		setIsDeleting(true);

		try {
			const res = await fetch('/api/explore/delete-from-history', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					resultId,
				}),
			});
			if (!res.ok) {
				toast({
					variant: 'destructive',
					title: 'Oh no! Something went wrong.',
					description: 'Could not delete account from history. Try again',
				});
			}
			router.refresh();
		} catch (err) {
			toast({
				variant: 'destructive',
				title: 'Oh no! Something went wrong. Please try again',
			});
		}
		setIsDeleting(false);
	};

	return (
		<div
			onClick={navigateAndSaveInHistory}
			className='flex justify-between items-center gap-4 w-full transition-colors duration-200 hover:bg-muted p-2 cursor-pointer rounded-md'>
			<div className='flex items-center gap-4'>
				<Avatar className='w-14 h-14 bg-accent'>
					{imageUrl && <AvatarImage src={imageUrl} alt={`profile image of ${name} user`} />}
					<AvatarFallback className='bg-accent'>
						{generateUsernameInitials(name ? name : '')}
					</AvatarFallback>
				</Avatar>
				<div className='flex flex-col'>
					<p>{name}</p>
					<p className='text-sm text-muted-foreground'>{desc}</p>
				</div>
			</div>
			{resultId && (
				<Button
					disabled={isDeleting}
					onClick={(e) => {
						e.stopPropagation();
						deleteFromHistory();
					}}
					className='ml-4'
					size={'xs'}
					variant={'ghost'}>
					<X />
				</Button>
			)}
		</div>
	);
};
