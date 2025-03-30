import { Injectable, signal } from '@angular/core'
import { PickAsRequired } from '@tanstack/router-core'
import { shuffle } from './shuffle'

export type Invoice = {
	id: number
	title: string
	body: string
}

@Injectable()
export class InvoiceContext {
	invoices = signal<Invoice[]>([])

	async getInvoices() {
		if (this.invoices().length > 0) {
			return this.invoices()
		}
		const res = await fetch('https://jsonplaceholder.typicode.com/posts')
		const result = (await res.json()) as Invoice[]
		const invoices = result.slice(0, 10)
		this.invoices.set(invoices)
		return invoices
	}

	async getInvoice(id: number) {
		if (this.invoices().length === 0) {
			await this.getInvoices()
		}
		const invoice = this.invoices().find((d) => d.id === id)
		if (!invoice) {
			throw new Error('Invoice not found.')
		}
		return invoice
	}

	async createInvoice(partialInvoice: Partial<Invoice>) {
		if (partialInvoice.title?.includes('error')) {
			console.error('error')
			throw new Error('Ouch!')
		}

		const invoice = {
			id: this.invoices().length + 1,
			title: partialInvoice.title ?? `New Invoice ${String(Date.now()).slice(0, 5)}`,
			body:
				partialInvoice.body ??
				shuffle(
					`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. 
      Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna.  Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante.
      `.split(' '),
				).join(' '),
		}

		this.invoices.update((prev) => [...prev, invoice])
		return invoice
	}

	async patchInvoice({ id, ...updatedInvoice }: PickAsRequired<Partial<Invoice>, 'id'>) {
		const invoice = this.invoices().find((d) => d.id === id)
		if (!invoice) {
			throw new Error('Invoice not found.')
		}
		if (updatedInvoice.title?.toLocaleLowerCase()?.includes('error')) {
			throw new Error('Ouch!')
		}
		this.invoices.update((prev) => prev.map((d) => (d.id === id ? { ...d, ...updatedInvoice } : d)))
		return invoice
	}
}
