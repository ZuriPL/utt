import type { ITest, Metadata } from "$public/TestInterface.ts";

export default class Test implements ITest {
    args(): string[] {
        return [ ];
    }

    stdin(): string {
        return ""
    }

    check(stdout: string, meta: Metadata): boolean {
        return true
    }
}