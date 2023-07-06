import * as Yup from 'yup';

export const NewCommunitySchema = Yup.object().shape({
	name: Yup.string()
		.required('Name is required')
		.min(2, 'Name is too short')
		.max(50, 'Name is too long')
		.trim(),
	description: Yup.string()
		.required('Description is required')
		.min(2, 'Description is too short')
		.max(500, 'Description is to long')
		.trim(),
});
