import { Injectable, signal } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class AuthContext {
	status = signal<'loggedOut' | 'loggedIn'>('loggedOut')
	username = signal('')

	login(username: string) {
		this.status.set('loggedIn')
		this.username.set(username)
	}

	logout() {
		this.status.set('loggedOut')
		this.username.set('')
	}
}
