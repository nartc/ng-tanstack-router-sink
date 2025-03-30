import { ChangeDetectionStrategy, Component } from '@angular/core'
import { createFileRoute, Outlet } from 'tanstack-angular-router-experimental'

export const Route = createFileRoute('/_pathlessLayout')({
	component: () => PathlessLayout,
})

@Component({
	selector: 'PathlessLayout',
	template: `
		<div>Pathless Layout</div>
		<hr />
		<outlet />
	`,
	host: { class: 'block' },
	imports: [Outlet],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PathlessLayout {}
