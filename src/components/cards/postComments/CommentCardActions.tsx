'use client';
import { Button } from '@/components/ui/button';
import { MessageSquare, ThumbsDown, ThumbsUp } from 'lucide-react';
import React from 'react';

export const CommentCardActions = () => {
	return (
		<div className='flex gap-4'>
			<div className='flex items-center gap-2'>
				<Button className='hover:bg-transparent ' variant={'ghost'} size={'icon'}>
					<ThumbsUp size={22} />
				</Button>
				<span>12</span>
			</div>
			<div className='flex items-center gap-2'>
				<Button className='hover:bg-transparent ' variant={'ghost'} size={'icon'}>
					<ThumbsDown size={22} />
				</Button>
				<span>12</span>
			</div>

			<Button className='hover:bg-transparent  ' variant={'ghost'} size={'icon'}>
				<MessageSquare size={22} />
				<p className='hidden sm:inline ml-2'>Replay</p>
			</Button>
		</div>
	);
};
