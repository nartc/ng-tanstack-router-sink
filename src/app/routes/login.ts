import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core'
import { createFileRoute, injectRouter } from 'tanstack-angular-router-experimental'
import { object, optional, string } from 'valibot'
import { AuthContext } from '../auth-context'

export const Route = createFileRoute('/login')({
	validateSearch: object({
		redirect: optional(string()),
	}),
}).update({ component: () => Login })

@Component({
	selector: 'Login',
	template: `
		@if (status() === 'loggedIn') {
			Logged in as
			<strong>{{ authName() }}</strong>
			<div class="h-2"></div>
			<button
				(click)="onLogout()"
				class="inline-block cursor-pointer rounded border bg-blue-500 px-2 py-1 text-sm text-white"
			>
				Log out
			</button>
			<div class="h-2"></div>
		} @else {
			<div>You must log in!</div>
			<div class="h-2"></div>
			<form (submit)="onSubmit($event)" class="flex gap-2">
				<input
					#input
					[value]="username()"
					(input)="username.set(input.value)"
					placeholder="Username"
					class="rounded border p-1 px-2"
				/>
				<button
					type="submit"
					class="inline-block cursor-pointer rounded border bg-blue-500 px-2 py-1 text-sm text-white"
				>
					Login
				</button>
			</form>
		}
	`,
	host: { class: 'block', '[class.p-2]': 'status() === "loggedOut"' },
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
	private router = injectRouter()
	private authContext = inject(AuthContext)

	private search = Route.search()

	protected status = this.authContext.status.asReadonly()
	protected authName = this.authContext.username.asReadonly()
	protected username = signal('')

	constructor() {
		// Ah, the subtle nuances of client side auth. 🙄
		effect(() => {
			const [status, redirect] = [this.status(), this.search().redirect]
			if (status === 'loggedIn' && redirect) {
				this.router.history.push(redirect)
			}
		})
	}

	protected onLogout() {
		this.authContext.logout()
		this.username.set('')
		void this.router.invalidate()
	}

	protected onSubmit(event: SubmitEvent) {
		event.preventDefault()
		this.authContext.login(this.username())
		void this.router.invalidate()
	}
}
