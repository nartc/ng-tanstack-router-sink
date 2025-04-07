import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core'
import { createFileRoute, injectRouter, Link, linkOptions } from 'tanstack-angular-router-experimental'
import { boolean, object, optional, string } from 'valibot'
import { InvoiceContext } from '../../../invoice-context'
import { mutation } from '../../../mutation'
import { InvoiceFields } from './-components/invoice-fields.ng'

export const Route = createFileRoute('/dashboard/invoices/$invoiceId')({
	params: {
		parse: (params) => ({ invoiceId: Number(params.invoiceId) }),
		stringify: (params) => ({ invoiceId: `${params.invoiceId}` }),
	},
	validateSearch: optional(
		object({
			showNotes: optional(boolean()),
			notes: optional(string()),
		}),
	),
	loader: async ({ params }) => {
		const invoiceContext = inject(InvoiceContext)
		const invoice = await invoiceContext.getInvoice(params.invoiceId)
		return { invoice }
	},
	component: () => Invoice,
})

@Component({
	selector: 'Invoice',
	template: `
		@let loaderData = this.loaderData();
		@let mutationStatus = mutation.status();
		@let search = this.search();

		<form (submit)="onSubmit($event)" class="space-y-2 p-2">
			<InvoiceFields [invoice]="loaderData.invoice" [disabled]="mutationStatus === 'pending'" />
			<div>
				<a [link]="showNotesLinkOptions" class="text-blue-700">
					{{ showNotesLinkOptions.label() }}
				</a>
				@if (search?.showNotes) {
					<div>
						<div class="h-2"></div>
						<textarea
							#notesTextarea
							[value]="notes()"
							(change)="notes.set(notesTextarea.value)"
							rows="5"
							class="w-full rounded p-2 shadow"
							placeholder="Write some notes here..."
						></textarea>
						<div class="text-xs italic">
							Notes are stored in the URL. Try copying the URL into a new tab!
						</div>
					</div>
				}
			</div>
			<div>
				<button
					class="rounded bg-blue-500 p-2 font-black text-white uppercase disabled:opacity-50"
					[disabled]="mutationStatus === 'pending'"
				>
					Save
				</button>
			</div>
			@if (mutation.variables()?.id === loaderData.invoice.id) {
				<div>
					@if (mutationStatus === 'success') {
						<div
							class="inline-block animate-bounce rounded bg-green-500 px-2 py-1 text-white [animation-duration:.3s] [animation-iteration-count:2.5]"
						>
							Saved!
						</div>
					} @else if (mutationStatus === 'error') {
						<div
							class="inline-block animate-bounce rounded bg-red-500 px-2 py-1 text-white [animation-duration:.3s] [animation-iteration-count:2.5]"
						>
							Failed to save.
						</div>
					}
				</div>
			}
		</form>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [InvoiceFields, Link, InvoiceFields, Link],
})
export class Invoice {
	protected loaderData = Route.loaderData()
	protected search = Route.search()

	private invoiceContext = inject(InvoiceContext)
	private router = injectRouter()

	protected mutation = mutation(this.invoiceContext.patchInvoice.bind(this.invoiceContext), () => {
		void this.router.invalidate()
	})

	protected notes = signal(this.search()?.notes ?? '')
	protected showNotesLinkOptions = linkOptions({
		from: Route.fullPath,
		to: Route.fullPath,
		params: true,
		label: () => (this.search()?.showNotes ? 'Close Notes' : 'Show Notes'),
		search: (prev) => ({ ...prev, showNotes: prev?.showNotes ? undefined : true }),
	})

	constructor() {
		effect(() => {
			const notes = this.notes()
			this.router.navigate({
				from: Route.fullPath,
				search: (prev) => ({ ...prev, notes: notes ? notes : undefined }),
				replace: true,
				params: true,
			})
		})
	}

	protected onSubmit(event: SubmitEvent) {
		event.preventDefault()
		event.stopPropagation()

		const invoice = this.loaderData()?.invoice
		if (!invoice) {
			throw new Error('Invoice not found.')
		}

		const formData = new FormData(event.target as HTMLFormElement)
		void this.mutation.mutate({
			id: invoice.id,
			title: formData.get('title') as string,
			body: formData.get('body') as string,
		})
	}
}
