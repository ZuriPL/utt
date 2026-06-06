import type { TestDescriptor, testTask } from "$types/tests.ts"
import type { ITest } from "$public/TestInterface.ts"

/**
 * Load a Test Class from a given path
 *
 * @param path path to the class, relative to `.utt/tests/` directory
 */
export async function loadTest(path: string): Promise<ITest> {

	const Test = (await import(path)).default

	return new Test()
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