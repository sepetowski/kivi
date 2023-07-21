import { CreatePostCard } from '@/components/cards/post/CreatePostCard';
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata = {
	title: 'New post',
	description: 'Add new post in Kivi!',
};

const Post = async () => {
	const session = await getAuthSession();
	if (!session) redirect('/sign-in');
	return (
		<main className=' w-full  max-w-[1000px] mx-auto px-4 lg:px-8  mt-36'>
			<CreatePostCard />
		</main>
	);
};
export default Post;
