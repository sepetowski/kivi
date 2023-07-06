import React from 'react';
import { Sidebar } from '@/components/sidebar/Sidebar';
import {
	Home,
	Search,
	Bell,
	Mail,
	Bookmark,
	User2,
	Users2,
	PlusSquare,
	SmilePlus,
} from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export const LeftSidebar = () => {
	return (
		<Sidebar left={false}>
			<div className='mt-24 w-full h-full flex flex-col items-center lg:items-start p-4 lg:p-6 gap-6 lg:gap-10 xl:text-xl overflow-y-auto'>
				<Link
					href='/'
					className='flex gap-3 hover:text-muted-foreground cursor-pointer transiti duration-200'>
					<Home />
					<span className='hidden lg:inline'>Home</span>
				</Link>
				<Link
					href='/'
					className='flex gap-3 hover:text-muted-foreground cursor-pointer transiti duration-200'>
					<User2 />
					<span className='hidden lg:inline'>Profile</span>
				</Link>
				<Link
					href='/'
					className='flex gap-3 hover:text-muted-foreground cursor-pointer transiti duration-200'>
					<Search />
					<span className='hidden lg:inline'>Explore</span>
				</Link>
				<Link
					href='/'
					className='flex gap-3 hover:text-muted-foreground cursor-pointer transiti duration-200'>
					<Users2 />
					<span className='hidden lg:inline'>Communities</span>
				</Link>
				<Link
					href='/'
					className='flex gap-3 hover:text-muted-foreground cursor-pointer transiti duration-200'>
					<Bell />
					<span className='hidden lg:inline'>Notification</span>
				</Link>
				<Link
					href='/'
					className='flex gap-3 hover:text-muted-foreground cursor-pointer transiti duration-200'>
					<Mail />
					<span className='hidden lg:inline'>Messages</span>
				</Link>
				<Link
					href='/'
					className='flex gap-3 hover:text-muted-foreground cursor-pointer transiti duration-200'>
					<Bookmark />
					<span className='hidden lg:inline'>Saved</span>
				</Link>
			</div>
			<Separator className='mb-4' />
			<div className='text-sm lg:text-base mb-10 w-full p-4 flex flex-col gap-6 '>
				<Button className=' w-full'>
					<PlusSquare className='lg:hidden' />
					<span className='hidden lg:inline'>New Post</span>
				</Button>
				<Link href='/communities/create' className={buttonVariants({ variant: 'secondary' })}>
					<SmilePlus className='lg:hidden' />
					<span className='hidden lg:inline text-center'>Create Community</span>
				</Link>
			</div>
		</Sidebar>
	);
};
