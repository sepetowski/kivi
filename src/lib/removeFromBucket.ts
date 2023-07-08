import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const removeFromBucket = async (from: string, fileName: string) => {
	const supabase = createClientComponentClient();
	try {
		await supabase.storage.from(from).remove([fileName]);
	} catch (err) {
		console.log(err);
	}
};
