import { compilePackage } from "$src/runner/compiler.ts";

export async function compileCommand(pkg: string, options: { program: string }) {
    await compilePackage(pkg, options.program)
}