import { compilePackage } from "$src/runner/compiler.ts";

export async function compileCommand(pkg: string, options: object) {
    // console.log(options)
    await compilePackage(pkg)
}