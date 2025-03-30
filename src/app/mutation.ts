import { signal } from '@angular/core'

export function mutation<TVariables, TData, TError = Error>(
	fn: (variables: TVariables) => Promise<TData>,
	onSuccess?: (ctx: { data: TData }) => void | Promise<void>,
) {
	const submittedAt = signal<number | undefined>(undefined)
	const variables = signal<TVariables | undefined>(undefined)
	const error = signal<TError | undefined>(undefined)
	const data = signal<TData | undefined>(undefined)
	const status = signal<'idle' | 'pending' | 'success' | 'error'>('idle')

	const mutate = async (vars: TVariables): Promise<TData | undefined> => {
		status.set('pending')
		submittedAt.set(Date.now())
		variables.set(vars)

		try {
			const result = await fn(vars)
			await onSuccess?.({ data: result })
			status.set('success')
			error.set(undefined)
			data.set(result)
			return result
		} catch (err) {
			status.set('error')
			error.set(err as TError)
			return
		}
	}

	return {
		status: status.asReadonly(),
		variables: variables.asReadonly(),
		submittedAt: submittedAt.asReadonly(),
		mutate,
		error: error.asReadonly(),
		data: data.asReadonly(),
	}
}
