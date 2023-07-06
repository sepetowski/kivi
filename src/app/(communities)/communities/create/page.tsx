import { CreateCommunityCard } from '@/components/cards/CreateCommunityCard';

export const metadata = {
	title: 'Create Community',
	description: 'Create Community in Kivi app- Social for gamers',
};

const Create = async () => {
	return (
		<main className=' w-full  max-w-[1000px] mx-auto px-4 lg:px-8  mt-36'>
			<CreateCommunityCard />
		</main>
	);
};
export default Create;
