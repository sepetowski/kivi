import React from 'react';
import { LucideEdit3 } from 'lucide-react';
import { EdditGameForm } from '@/components/forms/EdditGameForm';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

interface Props {
	game: string;
	account: string;
	rank: string | null;
	since: string | null;
	gameId: string;
}
export const EditGameIfno = ({ account, game, rank, since, gameId }: Props) => {
	return (
		<Dialog>
			<DialogTrigger className='cursor-pointer' asChild>
				<LucideEdit3 />
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>{game}</DialogTitle>
					<DialogDescription>
						You can edit inforamtion about your game. Click save when you are done.
					</DialogDescription>
				</DialogHeader>
				<EdditGameForm account={account} game={game} rank={rank} since={since} gameId={gameId} />
			</DialogContent>
		</Dialog>
	);
};
