import { File } from 'buffer';
import * as Yup from 'yup';

const FILE_SIZE = 5242880; //5MB
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

export const ImageSchema = Yup.object().shape({
	picture: Yup.mixed<File>()
		.required('Picture is required')
		.test('fileSize', 'The file is too large', (value) => value && value.size <= FILE_SIZE)
		.test(
			'fileFormat',
			'Unsupported Format',
			(value) => value && SUPPORTED_FORMATS.includes(value.type)
		),
});
