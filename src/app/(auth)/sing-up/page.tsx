import React from 'react';
import Image from 'next/image';
import { SingUpForm } from '@/components/forms/SingUpForm';

const SingUp = async () => {
	return (
		<header className=' md:h-1 min-h-screen w-full max-w-[1400px] mx-auto  flex  xl:justify-center xl:items-center '>
			<main className='w-full h-full md:h-full xl:h-4/5 flex flex-col md:flex-row overflow-hidden shadow-sm rounded-md xl:border-2  border-muted'>
				<div className=' w-full md:w-1/2 h-auto md:h-full relative flex gap-4 md:gap-6 flex-col justify-center items-center p-4 md:p-10'>
					<Image
						src='https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
						alt='Photo by JR Korpa'
						fill
						className=' z-10 shadow-md object-cover'
					/>
					<h1 className='text-white z-30 relative font-bold text-3xl md:text-5xl text-center'>Join Today</h1>
					<p className='text-white z-30 relative font-medium  md:text-xl text-center'>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum quos earum quaerat
						veniam, odit dicta minima dolorem nisi aperiam delectus pariatur cum debitis! Provident
						id culpa vero cum labore minima?
					</p>
				</div>
				<SingUpForm />
			</main>
		</header>
	);
};
export default SingUp;
