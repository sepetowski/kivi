import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const removeFromBucket = async (from: string, fileName: string) => {
	const supabase = createClientComponentClient();
	try {
		const { error } = await supabase.storage.from(from).remove([fileName]);
		if (error)
			return {
				error: true,
				errorMsg: error.message,
			};
		else
			return {
				error: false,
				errorMsg: '',
			};
	} catch (err) {
		return {
			error: true,
			errorMsg: 'Unexpected error.',
		};
	}
};
