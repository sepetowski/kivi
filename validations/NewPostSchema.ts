import * as Yup from 'yup';

const FILE_SIZE = 5242880; // 5MB
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

export const NewPostSchema = Yup.object().shape({
	content: Yup.string()
		.required('Post is required')
		.min(5, 'Post is too short')
		.max(250, 'Post is too long')
		.trim(),
	picture: Yup.mixed<File>()
		.nullable()
		.test('fileSize', 'The file is too large', (value) => !value || value.size <= FILE_SIZE) // If value is null, skip the test
		.test(
			'fileFormat',
			'Unsupported Format',
			(value) => !value || SUPPORTED_FORMATS.includes(value.type)
		),
});
