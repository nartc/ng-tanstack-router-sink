import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { createFileRoute } from 'tanstack-angular-router-experimental'
import { AuthContext } from '../auth-context'

export const Route = createFileRoute('/_auth/profile')({
	component: () => Profile,
	loader: () => {
		const authContext = inject(AuthContext)
		return { username: authContext.username() }
	},
})

@Component({
	selector: 'Profile',
	template: `
		Username:
		<strong>{{ loaderData().username }}</strong>
	`,
	host: { class: 'block p-2 space-y-2' },
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile {
	protected loaderData = Route.loaderData()
}
