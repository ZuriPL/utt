import { compilePackage } from "$src/tester/compiler.ts";
import { terminateWorkers } from "@zip-js/zip-js"
import cfg from "$utils/state.ts"
import { bold, brightGreen } from "@std/fmt/colors"
import { program } from "$src/cli.ts"
import { join } from "@std/path"
import { getSrcDir } from "$utils/dirs.ts"
import { exists } from "@std/fs/exists"

export async function compileCommand(pkg: string, options: { program: string }) {
    if (!pkg && !cfg.get("state.editingPackage")) {
        program.error("You are not editing a package. Run '$ utt package' or specify the package to compile by passing an argument")
    }
    
    pkg = pkg ?? cfg.get("state.editingPackage")
    
    if (!await exists(join(await getSrcDir(), pkg))) {
        cfg.set("state.editingPackage", "")
        program.error(`Package ${pkg} doesn't exist`)
        
    }
    
    await compilePackage(pkg, options.program).catch(_ => {
        program.error(`Failed to compile package ${pkg}`)
    })

    console.log(brightGreen(`[SUCCESS] Compiled package: ${bold(pkg)}`))

    // otherwise the program will wait 5 seconds before exiting
    await terminateWorkers()
}