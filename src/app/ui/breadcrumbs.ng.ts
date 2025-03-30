import { ChangeDetectionStrategy, Component } from '@angular/core'
import { isMatch, Link, matches } from 'tanstack-angular-router-experimental'

@Component({
	selector: 'nav[breadcrumbs]',
	template: `
		@if (!isPending()) {
			<ul class="flex items-center gap-2">
				@for (match of matchesWithCrumbs(); track match.fullPath) {
					<li class="flex gap-2">
						<a [link]="{ from: match.fullPath }" class="text-blue-700">
							{{ match.loaderData?.crumb }}
						</a>
						@if ($index + 1 < $count) {
							<span>&gt;</span>
						}
					</li>
				}
			</ul>
		}
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [Link],
})
export class Breadcrumbs {
	protected isPending = matches({
		select: (matches) => matches.some((match) => match.status === 'pending'),
	})
	protected matchesWithCrumbs = matches({
		select: (matches) => matches.filter((match) => isMatch(match, 'loaderData.crumb')),
	})
}
