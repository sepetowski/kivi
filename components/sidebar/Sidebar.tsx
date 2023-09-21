'use client';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import React from 'react';

interface Props {
	children: React.ReactNode;
	left: boolean;
}

export const Sidebar = ({ children, left }: Props) => {
	const pathname = usePathname();
	const session = useSession();
	console.log(session);

	if (pathname === '/sign-in' || pathname === '/sign-up') return null;
	else
		return (
			<aside
				className={` sticky h-screen top-0 left-0 hidden   md:w-28  shadow-sm z-30 lg:w-64 xl:w-96 md:flex flex-col  ${
					left ? 'border-l' : 'border-r'
				}`}>
				{children}
			</aside>
		);
};
