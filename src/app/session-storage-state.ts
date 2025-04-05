import { effect, inject, signal } from '@angular/core'
import { DOCUMENT } from '@angular/common'

export function sessionStorageState<T>(key: string, initialValue: T) {
	const document = inject(DOCUMENT);
	const window = document.defaultView as globalThis.Window;

	const state = signal((() => {
		const stored = window.sessionStorage.getItem(key)
		console.log('stored', key, stored, initialValue, typeof stored)
		const returnVal =
			stored && stored !== 'undefined' ? JSON.parse(stored) : initialValue
		console.log('returning', returnVal)
		return returnVal as T;
	})());

	effect(() => {
		console.log('setting', JSON.stringify(state()))
		window.sessionStorage.setItem(key, JSON.stringify(state()))
	})

	return state;
}