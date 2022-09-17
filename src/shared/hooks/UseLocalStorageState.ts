import React from 'react';

export default function useLocalStorageState(key: string, defaultValue: any = '') {

	const [state, setState] = React.useState(() => {
		const localStorageValue = window.localStorage.getItem(key)

		if (localStorageValue) {
			return JSON.parse(localStorageValue)
		}
		return typeof defaultValue === 'function' ? defaultValue() : defaultValue
	})

	const prevKeyRef = React.useRef<string>('')

	React.useEffect(() => {
		if (key !== prevKeyRef.current) {
			window.localStorage.removeItem(prevKeyRef.current)
		}
		prevKeyRef.current = key
		window.localStorage.setItem(key, JSON.stringify(state))
	}, [key, state])

	return [state, setState]
}