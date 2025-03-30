import { JsonPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { createFileRoute } from 'tanstack-angular-router-experimental'
import { number, object } from 'valibot'
import { UserContext } from '../../../user-context'

export const Route = createFileRoute('/dashboard/users/user')({
	validateSearch: object({
		userId: number(),
	}),
	loaderDeps: ({ search: { userId } }) => ({ userId }),
	loader: async ({ deps }) => {
		const userContext = inject(UserContext)
		const user = await userContext.getUser(deps.userId)
		return { user, crumb: user?.name }
	},
	component: () => User,
})

@Component({
	selector: 'User',
	template: `
		<h4 class="p-2 font-bold">{{ loaderData().user?.name }}</h4>
		<pre class="text-sm whitespace-pre-wrap">{{ loaderData().user | json }}</pre>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [JsonPipe],
})
export class User {
	protected loaderData = Route.loaderData()
}
