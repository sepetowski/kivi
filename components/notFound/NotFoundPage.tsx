import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
interface Props {
	notFoundMessage: string;
}

export const NotFoundPage = ({ notFoundMessage }: Props) => {
	return (
		<div className='w-full h-screen flex flex-col justify-center items-center gap-4'>
			<Image src={'/404.svg'} width={400} height={400} alt='404' />
			<p className='text-lg md:text-xl'>
				{notFoundMessage}. <Link className='font-bold' href={'/'}>Back Home</Link>
			</p>
		</div>
	);
};
