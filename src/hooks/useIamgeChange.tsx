'use client';

import { useState, useEffect } from 'react';

export const useIamgeChange = (smallImgPath: string, bigImgPath: string) => {
	const [imageSrc, setImageSrc] = useState(smallImgPath);

	useEffect(() => {
		const handleResize = () => {
			if (window.matchMedia('(max-width: 992px)').matches) {
				setImageSrc(smallImgPath);
			} else {
				setImageSrc(bigImgPath);
			}
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [smallImgPath, bigImgPath]);

	return imageSrc;
};
