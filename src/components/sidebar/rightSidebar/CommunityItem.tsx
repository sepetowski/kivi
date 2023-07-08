import React from 'react';

import Image from 'next/image';
interface Props {
	name: string;
	url: string;
}

export const CommunityItem = ({ name, url }: Props) => {
	return (
		<div className='flex items-center gap-3'>
			<div className='w-14 h-14 relative'>
				<Image className='rounded-full object-cover' src={url} alt={`Avatar of ${name} community`} fill />
			</div>
			<p className='hidden lg:inline'>{name}</p>
		</div>
	);
};
