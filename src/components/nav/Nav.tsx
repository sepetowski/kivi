'use client';
import React from 'react';
import { ThemeSwitcher } from '@/components/themeSwitcher/ThemeSwitcher';
import { UserAccount } from './UserAccount';
import { SignInOrUpLink } from './SignInOrUpLink';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

export const Nav = () => {
	const session = useSession();

	return (
		<nav className=' fixed top-0 left-0 w-full border-b bg-background shadow-sm z-50'>
			<div className='w-full max-w-[1400px] mx-auto flex justify-between items-center  p-3  z-50'>
				<Link className='flex items-center gap-2' href='/'>
					<Image src='/kiviLogo.svg' width={50} height={50} alt='Kivi logo' />
					<p className='font-medium text-xl sm:text-2xl'>Kivi</p>
				</Link>

				<div className='flex items-center gap-1'>
					{session.data && (
						<UserAccount
							name={session.data?.user.name}
							email={session.data?.user.email}
							image={session.data?.user.image}
						/>
					)}
					{!session.data && <SignInOrUpLink />}
					<ThemeSwitcher />
				</div>
			</div>
		</nav>
	);
};
