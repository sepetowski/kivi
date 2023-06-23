'use client';
import React from 'react';
import { GithubIcon } from 'lucide-react';
import Link from 'next/link';
import { ThemeSwitcher } from '@/components/themeSwitcher/ThemeSwitcher';
import { buttonVariants } from '@/components/ui/Button';
import { usePathname } from 'next/navigation';

export const Nav = () => {
	const pathname = usePathname();

	let linkUrl = '/sing-in';
	let linkName = 'Sing In';
	if (pathname === '/sing-in') {
		linkUrl = '/sing-up';
		linkName = 'Sing Up';
	}

	return (
		<nav className='hidden md:block fixed top-0 left-0 w-full border-b bg-background shadow-sm z-50'>
			<div className='w-full max-w-[1400px] mx-auto flex justify-between items-center  p-3  z-50'>
				<Link className='flex items-center gap-2' href='/'>
					<p>Logo</p>
					<p>Kivi</p>
				</Link>

				<div className='flex items-center gap-4'>
					<Link
						href={linkUrl}
						className={buttonVariants({ variant: 'secondary', className: 'font-bold text-lg' })}>
						{linkName}
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
