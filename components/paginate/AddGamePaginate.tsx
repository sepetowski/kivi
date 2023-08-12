'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

import { useRouter } from 'next/navigation';
import { useMediaQuery } from '@react-hook/media-query';
interface Props {
	lastPage: number;
	currentPage: number;
}

export const AddGamePaginate = ({ lastPage, currentPage }: Props) => {
	const isSmallScreen = useMediaQuery('(max-width: 768px)');
	const router = useRouter();

	const [currentPagiantePage, setCurrentPagiantePage] = useState(currentPage);
	const [pagianteBtns, setPagianteBtns] = useState<number[]>([]);

	useEffect(() => {
		const pageNumbers = [];
		const endCondtion = isSmallScreen ? currentPage + 1 : currentPage + 2;

		let startCondtion = 1;
		if (!isSmallScreen && currentPage > 3) startCondtion = currentPage - 2;
		if (isSmallScreen && currentPage > 3) startCondtion = currentPage - 1;

		for (let i = startCondtion; i <= endCondtion; i++) {
			pageNumbers.push(i);
		}
		setPagianteBtns(pageNumbers);
	}, [currentPage, isSmallScreen]);

	const paginateHanlder = (pageNumber: number) => {
		router.push(`/add/games?page=${pageNumber}`);
		setCurrentPagiantePage(pageNumber);
	};
	const prevPageHanlder = () => {
		router.push(`/add/games?page=${currentPagiantePage - 1}`);
		setCurrentPagiantePage((prev) => prev - 1);
	};
	const nextPageHanlder = () => {
		router.push(`/add/games?page=${currentPagiantePage + 1}`);
		setCurrentPagiantePage((prev) => prev + 1);
	};

	return (
		<footer className='w-full p-6  my-8 md:my-12 flex justify-center items-center gap-2'>
			<Button disabled={currentPagiantePage === 1} onClick={prevPageHanlder} variant={'secondary'}>
				Prev
			</Button>

			{pagianteBtns.map((btn) => (
				<Button
					onClick={() => paginateHanlder(btn)}
					key={btn}
					variant={btn === currentPage ? 'default' : 'outline'}>
					{btn}
				</Button>
			))}

			<Button
				disabled={currentPagiantePage === lastPage}
				onClick={nextPageHanlder}
				variant={'secondary'}>
				Next
			</Button>
		</footer>
	);
};
