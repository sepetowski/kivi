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
	Gamepad2,
} from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { ActiveLink } from '@/components/ui/ActiveLink';
import { getAuthSession } from '@/lib/auth';
import { Separator } from '@/components/ui/separator';
import { getUnseenNotifactions } from '@/lib/getUnseenNotifactions';
import { Notifications } from '@prisma/client';
import { getUnreadMessages } from '@/lib/getUnreadMessages';
import { UnseenMessage } from '@/types/unseenMessages';

export const LeftSidebar = async () => {
	const session = await getAuthSession();

	let notifications: Notifications[] = [];
	let unreadMesseges = 0;
	if (session) {
		notifications = await getUnseenNotifactions(session.user.id);
		const unreadConversations: UnseenMessage[] = await getUnreadMessages(session.user.id);
		unreadConversations.forEach((conversation) => {
			conversation.messages.forEach((_) => {
				unreadMesseges++;
			});
		});
	}

	return (
		<Sidebar left={false}>
			<div className='mt-24 w-full h-5/6 flex flex-col items-center lg:items-start p-4 lg:p-6 gap-6 lg:gap-10 xl:text-xl overflow-y-auto font-medium scrollbar-thin scrollbar-thumb-secondary scrollbar-thumb-rounded-md scrollbar-track-background  '>
				<ActiveLink className='flex gap-3 cursor-pointer' href='/'>
					<Home />
					<span className='hidden lg:inline'>Home</span>
				</ActiveLink>
				<ActiveLink
					className='flex gap-3 cursor-pointer'
					href={`/profile/${session && session.user.name}`}>
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

				<ActiveLink className='flex gap-3 cursor-pointer relative' href='/notifications'>
					{notifications.length > 0 && (
						<div className='absolute left-[-7px] top-[-12px] rounded-full  w-6 h-6 flex justify-center items-center bg-primary text-secondary text-sm  shadow-sm'>
							{notifications.length <= 9 && <p>{notifications.length}</p>}
							{notifications.length > 9 && <p>+9</p>}
						</div>
					)}

					<Bell />
					<span className='hidden lg:inline'>Notifications</span>
				</ActiveLink>

				<ActiveLink
					className='flex gap-3 cursor-pointer relative'
					href='/messages'
					include='/messages/m/'>
					{unreadMesseges > 0 && (
						<div className='absolute left-[-7px] top-[-12px] rounded-full  w-6 h-6 flex justify-center items-center bg-primary text-secondary text-sm  shadow-sm'>
							{unreadMesseges <= 9 && <p>{unreadMesseges}</p>}
							{unreadMesseges > 9 && <p>+9</p>}
						</div>
					)}
					<Mail />
					<span className='hidden lg:inline'>Messages</span>
				</ActiveLink>

				<ActiveLink className='flex gap-3 cursor-pointer' href='/add/games'>
					<Gamepad2 />
					<span className='hidden lg:inline'>Games</span>
				</ActiveLink>

				<ActiveLink className='flex gap-3 cursor-pointer' href='/saved'>
					<Bookmark />
					<span className='hidden lg:inline'>Saved</span>
				</ActiveLink>
			</div>
			<Separator className='mb-4' />
			<div className='text-sm lg:text-base mb-10 w-full p-4 flex flex-col gap-6 '>
				<Link
					href='/add/games'
					className={`lg:min-h-[2.75rem] ${buttonVariants({ variant: 'default' })}`}>
					<PlusSquare className='lg:hidden' />
					<span className='hidden lg:inline'>Add Games</span>
				</Link>
				<Link
					href='/communities/create'
					className={`lg:min-h-[2.75rem] ${buttonVariants({ variant: 'secondary' })}`}>
					<SmilePlus className='lg:hidden' />
					<span className='hidden lg:inline text-center'>Create Community</span>
				</Link>
			</div>
		</Sidebar>
	);
};
