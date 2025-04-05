import { Component } from '@angular/core'
import { RouterRoot } from 'tanstack-angular-router-experimental'
import { RouterConfig } from './ui/router-config.ng'

@Component({
	selector: 'app-root',
	template: `
		<RouterConfig #config />
		<RouterRoot [options]="{ defaultPendingMs: config.pendingMs(), defaultPendingMinMs: config.pendingMinMs() }" />
	`,
	imports: [RouterRoot, RouterConfig],
})
export class AppComponent {}
