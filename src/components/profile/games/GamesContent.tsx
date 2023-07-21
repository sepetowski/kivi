import { AddGameCard } from '@/components/cards/game/AddGameCard';
import { UserGameCard } from '@/components/cards/game/UserGameCard';
import { Game } from '@prisma/client';

interface Props {
	promise: Promise<Game[]>;
	sessionUserPage: boolean;
}

export const GamesContent = async ({ promise, sessionUserPage }: Props) => {
	const games = await promise;
	return (
		<div className='flex gap-6 items-center flex-wrap w-full my-8 '>
			{sessionUserPage && <AddGameCard />}
			{games.map((game) => (
				<UserGameCard
					key={game.id}
					id={game.id}
					image_background={game.image}
					name={game.gameName}
					sessionUserPage={sessionUserPage}
				/>
			))}
		</div>
	);
};
