import React from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';



export const BrowseCommunityCard = () => {
	return (
		<Card className='w-full  sm:w-[75%] lg:w-80 xl:w-96'>
			<CardHeader>
				<CardTitle className='flex justify-between items-center'>
					Lol
					<Avatar>
						<AvatarImage src='https://github.com/shadcn.png' />
						<AvatarFallback>LOL</AvatarFallback>
					</Avatar>
				</CardTitle>
				<CardDescription>
					<p>
						Posts: <span className='font-medium text-primary'>1231</span>
					</p>
					<p>
						Members: <span className='font-medium text-primary'>1312</span>
					</p>
				</CardDescription>
			</CardHeader>
			<CardContent>
				<CardDescription>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam quas officiis dolore ut unde
					molestias maiores assumenda atque commodi itaque?
				</CardDescription>
			</CardContent>
			<CardFooter className='flex items-center justify-end gap-2'>
				<Button size={'sm'}>Join</Button>
				<Link className={buttonVariants({ variant: 'outline', size: 'sm' })} href='/'>
					Check
				</Link>
			</CardFooter>
		</Card>
	);
};
