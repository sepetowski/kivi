import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
	username: Yup.string()
		.required('Username is required')
		.min(3, 'Username must be at least 3 characters long')
		.max(25, 'Username must be at least 3 characters long')
		.matches(/^[^\s]+$/, 'Username must be one-part')
		.trim(),
	email: Yup.string().required('Email is required').email('Email must be valid').trim(),
	password: Yup.string()
		.required('Password is required')
		.min(6, 'Password must be at least 6 characters long')
		.matches(/[A-Z]/, 'Password mast have at least one uppercase char')
		.matches(/[a-z]/, 'Password mast have at least one lowercase char')
		.matches(/[0-9]/, 'Password mast have at least one number')
		.trim(),
});
