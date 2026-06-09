import { ZipWriter } from "@zip-js/zip-js";

export class ZipFile {
    #writer: ZipWriter<WritableStream<Uint8Array>>
    #deleted = false

    constructor(writable: WritableStream) {
        this.#writer = new ZipWriter(writable)
    }

    async addFile(path: string, file: ReadableStream, comment: "file" | "meta" = "file"): Promise<void> {
        await this.#writer.add(path, file, { comment })
    }

    async [Symbol.asyncDispose](): Promise<void> {
        // if (this.#deleted) return
        // this.#deleted = true

        await this.#writer.close()
    }
}

