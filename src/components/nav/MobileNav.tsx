import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Mail, Menu, User2, Users2, Bookmark, PlusSquare } from 'lucide-react';

export const MobileNav = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button size={'icon'} variant='ghost'>
					<Menu />
				</Button>
			</SheetTrigger>
			<SheetContent className='overflow-y-auto'>
				<SheetHeader className='text-left'>
					<SheetTitle className='text-2xl font-bold'>Menu</SheetTitle>
				</SheetHeader>
				<Separator className='my-10' />
				<div className='text-xl flex flex-col gap-6  font-bold'>
					<SheetClose className=' flex items-center gap-4' asChild>
						<Link
							href='/'
							className='flex gap-3 hover:text-muted-foreground cursor-pointer transiti duration-200'>
							<User2 />
							<span>Profile</span>
						</Link>
					</SheetClose>
					<SheetClose className=' flex items-center gap-4' asChild>
						<Link
							href='/'
							className='flex gap-3 hover:text-muted-foreground cursor-pointer transiti duration-200'>
							<Users2 />
							<span>Communities</span>
						</Link>
					</SheetClose>

					<SheetClose className=' flex items-center gap-4' asChild>
						<Link
							href='/'
							className='flex gap-3 hover:text-muted-foreground cursor-pointer transiti duration-200'>
							<Mail />
							<span>Messages</span>
						</Link>
					</SheetClose>
					<SheetClose className=' flex items-center gap-4' asChild>
						<Link
							href='/'
							className='flex gap-3 hover:text-muted-foreground cursor-pointer transiti duration-200'>
							<Bookmark />
							<span>Saved</span>
						</Link>
					</SheetClose>
				</div>
				<Separator className='my-10' />
				<SheetFooter className='flex flex-col gap-6 sm:flex-col'>
					<SheetClose asChild>
						<Button className='w-full'>
							<span>New Post</span>
						</Button>
					</SheetClose>
					<SheetClose asChild>
						<Button variant='secondary' className='w-full'>
							<span>Create Community</span>
						</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};
