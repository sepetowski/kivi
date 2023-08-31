import React from 'react';
import { SelectGameCard } from '@/components/cards/game/SelectGameCard';
import { Game } from '@/types/game';

interface Props {
	games: Game[];
}

export const AddGamesContener = ({ games }: Props) => {
	return (
		<div className='flex justify-center flex-wrap mt-8 md:mt-12 gap-4 w-full items-center'>
			{games &&
				games.map((game) => (
					<SelectGameCard key={game.id} image_background={game.background_image} name={game.name} />
				))}
		</div>
	);
};