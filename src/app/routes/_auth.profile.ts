import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { createFileRoute } from 'tanstack-angular-router-experimental'
import { AuthContext } from '../auth-context'

export const Route = createFileRoute('/_auth/profile')({
	component: () => Profile,
})

@Component({
	selector: 'Profile',
	template: `
		<div>
			Username:
			<strong>{{ username() }}</strong>
		</div>
	`,
	host: { class: 'block p-2 space-y-2' },
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile {
	private authContext = inject(AuthContext)
	protected username = this.authContext.username.asReadonly()
}
