'use client';
import React from 'react';
import { buttonVariants } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export const SignInOrUpLink = () => {
	const pathname = usePathname();

	let linkUrl = '/sign-in';
	let linkName = 'Sign In';
	if (pathname === '/sign-in') {
		linkUrl = '/sign-up';
		linkName = 'Sign Up';
	}
	return (
		<Link
			href={linkUrl}
			className={buttonVariants({ variant: 'secondary', className: 'font-bold text-lg' })}>
			{linkName}
		</Link>
	);
};
