import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const checkIfBucketExist = async (serachBucket: string) => {
	const supabase = createClientComponentClient();
	try {
		const { data: listOfBuckets, error } = await supabase.storage.listBuckets();

		if (!listOfBuckets)
			return {
				founded: false,
				error: true,
				errorMsg: error.message,
			};

		let founded = false;
		listOfBuckets.forEach((bucekt) => {
			serachBucket === bucekt.name ? (founded = true) : (founded = false);
		});

		return {
			founded,
			error: false,
			errorMsg: '',
		};
	} catch (err) {
		return {
			founded: false,
			error: true,
			errorMsg: 'Something went wrong',
		};
	}
};
