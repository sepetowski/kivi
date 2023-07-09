import { v4 as uuidv4 } from 'uuid';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const saveImageInBucket = async (picture: File, from: string) => {
	const supabase = createClientComponentClient();
	try {
		const filename = `${uuidv4()}-${picture.name}`;
		const { data, error } = await supabase.storage.from(from).upload(filename, picture, {
			cacheControl: '3600',
			upsert: false,
		});

		if (error) return null;
		const { data: url } = supabase.storage.from(from).getPublicUrl(data.path);

		if (!url) return null;
		return [url.publicUrl, filename];
	} catch (err) {
		console.log(err);
		return null;
	}
};
