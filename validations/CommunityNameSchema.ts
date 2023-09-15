import * as Yup from 'yup';

export const CommunityNameSchema = Yup.object().shape({
	name: Yup.string()
		.required('Name is required')
		.min(2, 'Name is too short')
		.max(25, 'Name is too long')
		.test('no-percent-encoding', 'Name cannot contain "%"', function (value) {
			if (value && value.includes('%')) {
				return false;
			}
			return true;
		})
		.trim(),
});
