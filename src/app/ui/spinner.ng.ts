import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core'

@Component({
	selector: 'Spinner',
	template: '⍥',
	host: {
		class: 'inline-block animate-spin px-3 transition duration-500',
		'[class]': 'hostClass()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Spinner {
	show = input(true)
	wait = input<`delay-${number}`>('delay-300')

	protected hostClass = computed(() => {
		const [show, wait] = [this.show(), this.wait()]
		if (show) {
			return `opacity-100  ${wait ?? 'delay-300'}`
		}
		return `opacity-0 delay-0`
	})
}

@Component({
	selector: 'DefaultPending',
	template: `
		<Spinner />
	`,
	host: { class: 'block p-2 text-2xl' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [Spinner],
})
export class DefaultPending {}
