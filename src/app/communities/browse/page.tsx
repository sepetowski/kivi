import { CommunitiesBrowseCardsContener } from '@/components/conteners/communities/CommunitiesBrowseCardsContener';
import { getAuthSession } from '@/lib/auth';
import { getAllCommunities } from '@/lib/getAllCommunities';
import { BrowseCommunity } from '@/types/communities';
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
	const communities: BrowseCommunity[] = await getAllCommunities();

	return <CommunitiesBrowseCardsContener communities={communities} />;
};
export default Browse;
