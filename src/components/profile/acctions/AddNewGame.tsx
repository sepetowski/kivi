import React from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { AddNewGameForm } from '@/components/forms/AddNewGameForm';

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
						Add game to your games profile section. Only Game and NickName Labes are required.
					</DialogDescription>
				</DialogHeader>
				<AddNewGameForm />
			</DialogContent>
		</Dialog>
	);
};
