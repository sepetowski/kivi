'use client';

import { useState, useEffect } from 'react';

export const useIconResize = (sm = 24, md = 30, lg = 32, xl = 34, xxl = 36) => {
	const [iconSize, setIconSize] = useState(24); // Default icon size is 40px

	useEffect(() => {
		const handleResize = () => {
			switch (true) {
				case window.innerWidth < 576: {
					setIconSize(sm);
					break;
				}
				case window.innerWidth >= 576 && window.innerWidth < 768: {
					setIconSize(md);
					break;
				}
				case window.innerWidth >= 768 && window.innerWidth < 992: {
					setIconSize(lg);
					break;
				}
				case window.innerWidth >= 992 && window.innerWidth < 1200: {
					setIconSize(xl);
					break;
				}
				case window.innerWidth >= 1200: {
					setIconSize(xxl);
					break;
				}
			}
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [sm, md, lg, xl, xxl]);

	return iconSize;
};
