import type { ITest } from "$public/TestInterface.ts"

// runs a test and returns its output
export async function executeTask(program: string, cwd: string, test: ITest) {
	const command = new Deno.Command(program, {
		stdin: "piped",
		stdout: "piped",
		args: test.args(),
		cwd
	})

	const instance = command.spawn()
	
	const writer = instance.stdin.getWriter()
	writer.write(new TextEncoder().encode(test.stdin()))
	writer.close()

	const { code, stdout } = await instance.output()

	let output = new TextDecoder().decode(stdout)
	if (test.parse) output = test.parse(output)

	return {
		output,
		meta: {
			code
		}
	}
}