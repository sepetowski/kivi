import { SavedPostsContener } from '@/components/conteners/posts/SavedPostsContener';
import { BookmarksHeader } from '@/components/headers/BookmarksHeader';
import { getAuthSession } from '@/lib/auth';
import { getSavedPosts } from '@/lib/getSavedPosts';
import { ExtednedPost } from '@/types/post';
import { redirect } from 'next/navigation';

export const metadata = {
	title: 'Saved posts',
	description: 'Saved posts in Kivi app - Social for gamers',
};

const Saved = async () => {
	const session = await getAuthSession();
	if (!session) redirect('/sign-in');

	const posts: ExtednedPost[] = await getSavedPosts(session.user.id);

	return (
		<main className=' w-full   px-4 lg:px-8  mt-36 md:mt-28 pb-6  max-w-[800px] mx-auto '>
			{posts && posts.length > 0 && <BookmarksHeader />}
			<SavedPostsContener sessionUserId={session.user.id} posts={posts} userId={session.user.id} />
		</main>
	);
};
export default Saved;
