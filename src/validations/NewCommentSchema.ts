import * as Yup from 'yup';

export const NewCommentSchema = Yup.object().shape({
	comment: Yup.string()
		.required('Comment is required')
		.min(3, 'Comment is too short')
		.max(200, 'Comment is too long')
		.trim(),
});
