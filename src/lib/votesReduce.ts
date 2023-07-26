import { ExtenedComment } from '@/types/comment';
import { ExtednedPost } from '@/types/post';

export const votesReduce = (array: ExtednedPost | ExtenedComment) => {
	const { UP, DOWN } = array.votes.reduce(
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
