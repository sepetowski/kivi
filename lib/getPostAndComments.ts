import { ExtenedComment } from '@/types/comment';
import { ExtednedPost } from '@/types/post';
import { getPostDetails } from './getPostDetails';
import { getComments } from './getComments';

export async function getPostAndComments(
	post_id: string,userId:string
): Promise<[ExtednedPost, ExtenedComment[]]> {
	const [post, comments] = await Promise.all([getPostDetails(post_id,userId), getComments(post_id)]);
	return [post, comments];
}
