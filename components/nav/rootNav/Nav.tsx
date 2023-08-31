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

export const Nav = async () => {
	const session = await getAuthSession();

	return (
		<nav className=' fixed top-0 left-0 w-full border-b bg-background shadow-sm z-50 flex flex-col '>
			<div className='w-full max-w-[1800px] mx-auto flex justify-between items-center  p-3 md:pl-6 md:pr-6 '>
				<Link className='flex items-center gap-2' href='/'>
					<Image src='/kiviLogo.svg' width={50} height={50} alt='Kivi logo' priority />
					<h1 className='font-medium text-xl sm:text-2xl'>Kivi</h1>
				</Link>

				<div className='flex items-center gap-1'>
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
					<ActiveLink href='/notifications'>
						<Bell />
					</ActiveLink>

					<MobileNav userName={session.user.name} />
				</div>
			)}
		</nav>
	);
};