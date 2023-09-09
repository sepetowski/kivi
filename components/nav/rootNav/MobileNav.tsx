import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Mail, Menu, User2, Users2, Bookmark, Gamepad2 } from 'lucide-react';
import { ActiveLink } from '@/components/ui/ActiveLink';


interface Props {
	userName: string | null | undefined;

}

export const MobileNav = ({ userName}: Props) => {
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
						<ActiveLink href={`/profile/${userName}`} className='flex gap-3 cursor-pointer'>
							<User2 />
							<span>Profile</span>
						</ActiveLink>
					</SheetClose>
					<SheetClose className=' flex items-center gap-4' asChild>
						<ActiveLink
							className='flex gap-3 cursor-pointer'
							href='/communities/browse'
							include='/communities/browse/created'>
							<Users2 />
							<span>Communities</span>
						</ActiveLink>
					</SheetClose>

					<SheetClose className=' flex items-center gap-4' asChild>
						<ActiveLink className='flex gap-3 cursor-pointer' href='/messages'>
							<Mail />
							<span>Messages</span>
						</ActiveLink>
					</SheetClose>
					<SheetClose className=' flex items-center gap-4' asChild>
						<ActiveLink className='flex gap-3 cursor-pointer' href='/add/games'>
							<Gamepad2 />
							<span>Games</span>
						</ActiveLink>
					</SheetClose>
					<SheetClose className=' flex items-center gap-4' asChild>
						<ActiveLink className='flex gap-3 cursor-pointer' href='/saved'>
							<Bookmark />
							<span>Saved</span>
						</ActiveLink>
					</SheetClose>
				</div>
				<Separator className='my-10' />
				<SheetFooter className='flex flex-col gap-6 gap-x-0 sm:flex-col  w-full sm:space-x-0 '>
					<SheetClose asChild>
						<Link href='/add/games' className={buttonVariants()}>
							Add games
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
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};
