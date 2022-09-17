
export const getLocalStore = (key: string) => {
	const stored = localStorage.getItem(key);
	if (stored) {
		return JSON.parse(stored);
	}
	return null
}
export const setLocalStore = (key: string, data: any) => {
	localStorage.setItem(key, JSON.stringify(data));
}

export const removeLocalStore = (key: string) => {
	localStorage.removeItem(key);
}

