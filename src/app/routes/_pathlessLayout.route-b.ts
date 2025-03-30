import { ChangeDetectionStrategy, Component } from '@angular/core'
import { createFileRoute } from 'tanstack-angular-router-experimental'

export const Route = createFileRoute('/_pathlessLayout/route-b')({
	component: () => RouteB,
})

@Component({
	selector: 'PathlessLayoutRouteB',
	template: `
		<div>Pathless Layout Route B</div>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteB {}
