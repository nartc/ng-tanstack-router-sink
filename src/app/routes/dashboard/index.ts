import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { createFileRoute } from 'tanstack-angular-router-experimental'

import { InvoiceContext } from '../../invoice-context'

export const Route = createFileRoute('/dashboard/')({
	component: () => Dashboard,
	loader: async () => {
		const invoiceContext = inject(InvoiceContext)
		const invoices = await invoiceContext.getInvoices()
		return { invoices: invoices.slice(0, 10) }
	},
})

@Component({
	selector: 'Dashboard',
	template: `
		Welcome to the dashboard! You have
		<strong>{{ loaderData().invoices.length }} total invoices</strong>
		.
	`,
	host: { class: 'block p-2' },
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
	protected loaderData = Route.loaderData()
}
