import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { createFileRoute, injectRouter } from 'tanstack-angular-router-experimental'
import { InvoiceContext } from '../../../invoice-context'
import { mutation } from '../../../mutation'
import { Spinner } from '../../../ui/spinner.ng'
import { InvoiceFields } from './-components/invoice-fields.ng'

export const Route = createFileRoute('/dashboard/invoices/')({
	component: () => Invoices,
})

@Component({
	selector: 'Invoices',
	template: `
		<form class="space-y-2" (submit)="onSubmit($event)">
			<div>Create a new Invoice:</div>
			<InvoiceFields />
			<div>
				<button
					class="rounded bg-blue-500 p-2 font-black text-white uppercase disabled:opacity-50"
					[disabled]="mutation.status() === 'pending'"
				>
					@if (mutation.status() === 'pending') {
						Creating
						<Spinner />
					} @else {
						Create
					}
				</button>
			</div>
			@if (mutation.status() === 'success') {
				<div
					class="inline-block animate-bounce rounded bg-green-500 px-2 py-1 text-white [animation-duration:.3s] [animation-iteration-count:2.5]"
				>
					Created!
				</div>
			} @else if (mutation.status() === 'error') {
				<div
					class="inline-block animate-bounce rounded bg-red-500 px-2 py-1 text-white [animation-duration:.3s] [animation-iteration-count:2.5]"
				>
					Failed to create.
				</div>
			}
		</form>
	`,
	host: { class: 'block p-2' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [InvoiceFields, InvoiceFields, Spinner],
})
export class Invoices {
	private invoiceContext = inject(InvoiceContext)
	private router = injectRouter()

	protected mutation = mutation(this.invoiceContext.createInvoice.bind(this.invoiceContext), () => {
		void this.router.invalidate()
	})

	protected onSubmit(event: SubmitEvent) {
		event.preventDefault()
		event.stopPropagation()
		const formData = new FormData(event.target as HTMLFormElement)
		void this.mutation.mutate({
			title: formData.get('title') as string,
			body: formData.get('body') as string,
		})
	}
}
