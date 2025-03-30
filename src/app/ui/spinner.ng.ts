import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core'

@Component({
	selector: 'Spinner',
	template: `
		⍥
	`,
	host: {
		class: 'inline-block animate-spin px-3 transition',
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
			return `opacity-1 duration-500 ${wait ?? 'delay-300'}`
		}
		return `duration-500 opacity-0 delay-0`
	})
}
