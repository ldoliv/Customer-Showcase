
export function capitalizeFirstLetter(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function unique(value: any, index: number, self: any[]) {
	return self.indexOf(value) === index;
}

export const getUniquePropertyValues = <K extends keyof T, T>(property: K, items: T[]): T[] => {
	const values = items.map(item => item[property]).sort() as T[];
	const uniqValues = values.filter(unique)
	return uniqValues;
}

export function isThisMonth(dateStr: string) {
	const today = new Date();
	const date = new Date(dateStr);
	return today.getMonth() === date.getMonth();
}

export function getDateStr(dateStr: string) {
	const date = dateStr ? new Date(dateStr) : new Date();
	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const year = date.getFullYear();

	return `${day}/${month}/${year}`
}

export function formatBirthDate(dateStr: string) {
	const isBirthdayThisMonth = isThisMonth(dateStr);
	return `${getDateStr(dateStr)} ${isBirthdayThisMonth ? '🎂' : ''}`;
}