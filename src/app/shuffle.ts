export function shuffle<T>(arr: Array<T>): Array<T> {
	let i = arr.length
	if (i == 0) return arr
	const copy = [...arr]
	while (--i) {
		const j = Math.floor(Math.random() * (i + 1))
		const a = copy[i]
		const b = copy[j]
		copy[i] = b!
		copy[j] = a!
	}
	return copy
}
