import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const createBucket = async (bucketName: string) => {
	const supabase = createClientComponentClient();
	try {
		const { error } = await supabase.storage.createBucket(`${bucketName}`, {
			public: true,
			allowedMimeTypes: ['image/png', 'image/jpg', 'image/jpeg', 'image/png', 'image/gif'],
			fileSizeLimit: 5242880, //5MB
		});
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
