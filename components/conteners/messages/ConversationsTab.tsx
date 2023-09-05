import React from 'react';
import { ConverstaionsTabAccount } from './ConverstaionsTabAccount';

export const ConversationsTab = () => {
	return (
		<div className='flex flex-col gap-5  sm:h-2/3  p-4 lg:p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-thumb-rounded-md scrollbar-track-background '>
			<ConverstaionsTabAccount />
			<ConverstaionsTabAccount />
			<ConverstaionsTabAccount />
			<ConverstaionsTabAccount />
			<ConverstaionsTabAccount />
			<ConverstaionsTabAccount />
			<ConverstaionsTabAccount />
		</div>
	);
};
