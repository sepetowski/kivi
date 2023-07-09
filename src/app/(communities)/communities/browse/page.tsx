import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata = {
	title: 'Avaible Communities',
	description: 'Serach for any Community in Kivi app - Social for gamers',
};

const Browse = async () => {
	const session = await getAuthSession();
	if (!session) redirect('/sign-in');
	return <p>Browse</p>;
};
export default Browse;
