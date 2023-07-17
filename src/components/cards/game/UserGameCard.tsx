import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import React from 'react';

export const UserGameCard = () => {
	return (
		<Card className='w-full sm:w-[calc((100%/2)-1.5rem)] 2xl:w-[calc((100%/3)-1.5rem)] h-52 relative rounded-lg overflow-hidden '>
			<CardContent>
				<Image src='/loginImgBig.jpg' fill alt='' />
			</CardContent>
		</Card>
	);
};
