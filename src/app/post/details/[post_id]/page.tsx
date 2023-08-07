import { PostCard } from '@/components/cards/post/PostCard';
import { getAuthSession } from '@/lib/auth';
import { getPostAndComments } from '@/lib/getPostAndComments';
import { votesReduce } from '@/lib/votesReduce';
import { redirect } from 'next/navigation';

export const metadata = {
	title: 'Post details',
	description: 'Post details in Kivi app - Social for gamers',
};

interface Params {
	params: {
		post_id: string;
	};
}

const PostDetails = async ({ params: { post_id } }: Params) => {
	const session = await getAuthSession();
	if (!session) redirect('/sign-in');

	const [post, comments] = await getPostAndComments(post_id);

	const { UP, DOWN } = votesReduce(post);

	const userVote = post.votes.find((vote) => vote.userId === session.user.id);

	return (
		<main className=' w-full flex flex-col gap-6 max-w-[1000px] mx-auto px-4 lg:px-8  mt-36 pb-6 md:pb-12'>
			<PostCard
				fileName={post.imageName}
				bucektName={post.bucketName}
				userId={session.user.id}
				creatorId={post.authorId}
				comments={comments}
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
				wasEdited={post.wasEdited}
			/>
		</main>
	);
};
export default PostDetails;
