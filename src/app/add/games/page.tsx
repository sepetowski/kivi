import { AddGamesContener } from '@/components/conteners/addGames/AddGamesContener';
import { AddGamePaginate } from '@/components/paginate/AddGamePaginate';
import { getAuthSession } from '@/lib/auth';
import { PAGE_SIZE, getGames } from '@/lib/getGames';

import { Games } from '@/types/games';
import { redirect } from 'next/navigation';

interface Params {
	searchParams: {
		[key: string]: string | string[] | undefined;
	};
}

const NewGame = async ({ searchParams }: Params) => {
	const session = await getAuthSession();
	if (!session) redirect('/sign-in');
	const page = searchParams.page ? Number(searchParams.page) : 1;
	const seqrchQuery = searchParams.search ? searchParams.search : '';
	const games: Games = await getGames(page, seqrchQuery);
	const lastPage = Math.ceil(games.count / PAGE_SIZE);

	return (
		<>
			<AddGamesContener games={games.results} />
			 <AddGamePaginate lastPage={lastPage} currentPage={page} /> 
		</>
	);
};
export default NewGame;
