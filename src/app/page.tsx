import Link from 'next/link';
import { buttonVariants } from '@/components/ui/Button';
import { Counter } from '@/components/counter/Counter';
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

const Home = async () => {
	const session = await getAuthSession();
	if (!session) redirect('/sign-in');
	return (
		<>
			<p>Main app</p>
		</>
	);
};
export default Home;
