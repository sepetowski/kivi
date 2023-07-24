import { ExtednedPost } from '@/types/post';

export const votesReduce = (post: ExtednedPost) => {
	const { UP, DOWN } = post.votes.reduce(
		(counts, vote) => {
			if (vote.type === 'UP') {
				counts.UP++;
			} else if (vote.type === 'DOWN') {
				counts.DOWN++;
			}
			return counts;
		},
		{ UP: 0, DOWN: 0 }
	);

	return { UP, DOWN };
};
