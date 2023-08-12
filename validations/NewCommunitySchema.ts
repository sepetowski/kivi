import { File } from 'buffer';
import * as Yup from 'yup';

const FILE_SIZE = 5242880; //5MB
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

export const NewCommunitySchema = Yup.object().shape({
	name: Yup.string()
		.required('Name is required')
		.min(2, 'Name is too short')
		.max(25, 'Name is too long')
		.trim(),
	description: Yup.string()
		.required('Description is required')
		.min(2, 'Description is too short')
		.max(250, 'Description is to long')
		.trim(),
	picture: Yup.mixed<File>()
		.required('Picture is required')
		.test('fileSize', 'The file is too large', (value) => value && value.size <= FILE_SIZE)
		.test(
			'fileFormat',
			'Unsupported Format',
			(value) => value && SUPPORTED_FORMATS.includes(value.type)
		),
});
