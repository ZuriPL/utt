import type { TestDescriptor } from "$types/tests.ts"
import { executeTask } from "$src/runner/executor.ts"
import { makeTemp } from "$src/utils/temp.ts"
import { loadTest, parseUtest } from "$src/runner/loader.ts"

export async function runTests(descriptors: TestDescriptor[], program: string) {
    if (descriptors.length == 0) {
        console.log("WARNING: No tests found")
    }
    for (const test of descriptors) {
        const temp = await makeTemp()
    
        try {
            const path = await test.resolveClassPath()

            const result = await parseUtest(path)

            
        } finally {
            Deno.remove(temp)
        }
        
    }
}