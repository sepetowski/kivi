'use client';
import { Card } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Props {
	name: string;
	image: string;
}

export const ProfileCommunityCard = ({ image, name }: Props) => {
	const router = useRouter();
	const goToCommunitySite = () => {
		router.push(`/communities/community/${name}`);
	};

	return (
		<Card
			onClick={goToCommunitySite}
			className='w-full sm:w-[calc((100%/2)-1.5rem)] 2xl:w-[calc((100%/3)-1.5rem)] h-52  relative rounded-lg overflow-hidden group cursor-pointer'>
			<div className='absolute w-full p-4  bottom-0 left-0 backdrop-blur-md bg-black/50 z-30  group-hover:opacity-0 duration-300 transition-opacity  '>
				<h3 className='text-white font-medium'>{name}</h3>
			</div>

			<div className='opacity-0 group-hover:opacity-100 absolute top-0 left-0 w-full h-full z-20 backdrop-blur-sm flex justify-center items-center transition-opacity duration-300 p-4 '>
				<ExternalLink color='white' size={80} />
			</div>

			<Image
				className='object-cover group-hover:scale-110 transition-transform duration-300'
				src={image}
				fill
				alt={`${name} picture`}
			/>
		</Card>
	);
};
