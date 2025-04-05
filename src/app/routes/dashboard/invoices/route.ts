import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { createFileRoute, Link, MatchRoute, Outlet } from 'tanstack-angular-router-experimental'
import { InvoiceContext } from '../../../invoice-context'
import { Spinner } from '../../../ui/spinner.ng'

export const Route = createFileRoute('/dashboard/invoices')({
	loader: async () => {
		const invoiceContext = inject(InvoiceContext)
		const invoices = await invoiceContext.getInvoices()
		return { invoices }
	},
	component: () => InvoicesLayout,
})

@Component({
	selector: 'InvoicesLayout',
	template: `
		<div class="w-48 divide-y">
			@let invoices = loaderData().invoices;
			@for (invoice of invoices; track invoice.id) {
				<a
					[link]="{
						to: '/dashboard/invoices/$invoiceId',
						preload: 'intent',
						params: { invoiceId: invoice.id },
						activeOptions: { class: 'font-bold' },
					}"
					class="block px-3 py-2 text-blue-700"
				>
					<pre># {{ invoice.id }} - {{ invoice.title.slice(0, 10) }}<Spinner *matchRoute="{ to: '/dashboard/invoices/$invoiceId', params: { invoiceId: invoice.id }, pending: true, };  match as match" [show]="match()" wait="delay-50" /></pre>
				</a>
			}
		</div>
		<div class="flex-1 border-l">
			<outlet />
		</div>
	`,
	host: { class: 'flex-1 flex' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [Outlet, Link, Spinner, MatchRoute],
})
export class InvoicesLayout {
	protected loaderData = Route.loaderData()
}
