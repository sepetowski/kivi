'use client';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { MinusSquare, PlusSquare } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Props {
	image_background: string;
	name: string;
	sessionUserPage: boolean;
	id: string;
}

export const UserGameCard = ({ image_background, name, sessionUserPage, id }: Props) => {
	const { toast } = useToast();
	const router = useRouter();

	const removeGameFromAccount = async () => {
		if (!sessionUserPage) return;

		toast({
			title: `${name} is deleting form your account. Please wait.`,
		});
		try {
			const res = await fetch('/api/remove-game', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id,
					gameName: name,
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
		<Card
			onClick={removeGameFromAccount}
			className={`w-full  sm:w-[75%] lg:w-80 xl:w-96 h-52 relative rounded-lg overflow-hidden  ${
				sessionUserPage ? 'group cursor-pointer' : ''
			} `}>
			<div className='absolute w-full p-4  bottom-0 left-0 backdrop-blur-md bg-black/50 z-30  group-hover:opacity-0 duration-300 transition-opacity  '>
				<h3 className='text-white font-medium'>{name}</h3>
			</div>
			{sessionUserPage && (
				<div className='opacity-0 group-hover:opacity-100 absolute top-0 left-0 w-full h-full z-20 backdrop-blur-sm flex justify-center items-center transition-opacity duration-300 p-4 '>
					<MinusSquare color='white' size={80} />
				</div>
			)}

			<Image
				className='object-cover group-hover:scale-110 transition-transform duration-300'
				src={image_background}
				fill
				alt={`${name} picture`}
			/>
		</Card>
	);
};
