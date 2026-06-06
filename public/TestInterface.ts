export type Metadata = {
	code: number
}

export interface ITest {
	args(): string[]
	stdin(): string
	check(stdout: string, meta: Metadata): boolean
	parse?(stdout: string): string
}
