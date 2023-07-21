import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

const Home = async () => {
	const session = await getAuthSession();
	if (!session) redirect('/sign-in');
	return <main className='w-full max-w-[800px] mx-auto bg-red-400 h-96'>dasdasd</main>
};
export default Home;
