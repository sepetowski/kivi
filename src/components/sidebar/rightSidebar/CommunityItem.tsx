'use client';
import React, { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
interface Props {
	name: string;
	url: string;
}

export const CommunityItem = ({ name, url }: Props) => {
	const [loaded, setLoaded] = useState(false);
	const [showCommunity, setShowCommunity] = useState(false);

	useEffect(() => {
		setShowCommunity(true);
	}, [loaded]);

	return (
		<div className='flex items-center gap-3'>
			{showCommunity && (
				<>
					<div className='w-12 h-12 relative'>
						<Image
							onLoad={() => setLoaded(true)}
							className='rounded-full object-cover'
							src={url}
							alt={`Avatar of ${name} community`}
							fill
						/>
					</div>
					<p className='w-2/3 hidden lg:inline'>{name}</p>
				</>
			)}
			{!showCommunity && (
				<>
					<Skeleton className='h-12 w-12 rounded-full' />
					<Skeleton className='hidden lg:block h-4 w-2/3' />
				</>
			)}
		</div>
	);
};
