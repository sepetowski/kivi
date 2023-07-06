import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
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
import { Mail, Menu, User2, Users2, Bookmark} from 'lucide-react';

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
				<SheetFooter className='flex flex-col gap-6 gap-x-0 sm:flex-col sm:sm:space-x-0 w-full '>
					{/* <SheetClose asChild>
						<Link href='/communities/create' className={buttonVariants()}>
							Create Community
						</Link>
					</SheetClose>

					<SheetClose asChild>
						<Link
							href='/communitiy/create'
							className={buttonVariants({
								variant: 'secondary',
							})}>
							Create Community
						</Link>
					</SheetClose> */}
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};
