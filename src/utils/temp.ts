export async function makeTemp() {
    return await Deno.makeTempDir({ prefix: 'utt-' })
}