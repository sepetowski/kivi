import * as Yup from 'yup';

export const SearchSchema = Yup.object().shape({
	search: Yup.string().required().trim(),
});
