import { AddGameCard } from '@/components/cards/game/AddGameCard';
import { UserGameCard } from '@/components/cards/game/UserGameCard';
import React from 'react';

export const GamesContent = () => {
	return (
		<div className='flex gap-6 items-center flex-wrap w-full my-8 '>
			<AddGameCard />
			<UserGameCard />
			<UserGameCard />
			<UserGameCard />
			<UserGameCard />
			<UserGameCard />
		</div>
	);
};
