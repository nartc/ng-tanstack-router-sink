import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import {
	createFileRoute,
	injectRouter,
	Link,
	MatchRoute,
	Outlet,
	retainSearchParams,
} from 'tanstack-angular-router-experimental'
import { object, optional, picklist, string } from 'valibot'
import { Spinner } from '../../../ui/spinner.ng'
import { UserContext, UsersSortBy } from '../../../user-context'

export const Route = createFileRoute('/dashboard/users')({
	validateSearch: object({
		usersView: optional(
			object({
				sortBy: optional(picklist(['name', 'email', 'id'])),
				filterBy: optional(string()),
			}),
		),
	}),
	search: {
		middlewares: [retainSearchParams(['usersView'])],
	},
	component: () => UsersLayout,
	loaderDeps: ({ search }) => ({
		filterBy: search.usersView?.filterBy,
		sortBy: search.usersView?.sortBy,
	}),
	loader: async ({ deps }) => {
		const userContext = inject(UserContext)
		const users = await userContext.getUsers(deps)
		return { users, crumb: 'Users' }
	},
})

@Component({
	selector: 'UsersLayout',
	template: `
		<div class="divide-y">
			<div class="flex items-center gap-2 bg-gray-100 px-3 py-2">
				<div>Sort By:</div>
				<select
					#sortBySelect
					[value]="search().usersView?.sortBy ?? 'id'"
					(change)="onSort(sortBySelect.value)"
					class="flex-1 rounded border p-1 px-2"
				>
					<option value="name">Name</option>
					<option value="id">ID</option>
					<option value="email">Email</option>
				</select>
			</div>
			<div class="flex items-center gap-2 bg-gray-100 px-3 py-2">
				<div>Filter By:</div>
				<input
					#filterByInput
					[value]="search().usersView?.filterBy ?? ''"
					(change)="onFilter(filterByInput.value)"
					placeholder="Search Names..."
					class="min-w-0 flex-1 rounded border p-1 px-2"
				/>
			</div>
			@for (user of loaderData().users; track user.id) {
				<div>
					<a
						[link]="{
							to: '/dashboard/users/user',
							search: { userId: user.id },
							activeOptions: { class: 'font-bold' },
						}"
						class="block px-3 py-2 text-blue-700"
					>
						<pre
							class="text-sm">{{ user.name }} <Spinner *matchRoute="{to: '/dashboard/users/user', search: {userId: user.id}, pending: true}; match as match" [show]="match()" wait="delay-500" /></pre>
					</a>
				</div>
			}
		</div>
		<div class="flex-initial border-l">
			<outlet />
		</div>
	`,
	host: { class: 'flex-1 flex' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [Link, Outlet, Spinner, MatchRoute],
})
export class UsersLayout {
	protected loaderData = Route.loaderData()
	protected search = Route.search()

	private router = injectRouter()

	protected onSort(sortBy: string) {
		void this.router.navigate({
			from: Route.fullPath,
			search: (prev) => ({ ...prev, usersView: { ...prev.usersView, sortBy: sortBy as UsersSortBy } }),
			replace: true,
		})
	}

	protected onFilter(filterBy: string) {
		void this.router.navigate({
			from: Route.fullPath,
			search: (prev) => ({ ...prev, usersView: { ...prev.usersView, filterBy } }),
			replace: true,
		})
	}
}
