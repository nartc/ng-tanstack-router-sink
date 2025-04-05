import { ChangeDetectionStrategy, Component } from '@angular/core'
import { sessionStorageState } from '../session-storage-state'

@Component({
	selector: 'RouterConfig',
	template: `
		<div class="space-y-2 p-2">
			<div class="flex gap-2">
				<button class="rounded bg-blue-500 p-1 px-2 text-white" (click)="loaderDelay.set(150)">Fast</button>
				<button class="rounded bg-blue-500 p-1 px-2 text-white" (click)="loaderDelay.set(500)">Fast 3G</button>
				<button class="rounded bg-blue-500 p-1 px-2 text-white" (click)="loaderDelay.set(2000)">Slow 3G</button>
			</div>
			<div>
				<div>Loader Delay: {{ loaderDelay() }}ms</div>
				<input
					#loaderDelayInput
					type="range"
					min="0"
					max="5000"
					step="100"
					[value]="loaderDelay()"
					(change)="loaderDelay.set(loaderDelayInput.valueAsNumber)"
					class="w-full"
				/>
			</div>
		</div>
		<div class="space-y-2 p-2">
			<div class="flex gap-2">
				<button
					class="rounded bg-blue-500 p-1 px-2 text-white"
					(click)="pendingMs.set(1000); pendingMinMs.set(500)"
				>
					Reset to Default
				</button>
			</div>
			<div>
				<div>defaultPendingMs: {{ pendingMs() }}ms</div>
				<input
					#pendingMsInput
					type="range"
					min="0"
					max="5000"
					step="100"
					[value]="pendingMs()"
					(change)="pendingMs.set(pendingMsInput.valueAsNumber)"
					class="w-full"
				/>
			</div>
			<div>
				<div>defaultPendingMinMs: {{ pendingMinMs() }}ms</div>
				<input
					#pendingMinMsInput
					type="range"
					min="0"
					max="5000"
					step="100"
					[value]="pendingMinMs()"
					(change)="pendingMinMs.set(pendingMinMsInput.valueAsNumber)"
					class="w-full"
				/>
			</div>
		</div>
	`,
	host: {
		class: 'block bg-opacity-75 items-left fixed bottom-2 left-2 flex w-52 flex-col flex-wrap gap-1 divide-y rounded border-b bg-white text-xs shadow-md shadow-black/20',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouterConfig {
	// This stuff is just to tweak our sandbox setup in real-time
	protected loaderDelay = sessionStorageState('loaderDelay', 500)
	pendingMs = sessionStorageState('pendingMs', 1000)
	pendingMinMs = sessionStorageState('pendingMinMs', 500)
}
