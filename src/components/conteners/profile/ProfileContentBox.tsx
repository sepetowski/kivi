'use client';
import { GamesContent } from '@/components/profile/games/GamesContent';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export const ProfileContentBox = () => {
	const params = useSearchParams();
	let info = params.get('info');
	if (!info) info = 'posts';

	return <main className='px-4 lg:px-8 w-full'>{info === 'games' && <GamesContent />}</main>;
};
