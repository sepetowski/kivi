import { CreateCommunityCard } from '@/components/cards/community/CreateCommunityCard';
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata = {
	title: 'Create Community',
	description: 'Create Community in Kivi app - Social for gamers',
};

const Create = async () => {
	const session = await getAuthSession();
	if (!session) redirect('/sign-in');
	return (
		<main className=' w-full  max-w-[1000px] mx-auto px-4 lg:px-8  mt-36'>
			<CreateCommunityCard />
		</main>
	);
};
export default Create;
