import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { AnyRouter, createRouter, provideRouter } from 'tanstack-angular-router-experimental'
import { routeTree } from '../routeTree.gen'
import { DefaultPending } from './ui/spinner.ng'

const router = createRouter({
	routeTree,
	defaultPreload: 'intent',
	defaultPendingComponent: () => DefaultPending,
})

declare module 'tanstack-angular-router-experimental' {
	interface Register {
		// This infers the type of our router and registers it across your entire project
		router: typeof router
	}
}

export const appConfig: ApplicationConfig = {
	providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(router as AnyRouter)],
}
