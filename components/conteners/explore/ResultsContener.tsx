'use client';
import React, { useEffect, useState } from 'react';
import { ResultAccount } from './ResultAccount';
import { Button } from '@/components/ui/button';
import { ExtenedSerachHistory } from '@/types/searchHistory';
import { SearchingUser } from '@/types/searchingUser';
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
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

interface Props {
	inputEmpty: boolean;
	userSearchHistroy: ExtenedSerachHistory[];
	searchResults: SearchingUser[] | undefined;
	isFetched: boolean;
	isFetching: boolean;
	isTyping: boolean;
	query: string;
}

export const ResultsContener = ({
	inputEmpty,
	userSearchHistroy,
	isFetched,
	isFetching,
	searchResults,
	isTyping,
	query,
}: Props) => {
	const [showHistory, setShowHistory] = useState(true);
	const router = useRouter();
	const { toast } = useToast();

	useEffect(() => {
		if (inputEmpty) {
			setShowHistory(true);
		} else {
			if (isTyping) return;
			setShowHistory(false);
		}
	}, [inputEmpty, isTyping]);

	const deleteAllHandler = async () => {
		try {
			const res = await fetch('/api/explore/delete-all', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (!res.ok) {
				toast({
					variant: 'destructive',
					title: 'Oh no! Something went wrong.',
					description: res.statusText,
				});
			}
			router.refresh();
		} catch (err) {
			toast({
				variant: 'destructive',
				title: 'Oh no! Something went wrong. Please try again',
			});
		}
	};

	return (
		<div className='w-full'>
			{showHistory && (
				<div className='flex items-center justify-between'>
					<h2 className='font-bold px-3'>Recent searches</h2>
					{userSearchHistroy.length !== 0 && (
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button
									size={'sm'}
									variant={'ghost'}
									className='text-pink-600 dark:text-purple-600 hover:text-pink-500 dark:hover:text-purple-500 transition-colors duration-200 hover:bg-background  '>
									Clear everything
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
									<AlertDialogDescription>
										This will delete your all searching history.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Cancel</AlertDialogCancel>
									<AlertDialogAction onClick={deleteAllHandler}>Continue</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					)}
				</div>
			)}
			<div className='flex flex-col gap-5 mt-4  min-h-[10rem] h-[60vh] overflow-y-auto scrollbar-none'>
				{showHistory && (
					<>
						{userSearchHistroy.length > 0 &&
							userSearchHistroy.map((result) => (
								<ResultAccount
									key={result.id}
									name={result.name}
									desc={result.desc}
									resultId={result.id}
									imageUrl={result.image}
								/>
							))}
						{userSearchHistroy.length === 0 && (
							<div className='flex justify-center items-center mt-6'>
								<p className='text-lg md:text-xl'>No recent seraches</p>
							</div>
						)}
					</>
				)}
				{!showHistory && (
					<>
						{isFetched && !isFetching && searchResults?.length === 0 && (
							<div className='flex justify-center items-center mt-6'>
								<p className='text-lg md:text-xl'>
									No results found for <span className='font-bold'>&quot;{query}&quot;</span>
								</p>
							</div>
						)}
						{isFetched && !isFetching && searchResults && searchResults?.length > 0 && (
							<>
								{searchResults.map((result) => (
									<ResultAccount
										key={result.id}
										name={result.name}
										desc={result.desc}
										serachdUserId={result.id}
										imageUrl={result.image}
									/>
								))}
							</>
						)}
					</>
				)}
			</div>
		</div>
	);
};
