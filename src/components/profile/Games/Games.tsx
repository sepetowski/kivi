'use client';

import React, { useEffect } from 'react';
import { LucideEdit3, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Game } from '@/components/profile/games/Game';
import { Separator } from '@/components/ui/separator';
import { AddNewGame } from '@/components/profile/acctions/AddNewGame';
import { useState } from 'react';
import { User } from '@/types/user';

interface Props {
	userData: User;
}

export const Games = ({ userData }: Props) => {
	const [isEditting, setIsEditting] = useState(false);

	const toogleEditHandler = () => {
		setIsEditting((prev) => !prev);
	};

	useEffect(() => {
		if (userData.games.length === 0) setIsEditting(false);
	}, [isEditting,userData.games.length]);
	
	return (
		<div className='w-full lg:top-24 lg:left-0 my-4  p-4 bg-muted rounded-md sm:my-6'>
			<div className='flex justify-between items-center w-full'>
				{userData.sessionUserPage && (
					<>
						<h2 className='sm:text-xl'>My games</h2>
						{userData.games.length > 0 && (
							<Button onClick={toogleEditHandler} className='sm:p-1' variant='outline' size='icon'>
								{isEditting && <X />}
								{!isEditting && <LucideEdit3 />}
							</Button>
						)}
					</>
				)}
				{!userData.sessionUserPage && <h2 className='sm:text-xl'>{userData.name} games</h2>}
			</div>
			<Separator className='w-full mt-4 ' orientation='horizontal' />
			<div className='mt-4 flex gap-2 flex-wrap'>
				{userData.games.length > 0 &&
					userData.games.map((game) => (
						<Game
							key={game.id}
							isEditing={userData.sessionUserPage && isEditting}
							game={game.gameName}
							rank={game.rank}
							since={game.playingSince}
							account={game.nickName}
							gameId={game.id}
						/>
					))}
				{userData.games.length === 0 && userData.sessionUserPage && !isEditting && (
					<div className='w-full text-center max-w-md mx-auto'>
						<p className='my-2'>No games added. Add your fisrt game!</p>
						<AddNewGame />
					</div>
				)}
				{userData.games.length === 0 && !userData.sessionUserPage && (
					<div>
						<p>{userData.name} has no added games yet.</p>
					</div>
				)}

				{userData.sessionUserPage && isEditting && <AddNewGame />}
			</div>
		</div>
	);
};
