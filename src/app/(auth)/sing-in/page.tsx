import React from 'react';
import Image from 'next/image';
import { SingInForm } from '@/components/forms/SingInForm';

const SingIn = async () => {
	return (
		<header className=' md:h-1 min-h-screen w-full max-w-[1400px] mx-auto  flex  xl:justify-center xl:items-center '>
			<main className='w-full h-full md:h-full xl:h-4/5 flex flex-col md:flex-row overflow-hidden shadow-sm rounded-md xl:border-2  border-muted'>
				<div className=' w-full md:w-1/2 h-auto md:h-full relative flex gap-4 md:gap-6 lg:gap-8 flex-col justify-center items-center p-4 md:p-10'>
					<Image
						src='https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
						alt='Photo by JR Korpa'
						fill
						className=' z-10 shadow-md object-cover'
					/>
					<h1 className='text-white z-30 relative font-bold text-3xl md:text-5xl text-center'>
						Welcome Back!
					</h1>
					<p className='text-white z-30 relative font-medium  md:text-xl text-center'>
						Experience a social app like no other, exclusively designed for passionate gamers like
						you. Connect with fellow gaming enthusiasts, share epic gaming moments, and embark on
						thrilling gaming adventures together. Whether you are a casual player or a hardcore
						gamer, our platform provides the perfect space to meet like-minded individuals, discover
						new games, and showcase your gaming prowess. Sign up now and become a part of the
						ultimate gaming revolution!
					</p>
				</div>
				<SingInForm />
			</main>
		</header>
	);
};
export default SingIn;
