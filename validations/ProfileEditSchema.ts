import * as Yup from 'yup';

export const ProfileEditSchema = Yup.object().shape({
	username: Yup.string()
		.required('Username is required')
		.min(3, 'Username must be at least 3 characters long')
		.matches(/^[^\s]+$/, 'Username must be one-part')
		.max(25, 'Username must be at least 3 characters long')
		.trim(),
	profileDescription: Yup.string()
		.required('Profile description is required')
		.min(2, 'Profile description is too short')
		.max(50, 'Profile description is to long')
		.trim(),
});
