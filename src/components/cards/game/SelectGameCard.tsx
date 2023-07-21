'use client';
import React from 'react';
import { Card } from '@/components/ui/card';
import { PlusSquare } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Props {
	image_background: string;
	name: string;
}

export const SelectGameCard = ({ image_background, name }: Props) => {
	const { toast } = useToast();
	const router = useRouter();

	const onSaveCard = async () => {
		toast({
			title: `${name} is adding to your account. Please wait.`,
		});
		try {
			const res = await fetch('/api/add-game', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					gameName: name,
					image: image_background,
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
			onClick={onSaveCard}
			className='w-full  sm:w-[75%] lg:w-80 xl:w-96 h-52 relative rounded-lg overflow-hidden group cursor-pointer '>
			<div className='absolute w-full p-4  bottom-0 left-0 backdrop-blur-md bg-black/50 z-30  group-hover:opacity-0 duration-300 transition-opacity  '>
				<h3 className='text-white font-medium'>{name}</h3>
			</div>
			<div className='opacity-0 group-hover:opacity-100 absolute top-0 left-0 w-full h-full z-20 backdrop-blur-sm flex justify-center items-center transition-opacity duration-300 p-4 '>
				<PlusSquare color='white' size={80} />
			</div>
			<Image
				className='object-cover group-hover:scale-110 transition-transform duration-300'
				src={image_background}
				fill
				alt={`${name} picture`}
			/>
		</Card>
	);
};
