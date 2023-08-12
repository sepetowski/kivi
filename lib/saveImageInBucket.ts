import { v4 as uuidv4 } from 'uuid';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const saveImageInBucket = async (picture: File, from: string, upsertSetting = false) => {
	const supabase = createClientComponentClient();
	try {
		const fileName = `${uuidv4()}-${picture.name}`;
		const { data, error } = await supabase.storage.from(from).upload(fileName, picture, {
			cacheControl: '3600',
			upsert: upsertSetting,
		});

		if (error)
			return {
				url: '',
				fileName: '',
			};
		const { data: url } = supabase.storage.from(from).getPublicUrl(data.path);

		if (!url)
			return {
				url: '',
				fileName: '',
			};

		return {
			url: url.publicUrl,
			fileName,
		};
	} catch (err) {
		return {
			url: '',
			fileName: '',
		};
	}
};
