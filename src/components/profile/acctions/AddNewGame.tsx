'use client';
import React from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const AddNewGame = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='w-full mt-4 sm:mt-6 sm:text-lg sm:p-5' variant='default'>
					Add game
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Add game</DialogTitle>
					<DialogDescription>
						Add game to your games profile section. Only Game adn Nick Labes are required.
					</DialogDescription>
				</DialogHeader>
				<div className='grid gap-4 py-4'>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='game' className='text-right'>
							Game
						</Label>
						<Input id='game' value='Pedro Duarte' className='col-span-3' />
					</div>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='nick' className='text-right'>
							Nick
						</Label>
						<Input id='nick' value='@peduarte' className='col-span-3' />
					</div>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='rank' className='text-right'>
							Rank
						</Label>
						<Input id='rank' value='gold' className='col-span-3' />
					</div>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='since' className='text-right'>
							Play since
						</Label>
						<Input id='since' value='2021' className='col-span-3' />
					</div>
				</div>
				<DialogFooter>
					<Button type='submit'>Add</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
