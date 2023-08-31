'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

import { useRouter } from 'next/navigation';
import { useMediaQuery } from '@react-hook/media-query';
interface Props {
	lastPage: number;
	currentPage: number;
	search: string;
}

export const AddGamePaginate = ({ lastPage, currentPage, search }: Props) => {
	const isSmallScreen = useMediaQuery('(max-width: 768px)');
	const router = useRouter();
	const [lastAvaiblePage, setAvaibleLastPage] = useState(lastPage);
	const [currentPagiantePage, setCurrentPagiantePage] = useState(currentPage);
	const [pagianteBtns, setPagianteBtns] = useState<number[]>([]);
	useEffect(() => {
		setAvaibleLastPage(lastPage);
	}, [lastPage]);

	useEffect(() => {
		const pageNumbers = [];

		let endCondtion = isSmallScreen ? currentPage + 1 : currentPage + 2;
		if (isSmallScreen) endCondtion = currentPage + 1 <= lastPage ? currentPage + 1 : lastPage;
		else endCondtion = currentPage + 2 <= lastPage ? currentPage + 2 : lastPage;

		let startCondtion = 1;
		if (!isSmallScreen && currentPage > 3) startCondtion = currentPage - 2;
		if (isSmallScreen && currentPage > 3) startCondtion = currentPage - 1;

		for (let i = startCondtion; i <= endCondtion; i++) {
			pageNumbers.push(i);
		}
		setPagianteBtns(pageNumbers);
	}, [currentPage, isSmallScreen, lastPage]);

	const paginateHanlder = (pageNumber: number) => {
		router.push(`/add/games?page=${pageNumber}&search=${search}`);
		setCurrentPagiantePage(pageNumber);
	};
	const prevPageHanlder = () => {
		router.push(`/add/games?page=${currentPagiantePage - 1}&search=${search}`);
		setCurrentPagiantePage((prev) => prev - 1);
	};
	const nextPageHanlder = () => {
		router.push(`/add/games?page=${currentPagiantePage + 1}&search=${search}`);
		setCurrentPagiantePage((prev) => prev + 1);
	};

	return (
		<footer className='w-full p-6  mb-8 md:mb-12 flex justify-center items-center gap-2'>
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
				disabled={currentPagiantePage === lastAvaiblePage}
				onClick={nextPageHanlder}
				variant={'secondary'}>
				Next
			</Button>
		</footer>
	);
};
