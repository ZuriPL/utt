// deno-lint-ignore-file no-explicit-any
import streamEqual from "stream-equal"
import { Readable } from "node:stream"
import type { BaseTest, TestChecks } from "$shared/base.ts"

type Constructor<T = object> = abstract new (...args: any[]) => T;

async function checkExactStream(result: ReadableStream<Uint8Array>, expected: ReadableStream<Uint8Array>): Promise<void> {
    const res = await streamEqual(
        Readable.fromWeb(result as any),
        Readable.fromWeb(expected as any)
    )

    if (!res) throw new Error()
}

export const useChecks = function<T extends Constructor<BaseTest>>(Base: T) {
    abstract class WithChecks extends Base {
        #defaultChecks: TestChecks = {
            code: this.checkExactCode,
            stdout: this.checkExactStdOut,
            files: this.checkExactFiles
        }
        
        /**
         * ```
         * {
         *  code: this.checkExactCode,
         *  stdout: this.checkExactStdOut,
         *  files: this.checkExactFiles
         * }
         * ```
         */
        get defaultChecks() {
            return this.#defaultChecks
        }

        checkExactCode(result: number, expected: number): void {
            if (result !== expected) {
                throw new Error(
                    `Program exited with ${result}, when ${expected} was expected`
                )
            }
        }

        checkSuccessCode(result: number, _: number): void {
            if (result !== 0) {
                throw new Error(
                    `Program exited with ${result}, when 0 was expected`
                )
            }
        }

        checkErrorCode(result: number, _: number): void {
            if (result === 0) {
                throw new Error(
                    `Program exited with 0, when an error was expected`
                )
            }
        }

        async checkExactStdOut(result: ReadableStream<Uint8Array>, expected: ReadableStream<Uint8Array>): Promise<void> {
            try {
                await checkExactStream(result, expected)
            } catch (_) {    
                throw new Error("The output of the test doesn't match the expected value")
            }
        }

        async checkExactFiles(result: Map<string, ReadableStream>, expected: Map<string, ReadableStream>) {
            if (result.size !== expected.size) throw new Error("The number of files produced doesn't match")

            for (const [ path, expectedContent ] of expected) {
                const resultContent = result.get(path)
                if (!resultContent) throw new Error(`File ${path} was not found in the result`)
                
                await checkExactStream(expectedContent, resultContent).catch(_ => {
                    throw new Error(`File ${path} differs from the expected file`)
                })
            }
        }


    }

    return WithChecks
}