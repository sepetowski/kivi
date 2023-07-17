import { Card } from '@/components/ui/card';
import { MinusSquare, PlusSquare } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface Props {
	image_background: string;
	name: string;
	sessionUserPage: boolean;
}

export const UserGameCard = ({ image_background, name, sessionUserPage }: Props) => {


	

	return (
		<Card className='w-full  sm:w-[75%] lg:w-80 xl:w-96 h-52 relative rounded-lg overflow-hidden group cursor-pointer '>
			<div className='absolute w-full p-4  bottom-0 left-0 backdrop-blur-md bg-black/50 z-30  group-hover:opacity-0 duration-300 transition-opacity  '>
				<h3 className='text-white font-medium'>{name}</h3>
			</div>

			<div className='opacity-0 group-hover:opacity-100 absolute top-0 left-0 w-full h-full z-20 backdrop-blur-sm flex justify-center items-center transition-opacity duration-300 p-4 '>
				{sessionUserPage && <MinusSquare color='white' size={80} />}
				{!sessionUserPage && <PlusSquare color='white' size={80} />}
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
