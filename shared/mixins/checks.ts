import streamEqual from "stream-equal"
import { Readable } from "node:stream"
import type { BaseTest } from "$shared/base.ts"
import type { TestOutput } from "utt"

type Constructor<T = object> = abstract new (...args: any[]) => T;

export const useChecks = function<T extends Constructor<BaseTest>>(Base: T) {
    abstract class WithChecks extends Base {
        async assertExact(output: TestOutput, expected: TestOutput): Promise<void> {
            await this.assertExactCode(output, expected)
            await this.assertExactStdOut(output, expected)
        }

        async assertExactCode(output: TestOutput, expected: TestOutput) {
            if ((await output.status).code !== (await expected.status).code) {
                throw new Error(
                    `Program exited with ${(await output.status).code}, when ${(await expected.status).code} was expected`
                )
            }
        }

        async assertSuccessCode(output: TestOutput) {
            if ((await output.status).code !== 0) {
                throw new Error(
                    `Program exited with ${(await output.status).code}, when 0 was expected`
                )
            }
        }

        async assertErrorCode(output: TestOutput) {
            if ((await output.status).code == 0) {
                throw new Error(
                    `Program exited with 0, when an error code was expected`
                )
            }
        }

        async assertExactStdOut(output: TestOutput, expected: TestOutput): Promise<void> {
            const res = await streamEqual(
                // deno-lint-ignore no-explicit-any
                Readable.fromWeb(output.out as any),
                // deno-lint-ignore no-explicit-any
                Readable.fromWeb(expected.out as any)
            )

            if (!res) throw new Error("The output of the test doesn't match the expected value")
        }
    }

    return WithChecks
}