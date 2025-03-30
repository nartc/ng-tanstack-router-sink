import { ChangeDetectionStrategy, Component } from '@angular/core'
import { createLazyFileRoute } from 'tanstack-angular-router-experimental'

export const Route = createLazyFileRoute('/expensive')({
	component: () => Expensive,
})

@Component({
	selector: 'Expensive',
	template: `
		<div class="p-2">I am an "expensive" component... which really just means that I was code-split 😉</div>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Expensive {}
