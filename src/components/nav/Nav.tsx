'use client';
import React from 'react';
import { ThemeSwitcher } from '@/components/themeSwitcher/ThemeSwitcher';
import Link from 'next/link';
import Image from 'next/image';
import { UserAccount } from './UserAccount';
import { SignInOrUpLink } from './SignInOrUpLink';
import { useSession } from 'next-auth/react';
import { Bell, Home, Search } from 'lucide-react';
import { MobileNav } from './MobileNav';

export const Nav = () => {
	const session = useSession();

	return (
		<nav className=' fixed top-0 left-0 w-full border-b bg-background shadow-sm z-50 flex flex-col '>
			<div className='w-full max-w-[1800px] mx-auto flex justify-between items-center  p-3 md:pl-6 md:pr-6 '>
				<Link className='flex items-center gap-2' href='/'>
					<Image src='/kiviLogo.svg' width={50} height={50} alt='Kivi logo' priority />
					<h1 className='font-medium text-xl sm:text-2xl'>Kivi</h1>
				</Link>

				<div className='flex items-center gap-1'>
					{session.data && (
						<UserAccount
							name={session.data.user.name}
							email={session.data.user.email}
							image={session.data.user.image}
						/>
					)}
					{!session.data && <SignInOrUpLink />}
					<ThemeSwitcher />
				</div>
			</div>
			{session.status === 'authenticated' && (
				<div className='w-full md:hidden  flex justify-around items-center  p-3  bg-secondary'>
					<Link href='/'>
						<Home />
					</Link>
					<Link href='/'>
						<Search />
					</Link>
					<Link href='/'>
						<Bell />
					</Link>
					<MobileNav />
				</div>
			)}
		</nav>
	);
};
