import { ExtenedComment } from '@/types/comment';
import { ExtednedPost } from '@/types/post';
import { getPostDetails } from './getPostDetails';
import { getComments } from './getComments';

export async function getPostAndComments(
	post_id: string
): Promise<[ExtednedPost, ExtenedComment[]]> {
	const [post, comments] = await Promise.all([getPostDetails(post_id), getComments(post_id)]);
	return [post, comments];
}
