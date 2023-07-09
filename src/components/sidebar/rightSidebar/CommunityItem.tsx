import React from 'react';

import Image from 'next/image';
interface Props {
	name: string;
	url: string;
}

export const CommunityItem = ({ name, url }: Props) => {
	return (
		<div className='flex items-center gap-3'>
			<div className='w-12 h-12 relative'>
				<Image className='rounded-full object-cover' src={url} alt={`Avatar of ${name} community`} fill />
			</div>
			<p className='w-2/3 hidden lg:inline'>{name}</p>
		</div>
	);
};
