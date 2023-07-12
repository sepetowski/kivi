import { CommunitiesBrowseCardsContener } from '@/components/communities/CommunitiesBrowseCardsContener';
import { getAuthSession } from '@/lib/auth';
import { getAllCommunities } from '@/lib/getAllCommunities';
import { Community } from '@prisma/client';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export const metadata = {
	title: 'Avaible Communities',
	description: 'Serach for any Community in Kivi app - Social for gamers',
};

const Browse = async () => {
	const session = await getAuthSession();
	if (!session) redirect('/sign-in');
	const communitiesProsmie: Promise<Community[]> = getAllCommunities();

	return (
		<Suspense fallback={<h2>Loading...</h2>}>
			<CommunitiesBrowseCardsContener promise={communitiesProsmie} />
		</Suspense>
	);
};
export default Browse;
