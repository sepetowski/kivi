'use client';

import React from 'react';
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

	return (
		<div className='w-full my-4  p-4 bg-muted rounded-md sm:my-6'>
			<div className='flex justify-between items-center w-full'>
				{userData.sessionUserPage && (
					<>
						<h2 className='sm:text-xl'>My games</h2>
						<Button onClick={toogleEditHandler} className='sm:p-1' variant='outline' size='icon'>
							{isEditting && <X />}
							{!isEditting && <LucideEdit3 />}
						</Button>
					</>
				)}
				{!userData.sessionUserPage && <h2 className='sm:text-xl'>{userData.name} games</h2>}
			</div>
			<Separator className='w-full mt-4 ' orientation='horizontal' />
			<div className='mt-4 flex gap-2 flex-wrap'>
				<Game
					isEditing={userData.sessionUserPage && isEditting}
					account='Busmeen2'
					game='Lol'
					rank='Daimond'
				/>
				<Game
					isEditing={userData.sessionUserPage && isEditting}
					account='BUsh'
					game='Dota 2'
					rank='gold'
					since={2019}
				/>
				<Game
					isEditing={userData.sessionUserPage && isEditting}
					account='Busmeen'
					game='Wordls of Tanks'
					since={2020}
				/>
				<Game
					isEditing={userData.sessionUserPage && isEditting}
					account='Busmeen'
					game='Wordls of Warship'
				/>
				{userData.sessionUserPage && isEditting && <AddNewGame />}
			</div>
		</div>
	);
};
