import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const removeBucket = async (bucketName: string) => {
	const supabase = createClientComponentClient();
	await supabase.storage.emptyBucket(bucketName);
	await supabase.storage.deleteBucket(bucketName);
};
