'use client';
import React from 'react';
import { ThemeSwitcher } from '@/components/themeSwitcher/ThemeSwitcher';
import { buttonVariants } from '@/components/ui/Button';
import { GithubIcon } from 'lucide-react';
import Link from 'next/link';
export const Nav = () => {
	return (
		<nav className='fixed top-0 left-0 w-full border-b bg-background shadow-sm'>
			<div className='w-full max-w-[1400px] mx-auto flex justify-between items-center  p-3  z-50'>
				<div className='flex items-center gap-2'>
					<p>Logo</p>
					<p>Kivi</p>
				</div>
				<div className='flex items-center gap-4'>
					<Link
						href='/'
						className={buttonVariants({ variant: 'secondary', className: 'font-bold text-lg' })}>
						Sign In
					</Link>
					<div className='flex gap-1 items-center'>
						<a href='/' className={buttonVariants({ variant: 'ghost', size: 'xs' })}>
							<GithubIcon size={25} />
						</a>
						<ThemeSwitcher />
					</div>
				</div>
			</div>
		</nav>
	);
};
