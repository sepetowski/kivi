import React from 'react';
import { ThemeSwitcher } from '@/components/themeSwitcher/ThemeSwitcher';
import Link from 'next/link';
import Image from 'next/image';
import { UserAccount } from '../user/UserAccount';
import { SignInOrUpLink } from './SignInOrUpLink';
import { Bell, Home, Search } from 'lucide-react';
import { MobileNav } from './MobileNav';
import { ActiveLink } from '@/components/ui/ActiveLink';
import { getAuthSession } from '@/lib/auth';
import { getUnseenNotifactions } from '@/lib/getUnseenNotifactions';
import { UnseenMessage } from '@/types/unseenMessages';
import { getUnreadMessages } from '@/lib/getUnreadMessages';

export const Nav = async () => {
	const session = await getAuthSession();

	let notifications = [];
	let unreadMesseges = 0;
	if (session) {
		notifications = await getUnseenNotifactions(session.user.id);

		notifications = await getUnseenNotifactions(session.user.id);
		const unreadConversations: UnseenMessage[] = await getUnreadMessages(session.user.id);
		unreadConversations.forEach((conversation) => {
			conversation.messages.forEach((_) => {
				unreadMesseges++;
			});
		});
	}

	return (
		<nav className=' fixed top-0 left-0 w-full border-b bg-background shadow-sm z-[1000] flex flex-col '>
			<div className='w-full max-w-[1800px] mx-auto flex justify-between items-center  p-3 md:px-6 md:py-4  '>
				<Link className='flex items-center gap-2' href='/'>
					<Image src='/kiviLogo.svg' width={50} height={50} alt='Kivi logo' priority />
					<h1 className='font-medium text-xl sm:text-2xl'>Kivi</h1>
				</Link>

				<div className='flex items-center gap-4'>
					{session && (
						<UserAccount
							name={session.user.name}
							email={session.user.email}
							image={session.user.image}
						/>
					)}
					{!session && <SignInOrUpLink />}
					<ThemeSwitcher />
				</div>
			</div>
			{session && (
				<div className='w-full md:hidden  flex justify-around items-center  p-3  bg-secondary'>
					<ActiveLink href='/'>
						<Home />
					</ActiveLink>

					<ActiveLink href='/explore'>
						<Search />
					</ActiveLink>
					<ActiveLink href='/notifications' className='relative'>
						{notifications.length > 0 && (
							<div className='absolute left-[-7px] top-[-7px] rounded-full  w-5 h-5 flex justify-center items-center bg-primary text-secondary text-xs  shadow-sm'>
								{notifications.length <= 9 && <p>{notifications.length}</p>}
								{notifications.length > 9 && <p>+9</p>}
							</div>
						)}
						<Bell />
					</ActiveLink>

					<MobileNav userName={session.user.name} unreadMesseges={unreadMesseges} />
				</div>
			)}
		</nav>
	);
};
