import { ChangeDetectionStrategy, Component } from '@angular/core'
import { createFileRoute, Link } from 'tanstack-angular-router-experimental'

export const Route = createFileRoute('/')({
	component: () => Index,
})

@Component({
	selector: 'Index',
	template: `
		<div class="text-lg">Welcome Home!</div>
		<hr class="my-2" />
		<a [link]="{ to: '/' }" class="rounded-full bg-blue-500 px-2 py-1 text-xs text-white">1 New Invoice</a>
		<hr class="my-2" />
		<div class="max-w-xl">
			As you navigate around take note of the UX. It should feel suspense-like, where routes are only rendered
			once all of their data and elements are ready.
			<hr class="my-2" />
			To exaggerate async effects, play with the artificial request delay slider in the bottom-left corner.
			<hr class="my-2" />
			The last 2 sliders determine if link-hover preloading is enabled (and how long those preloads stick around)
			and also whether to cache rendered route data (and for how long). Both of these default to 0 (or off).
		</div>
	`,
	host: { class: 'block p-2' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [Link],
})
export class Index {}
