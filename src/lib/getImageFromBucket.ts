import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const getImageFromBucket = async (bucektName: string) => {
	const supabase = createClientComponentClient();
	try {
		const { data, error } = await supabase.storage.getBucket(bucektName);
		console.log(data);
		console.log(error);
	} catch (err) {
		console.log(err);
	}
};
