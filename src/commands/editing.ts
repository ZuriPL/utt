import { getSrcDir, assertDir } from "$src/utils/dirs.ts"
import { ensureDir } from "@std/fs"
import { join } from "@std/path"
import cfg from '$src/utils/state.ts'

export async function setPackageCommand(pkg: string) {
	const path = join(await getSrcDir(), pkg)

	await ensureDir(path)

	cfg.set("state.editingPackage", pkg)
}

export async function createTestCommand({ name, group }: { name: string, group?: string }) {
	let path = join(
		await getSrcDir(),
		cfg.get("state.editingPackage")
	)

	await assertDir(path)

	if (group) path = join(path, group)

	await ensureDir(path)

	// Currently, this relies on the cli being run from the directory of the project
	// TODO: decouple this
	await Deno.copyFile("src/templates/Test.ts", join(path, name + ".ts"))
}

async function dirIsEmpty(dir: AsyncIterable<Deno.DirEntry>) {
	for await (const _ of dir) {
		return false;
	}

	return true;
}

export async function deleteTestCommand({ name, group }: { name: string, group?: string }) {
	let path = join(
		await getSrcDir(),
		cfg.get("state.editingPackage")
	)

	await assertDir(path)

	if (group) path = join(path, group)

	try {
		await Deno.remove(join(path, name.concat(".ts")))

		if (group && await dirIsEmpty(Deno.readDir(path))) {
			Deno.remove(path)
		}
	} catch (_) {
		console.log(`Test '${group ? group + "." : ''}${name}' doesn't exist`)
	} 
}

