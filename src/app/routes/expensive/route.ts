import { inject } from '@angular/core'
import { createFileRoute, redirect } from 'tanstack-angular-router-experimental'
import { AuthContext } from '../../auth-context'

export const Route = createFileRoute('/expensive')({
	beforeLoad: ({ location }) => {
		const authContext = inject(AuthContext)
		if (authContext.status() === 'loggedOut') {
			throw redirect({
				to: '/login',
				search: { redirect: location.href },
			})
		}
	},
})
