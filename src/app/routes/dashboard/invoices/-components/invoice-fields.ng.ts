import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { Invoice } from '../../../../invoice-context'

@Component({
	selector: 'InvoiceFields',
	template: `
		@let disabled = this.disabled();
		@let invoice = this.invoice();

		<h2 class="text-lg font-bold">
			<input
				name="title"
				[value]="invoice?.title ?? ''"
				placeholder="Invoice Title"
				class="border-opacity-50 w-full rounded border p-2"
				[disabled]="disabled"
			/>
		</h2>
		<div>
			<textarea
				name="body"
				[value]="invoice?.body ?? ''"
				rows="6"
				placeholder="Invoice Body..."
				class="border-opacity-50 w-full rounded border p-2"
				[disabled]="disabled"
			></textarea>
		</div>
	`,
	host: { class: 'block space-y-2' },
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceFields {
	invoice = input<Invoice>()
	disabled = input<boolean>()
}
