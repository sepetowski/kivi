import React from 'react';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { Users2 } from 'lucide-react';

export const RightSidebar = () => {
	return (
		<Sidebar left={true}>
			<div className='mt-24 w-full h-full flex flex-col items-center lg:items-start p-4 lg:p-6 gap-6 lg:gap-10 text-sm '>
				<div className='flex gap-3 items-center '>
					<Users2 />
					<p className='hidden lg:inline font-bold uppercase text-center'>Your Communities</p>
				</div>
			</div>
		</Sidebar>
	);
};
