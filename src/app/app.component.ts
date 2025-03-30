import { Component } from '@angular/core'
import { RouterRoot } from 'tanstack-angular-router-experimental'

@Component({
	selector: 'app-root',
	template: `
		<RouterRoot />
	`,
	imports: [RouterRoot],
})
export class AppComponent {}
