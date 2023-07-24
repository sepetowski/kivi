import { PostCard } from '@/components/cards/post/PostCard';
import { getAuthSession } from '@/lib/auth';
import { getComments } from '@/lib/getComments';
import { getPostDetails } from '@/lib/getPostDetails';
import { votesReduce } from '@/lib/votesReduce';
import { ExtenedComment } from '@/types/comment';
import { ExtednedPost } from '@/types/post';
import { redirect } from 'next/navigation';

export const metadata = {
	title: 'Create new post',
	description: 'Create post in Kivi app - Social for gamers',
};

interface Params {
	params: {
		post_id: string;
	};
}

const PostDetails = async ({ params: { post_id } }: Params) => {
	const session = await getAuthSession();
	if (!session) redirect('/sign-in');

	const post: ExtednedPost = await getPostDetails(post_id);
	const comments: Promise<ExtenedComment[]> = getComments(post_id);

	const { UP, DOWN } = votesReduce(post);

	const userVote = post.votes.find((vote) => vote.userId === session.user.id);

	return (
		<main className=' w-full flex flex-col gap-6 max-w-[1000px] mx-auto px-4 lg:px-8  mt-36'>
			<PostCard
				promise={comments}
				detailsPage={true}
				disableCommentBtn={true}
				added={post.createdAt}
				commentsLength={post.comments.length}
				communityName={post.community.name}
				content={post.content}
				postId={post.id}
				postImage={post.image}
				userName={post.author.name}
				userImage={post.author.image}
				likes={UP}
				dislikes={DOWN}
				initialVote={userVote?.type}
			/>
		</main>
	);
};
export default PostDetails;
