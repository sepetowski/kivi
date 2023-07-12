import { CommunitiesBrowseCardsContener } from '@/components/communities/CommunitiesBrowseCardsContener';
import { getAuthSession } from '@/lib/auth';
import { getAllCommunities } from '@/lib/getAllCommunities';
import { Community } from '@prisma/client';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export const metadata = {
	title: 'Browse Communities',
	description: 'Serach for any Community in Kivi app - Social for gamers',
};

const Browse = async () => {
	const session = await getAuthSession();
	if (!session) redirect('/sign-in');
	const communitiesProsmie =await  getAllCommunities();

	return <CommunitiesBrowseCardsContener promise={communitiesProsmie} />;
};
export default Browse;
