import * as Yup from 'yup';

export const MessageSchema = Yup.object().shape({
	message: Yup.string().required('Description is required').trim(),
});
