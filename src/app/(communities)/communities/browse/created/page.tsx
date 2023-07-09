import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata = {
	title: 'Created Communities',
	description: 'Your created Communities in  Kivi app - Social for gamers',
};

const Created = async () => {
	const session = await getAuthSession();
	if (!session) redirect('/sign-in');
	return <p>Created</p>;
};
export default Created;
