'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';

export const CookieAlert = () => {
	const [acceptedCookies, setAcceptedCookies] = useState(true);

	useEffect(() => {
		const cookiesAccepted = localStorage.getItem('cookiesAccepted');
		if (cookiesAccepted === 'true') {
			setAcceptedCookies(true);
		} else setAcceptedCookies(false);
	}, []);

	const acceptCookies = () => {
		setAcceptedCookies(true);
		localStorage.setItem('cookiesAccepted', 'true');
	};

	if (acceptedCookies) {
		return null;
	}

	return (
		<>
			<div
				onClick={acceptCookies}
				className='fixed inset-0 z-[2000] bg-background/80 backdrop-blur-sm w-full h-full  duration-200'></div>
			<div className='w-full   fixed z-[2050] bottom-0  bg-background  shadow-lg flex flex-col md:flex-row md:justify-between gap-6 items-center p-4 lg:p-6  border-t  duration-300'>
				<div className='flex flex-col md:flex-row items-center gap-6 md:w-4/5 '>
					<Image
						className='mt-[-6rem]'
						src={'/cookie.png'}
						alt='cookie image'
						width={180}
						height={180}
					/>
					<p className='text-sm md:text-base xl:text-lg   '>
						This website uses cookies to provide the best possible user experience and tailor
						content to your needs. Cookies are small text files stored on your device that help us
						analyze site traffic and provide social media features. information.
						<span className='font-bold'>
							{' '}
							By using our website, you consent to the use of cookies.{' '}
						</span>
					</p>
				</div>
				<Button onClick={acceptCookies} className='w-full md:w-40'>
					Accept
				</Button>
			</div>
		</>
	);
};
