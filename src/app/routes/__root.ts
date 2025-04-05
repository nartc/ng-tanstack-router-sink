import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Link, Outlet, RouterDevtools, createRootRoute, routerState } from 'tanstack-angular-router-experimental'
import { Breadcrumbs } from '../ui/breadcrumbs.ng'
import { Spinner } from '../ui/spinner.ng'

export const Route = createRootRoute({
	component: () => Root,
})

@Component({
	selector: 'RouterSpinner',
	template: `
		<Spinner [show]="isLoading()" />
	`,
	host: { class: 'block text-3xl' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [Spinner],
})
export class RouterSpinner {
	protected isLoading = routerState({ select: (s) => s.status === 'pending' })
}

@Component({
	selector: 'Root',
	template: `
		<div class="flex min-h-screen flex-col">
			<div class="flex items-center gap-2 border-b">
				<h1 class="p-2 text-3xl">Kitchen Sink</h1>
				<nav breadcrumbs></nav>
				<RouterSpinner />
			</div>
			<div class="flex flex-1">
				<div class="w-56 divide-y">
					@for (route of routes; track route.to) {
						<a
							[link]="{
								to: route.to,
								activeOptions: { class: 'font-bold', exact: route.to === '.' },
								preload: 'intent',
							}"
							class="block px-3 py-2 text-blue-700"
						>
							{{ route.label }}
						</a>
					}
				</div>
				<div class="flex-1 border-l">
					<outlet />
				</div>
			</div>
		</div>
		<RouterDevtools position="bottom-right" />
	`,
	imports: [Outlet, RouterSpinner, Link, Breadcrumbs, RouterDevtools],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Root {
	protected routes = [
		{ to: '/', label: 'Home' },
		{ to: '/expensive', label: 'Expensive' },
		{ to: '/dashboard', label: 'Dashboard' },
		{ to: '/route-a', label: 'Pathless Layout A' },
		{ to: '/route-b', label: 'Pathless Layout B' },
		{ to: '/profile', label: 'Profile' },
		{ to: '/login', label: 'Login' },
	]
}
