'use client';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { generateUsernameInitials } from '@/lib/generateUsernameInitials';
import { useRouter } from 'next/navigation';

export const ConverstaionsTabAccount = () => {
	const router = useRouter();
	return (
		<div
			onClick={() => {
				router.push('/messages/m/123');
				router.refresh();
			}}
			className='flex justify-between items-center gap-4 w-full transition-colors duration-200 hover:bg-muted p-2 cursor-pointer rounded-md'>
			<div className='flex items-center gap-4'>
				<Avatar className='w-10 lg:w-12 h-10 lg:h-12 bg-accent'>
					<AvatarImage src='https://github.com/shadcn.png' alt={`profile image of name user`} />
					<AvatarFallback className='bg-accent'>{generateUsernameInitials('nazwa')}</AvatarFallback>
				</Avatar>
				<div className='flex flex-col'>
					<p>nazwa</p>

					<p className='text-xs text-muted-foreground '>
						Lorem ipsum dolor sit, amet consectet....{' '}
						<span className='ml-1'>&#x2022; 3days ago</span>
					</p>
				</div>
			</div>
		</div>
	);
};
