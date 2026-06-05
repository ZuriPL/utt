import Test from "../utils/TestInterface.ts";

class Test1 implements Test {
    args() {
        return ["1"];
    }

    stdin() {
        return "AAA\nAB\n"
    }

    check(stdout: string, status: number) {
        return stdout === "BBB\n" && status === 0
    }
}

const test = new Test1();

const input = test.stdin()
const args = test.args()


export async function runTest() {
    const command = new Deno.Command("./program", {
        args, stdin: "piped", stdout: "piped"
    })

    const instance = command.spawn()

    const writer = instance.stdin.getWriter()

    writer.write(new TextEncoder().encode(input))
    writer.close()

    const { code, stdout } = await instance.output()

    const outText = new TextDecoder().decode(stdout)

    const result = test.check(outText, code)

    console.log(result)
}