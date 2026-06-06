import { compilePackage } from "$src/runner/compiler.ts";

export async function compileCommand(pkg: string, options: { program: string }) {
    // console.log(options)
    await compilePackage(pkg, options.program)
}