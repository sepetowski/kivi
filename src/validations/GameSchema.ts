import * as Yup from 'yup';

export const NewGameSchema = Yup.object().shape({
	nickName: Yup.string()
		.required('nickName is required')
		.min(3, 'nickName is too short')
		.max(30, 'nickName is too long')
		.trim(),
	game: Yup.string()
		.required('Game name is required')
		.min(2, 'Game name is too short')
		.max(25, 'Game name is to long')
		.trim(),
	rank: Yup.string(),
	playSince: Yup.string(),
});
