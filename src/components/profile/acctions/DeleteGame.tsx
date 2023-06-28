'use client';
import React from 'react';
import { Trash } from 'lucide-react';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

interface Props {
	gameId: string;
}

export const DeleteGame = ({ gameId }: Props) => {
	const { toast } = useToast();
	const router = useRouter();

	const onDeleteHnalder = async () => {
		toast({
			title: 'Deleting game. Please wait',
		});
		try {
			const res = await fetch('/api/games/delete', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					gameId,
				}),
			});
			if (!res.ok)
				toast({
					variant: 'destructive',
					title: 'Oh no! Something went wrong.',
					description: res.statusText,
				});
			else {
				toast({
					title: res.statusText,
				});

				router.refresh();
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger>
				<Trash className='text-destructive' />
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure?</AlertDialogTitle>
					<AlertDialogDescription>Yor game inforamtion will be deleted.</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={onDeleteHnalder}>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
