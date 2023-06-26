'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { LucideEdit3 } from 'lucide-react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

interface Props {
	game: string;
	account: string;
	rank: string | undefined;
	since: number | undefined;
}
export const EditGameIfno = ({ account, game, rank, since }: Props) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<LucideEdit3  />
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>{game}</DialogTitle>
					<DialogDescription>
						You can edit inforamtion about your game. Click save when you are done.
					</DialogDescription>
				</DialogHeader>
				<div className='grid gap-4 py-4'>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='game' className='text-right'>
							Game
						</Label>
						<Input id='game' value={game} className='col-span-3' />
					</div>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='nick' className='text-right'>
							Nick
						</Label>
						<Input id='nick' value={account} className='col-span-3' />
					</div>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='rank' className='text-right'>
							Rank
						</Label>
						<Input id='rank' value={rank ? rank : ''} className='col-span-3' />
					</div>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='since' className='text-right'>
							Play since
						</Label>
						<Input id='since' value={since ? since : ''} className='col-span-3' />
					</div>
				</div>
				<DialogFooter>
					<Button type='submit'>Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
