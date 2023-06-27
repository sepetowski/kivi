'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { DeleteGame } from '@/components/profile/acctions/DeleteGame';
import { EditGameIfno } from '@/components/profile/acctions/EditGameInfo';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Props {
	game: string;
	account: string;
	rank?: string;
	since?: number;
	isEditing: boolean;
}
export const Game = ({ account, game, since, rank, isEditing }: Props) => {
	return (
		<div className={`flex justify-center items-center gap-4  ${isEditing ? 'w-full' : ''}`}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button className={`sm:text-base  ${isEditing ? 'w-full' : ''}`} variant='outline'>
						{game}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='w-56 sm:w-64'>
					<DropdownMenuLabel className='sm:text-base'>{game}</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem className='sm:text-base'>
							Nick
							<DropdownMenuShortcut className='sm:text-base'>{account}</DropdownMenuShortcut>
						</DropdownMenuItem>
						{rank && (
							<DropdownMenuItem className='sm:text-base'>
								Rank
								<DropdownMenuShortcut className='sm:text-base'>{rank}</DropdownMenuShortcut>
							</DropdownMenuItem>
						)}
						{since && (
							<DropdownMenuItem className='sm:text-base'>
								Playing since
								<DropdownMenuShortcut className='sm:text-base'>{since}</DropdownMenuShortcut>
							</DropdownMenuItem>
						)}
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
			{isEditing && (
				<>
					<EditGameIfno account={account} game={game} rank={rank} since={since} />
					<DeleteGame />
				</>
			)}
		</div>
	);
};
