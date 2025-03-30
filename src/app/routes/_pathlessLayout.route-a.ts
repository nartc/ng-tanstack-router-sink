import { ChangeDetectionStrategy, Component } from '@angular/core'
import { createFileRoute } from 'tanstack-angular-router-experimental'

export const Route = createFileRoute('/_pathlessLayout/route-a')({
	component: () => RouteA,
})

@Component({
	selector: 'PathlessLayoutRouteA',
	template: `
		<div>Pathless Layout Route A</div>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteA {}
