import { runTest } from "../runner/runner.ts"

function run_all_pkgs() {
    runTest()
}

function run_pkg(pkg: string) {
    console.log("Running pkg: " + pkg)
}

export function command(pkg: string) {
    if (pkg) {
        run_pkg(pkg)
    } else {
        run_all_pkgs()
    }
}