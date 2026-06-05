import Test1 from "../../.utt/pkg1/group1/Test1.ts";

async function chdirToWorkspace(): Promise<boolean> {
    try {
        const res = await Deno.lstat(".utt");

        if (!res.isDirectory) throw new Deno.errors.NotADirectory

        Deno.chdir('.utt')

        return true
    } catch (error) {
        if (error instanceof Deno.errors.NotADirectory || error instanceof Deno.errors.NotFound) {
            if (Deno.cwd() == '/') return false

            Deno.chdir('..')
            return chdirToWorkspace()
        }

        throw new Error("I/O Error")
    }
}

async function dirExists(dir: string) {
    try {
        const res = await Deno.lstat(dir);

        if (!res.isDirectory) throw new Deno.errors.NotADirectory

        return true
    } catch (error) {
        if (error instanceof Deno.errors.NotADirectory || error instanceof Deno.errors.NotFound) {
            return false
        }

        throw new Error("I/O Error")
    }
}

export async function readWorkspace() {
    const success = await chdirToWorkspace()
    
    if (success) {
        const dirs = Deno.readDir(Deno.cwd())

        for await (const pkg of dirs) {
            if (!pkg.isDirectory) continue

            console.log(await readPackage(pkg.name))
        }
    }
}

export async function readPackage(path: string) {
    const success = await dirExists(path)

    const pkg = new Map()

    if (success) {
        const groups = Deno.readDir(path)

        for await (const dir of groups) {
            if (!dir.isDirectory) continue

            const group = await readGroup(path + "/" + dir.name)

            pkg.set(dir.name, group)
        }
    }

    return pkg
}

export async function readGroup(path: string) {
    const success = await dirExists(path)

    const group = []

    if (success) {
        const tests = Deno.readDir(path)

        for await (const test of tests) {
            if (!test.isFile) continue

            group.push(path + "/" + test.name)
        }
    }

    return group
}
