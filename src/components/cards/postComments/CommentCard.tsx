import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CommentCardActions } from './CommentCardActions';

interface Props {
	postId: string;
}

export const CommentCard =  ({ postId }: Props) => {
 
	return (
		<div className='w-full p-4 rounded-md border'>
			<div className='flex items-center gap-2'>
				<Avatar className='w-8 h-8'>
					<AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<div className='flex items-center gap-2'>
					<h4 className='text-sm'>Busheem</h4>
					<p className='text-xs text-muted-foreground'>&#x2022; 4 days ago</p>
				</div>
			</div>
			<p className='my-3 text-sm sm:text-base'>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi magni unde fugit quasi
				quisquam temporibus beatae veritatis accusantium eligendi similique?
			</p>
			<CommentCardActions />
		</div>
	);
};
