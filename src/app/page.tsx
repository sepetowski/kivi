import Link from 'next/link';
import { buttonVariants } from '@/components/ui/Button';
const Home = () => {
	return (
		<header className='min-h-screen h-0 w-full flex flex-col md:flex-row justify-center items-center max-w-[1400px] mx-auto gap-10 p-4'>
			<div className=' w-full md:w-1/2 flex flex-col gap-4 lg:gap-10 '>
				<h1 className='text-lg lg:text-6xl font-bold'>
					Welcome to <span className='text-purple-500'>Kivi</span> - The Ultimate{' '}
					<span className='text-purple-500'>Gaming Community!</span>
				</h1>
				<p className=' lg:text-2xl'>
					Join thousands of gamers from around the world and unleash your gaming prowess. Share your
					thoughts on your favorite games, discover hidden gems, and engage in lively discussions
					with fellow gamers who share your passion.
				</p>
				<div className='flex w-full gap-4 lg:gap-10 '>
					<Link
						href='/'
						className={buttonVariants({
							variant: 'default',
							className: 'lg:text-3xl lg:pt-7 lg:pb-7 lg:pl-9 lg:pr-9',
						})}>
						Sign In
					</Link>
					<a
						href='/'
						className={buttonVariants({
							variant: 'secondary',

							className: 'lg:text-3xl lg:pt-7 lg:pb-7 lg:pl-9 lg:pr-9',
						})}>
						Read more
					</a>
				</div>
			</div>
			<div className=' hidden md:block w-1/2 '>
				<div className='w-full h-96 bg-red-300'></div>
			</div>
		</header>
	);
};
export default Home;
