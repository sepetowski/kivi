import { PostContener } from '@/components/conteners/posts/PostContener';
import { getAuthSession } from '@/lib/auth';
import { getHomePosts } from '@/lib/getHomePosts';
import { ExtednedPost } from '@/types/post';
import { redirect } from 'next/navigation';

const Home = async () => {
	const session = await getAuthSession();
	if (!session) redirect('/sign-in');


	const posts: ExtednedPost[] = await getHomePosts(session.user.id);

	return (
		<main className=' w-full   px-4 lg:px-8  mt-36 md:mt-28 pb-6'>
			<PostContener initialPosts={posts} userId={session.user.id} />
		</main>
	);
};
export default Home;
