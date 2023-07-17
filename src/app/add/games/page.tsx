import { AddGamesContener } from '@/components/conteners/addGames/AddGamesContener';
import { AddGamePaginate } from '@/components/paginate/AddGamePaginate';
import { getAuthSession } from '@/lib/auth';
import { getGames } from '@/lib/getGames';

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
	console.log(searchParams);
	const page = searchParams.page ? Number(searchParams.page) : 1;
	const pageSize = searchParams.size ? Number(searchParams.size) : 30;
	const games: Games = await getGames(page, pageSize);
	const lastPage = Math.ceil(games.count / pageSize);

	return (
		<>
			<AddGamesContener games={games.results} />
			<AddGamePaginate lastPage={lastPage} currentPage={page} />
		</>
	);
};
export default NewGame;
