import { Component } from '@angular/core'
import { RouterDevtools, RouterRoot } from 'tanstack-angular-router-experimental'

@Component({
	selector: 'app-root',
	template: `
		<RouterRoot />
		<RouterDevtools />
	`,
	imports: [RouterRoot, RouterDevtools],
})
export class AppComponent {}
