import { ChangeDetectionStrategy, Component } from '@angular/core'
import { createFileRoute, Link, linkOptions, Outlet } from 'tanstack-angular-router-experimental'

import { InvoiceContext } from '../../invoice-context'
import { UserContext } from '../../user-context'

export const Route = createFileRoute('/dashboard')({
	component: () => DashboardLayout,
	providers: [UserContext, InvoiceContext],
	loader: () => ({ crumb: 'Dashboard' }),
})

@Component({
	selector: 'DashboardLayout',
	template: `
		<div class="flex items-center border-b">
			<h2 class="p-2 text-xl">Dashboard</h2>
		</div>

		<div class="flex flex-wrap divide-x">
			@for (link of links; track link.to) {
				<a [link]="link" class="p-2">{{ link.label }}</a>
			}
		</div>

		<hr />

		<outlet />
	`,
	imports: [Outlet, Link],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayout {
	protected links = linkOptions([
		{ to: '/dashboard', label: 'Summary', activeOptions: { exact: true, class: 'font-bold' } },
		{ to: '/dashboard/invoices', label: 'Invoices', activeOptions: { class: 'font-bold' } },
		{ to: '/dashboard/users', label: 'Users', activeOptions: { class: 'font-bold' } },
	])
}
