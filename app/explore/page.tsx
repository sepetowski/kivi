import { ExploreContener } from '@/components/conteners/explore/ExploreContener';
import { getAuthSession } from '@/lib/auth';
import { getUserSerachHistory } from '@/lib/getUserSerachHistory';
import { ExtenedSerachHistory } from '@/types/searchHistory';
import { redirect } from 'next/navigation';

export const metadata = {
	title: "Serach for other's",
	description: 'Explore in Kivi app - Social app for gamers',
};

const Explore = async () => {
	const session = await getAuthSession();
	if (!session) redirect('/sign-in');

	const userSearchHistroy: ExtenedSerachHistory[] = await getUserSerachHistory(session.user.id);


	return (
		<main className=' w-full   px-4 lg:px-8  mt-36 md:mt-32 pb-6  max-w-[800px] mx-auto flex flex-col gap-4'>
			<ExploreContener userSearchHistroy={userSearchHistroy} />
		</main>
	);
};
export default Explore;
