'use client';

import React from 'react';
import { LucideEdit3, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Game } from '@/components/profile/Games/Game';
import { Separator } from '@/components/ui/Separator';
import { AddNewGame } from '@/components/profile/Games/AddNewGame';
import { useState } from 'react';

export const Games = () => {
	const [isEditting, setIsEditting] = useState(false);

	const toogleEditHandler = () => {
		setIsEditting((prev) => !prev);
	};
	
	return (
		<div className='w-full my-4  p-4 bg-muted rounded-md'>
			<div className='flex justify-between items-center w-full'>
				<h2>My games</h2>
				<Button onClick={toogleEditHandler} variant='outline' size='icon'>
					{isEditting && <X />}
					{!isEditting && <LucideEdit3 />}
				</Button>
			</div>
			<Separator className='w-full mt-4' orientation='horizontal' />
			<div className='mt-4 flex gap-2 flex-wrap'>
				<Game isEditing={isEditting} account='Busmeen2' game='Lol' rank='Daimond' />
				<Game isEditing={isEditting} account='BUsh' game='Dota 2' rank='gold' since={2019} />
				<Game isEditing={isEditting} account='Busmeen' game='Wordls of Tanks' since={2020} />
				<Game isEditing={isEditting} account='Busmeen' game='Wordls of Warship' />
				{isEditting && <AddNewGame />}
			</div>
		</div>
	);
};
