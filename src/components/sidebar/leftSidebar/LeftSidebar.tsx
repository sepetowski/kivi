'use client';
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
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { ActiveLink } from '@/components/ui/ActiveLink';
import { useSession } from 'next-auth/react';

export const LeftSidebar = () => {
	const session = useSession();

	return (
		<Sidebar left={false}>
			<div className='mt-24 w-full h-5/6 flex flex-col items-center lg:items-start p-4 lg:p-6 gap-6 lg:gap-10 xl:text-xl overflow-y-auto font-medium'>
				<ActiveLink className='flex gap-3 cursor-pointer' href='/'>
					<Home />
					<span className='hidden lg:inline'>Home</span>
				</ActiveLink>
				<ActiveLink
					className='flex gap-3 cursor-pointer'
					href={`/profile/${session.data?.user.name}`}>
					<User2 />
					<span className='hidden lg:inline'>Profile</span>
				</ActiveLink>
				<ActiveLink className='flex gap-3 cursor-pointer' href='/explore'>
					<Search />
					<span className='hidden lg:inline'>Explore</span>
				</ActiveLink>

				<ActiveLink
					className='flex gap-3 cursor-pointer'
					href='/communities/browse'
					include='/communities/browse/created'>
					<Users2 />
					<span className='hidden lg:inline'>Communities</span>
				</ActiveLink>

				<ActiveLink className='flex gap-3 cursor-pointer' href='/notifications'>
					<Bell />
					<span className='hidden lg:inline'>Notification</span>
				</ActiveLink>

				<ActiveLink className='flex gap-3 cursor-pointer' href='/messeges'>
					<Mail />
					<span className='hidden lg:inline'>Messages</span>
				</ActiveLink>

				<ActiveLink className='flex gap-3 cursor-pointer' href='/saved'>
					<Bookmark />
					<span className='hidden lg:inline'>Saved</span>
				</ActiveLink>
			</div>
			<Separator className='mb-4' />
			<div className='text-sm lg:text-base mb-10 w-full p-4 flex flex-col gap-6 '>
				<Link href='/post' className={buttonVariants({ variant: 'default' })}>
					<PlusSquare className='lg:hidden' />
					<span className='hidden lg:inline'>New Post</span>
				</Link>
				<Link href='/communities/create' className={buttonVariants({ variant: 'secondary' })}>
					<SmilePlus className='lg:hidden' />
					<span className='hidden lg:inline text-center'>Create Community</span>
				</Link>
			</div>
		</Sidebar>
	);
};
