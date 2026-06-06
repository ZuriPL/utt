import type { TestDescriptor, testTask } from "$types/tests.ts"
import type { ITest, Metadata } from "$public/TestInterface.ts"
import { UntarStream } from "@std/tar/untar-stream"
import { toJson, toText } from '@std/streams'
import { encodeBase64Url } from '@std/encoding'

/**
 * Create an object of a class specified by `path`
 *
 * @param path path to the class, relative to `.utt/tests/` directory
 */
export async function loadTest(path: string): Promise<ITest> {

	const Test = (await import(path)).default

	return new Test()
}

export async function parseUtest(path: string) {
	const file = await Deno.open(path)

	const stream = file.readable.pipeThrough(new UntarStream())

	const result: {
		test?: ITest,
		meta?: Metadata | object,
		out?: string
		files: Map<string, string>
	} = { files: new Map<string, string>() }

	for await (const file of stream) {
		if (!file.readable) continue

		if (file.path == 'test.ts') {
			const encoded = encodeBase64Url(await toText(file.readable))

			const test: ITest = await loadTest(`data:text/typescript;base64,${encoded}`)

			result.test = test
		} else if (file.path == "model.out") {
			result.out = await toText(file.readable)
		} else if (file.path == "meta.json") {
			result.meta = await toJson(file.readable) ?? {}
		} else {
			result.files.set(file.path, await toText(file.readable))
		}
	}

	return result
}

export async function prepareTasks(descriptors: TestDescriptor[]): Promise<testTask[]> {
	return await Promise.all(descriptors.map(createTask))
}

async function createTask(descriptor: TestDescriptor) {
	return {
		pkg: descriptor.pkg,
		group: descriptor.group,
		name: descriptor.name,
		obj: await loadTest(await descriptor.resolveClassPath()),
	}
}