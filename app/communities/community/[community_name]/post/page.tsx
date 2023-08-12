import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { CreatePostCard } from '@/components/cards/post/CreatePostCard';

export const metadata = {
	title: 'Create new post',
	description: 'Create post in Kivi app - Social for gamers',
};

interface Params {
	params: {
		community_name: string;
	};
}

const NewPost = async ({ params: { community_name } }: Params) => {
	const session = await getAuthSession();
	if (!session) redirect('/sign-in');

	return (
		<main className=' w-full  max-w-[1000px] mx-auto px-4 lg:px-8  mt-36'>
			<CreatePostCard communityName={community_name} />
		</main>
	);
};
export default NewPost;
