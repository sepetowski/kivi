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
import Image from 'next/image';
import { ThumbsUp, ThumbsDown, MessageSquare, BookmarkPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const PostCard = () => {
	return (
		<Card>
			<CardHeader>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-3'>
						<Avatar className='w-14 h-14'>
							<AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<div>
							<CardTitle>Bushmeen</CardTitle>
							<CardDescription>Added 2 days ago</CardDescription>
						</div>
					</div>
					<p>
						in <Link href='/'>Ea Gems</Link>
					</p>
				</div>
			</CardHeader>
			<CardContent className='flex flex-col gap-4'>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia obcaecati facilis id
					saepe nesciunt, aperiam illo! Fugit vel eius qui recusand
				</p>
				<div className='relative w-full h-72'>
					<Image fill src='/loginImgBig.jpg' alt='' />
				</div>
			</CardContent>
			<CardFooter className='flex justify-between items-center'>
				<div className='flex gap-4 sm:gap-10 items-center'>
					<div className='flex items-center gap-2'>
						<Button className='hover:bg-transparent text-green-600' variant={'ghost'} size={'icon'}>
							<ThumbsUp />
						</Button>
						<span>48</span>
					</div>
					<div className='flex items-center gap-2'>
						<Button className='hover:bg-transparent text-red-600' variant={'ghost'} size={'icon'}>
							<ThumbsDown />
						</Button>
						<span>12</span>
					</div>
					<div className='flex items-center gap-2'>
						<Button className='hover:bg-transparent' variant={'ghost'} size={'icon'}>
							<MessageSquare />
						</Button>
						<span>8</span>
					</div>
				</div>

				<Button className='hover:bg-transparent' variant={'ghost'} size={'icon'}>
					<BookmarkPlus />
				</Button>
			</CardFooter>
		</Card>
	);
};
