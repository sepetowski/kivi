'use client';
import React from 'react';
import Link from 'next/link';
import { ThemeSwitcher } from '@/components/themeSwitcher/ThemeSwitcher';
import { buttonVariants } from '@/components/ui/Button';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/use-toast';
import { generateUsernameInitials } from '@/lib/generateUsernameInitials';
export const Nav = () => {
	const { toast } = useToast();
	const pathname = usePathname();
	const session = useSession();

	let linkUrl = '/sign-in';
	let linkName = 'Sign In';
	if (pathname === '/sign-in') {
		linkUrl = '/sign-up';
		linkName = 'Sign Up';
	}
	const logOutHandler = () => {
		signOut();
		toast({
			title: 'You have been logout',
		});
	};
	return (
		<nav className='hidden md:block fixed top-0 left-0 w-full border-b bg-background shadow-sm z-50'>
			<div className='w-full max-w-[1400px] mx-auto flex justify-between items-center  p-3  z-50'>
				<Link className='flex items-center gap-2' href='/'>
					<p>Logo</p>
					<p>Kivi</p>
				</Link>

				<div className='flex items-center gap-1'>
					{session.status === 'unauthenticated' && (
						<Link
							href={linkUrl}
							className={buttonVariants({ variant: 'secondary', className: 'font-bold text-lg' })}>
							{linkName}
						</Link>
					)}
					{session.status === 'authenticated' && (
						<>
							<Button onClick={logOutHandler} variant='ghost'>
								Logout
							</Button>

							<Avatar className='cursor-pointer'>
								{session.data.user?.image && <AvatarImage src={session.data.user?.image} />}
								{session.data?.user?.name && (
									<AvatarFallback>
										{generateUsernameInitials(session.data?.user?.name)}
									</AvatarFallback>
								)}
							</Avatar>
						</>
					)}

					<ThemeSwitcher />
				</div>
			</div>
		</nav>
	);
};
