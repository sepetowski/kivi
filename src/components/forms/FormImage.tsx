'use client';

import React from 'react';
import Image from 'next/image';
import { useIamgeChange } from '@/hooks/useIamgeChange';

interface Props {
	title: string;
}

export const FormImage = ({ title }: Props) => {
	const imagePath = useIamgeChange('/loginImgSmall.jpg', '/loginImgBig.jpg');
	return (
		<div className=' w-full md:w-1/2 h-auto md:h-full relative  p-4 pb-10 pt-10   md:p-10'>
			<Image
				priority
				src={imagePath}
				alt='Photo by JR Korpa'
				fill
				className=' z-10 shadow-md object-cover'
			/>
			<div className='w-full text-white z-30 relative font-bold mt-20 md:mt-0 h-full flex justify-center text-center md:text-left  flex-col'>
				<h1 className='text-2xl sm:text-3xl md:text-5xl '>{title}</h1>
				<p className='text-white z-30 relative font-medium text-xs  md:text-xl mt-5 sm:mt-7 '>
					Experience a social app like no other, exclusively designed for passionate gamers like
					you. Connect with fellow gaming enthusiasts, share epic gaming moments, and embark on
					thrilling gaming adventures together.
				</p>
			</div>
		</div>
	);
};
