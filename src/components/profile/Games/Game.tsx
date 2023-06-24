'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { LucideEdit3, Trash } from 'lucide-react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/DropDownMenu';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { EditGameForm } from './EditGameForm';

interface Props {
	game: string;
	account: string;
	rank?: string;
	since?: number;
	isEditing: boolean;
}
export const Game = ({ account, game, since, rank, isEditing }: Props) => {
	return (
		<div className={`flex justify-center items-center gap-4 ${isEditing ? 'w-full' : ''}`}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button className={`${isEditing ? 'w-full' : ''}`} variant='outline'>
						{game}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='w-56'>
					<DropdownMenuLabel>{game}</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem>
							Nick
							<DropdownMenuShortcut>{account}</DropdownMenuShortcut>
						</DropdownMenuItem>
						{rank && (
							<DropdownMenuItem>
								Rank
								<DropdownMenuShortcut>{rank}</DropdownMenuShortcut>
							</DropdownMenuItem>
						)}
						{since && (
							<DropdownMenuItem>
								Playing since
								<DropdownMenuShortcut>{since}</DropdownMenuShortcut>
							</DropdownMenuItem>
						)}
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
			{isEditing && (
				<>
					<Dialog>
						<DialogTrigger asChild>
							<Button variant='ghost' size='icon'>
								<LucideEdit3 />
							</Button>
						</DialogTrigger>
						<DialogContent className='sm:max-w-[425px]'>
							<DialogHeader>
								<DialogTitle>{game}</DialogTitle>
								<DialogDescription>
									You can edit inforamtion about your game. Click save when you are done.
								</DialogDescription>
							</DialogHeader>
							<EditGameForm account={account} game={game} rank={rank} since={since} />
							<DialogFooter>
								<Button type='submit'>Save changes</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>

					<Button className='text-destructive' variant='ghost' size='icon'>
						<Trash />
					</Button>
				</>
			)}
		</div>
	);
};
