'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { ActiveLink } from '@/components/ui/ActiveLink';

export const CommunityNav = () => {
	const currentRoute = usePathname();
	return (
		<nav className='flex flex-col w-full md:flex-row md:w-auto md:self-end md:items-center  p-3 border rounded-md shadow-sm  gap-3 text-sm xl:text-base'>
			<ActiveLink href='/communities/browse'>Browse Communities</ActiveLink>
			<Separator className='md:hidden' />
			<Separator orientation='vertical' className='hidden md:block h-6' />
			<ActiveLink href='/communities/browse/created'>Your Creadted Communities</ActiveLink>
		</nav>
	);
};
