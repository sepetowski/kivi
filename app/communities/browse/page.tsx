import { CommunitiesBrowseCardsContener } from '@/components/conteners/communities/CommunitiesBrowseCardsContener';
import { getAuthSession } from '@/lib/auth';
import { getAllCommunities } from '@/lib/getAllCommunities';
import { BrowseCommunity } from '@/types/communities';
import { redirect } from 'next/navigation';

export const metadata = {
	title: 'Browse Communities',
	description: 'Serach for any Community in Kivi app - Social for gamers',
};

const Browse = async () => {
	const session = await getAuthSession();
	if (!session) redirect('/sign-in');
	const communities: BrowseCommunity[] = await getAllCommunities(session.user.id);

	return <CommunitiesBrowseCardsContener communities={communities} />;
};
export default Browse;
