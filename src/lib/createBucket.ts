import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const createBucket = async (bucketName: string) => {
	const supabase = createClientComponentClient();
	try {
		const { data, error } = await supabase.storage.createBucket(`${bucketName}`, {
			public: true,
			allowedMimeTypes: ['image/png', 'image/jpg', 'image/jpeg', 'image/png', 'image/gif'],
			fileSizeLimit: 5242880, //5MB
		});
		console.log(data, error);
	} catch (err) {}
};
