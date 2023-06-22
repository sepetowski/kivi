'use client';
import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { User, Files, Gamepad2, Heart } from 'lucide-react';
import { useIconResize } from '@/hooks/useIconResize';
export const Counter = () => {
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0,
	});
	const iconSize = useIconResize();

	return (
		<>
			<div ref={ref} className='w-full bg-purple-500 h-36 sm:h-52 mt-28 shadow-sm'>
				<div className='flex justify-between items-center w-full max-w-[1400px] mx-auto h-full p-4 sm:text-2xl md:text-3xl  '>
					{inView && (
						<div className='flex flex-col items-center justify-center md:gap-2'>
							<User size={iconSize} />
							<p className='font-bold'>
								<CountUp start={0} end={50} duration={2} delay={0.2} />
								K+
							</p>
							<p className='text-sm sm:text-base md:text-xl lg:text-2xl'>users</p>
						</div>
					)}
					{inView && (
						<div className='flex flex-col items-center justify-center  md:gap-2'>
							<Files size={iconSize} />
							<p className='font-bold'>
								<CountUp start={0} end={137} duration={2} delay={0.2} />
								K+
							</p>
							<p className='text-sm sm:text-base md:text-xl lg:text-2xl  md:gap-2'>posts</p>
						</div>
					)}
					{inView && (
						<div className='flex flex-col items-center justify-center  md:gap-2'>
							<Gamepad2 size={iconSize} />
							<p className='font-bold'>
								<CountUp start={0} end={25} duration={2} delay={0.2} />
								K+
							</p>
							<p className='text-sm sm:text-base md:text-xl lg:text-2xl md:gap-2'>games news</p>
						</div>
					)}
					{inView && (
						<div className='flex flex-col items-center justify-center  md:gap-2'>
							<Heart size={iconSize} />
							<p className='font-bold'>
								<CountUp start={0} end={259} duration={2} delay={0.2} />
								K+
							</p>
							<p className='text-sm sm:text-base md:text-xl lg:text-2xl'>rates</p>
						</div>
					)}
				</div>
			</div>
		</>
	);
};
