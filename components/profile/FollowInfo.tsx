import React from 'react';

interface Props {
	number: number;
	text: string;
}

export const FollowInfo = ({ number, text }: Props) => {
	return (
		<div className='flex gap-1 items-center'>
			<p className='font-medium'>{number}</p>
			<p className='text-xs sm:text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
				{text}
			</p>
		</div>
	);
};
