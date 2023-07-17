import React from 'react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { PlusSquare } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';

export const AddGameCard = () => {
	return (
		<Card className='w-full sm:w-[calc((100%/2)-1.5rem)] 2xl:w-[calc((100%/3)-1.5rem)] h-52  rounded-lg overflow-hidden bg-muted flex justify-center items-center '>
			<Link
				href='/add/games'
				className={`flex gap-2 items-center ${buttonVariants({ variant: 'outline' })}`}>
				<span>Add new game</span>
				<PlusSquare />
			</Link>
		</Card>
	);
};
