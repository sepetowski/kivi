'use client';
import React, { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
interface Props {
	name: string;
	url: string;
}

export const CommunityItem = ({ name, url }: Props) => {
	const [loaded, setLoaded] = useState(false);
	const [showCommunity, setShowCommunity] = useState(false);
	const router = useRouter();

	useEffect(() => {
		setShowCommunity(true);
	}, [loaded]);

	const goToCommunitySite = () => {
		if (showCommunity) router.push(`/communities/community/${name}`);
	};

	return (
		<div
			onClick={goToCommunitySite}
			className={`flex items-center lg:gap-3 ${showCommunity ? 'cursor-pointer' : ''}`}>
			{showCommunity && (
				<>
					<div className='w-12 h-12 lg:w-10 lg:h-10 xl:w-12 xl:h-12 relative'>
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
