import React from 'react';
import { Message } from './Message';

export const Contener = () => {
	return (
		<div className=' w-full flex-grow p-4 lg:p-6 overflow-y-auto flex flex-col scrollbar-thin scrollbar-thumb-secondary scrollbar-thumb-rounded-md scrollbar-track-background gap-6 '>
			<Message  mine/>
			<Message  />
			<Message  mine/>
			<Message  mine/>
			<Message  />
			<Message  />
			<Message  />
			<Message  mine/>
		</div>
	);
};
