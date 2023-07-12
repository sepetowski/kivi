import React from 'react';
import {
	Card,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { generateUsernameInitials } from '@/lib/generateUsernameInitials';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Props {
	name: string;
	posts: number;
	mebmers: number;
	description: string;
	id: string;
	image: string;
}

export const BrowseCommunityCard = ({ name, description, id, mebmers, posts, image }: Props) => {
	return (
		<Card className='w-full  sm:w-[75%] lg:w-80 xl:w-96'>
			<CardHeader>
				<CardTitle className='flex justify-between items-center'>
					{name}
					<Avatar>
						<AvatarImage src={image} />
						<AvatarFallback>{generateUsernameInitials(name)}</AvatarFallback>
					</Avatar>
				</CardTitle>
				<div className='flex flex-col text-sm text-muted-foreground'>
					<p>
						Posts: <span className='font-medium text-primary'>{posts}</span>
					</p>

					<p>
						Members: <span className='font-medium text-primary'>{mebmers}</span>
					</p>
				</div>
			</CardHeader>

			<ScrollArea className='h-24 lg:h-32 p-6 pt-0  text-sm text-muted-foreground'>
				{description}
			</ScrollArea>

			<CardFooter className='flex items-center justify-end gap-2'>
				<Button size={'sm'}>Join</Button>
				<Link className={buttonVariants({ variant: 'outline', size: 'sm' })} href='/'>
					Check
				</Link>
			</CardFooter>
		</Card>
	);
};
