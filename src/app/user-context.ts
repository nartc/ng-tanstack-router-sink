import { DOCUMENT } from '@angular/common'
import { inject, Injectable, signal } from '@angular/core'

export interface User {
	id: number
	name: string
	username: string
	email: string
	address: Address
	phone: string
	website: string
	company: Company
}

export interface Address {
	street: string
	suite: string
	city: string
	zipcode: string
	geo: Geo
}

export interface Geo {
	lat: string
	lng: string
}

export interface Company {
	name: string
	catchPhrase: string
	bs: string
}

export type UsersSortBy = 'name' | 'id' | 'email'

@Injectable()
export class UserContext {
	users = signal<User[]>([])
	private document = inject(DOCUMENT)
	private window = this.document.defaultView as globalThis.Window

	async getUsers({ filterBy, sortBy }: { filterBy?: string; sortBy?: UsersSortBy }) {
		const delay = Number(this.window.sessionStorage.getItem('loaderDelay') ?? '0')
		await new Promise((resolve) => setTimeout(resolve, delay))

		let users: User[]

		if (this.users().length > 0) {
			users = this.users()
		} else {
			const res = await fetch('https://jsonplaceholder.typicode.com/users')
			const result = (await res.json()) as User[]
			users = result.slice(0, 10)
			this.users.set(users)
		}

		if (filterBy) {
			users = users.filter((d) => d.name.toLowerCase().includes(filterBy.toLowerCase()))
		}

		if (sortBy) {
			users = [...users].sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1))
		}

		return users
	}

	async getUser(id: number) {
		if (this.users().length === 0) {
			await this.getUsers({})
		}

		const delay = Number(this.window.sessionStorage.getItem('loaderDelay') ?? '0')
		await new Promise((resolve) => setTimeout(resolve, delay))
		return this.users().find((d) => d.id === id)
	}
}
