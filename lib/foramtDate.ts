export const formatDate = (date: Date) => {
	const dateObj = new Date(date);
	const monthAndYear = dateObj.toLocaleString('en-US', { year: 'numeric', month: 'long' });
	return monthAndYear;
};
