import type { ITest } from "$public/TestInterface.ts"
import { join } from "@std/path/join"
import { getSrcDir } from "$src/utils/dirs.ts"
import { basename } from "@std/path/basename"

export class TestDescriptor {
	#name: string
	#pkg: string
	#group: string

	constructor(pkg: string, group: string, className: string) {
		this.#name = basename(className)
		this.#pkg = pkg
		this.#group = group
	}

	get pkg() {
		return this.#pkg
	}

	get group() {
		return this.#group
	}

	get name() {
		return this.#name
	}

	async resolveClassPath() {
		return join(await getSrcDir(), this.#pkg, this.#group, this.#name.concat(".ts"))
	}
}

export type testTask = {
	pkg: string
	group: string
	name: string
	obj: ITest
}
