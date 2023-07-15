import * as Yup from 'yup';

export const CommunityDescriptionSchema = Yup.object().shape({
	description: Yup.string()
		.required('Description is required')
		.min(2, 'Description is too short')
		.max(250, 'Description is to long')
		.trim(),
});
